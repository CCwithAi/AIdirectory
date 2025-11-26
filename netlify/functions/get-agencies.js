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
    // Read agencies from JSON file - look in function's data directory first
    const agenciesPath = path.join(__dirname, 'data', 'agencies.json');

    if (!fs.existsSync(agenciesPath)) {
      console.error('agencies.json not found at:', agenciesPath);
      console.error('__dirname:', __dirname);
      console.error('Files in __dirname:', fs.readdirSync(__dirname));

      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Data file not found',
          path: agenciesPath,
        }),
      };
    }

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
