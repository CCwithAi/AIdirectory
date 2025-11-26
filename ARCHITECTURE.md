# Project Architecture: AI Services Manchester Directory

## 1. Overview
This project is a single-page application (SPA) built with React and Vite, styled with Tailwind CSS. It's designed to be deployed on Vercel and embedded into a WordPress site via an iframe.

## 2. File Structure and Components

- **`public/`**: Contains static assets like `index.html` (the entry point for Vite) and any favicons or images.
- **`src/`**: Contains all the React application code.
    - **`main.jsx`**: The main entry point for the React application. It renders the root `App` component into the DOM.
    - **`App.jsx`**: The root component. It manages the current page state and renders the `Navbar` and the active page component (`DirectoryPage`, `ManchesterPage`, or `ContactUsPage`). It also includes global styles via `<style jsx global>`. Contains the main layout including header and footer.
    - **`index.css`**: Global CSS file, primarily for Tailwind CSS setup and any other global styles (like the custom scrollbar).
    - **`components/`**: Directory for all React components.
        - **`Navbar.jsx`**: Displays navigation links to switch between different pages of the application. It takes `setCurrentPage` as a prop to update the application state in `App.jsx`.
        - **`DirectoryPage.jsx`**: Displays the main agency directory. It includes:
            - A search bar to filter agencies.
            - Logic to filter agencies based on search terms.
            - Renders `AgencyCard` components for each filtered agency.
            - Handles the display of a featured agency.
        - **`AgencyCard.jsx`**: A reusable component to display information for a single agency. It receives agency data as a prop and formats it for display, including icons and contact details.
        - **`ManchesterPage.jsx`**: A static content page providing information about Manchester as an AI hub.
        - **`ContactUsPage.jsx`**: A static content page with information on how to get listed in the directory.
        - **`AgencyData.js`**: A JavaScript file exporting the `agencyData` array, which contains the raw data for all AI agencies. This is imported by `App.jsx` and passed down to `DirectoryPage.jsx`.
        - **`IconComponents.jsx`**: Contains definitions for various SVG icon components used throughout the application (e.g., `SearchIcon`, `GlobeIcon`).

## 3. Data Flow

1.  **Agency Data**: The primary data source is `agencyData` located in `src/components/AgencyData.js`. This provides the initial set of agencies. New agencies added via the "Add Listing" page are stored in `localStorage` and managed by `App.jsx`.
2.  **Text Configuration**: All display text (labels, button text, page content) is managed in `src/config/textConfig.js` and passed down as props to relevant components from `App.jsx`.
3.  **`App.jsx`**: Imports `initialAgencyData` and `textConfig`. It manages the `currentAgencies` state (persisted to `localStorage`) and the `currentPage` state. It passes `currentAgencies` and the relevant part of `textConfig` to the active page component. It also provides the `handleAddAgency` callback to `AddListingPage`.
4.  **`DirectoryPage.jsx`**: Receives `agencies` and `textConfig` props. It manages its own state for `searchTerm`, `inputValue`, and `filteredAgencies`. It filters the received `agencies` based on `searchTerm` and renders `AgencyCard` components.
5.  **`AgencyCard.jsx`**: Receives a single `agency` object and relevant `textConfig` as props and displays its details.
6.  **`ManchesterPage.jsx`, `ContactUsPage.jsx`**: Receive `textConfig` prop and display static content based on it.
7.  **`AddListingPage.jsx`**: Receives `textConfig` and `onAddAgency` props. Manages form state. On valid submission (including secret code "RegisterApples"), it calls `onAddAgency` with the new agency data.
8.  **Navigation**: `Navbar.jsx` receives `setCurrentPage`, `navItems` (from `textConfig`), and `appName` (from `textConfig`) as props. Navigation buttons call `setCurrentPage` to update the `currentPage` state in `App.jsx`.

## 4. Styling
- **Tailwind CSS**: Used for utility-first styling. Class names are applied directly in the JSX of components.
- **Global Styles**: Some global styles (e.g., custom scrollbar, Prose defaults) are defined in `App.jsx` using `<style jsx global>` and in `index.css`.

## 5. Key Dependencies
- **`react`**: Core React library.
- **`react-dom`**: For rendering React components in the browser.
- **`vite`**: Build tool and development server.
- **`tailwindcss`**: Utility-first CSS framework.
- **`autoprefixer`**: PostCSS plugin to parse CSS and add vendor prefixes.
- **`postcss`**: Tool for transforming CSS with JavaScript.

## 6. Deployment (Vercel)
- A `vercel.json` file will be configured to tell Vercel how to build and deploy the Vite project.
- Typically, this involves specifying the build command (e.g., `npm run build` or `yarn build`) and the output directory (e.g., `dist`).
- **Shift to single `index.html` for Netlify:** Due to persistent Vite dev server issues, the project pivoted to a single `index.html` file in the root directory for deployment. This file embeds all HTML, CSS (CDN/inline), and JavaScript (React components transpiled with Babel).
- A `netlify.toml` file is configured for deploying this static `index.html` from the project root.

## 7. WordPress Integration
- The application is self-contained and will be hosted on Vercel. WordPress will simply embed the Vercel URL using an iframe.
- No direct code integration or dependency between WordPress and the React app, other than the iframe itself.

## 8. Configurable Text
- All UI text (button labels, headers, informational content, form labels, etc.) is now centralized in `src/config/textConfig.js`.
- Components receive the necessary text snippets as props from `App.jsx`.
- The `agencyData` in `src/components/AgencyData.js` serves as the initial configuration for agency listings. New listings are added to a state in `App.jsx` which is persisted to `localStorage`.

## 9. Add Listing Feature
- A new page `AddListingPage.jsx` allows users to submit new agency information.
- Submission requires a secret code ("RegisterApples") which is validated client-side.
- New listings are added to the `currentAgencies` state in `App.jsx` and persisted in `localStorage`.
- They appear in the directory immediately but are not marked as featured.

*This document will be updated as the project evolves.* 