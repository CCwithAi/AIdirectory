import React, { useState } from 'react';

const AddListingPage = ({ textConfig, onAddAgency }) => {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    phone: '',
    email: '',
    address: '',
    primaryFocus: '', // Will be split by comma
    review: '',
    logoChar: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage('');
    setIsSubmitting(true);

    // Basic client-side validation
    if (!formData.name || !formData.website || !formData.email || !formData.primaryFocus || !formData.review) {
      setMessage("Please fill in all required fields: Name, Website, Email, Primary Focus, Review.");
      setIsError(true);
      setIsSubmitting(false);
      return;
    }

    // Validate website URL format
    if (!formData.website.startsWith('http://') && !formData.website.startsWith('https://')) {
      setMessage("Website URL must start with http:// or https://");
      setIsError(true);
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Please enter a valid email address.");
      setIsError(true);
      setIsSubmitting(false);
      return;
    }

    const agencyData = {
      name: formData.name.trim(),
      website: formData.website.trim(),
      phone: formData.phone.trim() || 'N/A',
      email: formData.email.trim(),
      address: formData.address.trim() || 'Manchester, UK',
      primaryFocus: formData.primaryFocus.split(',').map(s => s.trim()).filter(s => s),
      review: formData.review.trim(),
      logoChar: formData.logoChar.trim() || formData.name.trim().charAt(0).toUpperCase(),
    };

    try {
      setMessage('🔍 Verifying your submission... This may take a few seconds.');
      const result = await onAddAgency(agencyData);

      if (result.success) {
        setMessage('✅ Success! Your listing has been added and will appear in the directory shortly.');
        setIsError(false);
        // Reset form
        setFormData({
          name: '', website: '', phone: '', email: '', address: '',
          primaryFocus: '', review: '', logoChar: '',
        });
      }
    } catch (error) {
      setMessage(`❌ ${error.message || 'Submission failed. Please check your information and try again.'}`);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { name: 'name', label: textConfig.addListingPage.formLabels.name, type: 'text', required: true, placeholder: 'Your Company Name' },
    { name: 'website', label: textConfig.addListingPage.formLabels.website, type: 'text', required: true, placeholder: 'https://example.com' },
    { name: 'phone', label: textConfig.addListingPage.formLabels.phone, type: 'tel', placeholder: '+44 123 456 7890' },
    { name: 'email', label: textConfig.addListingPage.formLabels.email, type: 'email', required: true, placeholder: 'contact@example.com' },
    { name: 'address', label: textConfig.addListingPage.formLabels.address, type: 'text', placeholder: 'Manchester, UK' },
    { name: 'primaryFocus', label: textConfig.addListingPage.formLabels.primaryFocus, type: 'text', required: true, placeholder: 'AI Consulting, Machine Learning, NLP' },
    { name: 'review', label: textConfig.addListingPage.formLabels.review, type: 'textarea', maxLength: 250, required: true, placeholder: 'Brief description of your AI services...' },
    { name: 'logoChar', label: textConfig.addListingPage.formLabels.logoChar, type: 'text', maxLength: 1, placeholder: 'A' },
  ];

  return (
    <div className="container mx-auto p-6 sm:p-8 lg:p-10 bg-white shadow-xl rounded-lg my-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">
          {textConfig.addListingPage.title}
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          {textConfig.addListingPage.intro}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {formFields.map(field => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                {field.label}{field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows="3"
                  maxLength={field.maxLength}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.placeholder || ''}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></textarea>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  maxLength={field.maxLength}
                  required={field.required}
                  placeholder={field.placeholder || ''}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              )}
            </div>
          ))}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '🔍 Verifying...' : textConfig.addListingPage.submitButton}
            </button>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>✨ Automated Verification:</strong> Your submission will be automatically verified using AI to ensure quality and legitimacy. This includes checking your website accessibility and validating your business information.
            </p>
          </div>
        </form>

        {message && (
          <p className={`mt-4 text-center text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddListingPage; 