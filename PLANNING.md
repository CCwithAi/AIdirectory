# Project Planning: AI Services Manchester Directory

## 1. Project Goal
Create a React-based web application to display a directory of AI service providers in Manchester. The application should be deployable to Vercel and suitable for embedding in a WordPress iframe.

## 2. Core Features
- Display a filterable list of AI agencies.
- Show detailed information for each agency.
- Include informational pages about Manchester's AI scene and a contact page.
- Responsive design.
- ALL text must be easy to modify from a central config file (`src/config/textConfig.js`).
- Allow users to add new listings via a form protected by a secret code ("RegisterApples"). New listings are persisted in `localStorage`.

## 3. Tech Stack
- **Frontend:** React (with Vite for tooling)
- **Styling:** Tailwind CSS (based on className usage in the provided code)
- **Deployment:** Vercel

## 4. Project Structure
```
/
├── public/
│   └── index.html
│   └── (other static assets like favicons)
├── src/
│   ├── components/
│   │   ├── AgencyCard.jsx
│   │   ├── AgencyData.js
│   │   ├── ContactUsPage.jsx
│   │   ├── DirectoryPage.jsx
│   │   ├── IconComponents.jsx
│   │   ├── ManchesterPage.jsx
│   │   └── Navbar.jsx
│   ├── App.jsx
│   ├── index.css  (for global styles and Tailwind)
│   └── main.jsx   (React entry point)
├── .gitignore
├── ARCHITECTURE.md
├── package.json
├── PLANNING.md
├── README.md
├── TASK.md
└── vercel.json
```

## 5. Style and Conventions
- Python is not the primary language for this frontend project; React/JavaScript is.
- Follow standard React best practices.
- Use functional components with hooks.
- Naming conventions: PascalCase for components, camelCase for functions/variables.

## 6. Deployment
- Configure Vercel for a Vite-based React project.
- Ensure build process is smooth.

## 7. WordPress Integration
- The application should be designed to work well within an iframe.
- Consider potential styling conflicts or limitations if any. (Likely minimal with Vercel deployment).

## 8. Implementation Notes (New Section)
- **Text Configuration**: All user-facing text is managed via `src/config/textConfig.js` to simplify updates and potential future internationalization.
- **Dynamic Data**: Initial agency data is loaded from `src/components/AgencyData.js`. New listings submitted through the "Add Listing" page are stored in the browser's `localStorage` to persist them across sessions for the user who added them. This is a client-side solution; a backend would be needed for shared, persistent storage across all users.
- **Secret Code**: The "Add Listing" feature is protected by a hardcoded client-side secret code. This is a basic protection and not suitable for high-security scenarios. 