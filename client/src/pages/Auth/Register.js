import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthLayout from '../../layouts/AuthLayout';
import { hp, wp } from '../../utils/responsivescreen';
import colors from '../../styles/colors';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { User, Mail, Lock, UserCircle } from 'lucide-react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !lastname || !email || !gender || !username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const checkResponse = await axios.get(`http://localhost:3000/api/check-username?username=${username}`);
      if (checkResponse.data.exists) {
        setError('The username is already taken');
        setLoading(false);
        return;
      }
      const response = await axios.post('http://localhost:3000/api/register', {
        name,
        lastname,
        email,
        gender,
        username,
        password,
        role
      });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      console.log('register error:', err);
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError('');
  }, [name, lastname, email, gender, username, password, confirmPassword]);

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form
          style={{
            padding: '40px 60px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            border: `2px solid ${colors.stroke}`,
            borderRadius: 20,
            backgroundColor: colors.card,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            width: wp(35),
            gap: 25,
          }}
          onSubmit={handleRegister}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: hp(5),
              margin: '0 0 20px 0',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Create Account
          </motion.h1>

          <div style={{ width: '100%', display: 'flex', gap: 20 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <User
                size={20}
                style={{
                  position: 'absolute',
                  left: 15,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: colors.secondary,
                }}
              />
              <input
                placeholder='First Name'
                style={{
                  height: hp(6),
                  width: '50%',
                  border: `1px solid ${colors.stroke}`,
                  borderRadius: 12,
                  padding: '0 45px',
                  fontSize: hp(2),
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div style={{ flex: 1, position: 'relative' }}>
              <User
                size={20}
                style={{
                  position: 'absolute',
                  left: 15,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: colors.secondary,
                }}
              />
              <input
                placeholder='Last Name'
                style={{
                  height: hp(6),
                  width: '50%',
                  border: `1px solid ${colors.stroke}`,
                  borderRadius: 12,
                  padding: '0 45px',
                  fontSize: hp(2),
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                type='text'
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div style={{ width: '100%', display: 'flex', gap: 20 }}>
            <div style={{ flex: 2, position: 'relative' }}>
              <Mail
                size={20}
                style={{
                  position: 'absolute',
                  left: 15,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: colors.secondary,
                }}
              />
              <input
                placeholder='Email'
                style={{
                  height: hp(6),
                  width: '60%',
                  border: `1px solid ${colors.stroke}`,
                  borderRadius: 12,
                  padding: '0 45px',
                  fontSize: hp(2),
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  gap: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: hp(6),
                }}
              >
                {['M', 'F'].map((g) => (
                  <motion.label
                    key={g}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                      padding: '8px 16px',
                      borderRadius: 8,
                      backgroundColor: gender === g ? colors.primary : 'transparent',
                      color: gender === g ? colors.card : colors.text,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <input
                      type='radio'
                      value={g}
                      checked={gender === g}
                      onChange={(e) => setGender(e.target.value)}
                      style={{ display: 'none' }}
                    />
                    <UserCircle size={20} />
                    {g === 'M' ? 'Male' : 'Female'}
                  </motion.label>
                ))}
              </div>
            </div>
          </div>

          <div style={{ width: '100%', position: 'relative' }}>
            <User
              size={20}
              style={{
                position: 'absolute',
                left: 15,
                top: '50%',
                transform: 'translateY(-50%)',
                color: colors.secondary,
              }}
            />
            <input
              placeholder='Username'
              style={{
                height: hp(6),
                width: '60%',
                border: `1px solid ${colors.stroke}`,
                borderRadius: 12,
                padding: '0 45px',
                fontSize: hp(2),
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div style={{ width: '100%', display: 'flex', gap: 20 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Lock
                size={20}
                style={{
                  position: 'absolute',
                  left: 15,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: colors.secondary,
                }}
              />
              <input
                placeholder='Password'
                style={{
                  height: hp(6),
                  width: '60%',
                  border: `1px solid ${colors.stroke}`,
                  borderRadius: 12,
                  padding: '0 45px',
                  fontSize: hp(2),
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ flex: 1, position: 'relative' }}>
              <Lock
                size={20}
                style={{
                  position: 'absolute',
                  left: 15,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: colors.secondary,
                }}
              />
              <input
                placeholder='Confirm Password'
                style={{
                  height: hp(6),
                  width: '60%',
                  border: `1px solid ${colors.stroke}`,
                  borderRadius: 12,
                  padding: '0 45px',
                  fontSize: hp(2),
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{
                  color: colors.error,
                  fontSize: hp(2),
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              backgroundColor: colors.primary,
              color: colors.btntext,
              border: 'none',
              outline: 'none',
              padding: '12px',
              borderRadius: 12,
              fontSize: hp(2.3),
              width: '100%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              marginTop: 10,
            }}
            type='submit'
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} style={{ color: colors.card }} />
            ) : (
              'Create Account'
            )}
          </motion.button>

           {/* Sign in link */}
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Link
              to="/login"
              style={{
                fontSize: hp(2),
                color: colors.linktext,
                textDecoration: 'none',
              }}
            >
            have an account? <strong>Sign in</strong>
            </Link>
          </div>
        </form>
      </motion.div>
    </AuthLayout>
  );
}

export default Register;
