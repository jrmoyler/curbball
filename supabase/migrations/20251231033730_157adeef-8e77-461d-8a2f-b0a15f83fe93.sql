-- Create a table to track all completed purchases
CREATE TABLE public.purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  item_id TEXT NOT NULL,
  item_type TEXT NOT NULL,
  item_name TEXT,
  amount_paid INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index on email for lookups
CREATE INDEX idx_purchases_email ON public.purchases(email);

-- Create index on stripe_session_id for verification lookups
CREATE INDEX idx_purchases_stripe_session ON public.purchases(stripe_session_id);

-- Enable RLS
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Policy to allow service role to insert (edge functions use service role)
CREATE POLICY "Service role can insert purchases"
ON public.purchases
FOR INSERT
WITH CHECK (true);

-- Policy to allow service role to select
CREATE POLICY "Service role can read purchases"
ON public.purchases
FOR SELECT
USING (true);