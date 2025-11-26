# AI Services Manchester Directory

A modern, AI-powered directory of AI agencies and service providers in Manchester, UK. Features automated verification using Llama 3.2 3B via Groq API.

## ✨ Features

- 🤖 **AI-Powered Verification**: Automatic validation of business submissions using LLM
- 🔒 **Secure**: No API keys in frontend, all verification server-side
- ⚡ **Fast**: Built with Vite + React, deployed on Netlify
- 🎨 **Modern UI**: Tailwind CSS with responsive design
- 🔍 **Smart Search**: Filter agencies by name, services, or keywords
- 📱 **Mobile-Friendly**: Fully responsive design

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Deploy to Netlify

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick deploy:**

1. Get a [Groq API key](https://console.groq.com/)
2. Deploy to Netlify (connects to Git)
3. Set `GROQ_API_KEY` environment variable in Netlify
4. Done! 🎉

## 🧠 How AI Verification Works

When someone submits their business to the directory:

1. **Website Check**: Verifies the website is accessible and returns 200 OK
2. **LLM Analysis**: Llama 3.2 3B analyzes:
   - Business name legitimacy
   - Email domain matching website
   - Service relevance to AI/tech
   - Professional description quality
   - Spam/fraud indicators
3. **Confidence Score**: Requires ≥70% confidence to approve
4. **Auto-Approval**: Valid submissions are automatically added

## 📁 Project Structure

```
├── src/
│   ├── components/         # React components
│   │   ├── AddListingPage.jsx
│   │   ├── DirectoryPage.jsx
│   │   └── ...
│   ├── config/
│   │   └── textConfig.js   # All UI text/content
│   ├── App.jsx
│   └── main.jsx
├── netlify/functions/      # Serverless API
│   ├── verify-agency.js    # LLM verification
│   ├── add-agency.js       # Add with verification
│   └── get-agencies.js     # Fetch agencies
└── data/
    └── agencies.json       # Data storage
```

## 🔧 Configuration

### Environment Variables

Create `.env` file (see `.env.example`):

```env
GROQ_API_KEY=your_groq_api_key_here
```

### Text Content

Edit `src/config/textConfig.js` to customize all text content.

### Verification Settings

Adjust in `netlify/functions/add-agency.js`:
- Confidence threshold (line 64)
- Verification checks

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 4, Tailwind CSS 3
- **Backend**: Netlify Functions (Node.js)
- **AI**: Groq API (Llama 3.2 3B)
- **Deployment**: Netlify
- **Storage**: JSON file (consider DB for scale)

## 🎯 Roadmap

- [ ] Admin dashboard for manual review
- [ ] Database integration (Supabase/MongoDB)
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Featured listing upgrades
- [ ] User accounts

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Groq for fast LLM inference
- Netlify for hosting and functions
- Manchester's vibrant AI community

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for Manchester's AI community**
