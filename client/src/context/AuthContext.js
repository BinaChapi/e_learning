import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import colors from '../styles/colors';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAuthenticated(true);
        setUser({ username: decoded.username, role: decoded.role, id: decoded.id });
        if (decoded.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/homepage');
        }
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
  },[]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/login', { username, password });
      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setUser(user);
        setError('');
        toast.success('Login successful!',{
          position: "top-left",
          autoClose: 500,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
          closeOnClick:false,
          progress: undefined,
          style: {

            height:7,
            backgroundColor: colors.success,
            color: '#fff',
            fontSize: '16px',
          },
          icon: '🚀',
        });  // Show success toast message
        // Navigate based on user role
        if (user.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/homepage');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, error, loading, setError }}>
      {children}
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);