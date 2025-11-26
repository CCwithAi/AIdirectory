import React from 'react';
import { GlobeIcon, PhoneIcon, MailIcon, MapPinIcon, StarIcon } from './IconComponents';

const AgencyCard = ({ agency, textConfig }) => {
  const { name, website, phone, email, address, primaryFocus, review, logoChar, isFeatured } = agency;

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col h-full ${isFeatured ? 'border-4 border-yellow-400' : 'border border-gray-200'}`}>
      {isFeatured && (
        <div className="bg-yellow-400 text-black text-center py-2 font-semibold flex items-center justify-center">
          <StarIcon filled={true} /> <span className="mx-1">{textConfig.featuredAgencyText}</span> <StarIcon filled={true} />
        </div>
      )}
      <div className="p-6 flex-grow">
        <div className="flex items-start mb-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-2xl font-bold mr-4`}>
            {logoChar || name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
            {address && (
              <p className="text-xs text-gray-500 flex items-center">
                <MapPinIcon className="w-3 h-3 mr-1 flex-shrink-0" /> {address}
              </p>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 h-24 overflow-y-auto custom-scrollbar">{review}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold text-sm text-gray-700 mb-1">{textConfig.primaryFocusLabel}</h4>
          <div className="flex flex-wrap gap-1">
            {primaryFocus.map((focus, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full font-medium">
                {focus}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pt-2 pb-4 bg-gray-50 border-t border-gray-200">
        {website && (
          <a
            href={website.startsWith('http') ? website : `https://${website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 hover:underline text-sm mb-2 transition-colors duration-200"
          >
            <GlobeIcon className="w-4 h-4 mr-2 flex-shrink-0" /> {textConfig.visitWebsiteButton}
          </a>
        )}
        {phone && phone !== 'N/A (Contact via website)' && phone !== 'N/A (Contact via email)' && phone !== 'N/A (Contact via website/phone)' && (
          <p className="flex items-center text-gray-700 text-sm mb-2">
            <PhoneIcon className="w-4 h-4 mr-2 flex-shrink-0" /> {phone}
          </p>
        )}
         {email && email !== 'N/A (Contact via website)' && email !== 'N/A (Contact via website/phone)' && (
          <p className="flex items-center text-gray-700 text-sm">
            <MailIcon className="w-4 h-4 mr-2 flex-shrink-0" /> {email}
          </p>
        )}
      </div>
    </div>
  );
};

export default AgencyCard; 