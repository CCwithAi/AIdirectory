const https = require('https');
const http = require('http');

/**
 * Netlify Function: Verify Agency Submission
 * Uses Groq API with Llama 3.2 3B for intelligent verification
 *
 * Required Environment Variables:
 * - GROQ_API_KEY: Your Groq API key (get from https://console.groq.com)
 */

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

    // Validate required fields
    if (!agency || !agency.name || !agency.website || !agency.email) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields (name, website, email)',
        }),
      };
    }

    // Step 1: Check if website is accessible
    const websiteCheck = await checkWebsiteAccessibility(agency.website);

    // Step 2: Verify with LLM
    const llmVerification = await verifyWithLLM(agency, websiteCheck);

    // Step 3: Compile verification results
    const verificationResult = {
      success: llmVerification.isValid && websiteCheck.accessible,
      checks: {
        websiteAccessible: websiteCheck.accessible,
        websiteStatus: websiteCheck.status,
        llmVerification: llmVerification,
      },
      agency: agency,
      timestamp: new Date().toISOString(),
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(verificationResult),
    };

  } catch (error) {
    console.error('Verification error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: 'Verification failed',
        message: error.message,
      }),
    };
  }
};

/**
 * Check if a website is accessible
 */
async function checkWebsiteAccessibility(url) {
  return new Promise((resolve) => {
    try {
      // Parse URL to determine protocol
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      const protocol = urlObj.protocol === 'https:' ? https : http;

      const options = {
        method: 'HEAD',
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; AgencyVerifier/1.0)',
        },
      };

      const req = protocol.request(urlObj, options, (res) => {
        resolve({
          accessible: res.statusCode >= 200 && res.statusCode < 400,
          status: res.statusCode,
          message: `Website returned status ${res.statusCode}`,
        });
      });

      req.on('error', (error) => {
        resolve({
          accessible: false,
          status: 0,
          message: `Website not accessible: ${error.message}`,
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          accessible: false,
          status: 0,
          message: 'Website request timeout',
        });
      });

      req.end();
    } catch (error) {
      resolve({
        accessible: false,
        status: 0,
        message: `Invalid URL or connection error: ${error.message}`,
      });
    }
  });
}

/**
 * Verify agency information using Groq API with Llama 3.2 3B
 */
async function verifyWithLLM(agency, websiteCheck) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.warn('GROQ_API_KEY not set, skipping LLM verification');
    return {
      isValid: websiteCheck.accessible, // Fall back to just website check
      confidence: 0.5,
      reasoning: 'LLM verification skipped (API key not configured)',
      flags: [],
    };
  }

  // Construct verification prompt
  const prompt = `You are a business verification assistant. Analyze the following business submission for an AI services directory in Manchester, UK.

Business Information:
- Name: ${agency.name}
- Website: ${agency.website}
- Email: ${agency.email}
- Phone: ${agency.phone || 'Not provided'}
- Address: ${agency.address || 'Not provided'}
- Services: ${Array.isArray(agency.primaryFocus) ? agency.primaryFocus.join(', ') : agency.primaryFocus || 'Not provided'}
- Description: ${agency.review || 'Not provided'}

Website Check Result:
- Accessible: ${websiteCheck.accessible}
- Status: ${websiteCheck.message}

Verification Tasks:
1. Check if the business name seems legitimate (not spam, not offensive)
2. Verify the email domain matches or is related to the website domain
3. Assess if the services listed are relevant to AI/technology services
4. Check if the description seems genuine and professional
5. Look for red flags (spam, inappropriate content, unrelated services)

Respond in JSON format:
{
  "isValid": true/false,
  "confidence": 0.0-1.0,
  "reasoning": "Brief explanation of your decision",
  "flags": ["list", "of", "any", "concerns"]
}`;

  try {
    const response = await callGroqAPI(apiKey, prompt);
    return response;
  } catch (error) {
    console.error('LLM verification error:', error);
    return {
      isValid: websiteCheck.accessible,
      confidence: 0.5,
      reasoning: `LLM verification failed: ${error.message}`,
      flags: ['llm-verification-error'],
    };
  }
}

/**
 * Call Groq API
 */
async function callGroqAPI(apiKey, prompt) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'system',
          content: 'You are a business verification assistant. Always respond with valid JSON only, no markdown formatting.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.1,
      max_completion_tokens: 8192,
      top_p: 1,
      reasoning_effort: "medium",
      response_format: { type: 'json_object' }, // Ensure JSON response
    });

    const options = {
      hostname: 'api.groq.com',
      port: 443,
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(postData),
      },
      timeout: 30000,
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (response.error) {
            reject(new Error(response.error.message || 'Groq API error'));
            return;
          }

          const content = response.choices[0].message.content;
          const result = JSON.parse(content);

          resolve(result);
        } catch (error) {
          reject(new Error(`Failed to parse LLM response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Groq API request failed: ${error.message}`));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Groq API request timeout'));
    });

    req.write(postData);
    req.end();
  });
}
