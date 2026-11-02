/* API Module: Handles network requests to Supabase Edge Function */

// TODO: Replace with your actual Supabase project URL and Anon Key
const SUPABASE_URL = 'https://ahhfakwwmezgonaoruyz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_-aebmah8XmxNdCEUKl1wRA_2WbvqdKF';

/**
 * Sends a request to the Supabase Edge Function proxy.
 * @param {string} endpoint - The TDX API endpoint URL path.
 * @returns {Promise<Object>} The JSON response data.
 */
export async function fetchTransitData(endpoint) {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/get-transit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ url: endpoint })
    });

    if (!response.ok) {
        throw new Error(`API HTTP Error: ${response.status}`);
    }

    return await response.json();
}
