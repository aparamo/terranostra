import {NextRequest, NextResponse} from 'next/server';
import {getPayload} from 'payload';
import config from '@payload-config';

export async function POST(request: NextRequest) {
  try {
    const {visitorId, partner, userAgent, referrer, sessionId} =
      await request.json();

    if (!visitorId || !partner) {
      return NextResponse.json(
        {error: 'Missing required fields'},
        {status: 400}
      );
    }

    const localPayload = await getPayload({config});

    // Check if visitor already exists
    const existingVisitors = await localPayload.find({
      collection: 'partner-clicks',
      where: {
        visitorId: {
          equals: visitorId
        }
      }
    });

    if (existingVisitors.docs.length > 0) {
      const existingVisitor = existingVisitors.docs[0];

      // Update existing visitor
      const updatedVisitor = await localPayload.update({
        collection: 'partner-clicks',
        id: existingVisitor.id,
        data: {
          clickCount: existingVisitor.clickCount + 1,
          lastClick: new Date().toISOString(),
          userAgent,
          referrer,
          sessionData: {
            ...existingVisitor.sessionData,
            totalVisits: (existingVisitor.sessionData?.totalVisits || 1) + 1
          }
        }
      });

      return NextResponse.json(updatedVisitor);
    }

    // Create new visitor
    const newVisitor = await localPayload.create({
      collection: 'partner-clicks',
      data: {
        visitorId,
        partner,
        clickCount: 1,
        lastClick: new Date().toISOString(),
        userAgent,
        referrer,
        sessionData: {
          sessionId: sessionId || 'unknown',
          firstVisit: new Date().toISOString(),
          totalVisits: 1
        }
      }
    });

    return NextResponse.json(newVisitor);
  } catch (error) {
    console.error('Error creating/updating partner click:', error);
    return NextResponse.json({error: 'Internal server error'}, {status: 500});
  }
}

export async function GET(request: NextRequest) {
  try {
    const {searchParams} = new URL(request.url);
    const visitorId = searchParams.get('visitorId');
    const partner = searchParams.get('partner');
    const getGlobalCounter = searchParams.get('globalCounter') === 'true';

    const localPayload = await getPayload({config});

    // If requesting global counter, calculate it from the database
    if (getGlobalCounter) {
      try {
        // Get all "neither" selections to calculate global counter
        const neitherSelections = await localPayload.find({
          collection: 'partner-clicks',
          where: {
            partner: {
              equals: 'neither'
            }
          },
          limit: 1000
        });

        const globalNeitherCounter = neitherSelections.docs.length;

        // Get total visitors
        const allVisitors = await localPayload.find({
          collection: 'partner-clicks',
          limit: 1000
        });

        const totalVisitors = allVisitors.docs.length;

        // Get partner statistics
        const partnerStats = {
          caro: 0,
          adri: 0,
          neither: globalNeitherCounter
        };

        // Count Caro and Adri selections
        const caroSelections = await localPayload.find({
          collection: 'partner-clicks',
          where: {
            partner: {
              equals: 'caro'
            }
          },
          limit: 1000
        });
        partnerStats.caro = caroSelections.docs.length;

        const adriSelections = await localPayload.find({
          collection: 'partner-clicks',
          where: {
            partner: {
              equals: 'adri'
            }
          },
          limit: 1000
        });
        partnerStats.adri = adriSelections.docs.length;

        return NextResponse.json({
          globalNeitherCounter,
          totalVisitors,
          partnerStats
        });
      } catch (error) {
        console.error('Error calculating global counter:', error);
      }

      // Fallback to 0 if there's an error
      return NextResponse.json({
        globalNeitherCounter: 0,
        totalVisitors: 0,
        partnerStats: {caro: 0, adri: 0, neither: 0}
      });
    }

    // Regular visitor data query
    const query: Record<string, {equals: string}> = {};

    if (visitorId) {
      query.visitorId = {
        equals: visitorId
      };
    }

    if (partner) {
      query.partner = {
        equals: partner
      };
    }

    const data = await localPayload.find({
      collection: 'partner-clicks',
      where: query
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching partner clicks data:', error);
    return NextResponse.json({error: 'Internal server error'}, {status: 500});
  }
}
