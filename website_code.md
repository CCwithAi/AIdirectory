<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Services Manchester Directory</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            margin: 0; /* Remove default body margin */
            background-color: #f3f4f6; /* Default bg-gray-100 */
        }
        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; /* A light grey track */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888; /* A darker grey thumb */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555; /* Darken thumb on hover */
        }
        /* Tailwind prose overrides for consistent styling if prose classes are used extensively */
        .prose strong { color: inherit; }
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 { color: inherit; }

        /* Ensure sticky navbar works correctly within an iframe or embedded context */
        .sticky-navbar {
            position: -webkit-sticky; /* For Safari */
            position: sticky;
            top: 0;
            z-index: 50;
        }
        .sticky-search {
            position: -webkit-sticky; /* For Safari */
            position: sticky;
            top: 70px; /* Adjust based on navbar height, assuming navbar is around 68px + padding */
            z-index: 40; /* Lower than navbar */
        }
        /* Basic styling for the root div if needed, though Tailwind should handle most */
        #root {
            min-height: 100vh;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        // --- React, useState, useEffect, useCallback ---
        // These are available globally from the CDN scripts loaded in <head>
        const { useState, useEffect, useCallback } = React;

        // --- Icon Components (using inline SVGs for simplicity) ---
        const SearchIcon = () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        );

        const GlobeIcon = () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        );

        const PhoneIcon = () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        );

        const MailIcon = () => (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
        );

        const MapPinIcon = () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );

        const BuildingIcon = () => (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building">
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
            </svg>
        );

        const StarIcon = ({ filled = false }) => (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
                 fill={filled ? "currentColor" : "none"} 
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                 className={`lucide lucide-star ${filled ? 'text-yellow-400' : 'text-gray-300'}`}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
        );


        // --- Agency Data (UK English spellings) ---
        const agencyData = [
          {
            id: 'ccwithai',
            name: 'CCwithAI.com',
            website: 'https://ccwithai.com',
            phone: 'N/A (Please visit website)',
            email: 'info@ccwithai.com', // Placeholder
            address: 'Manchester, UK (Leading AI Innovators)',
            primaryFocus: ['AI Strategy', 'Custom AI Solutions', 'AI Automation', 'Manchester AI Leadership'],
            review: 'Recognised as Manchester\'s number 1 AI agency, CCwithAI.com leads the charge in innovative AI solutions and strategic implementation. They are dedicated to empowering businesses with cutting-edge artificial intelligence and automation, driving growth and efficiency in the Manchester tech ecosystem.',
            isFeatured: true,
            logoChar: 'C',
          },
          {
            id: 'ai-superior',
            name: 'AI Superior',
            website: 'aisuperior.com',
            phone: '+49 6151 3943489',
            email: 'info@aisuperior.com',
            address: 'Serves Manchester (German HQ: Robert-Bosch-Str.7, 64293 Darmstadt)',
            primaryFocus: ['AI Consulting', 'Custom AI Dev', 'Generative AI', 'GeoAI'],
            review: 'German-based AI Superior offers a comprehensive suite of AI services, focusing on building award-winning AI solutions for finance, government, and tech start-ups. They emphasise a structured approach from discovery to scaling AI implementations.',
            logoChar: 'A',
          },
          {
            id: 'arrk-group',
            name: 'Arrk Group',
            website: 'arrkgroup.com',
            phone: '+44 161 227 9900',
            email: 'talktous@arrkgroup.com',
            address: 'Manchester Office: Colony Jactin House, Suite 1.04, 24 Hood Street, M4 6WX',
            primaryFocus: ['AI Consulting', 'Custom AI Dev', 'AI Automation', 'Data Analytics'],
            review: 'Arrk Group boasts a 5.0/5.0 Clutch rating for AI integration and data processing. Clients praise their ability to reduce manual entry, improve accuracy significantly, and their transparent, collaborative approach, often considering them an extended part of their team.',
            logoChar: 'A',
          },
          {
            id: 'nucleus-ai',
            name: '@NUCLEUS.AI LIMITED (Nucleus AI)',
            website: 'www.atnucleus.ai',
            phone: '+44 777 0926 999',
            email: 'N/A (Contact via website or phone)',
            address: 'Manchester Office: 12th Floor, Arrive, Blue Tower, MediaCityUK, M50 2ST',
            primaryFocus: ['AI Consulting', 'Custom AI Dev (Sector Specific)', 'Healthcare AI', 'Legal AI'],
            review: 'Nucleus AI at MediaCityUK focuses on practical, scalable AI applications, particularly known for their AI Matron in healthcare, Park & Charge for EV, and AI Solicitor for legal workflow automation. It\'s important to distinguish this consultancy from other software products with similar names.',
            logoChar: 'N',
          },
          {
            id: 'avkalan',
            name: 'AVKALAN',
            website: 'avkalan.ai',
            phone: 'N/A (Contact via website)',
            email: 'careers@avkalan.ai', // Note: This is a careers email
            address: 'Serves Manchester (London HQ: 70 Liberty Court, 13 Regal Walk, Bexleyheath, DA6 7BL)',
            primaryFocus: ['AI Consulting', 'Data Strategy', 'Generative AI', 'Agentic AI'],
            review: 'AVKALAN receives positive G2 reviews for professionalism and in-depth knowledge in AI solution building using LLMs, ML, and Gen-AI. They aim to turn data and ideas into practical, intelligent applications with a focus on clear guidance and lasting impact.',
            logoChar: 'A',
          },
          {
            id: 'softblues',
            name: 'Softblues',
            website: 'softblues.io',
            phone: '+44 7400 989780',
            email: 'info@softblues.io',
            address: 'Serves Manchester (UK contact available)',
            primaryFocus: ['Custom AI Dev', 'Generative AI', 'AI Consulting', 'NLP'],
            review: 'Softblues holds a stellar 5.0-star rating from 30 Clutch reviews. Clients highlight their competitive pricing, timely delivery, responsive communication, and proficiency in AI, particularly for healthcare, finance, and retail sectors, having completed over 150 AI projects.',
            logoChar: 'S',
          },
          {
            id: 'tovie-ai',
            name: 'Tovie AI',
            website: 'tovie.ai',
            phone: '+44 20 4577 1007',
            email: 'contact@tovie.ai',
            address: 'Serves Manchester (London HQ: 128 City Road, EC1V 2NX)',
            primaryFocus: ['Generative AI', 'Conversational AI', 'AI Strategy', 'LLM Solutions'],
            review: 'Tovie AI specialises in streamlining Generative AI adoption. Testimonials praise their engaging chatbots, valuable insights, and positive impact on user experience. They are an IBM partner, validated on IBM Cloud for Financial Services.',
            logoChar: 'T',
          },
          {
            id: 'jreece-digital',
            name: 'JReece Digital',
            website: 'jreecedigital.com',
            phone: 'N/A (Contact via website)',
            email: 'contact@jreecedigital.com',
            address: 'Serves Manchester (Birmingham based)',
            primaryFocus: ['AI Marketing Consulting', 'AI Content Creation', 'Predictive Analytics'],
            review: 'JReece Digital focuses on practical AI solutions for marketing, particularly in financial services, law, and local government. They offer complimentary marketing audits and consultations to help businesses leverage AI for campaign optimisation and personalisation.',
            logoChar: 'J',
          },
          {
            id: 'ayadata',
            name: 'Ayadata',
            website: 'ayadata.ai',
            phone: '+44-33-377-21194',
            email: 'info@ayadata.ai',
            address: 'Serves Manchester (Global Ops; London/US addresses)',
            primaryFocus: ['AI Consulting', 'Custom AI Dev', 'Data Annotation', 'Generative AI'],
            review: 'Ayadata creates customised AI solutions to optimise operations and enhance decision-making, emphasising data analytics and machine learning with an agile approach. They cater to a global clientele, including businesses in Manchester.',
            logoChar: 'A',
          },
          {
            id: 'peak',
            name: 'Peak',
            website: 'peak.ai',
            phone: 'N/A (Contact via website)',
            email: 'N/A (Contact via website)',
            address: 'Manchester HQ: Hyphen, 75 Mosley Street, M2 3HR',
            primaryFocus: ['AI SaaS (Decision Intelligence)', 'AI Consulting', 'Hyper-personalisation'],
            review: 'Peak is a major Manchester-based AI company providing a Decision Intelligence platform used by global brands like Nike and ASOS. AWS Marketplace reviews praise their talented team and ability to handle complex data, though a learning curve for specific business alignment is sometimes noted.',
            logoChar: 'P',
          },
          {
            id: 'mindtrace',
            name: 'Mindtrace',
            website: 'mindtrace.ai',
            phone: '+44 (0)333 358 3708',
            email: 'info@mindtrace.ai',
            address: 'Manchester Office: 3 The Parsonage, M3 2HW',
            primaryFocus: ['Custom AI Dev (Visual AI, Edge AI)', 'Defect Detection', 'Asset Inspection'],
            review: 'Manchester-based Mindtrace specialises in brain-inspired AI solutions (Brain-Sense™ framework) for industrial applications like defect detection and asset inspection, using unsupervised few-shot learning. They are recognised as a top Manchester tech start-up.',
            logoChar: 'M',
          },
          {
            id: 'biorelate',
            name: 'Biorelate',
            website: 'biorelate.com',
            phone: 'N/A (Contact via email)',
            email: 'info@biorelate.com',
            address: 'Manchester Office: Williams House, Lloyd St N, M15 6SX',
            primaryFocus: ['Custom AI Dev (Biomedical AI SaaS)', 'Drug Discovery', 'Knowledge Graphs'],
            review: 'Biorelate\'s Galactic AI™ platform automates biomedical research for drug discovery, used by global companies like Pfizer and AstraZeneca. Testimonials highlight its ability to find novel connections and hidden insights, with excellent customer service.',
            logoChar: 'B',
          },
          {
            id: 'darktrace',
            name: 'Darktrace',
            website: 'darktrace.com',
            phone: '+44 (0) 1223 394100 (Cambridge HQ)',
            email: 'sales@darktrace.com',
            address: 'Serves Manchester (Cambridge HQ)',
            primaryFocus: ['Cybersecurity AI (SaaS & Services)', 'Threat Detection', 'Self-Learning AI'],
            review: 'Darktrace is a world-leading AI company for cybersecurity. Gartner Peer Insights show a 4.6/5 rating, praising its real-time threat detection, responsive support, and the AI\'s ability to rapidly block attacks. It uses self-learning AI for comprehensive security.',
            logoChar: 'D',
          },
          {
            id: 'bjss',
            name: 'BJSS',
            website: 'bjss.com',
            phone: '+44 161 513 0000',
            email: 'N/A (Contact via website/phone)',
            address: 'Manchester Office: Union, Albert Square, M2 6LW',
            primaryFocus: ['IT & Business Consultancy', 'AI Services', 'Enterprise Agile'],
            review: 'BJSS is a leading UK IT and Business Consultancy with a strong Manchester presence and significant AI practice. Clutch reviews give them 4.5 stars, praising honesty and transparency. They have delivered major public sector projects, including re-engineering the NHS legacy Spine.',
            logoChar: 'B',
          },
          {
            id: 'imobisoft',
            name: 'Imobisoft',
            website: 'imobisoft.co.uk',
            phone: '024 7615 8240',
            email: 'info@imobisoft.co.uk',
            address: 'Serves Manchester (Coventry based)',
            primaryFocus: ['Custom AI Dev', 'AI Consulting', 'Generative AI', 'LLM Development'],
            review: 'Imobisoft holds a strong 4.8-star Clutch rating. Clients are highly satisfied with their design, app development, and ability to meet deadlines. They are praised for quality work, reliability, ethical practices, and responsiveness in AI and software projects.',
            logoChar: 'I',
          },
          {
            id: 'digica',
            name: 'Digica',
            website: 'digica.com',
            phone: '+44 (0) 208 126 1156',
            email: 'hello@digica.com',
            address: 'Manchester Office: Office NN, The ClassRooms, Stanley Square, Sale, M33 7ZZ',
            primaryFocus: ['Custom AI Dev', 'AI Advisory', 'Computer Vision', 'NLP'],
            review: 'Digica has a 4.8-star Clutch rating, commended for exceptional communication, flexibility, and effective project management. With over 90 data scientists and engineers, they have delivered over 250 AI software projects, including solutions for Enlitic and Just Helping.',
            logoChar: 'D',
          },
           {
            id: 'phaedra-solutions',
            name: 'Phaedra Solutions',
            website: 'phaedrasolutions.com',
            phone: 'N/A (Contact via website)',
            email: 'hello@phaedrasolutions.com',
            address: 'Serves Manchester (UK Office: Dalmeny Ave, Huddersfield, HD4 5NN)',
            primaryFocus: ['Custom AI Dev', 'AI Consulting', 'Generative AI', 'Workflow Automation'],
            review: 'Phaedra Solutions has a 4.9-star Clutch rating. Clients appreciate their competitive pricing, timely delivery, and commitment to success. They excel in project management and delivering creative, flexible AI solutions for start-ups, scale-ups, and enterprises.',
            logoChar: 'P',
          },
          {
            id: 'appinventiv',
            name: 'Appinventiv',
            website: 'appinventiv.com',
            phone: 'N/A (Contact via website)',
            email: 'N/A (Contact via website)',
            address: 'Serves Manchester (Global Offices)',
            primaryFocus: ['Custom AI Dev', 'Mobile App Development', 'Web Development'],
            review: 'Appinventiv boasts a 4.7-star Clutch rating from 88 reviews. Clients praise their high-quality work, effective project management, and ability to understand needs. They offer cost-effective AI development as part of broader software solutions.',
            logoChar: 'A',
          },
          {
            id: 'cubix',
            name: 'Cubix',
            website: 'cubix.co',
            phone: 'N/A (Contact via website)',
            email: 'N/A (Contact via website)',
            address: 'Serves Manchester (Global Offices)',
            primaryFocus: ['Custom AI Dev', 'Game Development', 'Blockchain'],
            review: 'Cubix holds a 4.8-star Clutch rating. DesignRush reviews highlight their professionalism and capability to develop high-quality solutions quickly. They offer AI development alongside mobile app, game, and enterprise software services.',
            logoChar: 'C',
          },
          {
            id: 'codearrest',
            name: 'CodeArrest Softwares Private Ltd.',
            website: 'codearrest.com',
            phone: '+44 7436976632',
            email: 'N/A (Contact via website/phone)',
            address: 'Manchester Office: 39 Lytton Avenue, M8 0SQ',
            primaryFocus: ['Custom AI Dev', 'AI Integration', 'Machine Learning'],
            review: 'CodeArrest has a Manchester office and focuses on AI-powered software development and ML. A positive Clutch review notes on-time, within-budget delivery and a collaborative team for a government services project. They aim to build smart, scalable AI applications.',
            logoChar: 'C',
          },
          {
            id: 'transparity',
            name: 'Transparity',
            website: 'transparity.com',
            phone: '01202 800000',
            email: 'N/A (Contact via website/phone)',
            address: 'Serves Manchester (UK based)',
            primaryFocus: ['AI Consulting (Microsoft Focus)', 'AI Solutions', 'Azure OpenAI'],
            review: 'Transparity is a highly accredited Microsoft Partner. Clutch reviews are overwhelmingly positive, highlighting professionalism, timely delivery, expertise, and knowledge sharing. They specialise in Microsoft AI solutions, including Copilot and Azure OpenAI.',
            logoChar: 'T',
          },
          {
            id: 'gcdtech',
            name: 'GCD (GCDtech)',
            website: 'gcdtech.com',
            phone: '028 3834 1205 (NI)',
            email: 'N/A (Contact via website/phone)',
            address: 'Serves Manchester (NI based: 259 Lough Road, Lurgan, BT66 6NQ)',
            primaryFocus: ['Custom AI Dev', 'AI Consulting', 'AI Product Development'],
            review: 'GCDtech has a 4.9-star Clutch rating. Reviews praise their proactive engagement, customer-centric approach, and expertise in website and mobile app development, with AI development as part of their service offering.',
            logoChar: 'G',
          },
          {
            id: 'x-byte',
            name: 'X-Byte Enterprise Solutions',
            website: 'xbytesolutions.com',
            phone: '+44 345 8988280',
            email: 'sales@xbytesolutions.com',
            address: 'Manchester Office: Towers Business Park, Didsbury, M20 2YY',
            primaryFocus: ['Custom AI Dev', 'AI Consulting', 'AIaaS', 'Generative AI'],
            review: 'X-Byte positions itself as a top AI development provider with a Manchester office. They support businesses with AI audits, process re-engineering, Generative AI (GPT-4, Midjourney), smart chatbots, and AI-as-a-Service, aiming to maximise ROI.',
            logoChar: 'X',
          },
          {
            id: 'data-science-ua',
            name: 'Data Science UA',
            website: 'data-science-ua.com',
            phone: 'N/A (Contact via website)',
            email: 'N/A (Contact via website)',
            address: 'Serves Manchester (Ukraine based)',
            primaryFocus: ['Custom AI Dev', 'AI Consulting', 'Data Annotation', 'ML Model Development'],
            review: 'Data Science UA holds a 4.9-star Clutch rating. Clients praise their actionable AI solutions, expert hiring, delivery speed, and transparent collaboration. They offer bespoke AI strategies, R&D, and ML model development on platforms like AWS.',
            logoChar: 'D',
          },
          {
            id: 'zfort-group',
            name: 'Zfort Group',
            website: 'zfort.com',
            phone: '+33 970445933 (24-hour support)',
            email: 'contact@zfort.com',
            address: 'Serves Manchester (Ukraine HQ)',
            primaryFocus: ['Custom AI Dev', 'AI Consulting', 'LLM Development', 'Chatbot Development'],
            review: 'Zfort Group has over 20 years in software development, with 105+ AI projects. They emphasise long-term relationships and high-quality project delivery, offering AI consulting, LLM development, ML solutions, and business intelligence.',
            logoChar: 'Z',
          },
          {
            id: 'sas',
            name: 'SAS',
            website: 'sas.com/en_gb/',
            phone: 'N/A (Contact via website)',
            email: 'N/A (Contact via website)',
            address: 'Serves Manchester (Global, significant UK presence)',
            primaryFocus: ['AI SaaS (Enterprise Solutions)', 'Data Analytics', 'Fraud Detection', 'IoT Analytics'],
            review: 'SAS is a global leader in data and AI, known for its Viya Platform. Their AI Cities Index highlights Manchester\'s AI readiness. They offer enterprise AI solutions for fraud detection, marketing, risk management, and more, available as SaaS.',
            logoChar: 'S',
          },
          {
            id: 'dream-agility',
            name: 'Dream Agility',
            website: 'dreamagility.com',
            phone: '0161 641 8585',
            email: 'Sales@dreamagility.com',
            address: 'Serves Manchester (Ramsbottom based)',
            primaryFocus: ['AI SaaS (Paid Search)', 'AI for Marketing', 'PMax Optimisation'],
            review: 'Dream Agility offers award-winning machine learning SaaS tools for paid search. Testimonials from clients like Google UK highlight significant ROAS improvements and praise their pioneering tech for Google Shopping/PMax optimisation and lead generation.',
            logoChar: 'D',
          },
          {
            id: 'personalyze',
            name: 'Personalyze',
            website: 'personalyze.ai',
            phone: 'N/A (Contact via Goodfirms profile)',
            email: 'N/A (Contact via Goodfirms profile)',
            address: 'Manchester',
            primaryFocus: ['AI for Marketing (Social Profiling)', 'People-Based Marketing'],
            review: 'Personalyze offers patent-pending technology for real-time individual profiling on social/digital platforms, enabling targeted people-based marketing and cost savings. Listed on Goodfirms with a focus on AI services.',
            logoChar: 'P',
          },
          {
            id: 'frontline-consultancy',
            name: 'Frontline Consultancy',
            website: 'frontlineconsultancy.co.uk',
            phone: 'N/A (Contact via website)',
            email: 'N/A (Contact via website)',
            address: 'Manchester',
            primaryFocus: ['IT & Business Consultancy', 'AI Services', 'SAP/Sage Solutions'],
            review: 'Established in 1991, Frontline Consultancy provides business software and technology services, including AI. Testimonials highlight their wide range of skills and personal touch in implementation and support. They are an IBM Premier Business Partner.',
            logoChar: 'F',
          },
          {
            id: 'ddc-adv-data-sol',
            name: 'DDC Advanced Data Solutions (DDCAS)',
            website: 'ddc-as.com',
            phone: 'N/A (Contact via website)',
            email: 'N/A (Contact via website)',
            address: 'Manchester Office: 111 Piccadilly, M1 2HY',
            primaryFocus: ['Business Outsourcing', 'Data AI Services', 'Automated Data Redaction'],
            review: 'DDCAS provides AI-driven services like Digital Sensitivity Review (automating PII search/redaction), content categorisation, and market intelligence. Testimonials from partners like Creditsafe praise their service, rapid response, and data expertise. Cyber Essentials Plus Certified.',
            logoChar: 'D',
          },
          {
            id: 'nexthink',
            name: 'Nexthink',
            website: 'nexthink.com',
            phone: 'N/A (Contact via website)',
            email: 'N/A (Contact via website)',
            address: 'Manchester Office: No. 2 Circle Square, 1 Symphony Park, M1 7FS',
            primaryFocus: ['AI SaaS (Digital Employee Experience)', 'IT Issue Diagnostics', 'Real-time Analytics'],
            review: 'Nexthink is a leader in digital employee experience (DEX) management, using AI and real-time analytics to diagnose IT issues. Gartner Peer Insights rate them 4.6/5, valuing their AI for insight analysis and proactive IT support for over 1,200 customers.',
            logoChar: 'N',
          },
          {
            id: 'ai2b-ltd',
            name: 'AI2B Ltd',
            website: 'ai2b.co.uk',
            phone: '+44 7592 538 952',
            email: 'hello@ai2b.co.uk',
            address: 'Farnworth, Greater Manchester (19 Darley Grove)',
            primaryFocus: ['Custom AI Solutions', 'Data Analysis', 'Process Automation', 'Generative AI'],
            review: 'AI2B Ltd, founded in 2024, offers tailored AI and automation solutions to streamline operations and drive growth in Greater Manchester. They emphasise being vendor-agnostic and provide services like predictive analytics, workflow automation, and Generative AI.',
            logoChar: 'A',
          },
          {
            id: 'equal-experts',
            name: 'Equal Experts',
            website: 'equalexperts.com',
            phone: 'N/A (Contact via website)',
            email: 'N/A (Contact via website)',
            address: 'Manchester Office (UK base since 2016)',
            primaryFocus: ['Tech Consulting', 'Data-driven Insights', 'Digital Transformation'],
            review: 'Equal Experts, named a top UK workplace by Glassdoor, helps businesses create digital experiences and harness data-driven insights. They have a Manchester office and work with major clients like John Lewis, HMRC, and O2 on transformational projects.',
            logoChar: 'E',
          },
          {
            id: 'vts-software',
            name: 'VTS Software Ltd',
            website: 'vtssoftware.com',
            phone: '+44 (0) 161 408 1887',
            email: 'enquiries@vtssoftware.com',
            address: 'Manchester Office: 111 Piccadilly, M1 2HR',
            primaryFocus: ['Custom Software Dev', 'AI & Automation', 'Warehouse Management Systems'],
            review: 'VTS Software is a Microsoft AI Cloud Partner providing custom software development, AI solutions, and automation, specialising in Warehouse Management Systems and Factory Performance Software. They focus on quality, innovation, and enhancing operational efficiency.',
            logoChar: 'V',
          },
          {
            id: 'corporation-pop',
            name: 'Corporation Pop Ltd',
            website: 'corporationpop.co.uk',
            phone: 'N/A (Contact via website)',
            email: 'info@corporationpop.co.uk',
            address: 'Manchester Office: 21–23 Shudehill, M4 2AF',
            primaryFocus: ['Digital Agency', 'Interactive Experiences', 'AR/VR', 'App Development'],
            review: 'Corporation Pop, a Manchester digital agency, holds a 4.9-star Clutch rating. They specialise in deeply engaging interactive experiences, apps, AR/VR, and games. Clients praise their creativity, project management, and high-quality UX design.',
            logoChar: 'C',
          }
          // ... more agencies can be added here by parsing the document
        ];


        // --- Components ---

        const Navbar = ({ setCurrentPage }) => {
          const navItems = [
            { name: 'Directory', page: 'directory' },
            { name: 'Manchester AI Hub', page: 'manchester' },
            { name: 'Contact Us', page: 'contact' },
          ];

          return (
            <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg sticky-navbar">
              <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <div className="text-2xl font-bold mb-2 sm:mb-0">
                  <span className="block sm:inline">AI Services</span>
                  <span className="block sm:inline"> Manchester</span>
                </div>
                <ul className="flex space-x-2 sm:space-x-4">
                  {navItems.map((item) => (
                    <li key={item.page}>
                      <button
                        onClick={() => setCurrentPage(item.page)}
                        className="hover:bg-white hover:text-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          );
        };

        const AgencyCard = ({ agency }) => {
          const { name, website, phone, email, address, primaryFocus, review, logoChar, isFeatured } = agency;

          return (
            <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col h-full ${isFeatured ? 'border-4 border-yellow-400' : 'border border-gray-200'}`}>
              {isFeatured && (
                <div className="bg-yellow-400 text-black text-center py-2 font-semibold">
                  <StarIcon filled={true} /> Manchester's #1 AI Agency <StarIcon filled={true} />
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
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">Primary Focus:</h4>
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
                    <GlobeIcon className="w-4 h-4 mr-2 flex-shrink-0" /> Visit Website
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

        const DirectoryPage = ({ agencies }) => {
          const [searchTerm, setSearchTerm] = useState('');
          const [inputValue, setInputValue] = useState(''); 
          const [filteredAgencies, setFilteredAgencies] = useState([]);

          const filterAgenciesCallback = useCallback((currentSearchTerm) => {
            const featured = agencies.find(a => a.isFeatured);
            const others = agencies.filter(a => !a.isFeatured);
            
            let results = others;
            if (currentSearchTerm) { 
                results = others.filter(agency =>
                    agency.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                    agency.primaryFocus.some(focus => focus.toLowerCase().includes(currentSearchTerm.toLowerCase())) ||
                    agency.review.toLowerCase().includes(currentSearchTerm.toLowerCase())
                );
            }
            
            let finalResults = [];
            if (featured) {
                const featuredMatches = currentSearchTerm === '' || 
                    featured.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                    featured.primaryFocus.some(focus => focus.toLowerCase().includes(currentSearchTerm.toLowerCase())) ||
                    featured.review.toLowerCase().includes(currentSearchTerm.toLowerCase());

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
                setFilteredAgencies([]); // Ensure it's an empty array if agencies is not ready
            }
          }, [agencies]);


          const handleSearchSubmit = (e) => {
            e.preventDefault(); 
            setSearchTerm(inputValue); 
          };
          
          return (
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
              <div className="mb-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Manchester AI Agency Directory</h1>
                <p className="text-gray-600 text-lg">Discover top AI talent and services in Manchester.</p>
              </div>

              <form onSubmit={handleSearchSubmit} className="mb-8 sticky-search bg-white py-4 z-10 shadow rounded-lg">
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Search agencies by name, focus, or keyword..."
                    className="w-full p-4 pl-12 pr-28 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-r-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 h-full"
                  >
                    Search
                  </button>
                </div>
              </form>
              
              {filteredAgencies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAgencies.map(agency => (
                    <AgencyCard key={agency.id} agency={agency} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 text-xl py-10">
                  No agencies found matching your search criteria.
                </p>
              )}
            </div>
          );
        };

        const ManchesterPage = () => {
          return (
            <div className="container mx-auto p-6 sm:p-8 lg:p-10 bg-white shadow-xl rounded-lg my-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">Manchester: A Thriving Hub for Artificial Intelligence</h1>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="lead text-xl text-gray-600 mb-6">
                  Manchester has firmly established itself as a dynamic and leading centre for Artificial Intelligence (AI) in the United Kingdom. The city's prowess in this transformative field is substantiated by significant accolades and robust data, including being distinguished as the "UK's most AI-ready city."
                </p>

                <section className="mb-8 p-6 bg-blue-50 rounded-lg shadow">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-3">Key Strengths of Manchester's AI Ecosystem:</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>High concentration of AI-related job opportunities.</li>
                    <li>Substantial innovation funding from Innovate UK.</li>
                    <li>A vibrant ecosystem of over 200 businesses specialising in AI.</li>
                    <li>Home to critical initiatives like the Greater Manchester AI Foundry, empowering SMEs.</li>
                    <li>Hosts AI and Data Science teams for national security organisations (GCHQ, NCSC).</li>
                    <li>Strong academic backbone with The University of Manchester, an academic partner of The Alan Turing Institute.</li>
                  </ul>
                </section>

                <p>
                  This confluence of commercial activity, government support, and academic excellence makes Manchester a prime location for businesses seeking to leverage AI. The city’s AI ecosystem represents a deeply interconnected and supportive environment, offering access to superior talent, innovative solutions, and a competitive marketplace of service providers.
                </p>
                <p>
                  The concept of "AI Automation" is fluid, with many providers integrating automation capabilities as a core outcome of broader AI services like machine learning, data analytics, and custom AI development. This guide reflects this reality, examining automation capabilities across diverse AI offerings.
                </p>

                <section className="my-8 p-6 bg-purple-50 rounded-lg shadow">
                  <h2 className="text-2xl font-semibold text-purple-700 mb-3">The Trajectory of AI in Manchester: Future Outlook</h2>
                  <p>
                    Manchester's current standing as a leading AI city is not temporary but a result of sustained investment, a rich talent pool, proactive business activity, and strategic public-private initiatives. The city is positioned for continued leadership and growth in the AI sector.
                  </p>
                  <p>
                    Key economic sectors—Advanced Manufacturing, Creative and Media, Digital and Technology, Financial Services, Net Zero initiatives, and Life Science & Healthcare—are poised to be significant drivers and adopters of specialised AI solutions. As AI technologies mature, their applications are expected to deepen within these areas of regional strength.
                  </p>
                  <p>
                    Government strategies, such as the UK's AI Action Plan, are likely to further catalyse development. Initiatives like the Greater Manchester AI Foundry play a crucial role in democratising access to AI and fostering innovation.
                  </p>
                  <p>
                    The trajectory suggests Manchester will not only consolidate its national AI hub status but also serve as a model for regional innovation. For businesses, this vibrant environment offers a wealth of opportunities to collaborate with cutting-edge AI providers, access skilled talent, and leverage AI for growth and transformation.
                  </p>
                </section>
                
                <p className="mt-8 text-center text-lg font-medium text-gray-800">
                  Manchester's continued convergence of academic research, commercial enterprise, and supportive public policy indicates a bright and dynamic future for artificial intelligence in the region.
                </p>
              </div>
            </div>
          );
        };

        const ContactUsPage = () => {
          return (
            <div className="container mx-auto p-6 sm:p-8 lg:p-10 bg-white shadow-xl rounded-lg my-8">
              <div className="max-w-2xl mx-auto text-center">
                <BuildingIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Get Listed in Our Directory</h1>
                <p className="text-lg text-gray-600 mb-8">
                  Are you an AI agency or service provider operating in or serving the Manchester area? We'd love to hear from you and potentially feature you in our comprehensive directory.
                </p>
                
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-3">How to Get in Touch:</h2>
                  <p className="text-gray-700 mb-4">
                    To be considered for inclusion in the "AI Services Manchester" directory, please send us an email with your company details, including:
                  </p>
                  <ul className="list-disc list-inside text-left text-gray-700 mb-6 space-y-1 mx-auto max-w-md">
                    <li>Company Name</li>
                    <li>Website URL</li>
                    <li>Contact Information (Phone/Email)</li>
                    <li>Brief Description of your AI Services</li>
                    <li>Your connection to Manchester</li>
                  </ul>
                  <p className="text-lg font-medium text-gray-800">
                    Email us at:
                  </p>
                  <a href="mailto:info@aiservicesmanchester.co.uk" className="text-2xl font-bold text-blue-600 hover:text-blue-800 hover:underline break-all">
                    info@aiservicesmanchester.co.uk
                  </a>
                </div>
                
                <p className="mt-8 text-gray-500">
                  We aim to create the most accurate and helpful resource for businesses seeking AI solutions in Manchester. We look forward to hearing from you!
                </p>
              </div>
            </div>
          );
        };


        // --- App Component ---
        function App() {
          const [currentPage, setCurrentPage] = useState('directory'); 

          const renderPage = () => {
            switch (currentPage) {
              case 'directory':
                return <DirectoryPage agencies={agencyData} />;
              case 'manchester':
                return <ManchesterPage />;
              case 'contact':
                return <ContactUsPage />;
              default:
                return <DirectoryPage agencies={agencyData} />;
            }
          };

          return (
            <div className="min-h-screen bg-gray-100 font-sans">
              <Navbar setCurrentPage={setCurrentPage} />
              <main>
                {renderPage()}
              </main>
              <footer className="bg-gray-800 text-white text-center p-6 mt-12">
                <p>&copy; {new Date().getFullYear()} AI Services Manchester. All rights reserved.</p>
                <p className="text-sm text-gray-400 mt-1">Your guide to AI innovation in Manchester.</p>
              </footer>
            </div>
          );
        }

        // --- Render the App ---
        ReactDOM.render(
          <App />,
          document.getElementById('root')
        );
    </script>
</body>
</html>
