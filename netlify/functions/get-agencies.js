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
    // In Netlify, functions are deployed separately, so we need to find the data file
    // Try multiple possible paths
    let agenciesPath;
    const possiblePaths = [
      path.join(__dirname, '..', '..', 'data', 'agencies.json'),
      path.join(process.cwd(), 'data', 'agencies.json'),
      path.join(__dirname, 'data', 'agencies.json'),
      '/opt/build/repo/data/agencies.json',
    ];

    for (const tryPath of possiblePaths) {
      if (fs.existsSync(tryPath)) {
        agenciesPath = tryPath;
        break;
      }
    }

    if (!agenciesPath) {
      console.error('Could not find agencies.json. Tried paths:', possiblePaths);
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: 'Data file not found',
          tried: possiblePaths,
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
