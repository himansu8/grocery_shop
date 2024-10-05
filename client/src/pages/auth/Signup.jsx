import React, { useState } from 'react';
import Layout from '../../Components/layout/Layout';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import { auth1, provider } from '../../firebase'
import { signInWithPopup } from "firebase/auth"
import { useAuth } from '../../context/auth';
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();


  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, {
        email,
        password,
        name,
        phone,
        address,
        answer,
      });
      if (res) {
        toast.success(`${name} Registered Successfully`);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth1, provider);
      const { displayName, email } = result.user;

      // Send Google auth data to your backend
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/auth/google`, {
        name: displayName,
        email,
        
      });

      // Assuming your response structure is similar to your regular login
      if (res) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        //console.log(res.data)

        // Save auth data to local storage
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong with Google authentication');
    }
  };
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen mt-20 px-4">
        <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-xl text-center mb-6">Create An Account!</h3>
            <div className="mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
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
            <div className="mb-4">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Your Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Your Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="What is your Favorite Game?"
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
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-[#0acd44] hover:bg-[#0ab538] text-white font-bold py-2 px-4 rounded-md"
              >
                Sign Up
              </button>
            </div>
            <p className="text-center">
              Have An Account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="underline text-red hover:text-[#0ab538]"
              >
                Login!
              </button>
            </p>
          </form>
          <div className="flex justify-center mt-6 space-x-4">
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 shadow-md hover:bg-green-500 hover:text-white transition-transform transform hover:scale-110"
            onClick={signInWithGoogle}>
              <FaGoogle className="text-xl" />
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 shadow-md hover:bg-green-500 hover:text-white transition-transform transform hover:scale-110">
              <FaFacebook className="text-xl" />
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 shadow-md hover:bg-green-500 hover:text-white transition-transform transform hover:scale-110">
              <FaGithub className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Signup;
