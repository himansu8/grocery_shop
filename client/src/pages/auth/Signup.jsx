import React, { useState } from 'react';
import Layout from '../../Components/layout/Layout';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  // const [securityQuestion, setSecurityQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();


  // Options for security questions
  //   const securityQuestions = [
  //     'What is your mother\'s maiden name?',
  //     'What was the name of your first pet?',
  //     'What is the name of the street you grew up on?',
  //     'What was your childhood nickname?',
  //     'What is your Favorite Game?',
  //   ];

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
        // securityQuestion,
        answer,
      });
      if (res) {
        toast.success(`${name} Register Successfully `);
        navigate("/login");
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
      <div className="flex items-center justify-center min-h-screen md:mt-16 lg:mt-16 mt-20 px-4">
        <div className="bg-white rounded-lg p-8 w-full max-w-md "
          style={{
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 4px 0 6px rgba(0, 0, 0, 0.1), -4px 0 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            padding: '2rem',
            width: '100%',
            maxWidth: '24rem',
          }}>
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
            <div className="mb-6">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                // placeholder="Answer to Security Question"
                placeholder="Enter Your Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {/* <div className="mb-4">
              <select
                id="securityQuestion"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select a Security Question</option>
                {securityQuestions.map((question, index) => (
                  <option key={index} value={question}>{question}</option>
                ))}
              </select>
            </div> */}
            <div className="mb-6">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                // placeholder="Answer to Security Question"
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

export default Signup;
