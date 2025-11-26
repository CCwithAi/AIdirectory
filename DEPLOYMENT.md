# Deployment Guide

This guide will help you deploy the AI Services Manchester Directory to Netlify with LLM-powered verification.

## 🎯 Overview

The application uses:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Netlify Functions (serverless)
- **Storage**: JSON file in the repository
- **AI Verification**: Groq API with Llama 3.2 3B model

## 📋 Prerequisites

1. A [Netlify](https://www.netlify.com/) account
2. A [Groq API key](https://console.groq.com/) (free tier available)
3. Node.js installed locally (for development)

## 🚀 Deployment Steps

### 1. Get Your Groq API Key

1. Go to [Groq Console](https://console.groq.com/)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key (you'll need it for step 4)

### 2. Deploy to Netlify

#### Option A: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy (will create a new site)
netlify deploy --prod
```

#### Option B: Deploy via Netlify UI

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`

### 3. Configure Environment Variables

In Netlify Dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add the following variable:
   - **Key**: `GROQ_API_KEY`
   - **Value**: Your Groq API key from step 1

### 4. Deploy

Click "Deploy site" or push to your repository. Netlify will automatically:
1. Install dependencies
2. Build the React app with Vite
3. Deploy the static files
4. Set up serverless functions

## 🧪 Testing

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test Netlify functions locally
netlify dev
```

### Test the Verification

1. Go to the "Add Listing" page
2. Fill out the form with valid business information
3. Submit and watch the AI verification process
4. Check Netlify Function logs for verification details

## 🔒 Security Features

### No API Keys in Frontend
- ✅ All API keys are stored as Netlify environment variables
- ✅ LLM verification runs server-side only
- ✅ No secret codes exposed to users

### AI Verification Checks
1. **Website Accessibility**: Verifies the submitted website is live and accessible
2. **Email Domain Matching**: Checks email domain relates to website
3. **Service Relevance**: Validates services are AI/tech related
4. **Spam Detection**: Filters out spam and inappropriate content
5. **Confidence Scoring**: Requires 70%+ confidence to approve

## 📁 File Structure

```
.
├── src/                    # React application source
│   ├── components/         # React components
│   ├── config/            # Configuration files
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── netlify/
│   └── functions/         # Serverless functions
│       ├── get-agencies.js      # Fetch agencies
│       ├── add-agency.js        # Add agency (with verification)
│       └── verify-agency.js     # LLM verification logic
├── data/
│   └── agencies.json      # Agency data storage
├── dist/                  # Build output (auto-generated)
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS config
└── netlify.toml          # Netlify configuration
```

## 🔧 Troubleshooting

### Functions Not Working

1. Check environment variables are set in Netlify
2. Check function logs: Site → Functions → Select function → Logs
3. Verify `netlify.toml` has correct functions directory

### Groq API Errors

1. Verify API key is valid
2. Check you haven't exceeded rate limits
3. Review function logs for specific error messages

### Build Failures

```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

## 📊 Monitoring

- **Netlify Dashboard**: Monitor deployments and function invocations
- **Function Logs**: Check verification results and errors
- **Analytics**: View site traffic and form submissions

## 🎨 Customization

### Update Text Content
Edit `src/config/textConfig.js`

### Modify Verification Logic
Edit `netlify/functions/verify-agency.js`

### Change Confidence Threshold
In `netlify/functions/add-agency.js`, line 64:
```javascript
if (verification.checks.llmVerification.confidence < 0.7) {
  // Change 0.7 to your desired threshold
}
```

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | ✅ Yes | Groq API key for LLM verification |

## 🚨 Important Notes

1. **Data Persistence**: The `data/agencies.json` file is modified by Netlify Functions. Consider implementing a database for production at scale.

2. **Rate Limits**: Groq free tier has rate limits. Monitor usage in Groq dashboard.

3. **Backups**: Regularly backup your `data/agencies.json` file.

## 🆘 Support

- Groq API Docs: https://console.groq.com/docs
- Netlify Docs: https://docs.netlify.com/
- Vite Docs: https://vitejs.dev/
