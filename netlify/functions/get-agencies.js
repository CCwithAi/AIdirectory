const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Read agencies from JSON file
    const agenciesPath = path.join(__dirname, '..', '..', 'data', 'agencies.json');
    const agenciesData = fs.readFileSync(agenciesPath, 'utf8');
    const agencies = JSON.parse(agenciesData);

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
    console.error('Error reading agencies:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Failed to fetch agencies',
      }),
    };
  }
};
