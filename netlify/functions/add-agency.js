const fs = require('fs');
const path = require('path');

// Import verification handler
const { handler: verifyHandler } = require('./verify-agency.js');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
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
    const body = JSON.parse(event.body);
    const { agency } = body;

    // NO SECRET CODE CHECK - replaced with LLM verification
    // This makes the form truly open for legitimate businesses

    // Validate agency data
    if (!agency || !agency.name || !agency.website || !agency.email) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Missing required agency fields (name, website, email)',
        }),
      };
    }

    // Step 1: Run LLM verification
    const verificationResult = await verifyHandler(event, context);
    const verification = JSON.parse(verificationResult.body);

    // Check if verification passed
    if (!verification.success) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Agency verification failed',
          details: verification.checks,
          message: 'Your submission did not pass our verification checks. Please ensure all information is accurate and your website is accessible.',
        }),
      };
    }

    // Check LLM confidence level
    if (verification.checks.llmVerification.confidence < 0.7) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Low confidence in verification',
          details: verification.checks,
          message: verification.checks.llmVerification.reasoning,
        }),
      };
    }

    // Read current agencies from function's data directory
    // When deployed, included_files puts data/agencies.json relative to the function file
    // But in some environments it might be at the root or elsewhere.
    // We'll try a few common paths.
    
    let agenciesPath;
    const possiblePaths = [
      path.join(__dirname, 'data', 'agencies.json'),           // Local dev / some deployments
      path.join(process.cwd(), 'data', 'agencies.json'),       // Root relative
      path.resolve(__dirname, '../../data/agencies.json')      // Relative to source structure
    ];

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        agenciesPath = p;
        break;
      }
    }

    if (!agenciesPath) {
      console.error('agencies.json not found. Checked:', possiblePaths);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Data file not found',
        }),
      };
    }

    const agenciesData = fs.readFileSync(agenciesPath, 'utf8');
    const agencies = JSON.parse(agenciesData);

    // Generate ID from name
    const id = agency.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Check if agency already exists
    if (agencies.some(a => a.id === id)) {
      return {
        statusCode: 409,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'An agency with this name already exists',
        }),
      };
    }

    // Create new agency object with verification metadata
    const newAgency = {
      id,
      name: agency.name,
      website: agency.website,
      phone: agency.phone || 'N/A',
      email: agency.email,
      address: agency.address || 'Manchester, UK',
      primaryFocus: agency.primaryFocus || [],
      review: agency.review || '',
      isFeatured: false,
      logoChar: agency.logoChar || agency.name.charAt(0).toUpperCase(),
      createdAt: new Date().toISOString(),
      verificationScore: verification.checks.llmVerification.confidence,
      verified: true,
    };

    // Add to agencies array
    agencies.push(newAgency);

    // Write back to file
    fs.writeFileSync(agenciesPath, JSON.stringify(agencies, null, 2), 'utf8');

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message: 'Agency added successfully',
        agency: newAgency,
      }),
    };
  } catch (error) {
    console.error('Error adding agency:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to add agency',
      }),
    };
  }
};
