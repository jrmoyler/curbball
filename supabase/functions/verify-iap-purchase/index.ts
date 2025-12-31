import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-IAP-PURCHASE] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    logStep("Stripe key verified");

    const { sessionId } = await req.json();
    logStep("Request body parsed", { sessionId });

    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Retrieve the checkout session with line items for price info
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent']
    });
    logStep("Session retrieved", { 
      status: session.payment_status, 
      metadata: session.metadata,
      customerEmail: session.customer_details?.email,
      amountTotal: session.amount_total
    });

    if (session.payment_status === "paid") {
      logStep("Payment verified successfully");

      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      const customerEmail = session.customer_details?.email;
      const itemId = session.metadata?.item_id;
      const itemType = session.metadata?.item_type;
      const itemName = session.metadata?.item_name;
      const amountPaid = session.amount_total || 0;
      const currency = session.currency || 'usd';
      const paymentIntentId = typeof session.payment_intent === 'string' 
        ? session.payment_intent 
        : session.payment_intent?.id;

      // Save to purchases table (complete purchase record)
      try {
        const { error: purchaseError } = await supabaseClient
          .from("purchases")
          .upsert({
            email: customerEmail || 'unknown',
            item_id: itemId,
            item_type: itemType,
            item_name: itemName,
            amount_paid: amountPaid,
            currency: currency,
            stripe_session_id: sessionId,
            stripe_payment_intent_id: paymentIntentId,
          }, { onConflict: 'stripe_session_id' });

        if (purchaseError) {
          logStep("Failed to save purchase", { error: purchaseError.message });
        } else {
          logStep("Purchase saved successfully", { email: customerEmail, itemId });
        }
      } catch (dbError) {
        logStep("Database error saving purchase", { error: String(dbError) });
      }

      // Also save to customer_emails for marketing (only if email available)
      if (customerEmail) {
        try {
          const { error: insertError } = await supabaseClient
            .from("customer_emails")
            .upsert({
              email: customerEmail,
              item_id: itemId,
              item_type: itemType,
              stripe_session_id: sessionId,
            }, { onConflict: 'email' });

          if (insertError) {
            logStep("Failed to save customer email", { error: insertError.message });
          } else {
            logStep("Customer email saved successfully", { email: customerEmail });
          }
        } catch (dbError) {
          logStep("Database error saving email", { error: String(dbError) });
        }
      }

      return new Response(JSON.stringify({
        verified: true,
        itemId: itemId,
        itemType: itemType,
        itemName: itemName,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      logStep("Payment not completed", { status: session.payment_status });
      return new Response(JSON.stringify({
        verified: false,
        status: session.payment_status,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
