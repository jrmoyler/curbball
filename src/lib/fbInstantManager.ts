/**
 * Facebook Instant Games SDK Manager
 * Handles all FBInstant API interactions with graceful fallbacks
 */

declare global {
  interface Window {
    FBInstant?: any;
  }
}

class FBInstantManager {
  private isSupported: boolean = false;
  private isInitialized: boolean = false;

  constructor() {
    this.isSupported = typeof window !== 'undefined' && !!window.FBInstant;
  }

  /**
   * Check if running in Facebook Instant Games environment
   */
  isFBInstant(): boolean {
    return this.isSupported;
  }

  /**
   * Initialize the FBInstant SDK
   */
  async initializeAsync(): Promise<void> {
    if (!this.isSupported) {
      console.log('FBInstant not available - running in web mode');
      return;
    }

    try {
      await window.FBInstant.initializeAsync();
      this.isInitialized = true;
      console.log('FBInstant initialized successfully');
    } catch (error) {
      console.error('Failed to initialize FBInstant:', error);
      throw error;
    }
  }

  /**
   * Set loading progress (0-100)
   */
  setLoadingProgress(progress: number): void {
    if (!this.isSupported || !this.isInitialized) return;
    
    try {
      window.FBInstant.setLoadingProgress(Math.min(100, Math.max(0, progress)));
    } catch (error) {
      console.error('Failed to set loading progress:', error);
    }
  }

  /**
   * Start the game - must be called before game is playable
   */
  async startGameAsync(): Promise<void> {
    if (!this.isSupported || !this.isInitialized) {
      console.log('Skipping FBInstant.startGameAsync - not in Facebook environment');
      return;
    }

    try {
      await window.FBInstant.startGameAsync();
      console.log('Game started successfully');
    } catch (error) {
      console.error('Failed to start game:', error);
      throw error;
    }
  }

  /**
   * Get player data
   */
  async getPlayerDataAsync(keys: string[]): Promise<any> {
    if (!this.isSupported || !this.isInitialized) {
      return {};
    }

    try {
      return await window.FBInstant.player.getDataAsync(keys);
    } catch (error) {
      console.error('Failed to get player data:', error);
      return {};
    }
  }

  /**
   * Save player data
   */
  async setPlayerDataAsync(data: Record<string, any>): Promise<void> {
    if (!this.isSupported || !this.isInitialized) {
      return;
    }

    try {
      await window.FBInstant.player.setDataAsync(data);
      console.log('Player data saved successfully');
    } catch (error) {
      console.error('Failed to save player data:', error);
    }
  }

  /**
   * Get player name
   */
  getPlayerName(): string {
    if (!this.isSupported || !this.isInitialized) {
      return 'Player';
    }

    try {
      return window.FBInstant.player.getName() || 'Player';
    } catch (error) {
      console.error('Failed to get player name:', error);
      return 'Player';
    }
  }

  /**
   * Get player photo
   */
  getPlayerPhoto(): string {
    if (!this.isSupported || !this.isInitialized) {
      return '';
    }

    try {
      return window.FBInstant.player.getPhoto() || '';
    } catch (error) {
      console.error('Failed to get player photo:', error);
      return '';
    }
  }

  /**
   * Share game with custom message
   */
  async shareAsync(payload: {
    intent: 'SHARE' | 'REQUEST' | 'CHALLENGE' | 'INVITE';
    text?: string;
    image?: string;
    data?: any;
  }): Promise<void> {
    if (!this.isSupported || !this.isInitialized) {
      console.log('Share not available in web mode');
      return;
    }

    try {
      await window.FBInstant.shareAsync(payload);
      console.log('Share successful');
    } catch (error) {
      console.error('Failed to share:', error);
    }
  }
}

// Export singleton instance
export const fbInstant = new FBInstantManager();
