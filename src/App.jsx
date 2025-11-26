import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DirectoryPage from './components/DirectoryPage';
import ManchesterPage from './components/ManchesterPage';
import ContactUsPage from './components/ContactUsPage';
import AddListingPage from './components/AddListingPage';
import { textConfig } from './config/textConfig';

function App() {
  const [currentPage, setCurrentPage] = useState('directory');
  const [currentAgencies, setCurrentAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch agencies from Netlify Function on mount
  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/.netlify/functions/get-agencies');

      if (!response.ok) {
        throw new Error(`Failed to fetch agencies: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.agencies) {
        setCurrentAgencies(data.agencies);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching agencies:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAgency = async (agencyData) => {
    try {
      const response = await fetch('/.netlify/functions/add-agency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agency: agencyData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Return error details for the form to display
        throw new Error(result.message || result.error || 'Submission failed');
      }

      if (result.success) {
        // Refresh the agencies list
        await fetchAgencies();
        setCurrentPage('directory');
        return { success: true, message: 'Agency added successfully!' };
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (err) {
      console.error('Error adding agency:', err);
      throw err; // Re-throw so the form can handle it
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'directory':
        return <DirectoryPage agencies={currentAgencies} isLoading={isLoading} error={error} textConfig={textConfig} />;
      case 'manchester':
        return <ManchesterPage textConfig={textConfig} />;
      case 'contact':
        return <ContactUsPage textConfig={textConfig} />;
      case 'addListing':
        return <AddListingPage textConfig={textConfig} onAddAgency={handleAddAgency} />;
      default:
        return <DirectoryPage agencies={currentAgencies} isLoading={isLoading} error={error} textConfig={textConfig} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar 
        setCurrentPage={setCurrentPage} 
        navItems={textConfig.navbar.navItems} 
        appName={textConfig.navbar.appName} 
      />
      <main>
        {renderPage()}
      </main>
      <footer className="bg-gray-800 text-white text-center p-6 mt-12">
        <p>{textConfig.footer.copyright.replace('{year}', new Date().getFullYear())}</p>
        <p className="text-sm text-gray-400 mt-1">{textConfig.footer.tagline}</p>
      </footer>
      {/* Global styles from original HTML are now in index.css or handled by Tailwind */}
    </div>
  );
}

export default App; 