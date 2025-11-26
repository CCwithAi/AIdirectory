import React from 'react';

const ManchesterPage = ({ textConfig }) => {
  return (
    <div className="container mx-auto p-6 sm:p-8 lg:p-10 bg-white shadow-xl rounded-lg my-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
        {textConfig.manchesterPage.title}
      </h1>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="lead text-xl text-gray-600 mb-6">
          {textConfig.manchesterPage.intro}
        </p>

        <section className="mb-8 p-6 bg-blue-50 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            {textConfig.manchesterPage.strengths.heading}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {textConfig.manchesterPage.strengths.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <p>
          {textConfig.manchesterPage.confluenceText}
        </p>
        <p>
          {textConfig.manchesterPage.automationConcept}
        </p>

        <section className="my-8 p-6 bg-purple-50 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">
            {textConfig.manchesterPage.outlook.heading}
          </h2>
          <p>
            {textConfig.manchesterPage.outlook.p1}
          </p>
          <p>
            {textConfig.manchesterPage.outlook.p2}
          </p>
          <p>
            {textConfig.manchesterPage.outlook.p3}
          </p>
          <p>
            {textConfig.manchesterPage.outlook.p4}
          </p>
        </section>
        
        <p className="mt-8 text-center text-lg font-medium text-gray-800">
          {textConfig.manchesterPage.conclusion}
        </p>
      </div>
    </div>
  );
};

export default ManchesterPage; 