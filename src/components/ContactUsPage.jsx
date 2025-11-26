import React from 'react';
import { BuildingIcon } from './IconComponents';

const ContactUsPage = ({ textConfig }) => {
  return (
    <div className="container mx-auto p-6 sm:p-8 lg:p-10 bg-white shadow-xl rounded-lg my-8">
      <div className="max-w-2xl mx-auto text-center">
        <BuildingIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          {textConfig.contactUsPage.title}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {textConfig.contactUsPage.intro}
        </p>
        
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            {textConfig.contactUsPage.howToTouch.heading}
          </h2>
          <p className="text-gray-700 mb-4">
            {textConfig.contactUsPage.howToTouch.instruction}
          </p>
          <ul className="list-disc list-inside text-left text-gray-700 mb-6 space-y-1 mx-auto max-w-md">
            {textConfig.contactUsPage.howToTouch.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="text-lg font-medium text-gray-800">
            {textConfig.contactUsPage.howToTouch.emailPrompt}
          </p>
          <a href={`mailto:${textConfig.contactUsPage.howToTouch.emailAddress}`} className="text-2xl font-bold text-blue-600 hover:text-blue-800 hover:underline break-all">
            {textConfig.contactUsPage.howToTouch.emailAddress}
          </a>
        </div>
        
        <p className="mt-8 text-gray-500">
          {textConfig.contactUsPage.footer}
        </p>
      </div>
    </div>
  );
};

export default ContactUsPage; 