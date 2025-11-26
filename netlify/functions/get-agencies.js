const https = require('https');

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Fetch agencies data from the published data file
    const agencies = await fetchAgenciesFromSite();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        agencies: agencies,
        count: agencies.length,
      }),
    };
  } catch (error) {
    console.error('Error fetching agencies:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to fetch agencies',
        message: error.message,
      }),
    };
  }
};

/**
 * Fetch agencies from the published site
 * This works because the data folder is deployed with the static site
 */
function fetchAgenciesFromSite() {
  return new Promise((resolve, reject) => {
    // Determine the site URL from the request or use the production URL
    const siteUrl = process.env.URL || 'https://aiservicesmanchester.co.uk';
    const dataUrl = `${siteUrl}/data/agencies.json`;

    https.get(dataUrl, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const agencies = JSON.parse(data);
          resolve(agencies);
        } catch (error) {
          reject(new Error(`Failed to parse agencies data: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Failed to fetch agencies: ${error.message}`));
    });
  });
}
