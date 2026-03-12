import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhone, FaLock, FaWhatsapp, FaCrown } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import { toast } from 'react-toastify';

const UserLogin = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.post('/auth/send-whatsapp-otp', { phone: mobileNumber });
      setOtpSent(true);
      setTimer(60);
      toast.success(data.exists ? 'Welcome back! OTP sent to your WhatsApp.' : 'New user! OTP sent to your WhatsApp.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) { toast.error('Please enter OTP'); return; }
    setLoading(true);
    try {
      const response = await API.post('/auth/verify-whatsapp-otp', { phone: mobileNumber, otp });
      setAuthData(response.data.token, response.data.user);
      toast.success(response.data.user.isNewUser ? 'Account created! Please update your profile.' : 'Welcome back!');
      navigate(response.data.user.isNewUser ? '/profile' : '/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await API.post('/auth/send-whatsapp-otp', { phone: mobileNumber });
      setTimer(60);
      toast.success('OTP resent to your WhatsApp.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF2F5] via-white to-[#FDE8EE] py-10 px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5D0D8]/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FDE8EE]/60 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-[#E8D5A0]/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#B5617A] to-[#7D3A52] rounded-2xl shadow-lg mb-4">
            <FaCrown className="text-2xl text-[#E8D5A0]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#4A1F30] mb-1">
            JJ Trendz Official
          </h1>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-8 h-px bg-[#C5A55A]"></span>
            <p className="text-xs text-[#C5A55A] font-medium tracking-[0.15em] uppercase">Login or Register</p>
            <span className="w-8 h-px bg-[#C5A55A]"></span>
          </div>
          <p className="text-gray-500 text-sm">Continue with your mobile number</p>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-[#F5D0D8] p-7 md:p-9">
          {!otpSent ? (
            <form onSubmit={handleSendOTP}>
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaPhone className="text-[#B5617A] text-sm" />
                  </div>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-[#F5D0D8] rounded-xl focus:ring-2 focus:ring-[#B5617A]/20 focus:border-[#B5617A] transition-all text-sm bg-white"
                    maxLength="10"
                    required
                  />
                </div>
                <p className="mt-1.5 text-xs text-gray-400">We'll send a verification code via WhatsApp</p>
              </div>

              <button
                type="submit"
                disabled={loading || mobileNumber.length !== 10}
                className="w-full py-3.5 bg-gradient-to-r from-[#B5617A] to-[#7D3A52] text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Sending OTP...
                  </span>
                ) : 'Continue'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-700 tracking-wide">Verification Code</label>
                  <button type="button" onClick={() => { setOtpSent(false); setOtp(''); }}
                    className="text-xs text-[#B5617A] hover:text-[#7D3A52] font-semibold transition-colors">
                    Edit Number
                  </button>
                </div>
                <div className="mb-4 p-3 bg-[#FFF2F5] rounded-xl border border-[#F5D0D8] text-center">
                  <p className="text-sm text-gray-700">
                    <FaWhatsapp className="inline text-green-500 mr-1" />
                    OTP sent to <span className="font-bold text-[#7D3A52]">{mobileNumber}</span>
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-[#B5617A] text-sm" />
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="• • • •"
                    className="w-full pl-11 pr-4 py-4 border-2 border-[#F5D0D8] rounded-xl focus:ring-2 focus:ring-[#B5617A]/20 focus:border-[#B5617A] transition-all text-center text-2xl tracking-[1em] font-bold bg-white"
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <div className="text-center mb-5">
                {timer > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend in <span className="font-bold text-[#B5617A]">{timer}s</span>
                  </p>
                ) : (
                  <button type="button" onClick={handleResendOTP}
                    className="text-sm text-[#B5617A] hover:text-[#7D3A52] font-bold underline decoration-2 underline-offset-4 transition-colors">
                    Resend Verification Code
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 4}
                className="w-full py-3.5 bg-gradient-to-r from-[#B5617A] to-[#7D3A52] text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Verifying...
                  </span>
                ) : 'Verify & Continue'}
              </button>
            </form>
          )}
        </div>

        {/* Footer note */}
        <div className="mt-5 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-[#F5D0D8] shadow-sm">
            <p className="text-sm text-[#7D3A52] font-semibold mb-1">✨ New to JJ Trendz?</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              No registration needed! Just enter your mobile number and we'll create your account automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
