import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { wp, hp } from '../../utils/responsivescreen';
import AuthLayout from '../../layouts/AuthLayout';
import colors from '../../styles/colors';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { User, Lock, ArrowRight } from 'lucide-react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading, setError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    await login(username, password);
  };

  useEffect(() => {
    setError('');
  }, [username, password]);

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: 25,
            width: wp(30),
            maxWidth: 500,
            backgroundColor: colors.card,
            borderRadius: 20,
            border: `1px solid ${colors.stroke}`,
            boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: hp(5),
              textAlign: 'center',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: hp(2),
            }}
          >
            Welcome Back
          </motion.h1>

          {/* Input Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ position: 'relative' }}>
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
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
                style={{
                  width: '80%',
                  height: hp(6),
                  padding: '0 45px',
                  fontSize: hp(2),
                  border: `1px solid ${colors.stroke}`,
                  borderRadius: 12,
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ position: 'relative' }}>
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
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                style={{
                  width: '80%',
                  height: hp(6),
                  padding: '0 45px',
                  fontSize: hp(2),
                  border: `1px solid ${colors.stroke}`,
                  borderRadius: 12,
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Forgot Password + Error */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link
              to="/forgot-password"
              style={{
                fontSize: hp(1.9),
                color: colors.linktext,
                textDecoration: 'none',
              }}
            >
              Forgot Password?
            </Link>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ color: colors.error, fontSize: hp(1.8), margin: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type='submit'
            disabled={loading}
            style={{
              backgroundColor: colors.primary,
              color: colors.btntext,
              padding: '14px',
              borderRadius: 12,
              fontSize: hp(2.3),
              width: '100%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}
          >
            {loading ? (
              <CircularProgress size={20} style={{ color: colors.card }} />
            ) : (
              <>
                Login
                <ArrowRight size={20} />
              </>
            )}
          </motion.button>

          {/* Sign up link */}
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Link
              to="/register"
              style={{
                fontSize: hp(2),
                color: colors.linktext,
                textDecoration: 'none',
              }}
            >
              Don't have an account? <strong>Sign up</strong>
            </Link>
          </div>
        </form>
      </motion.div>
    </AuthLayout>
  );
}

export default Login;
