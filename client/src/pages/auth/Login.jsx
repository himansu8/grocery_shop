import React, { useState } from 'react';
import Layout from '../../Components/layout/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      if (res) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        // Redirect to the intended protected route after login
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen  mt-12 ">
        <div className=" bg-white rounded-lg p-8 w-full max-w-sm " style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 4px 0 6px rgba(0, 0, 0, 0.1), -4px 0 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          padding: '2rem',
          width: '100%',
          maxWidth: '24rem',
        }}>
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-xl text-center mb-6">Please Login!</h3>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="button"
                className="text-red hover:text-[#0ab538] mt-2 block mx-auto"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot password?
              </button>
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-[#0acd44] hover:bg-[#0ab538] text-white font-bold py-2 px-4 rounded-md"
              >
                Login
              </button>
            </div>
            <p className="text-center">
              Don’t have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="underline text-red hover:text-[#0ab538]"
              >
                Sign Up!
              </button>
            </p>
          </form>
          <div className="flex justify-center mt-6 space-x-4">
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 shadow-md hover:bg-green-500 hover:text-white hover:bg-[#0ab538] transition-transform transform hover:scale-110">
              <FaGoogle className="text-xl" />
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 shadow-md hover:bg-green-500 hover:bg-[#0ab538] hover:text-white transition-transform transform hover:scale-110">
              <FaFacebook className="text-xl" />
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 shadow-md hover:bg-green-500 hover:bg-[#0ab538] hover:text-white transition-transform transform hover:scale-110">
              <FaGithub className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
