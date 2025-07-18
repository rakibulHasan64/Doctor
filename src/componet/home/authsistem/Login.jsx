

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';


function Login() {
   const { googleLogin, signIn } = useAuth();
   const navigate = useNavigate();

   const axiosInstance = useAxiosSecure();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   // Email/Password Login
   const onSubmit = async (data) => {
      try {
         const result = await signIn(data.email, data.password);
         toast.success(`Welcome back, ${result?.user.displayName || "User"}!`);
         navigate('/');
      } catch (error) {
         toast.error("Login failed! Please check your credentials.");
         console.error(error);
      }
   };




   const handleGoogleLogin = async () => {
      try {
         const result = await googleLogin(); // Firebase Google Login
         const user = result.user;

         const userInfo = {
            email: user.email,
            role: "user",
            image: user.photoURL,
            created_at: new Date().toISOString(),
            last_log_in: new Date().toISOString()
         };
         await axiosInstance.post("/users", userInfo);
         toast.success("Google login successful!");
         navigate("/");

      } catch (error) {
         console.error("Google login failed:", error.message);
         toast.error("Google login failed");
      }
   };

   return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen bg-white relative">
         <div className="w-full max-w-md rounded-2xl p-8 shadow-lg">
            <div className='flex items-center py-5  absolute top-1'>
               <img className="h-9" src="/logo.png" alt="dummyLogoColored" />
               <span className='text-[32px] font-extrabold '>Profast</span>
            </div>

            <h3 className="text-[32px] font-bold text-center mb-2">Welcome Back</h3>
            <p className="text-center text-gray-500 mb-6">Login with Profast</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               {/* Email */}
               <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                  <input
                     type="email"
                     {...register("email", { required: "Email is required" })}
                     placeholder="Enter your email"
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
               </div>

               {/* Password */}
               <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                  <input
                     type="password"
                     {...register("password", {
                        required: "Password is required",
                        minLength: {
                           value: 6,
                           message: "Password must be at least 6 characters",
                        },
                     })}
                     placeholder="Enter your password"
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  />
                  {errors.password && (
                     <p className="text-red-500 text-sm">{errors.password.message}</p>
                  )}
               </div>

               {/* Login Button */}
               <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
               >
                  Login
               </button>

               {/* Forgot Password */}
               <div className="text-right">
                  <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
               </div>

               {/* Divider */}
               <div className="flex items-center justify-center gap-2 text-gray-400">
                  <hr className="w-full border-gray-300" />
                  <span>or</span>
                  <hr className="w-full border-gray-300" />
               </div>

               {/* Register Link */}
               <p className="text-sm text-center">
                  Don’t have any account?{' '}
                  <Link to="/register" className="text-blue-600 hover:underline">
                     Register
                  </Link>
               </p>

               {/* Google Login */}
               <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
               >
                  <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                  <span>Continue with Google</span>
               </button>
            </form>
         </div>
      </div>
   );
}

export default Login;
