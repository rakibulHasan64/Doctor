import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaUserCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { MdLanguage } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import useAuth from '../../../hooks/useAuth'
import useCart from '../../../hooks/useCart'

const Navbar = () => {
   const { user, logOut } = useAuth()
   const [menuOpen, setMenuOpen] = useState(false)
   const [dropdownOpen, setDropdownOpen] = useState(false)
   const [languageOpen, setLanguageOpen] = useState(false)
   const dropdownRef = useRef(null)
   const languageRef = useRef(null)
   const { cartItems } = useCart();


   const toggleMenu = () => setMenuOpen(!menuOpen)
   const toggleDropdown = () => setDropdownOpen(!dropdownOpen)
   const toggleLanguage = () => setLanguageOpen(!languageOpen)

   // Close dropdowns when clicking outside
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false)
         }
         if (languageRef.current && !languageRef.current.contains(event.target)) {
            setLanguageOpen(false)
         }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   return (
      <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 border-b border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
               {/* Logo and Brand */}
               <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                     <img src="/logo.png" alt="logo" className="w-8 h-8" />
                     <span className="hidden sm:inline">MyWebsite</span>
                  </Link>
               </div>

               {/* Desktop Menu */}
               <div className="hidden md:flex items-center space-x-4">
                  <Link
                     to="/"
                     className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  >
                     Home
                  </Link>
                  <Link
                     to="/shop"
                     className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  >
                     Shop
                  </Link>
                  <Link
                     to="/add-to-cart"
                     className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  >
                     <FaShoppingCart size={18} />
                     {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                           {cartItems.length}
                        </span>
                     )}
                  </Link>

                  {/* Language Dropdown */}
                  <div className="relative" ref={languageRef}>
                     <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                     >
                        <MdLanguage size={18} />
                        <span>Language</span>
                        {languageOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                     </button>
                     {languageOpen && (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg min-w-[140px] z-10">
                           <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors">
                              English
                           </button>
                           <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors">
                              বাংলা
                           </button>
                           <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors">
                              Español
                           </button>
                        </div>
                     )}
                  </div>

                  {/* Auth */}
                  {!user ? (
                     <Link
                        to="/login"
                        className="ml-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                     >
                        Join Us
                     </Link>
                  ) : (
                     <div className="relative ml-2" ref={dropdownRef}>
                        <button
                           onClick={toggleDropdown}
                           className="flex items-center gap-2 focus:outline-none"
                        >
                           <img
                              src={user.photoURL || 'https://i.ibb.co/2y1F1QJ/avatar.png'}
                              alt="Profile"
                              className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200 hover:border-blue-500 transition-colors"
                           />
                        </button>
                        {dropdownOpen && (
                           <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-48 z-20">
                              <div className="px-4 py-3 border-b border-gray-100">
                                 <p className="text-sm font-medium text-gray-800">{user.displayName || 'User'}</p>
                                 <p className="text-xs text-gray-500 truncate">{user.email}</p>
                              </div>
                              <Link
                                 to="/profile"
                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                 Update Profile
                              </Link>
                              <Link
                                 to="/dashboard"
                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                 Dashboard
                              </Link>
                              <button
                                    onClick={logOut}
                                 className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                              >
                                 <FiLogOut /> Logout
                              </button>
                           </div>
                        )}
                     </div>
                  )}
               </div>

               {/* Mobile Menu Button */}
               <div className="md:hidden flex items-center">
                  <button
                     onClick={toggleMenu}
                     className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors"
                  >
                     {menuOpen ? (
                        <HiOutlineX size={24} />
                     ) : (
                        <HiOutlineMenu size={24} />
                     )}
                  </button>
               </div>
            </div>
         </div>

         {/* Mobile Menu */}
         <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
               <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  onClick={toggleMenu}
               >
                  Home
               </Link>
               <Link
                  to="/shop"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  onClick={toggleMenu}
               >
                  Shop
               </Link>
               <Link
                  to="/add-to-cart"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  onClick={toggleMenu}
               >
                  <div className="flex items-center">
                     <FaShoppingCart className="mr-2" />
                     Cart
                     <span className="ml-auto bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        3
                     </span>
                  </div>
               </Link>

               {/* Language Dropdown */}
               <div className="pt-2">
                  <button
                     onClick={toggleLanguage}
                     className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  >
                     <div className="flex items-center">
                        <MdLanguage className="mr-2" />
                        Language
                     </div>
                     {languageOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                  </button>
                  {languageOpen && (
                     <div className="pl-8 space-y-1">
                        <button className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors w-full text-left">
                           English
                        </button>
                        <button className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors w-full text-left">
                           বাংলা
                        </button>
                        <button className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors w-full text-left">
                           Español
                        </button>
                     </div>
                  )}
               </div>

               {/* Auth */}
               {!user ? (
                  <Link
                     to="/login"
                     className="block mt-2 px-3 py-2 rounded-md text-base font-medium text-center text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                     onClick={toggleMenu}
                  >
                     Join Us
                  </Link>
               ) : (
                  <>
                     <div className="px-3 py-2 border-t border-gray-100 mt-2">
                        <p className="text-sm font-medium text-gray-800">{user.displayName || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                     </div>
                     <Link
                        to="/profile"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                        onClick={toggleMenu}
                     >
                        Update Profile
                     </Link>
                     <Link
                        to="/dashboard"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                        onClick={toggleMenu}
                     >
                        Dashboard
                     </Link>
                     <button
                        onClick={() => {
                              logOut()
                           toggleMenu()
                        }}
                        className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                     >
                        <FiLogOut className="mr-2" /> Logout
                     </button>
                  </>
               )}
            </div>
         </div>
      </nav>
   )
}

export default Navbar