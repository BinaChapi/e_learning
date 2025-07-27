import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import colors from '../../styles/colors';
import { addCourse } from '../../services/courseService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';

function AddCourse() {
  const [formData, setFormData] = useState({
  title: '',
  description: '',
  category: '',
  courseType: ''
});

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
    setErrorMsg('User not authenticated');
    return;
  }
    setIsLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    // Add adminId to the data sent to backend
    const courseData = {
    ...formData,
    adminId: user.id
  };
    try {
      await addCourse(courseData);
      setFormData({
        title: '',
        description: '',
        category: '',
        courseType: ''
      });
      setSuccessMsg('Course added successfully!');
    } catch (error) {
      setErrorMsg( error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout showBackInHeader={true}>
      <LoadingSpinner isLoading={isLoading} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          padding: '32px',
          height: 'calc(100vh - 100px)',
          overflowY: 'auto',
          backgroundColor: '#f8fafc'
        }}
      >
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px'
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '600',
              color: '#1e293b'
            }}>
              Add New Course
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#334155'
                }}>
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#334155'
                }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '16px',
                    minHeight: '120px'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#334155'
                }}>
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '16px'
                  }}
                />
              </div>

              <select
                name="courseType"
                value={formData.courseType}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '16px',
                  backgroundColor: 'white'
                }}
              >
                <option value="">Select course type</option>
                <option value="formal">Formal</option>
                <option value="hobby">Hobby</option>
              </select>

              {successMsg && (
                <div style={{
                  color: colors.success,
                  background: `${colors.success}10`,
                  borderRadius: '8px',
                  padding: '10px',
                  fontWeight: 500,
                  marginBottom: '8px'
                }}>
                  {successMsg}
                </div>
              )}
              {errorMsg && (
                <div style={{
                  color: colors.error,
                  background: `${colors.error}10`,
                  borderRadius: '8px',
                  padding: '10px',
                  fontWeight: 500,
                  marginBottom: '8px'
                }}>
                  {errorMsg}
                </div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                disabled={isLoading}
              >
                <Plus size={20} />
                Add Course
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </AdminLayout>
  );
}

export default AddCourse;