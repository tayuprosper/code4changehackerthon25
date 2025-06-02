import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CreateCoursePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    duration: '',
    level: '',
    imageUrl: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required.';
    if (!formData.description.trim()) newErrors.description = 'Description is required.';
    if (!formData.price || isNaN(formData.price)) newErrors.price = 'Valid price is required.';
    if (!formData.category.trim()) newErrors.category = 'Category is required.';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required.';
    if (!formData.level.trim()) newErrors.level = 'Level is required.';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('https://code4changehackerthon25.onrender.com/courses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create course.');
      }

      setSuccessMessage('Course created successfully!');
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        duration: '',
        level: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: error.message || 'Something went wrong.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-700 hover:underline mb-4"
      >
        <ArrowLeft className="mr-2" /> Back to Dashboard
      </button>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Create a New Course</h1>

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
            {successMessage}
          </div>
        )}
        {errors.submit && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Title', name: 'title', type: 'text' },
            { label: 'Description', name: 'description', type: 'textarea' },
            { label: 'Price (XAF)', name: 'price', type: 'number' },
            { label: 'Category', name: 'category', type: 'text' },
            { label: 'Duration', name: 'duration', type: 'text' },
            { label: 'Level', name: 'level', type: 'text' },
            { label: 'Image URL', name: 'imageUrl', type: 'text' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              {type === 'textarea' ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    errors[name] ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm p-2`}
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    errors[name] ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm p-2`}
                />
              )}
              {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition"
          >
            {submitting ? 'Submitting...' : 'Create Course'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCoursePage;
