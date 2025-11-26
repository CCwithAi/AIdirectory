import React, { useState, useEffect, useCallback } from 'react';
import AgencyCard from './AgencyCard';
import { SearchIcon } from './IconComponents';

const DirectoryPage = ({ agencies, isLoading, error, textConfig }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [filteredAgencies, setFilteredAgencies] = useState([]);

  const filterAgenciesCallback = useCallback((currentSearchTerm) => {
    if (!agencies) {
        setFilteredAgencies([]);
        return;
    }
    const featured = agencies.find(a => a.isFeatured);
    const others = agencies.filter(a => !a.isFeatured);
    
    let results = others;
    if (currentSearchTerm) {
        results = others.filter(agency =>
            agency.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            (agency.primaryFocus && agency.primaryFocus.some(focus => focus.toLowerCase().includes(currentSearchTerm.toLowerCase()))) ||
            (agency.review && agency.review.toLowerCase().includes(currentSearchTerm.toLowerCase()))
        );
    }
    
    let finalResults = [];
    if (featured) {
        const featuredMatches = currentSearchTerm === '' || 
            featured.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            (featured.primaryFocus && featured.primaryFocus.some(focus => focus.toLowerCase().includes(currentSearchTerm.toLowerCase()))) ||
            (featured.review && featured.review.toLowerCase().includes(currentSearchTerm.toLowerCase()));

        if (featuredMatches) {
            finalResults = [featured, ...results.filter(a => a.id !== featured.id)];
        } else {
            finalResults = currentSearchTerm === '' ? [featured, ...results] : results;
        }
    } else {
        finalResults = results;
    }
    setFilteredAgencies(finalResults);

  }, [agencies]);

  useEffect(() => {
    filterAgenciesCallback(searchTerm);
  }, [searchTerm, filterAgenciesCallback]);

 useEffect(() => {
    if (agencies && agencies.length > 0) {
        const featured = agencies.find(a => a.isFeatured);
        const others = agencies.filter(a => !a.isFeatured);
        if (featured) {
            setFilteredAgencies([featured, ...others]);
        } else {
            setFilteredAgencies(others);
        }
    } else {
        setFilteredAgencies([]);
    }
  }, [agencies]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
  };
  
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{textConfig.directoryPage.title}</h1>
        <p className="text-gray-600 text-lg">{textConfig.directoryPage.subtitle}</p>
      </div>

      <form onSubmit={handleSearchSubmit} className="mb-8 sticky-search bg-white dark:bg-gray-800 py-4 z-10 shadow rounded-lg">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder={textConfig.directoryPage.searchPlaceholder}
            className="w-full p-4 pl-12 pr-28 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow bg-white dark:bg-gray-700"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-r-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 h-full"
          >
            {textConfig.directoryPage.searchButton}
          </button>
        </div>
      </form>

      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">{textConfig.directoryPage.loading}</p>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-600 text-xl">⚠️ Error loading agencies</p>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      ) : filteredAgencies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgencies.map(agency => (
            <AgencyCard key={agency.id} agency={agency} textConfig={textConfig.agencyCard} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl py-10">
          {textConfig.directoryPage.noResults}
        </p>
      )}
    </div>
  );
};

export default DirectoryPage; 