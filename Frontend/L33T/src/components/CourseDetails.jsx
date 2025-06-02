import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [paying, setPaying] = useState(false);
const token = localStorage.getItem("token");
// navigate = useNavigate()
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`https://code4changehackerthon25.onrender.com/courses/${id}`);
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        setError('Error fetching course.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  
  const handlePay = async (e) => {
    e.preventDefault();
    setPaying(true);
    try {
      const res = await fetch('https://code4changehackerthon25.onrender.com/payments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: course.price,
          course_id: course.id,
          payment_method: 'mtn_momo',
          phone_number: phoneNumber
        })
      });

      if (!res.ok) throw new Error('Payment failed', Error.toString());

      const data = await res.json();
      alert('Payment successful');
      navigate("/student-dashboard")
      setIsModalOpen(false);
      setPhoneNumber('');
    } catch (err) {
      alert(err.message, err.details);
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <p className="text-center text-blue-700">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!course) return <p className="text-center text-gray-600">Course not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
      >
        ← Back to Courses
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
        <span>Difficulty: {course.difficulty}</span>
        <span>Posted by: {course.instructor}</span>
        <span>Price: {course.price} XAF</span>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
      >
        Pay
      </button>

      {/* Payment Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4">
              Pay for {course.title}
            </Dialog.Title>

            <form onSubmit={handlePay}>
              <label className="block mb-2 text-sm font-medium text-gray-700">Mobile Money Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-700"
                placeholder="e.g. 2376XXXXXXX"
              />

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={paying}
                  className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                >
                  {paying ? 'Paying...' : 'Confirm Payment'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default CourseDetails;
