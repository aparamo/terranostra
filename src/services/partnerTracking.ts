export interface PartnerClickData {
  visitorId: string;
  partner: 'caro' | 'adri' | 'neither';
  userAgent?: string;
  referrer?: string;
  sessionId?: string;
}

export interface VisitorData {
  visitorId: string;
  clickCount: number;
  neitherClickCount?: number;
  partner: string;
  lastClick: string;
  createdAt: string;
  sessionData?: {
    sessionId: string;
    firstVisit: string;
    totalVisits: number;
  };
}

class PartnerTrackingService {
  private generateVisitorId(): string {
    // Generate a unique visitor ID based on timestamp and random string
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `visitor_${timestamp}_${randomStr}`;
  }

  private getSessionId(): string {
    // Try to get existing session ID from localStorage, or create new one
    if (typeof window !== 'undefined') {
      let sessionId = localStorage.getItem('terranostra_session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        localStorage.setItem('terranostra_session_id', sessionId);
      }
      return sessionId;
    }
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  }

  private getVisitorId(): string {
    // Try to get existing visitor ID from localStorage, or create new one
    if (typeof window !== 'undefined') {
      let visitorId = localStorage.getItem('terranostra_visitor_id');
      if (!visitorId) {
        visitorId = this.generateVisitorId();
        localStorage.setItem('terranostra_visitor_id', visitorId);
      }
      return visitorId;
    }
    return this.generateVisitorId();
  }

  async trackPartnerClick(partner: 'caro' | 'adri' | 'neither'): Promise<void> {
    try {
      const visitorId = this.getVisitorId();
      const sessionId = this.getSessionId();

      const clickData: PartnerClickData = {
        visitorId,
        partner,
        userAgent: navigator.userAgent,
        referrer: document.referrer || undefined,
        sessionId
      };

      console.log('Tracking partner click:', {visitorId, partner, sessionId});

      // Send to our API endpoint
      const response = await fetch('/api/partner-clicks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clickData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          'Failed to track partner click:',
          response.status,
          response.statusText,
          errorText
        );
      } else {
        const result = await response.json();
        console.log('Successfully tracked partner click:', result);
      }
    } catch (error) {
      console.error('Error tracking partner click:', error);
    }
  }

  async getVisitorStats(visitorId: string): Promise<VisitorData | null> {
    try {
      const response = await fetch(
        `/api/partner-clicks?visitorId=${visitorId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch visitor stats');
      }

      const data = await response.json();
      return data.docs?.[0] || null;
    } catch (error) {
      console.error('Error fetching visitor stats:', error);
      return null;
    }
  }

  async getPartnerStats(): Promise<{partner: string; count: number}[]> {
    try {
      const response = await fetch('/api/partner-clicks?globalCounter=true');

      if (!response.ok) {
        throw new Error('Failed to fetch partner stats');
      }

      const data = await response.json();
      return [
        {partner: 'caro', count: data.partnerStats.caro},
        {partner: 'adri', count: data.partnerStats.adri},
        {partner: 'neither', count: data.partnerStats.neither}
      ];
    } catch (error) {
      console.error('Error fetching partner stats:', error);
      return [];
    }
  }

  async getGlobalNeitherCounter(): Promise<number> {
    try {
      const response = await fetch('/api/partner-clicks?globalCounter=true');

      if (!response.ok) {
        throw new Error('Failed to fetch global counter');
      }

      const data = await response.json();
      return data.globalNeitherCounter || 0;
    } catch (error) {
      console.error('Error fetching global counter:', error);
      return 0;
    }
  }

  getCurrentVisitorId(): string {
    return this.getVisitorId();
  }

  getCurrentSessionId(): string {
    return this.getSessionId();
  }
}

export const partnerTrackingService = new PartnerTrackingService();
