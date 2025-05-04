import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import Footer from "../footer/Footer";
import logo from "../../assets/logo2.png"

// Placeholder image URLs (replace with your actual image paths)
import img1 from "../../assets/img11.jpg";
import img2 from "../../assets/img8.avif";
import { FaUserCircle, FaBars, FaCarSide } from "react-icons/fa";

// import CarAnimation from "../carAnimation/CarAnimation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-100 shadow-md py-4 px-6 flex justify-between items-center z-50">
      {/* Left Side - LPUBER Logo */}
      <div className="text-xl font-bold flex items-center space-x-2 text-gray-800">
        {/* <FaCar className="text-gray-800" /> */}
        <Link to="/">
          <span>LPUGo </span>
        </Link>
        <FaCarSide className="text-gray-800"/>
      </div>

      {/* Middle - Member and Car Owner Links (Hidden on Small Screens) */}
      <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
        <Link
          to="/loginMember"
          className="text-gray-800 hover:text-blue-500 font-medium hover:underline transform hover:scale-110 transition-all duration-300"
        >
          Member
        </Link>
        <Link
          to="/loginOwner"
          className="text-gray-800 hover:text-blue-500 font-medium hover:underline transform hover:scale-110 transition-all duration-300"
        >
          Car Owner
        </Link>
      </div>

      {/* Right Side - Profile Icon and Hamburger Icon */}
      <div className="flex items-center space-x-3 md:space-x-6">
        {/* Profile Icon */}
        <Link
          to="/admin" // Replace with your profile route
          className="text-gray-800 hover:text-blue-500 transform hover:scale-110 transition-all duration-300"
        >
          <FaUserCircle className="text-2xl" />{" "}
          {/* Replace with your preferred profile icon */}
        </Link>

        {/* Mobile Menu Button (Hamburger Icon) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle mobile menu state
            className="text-gray-800 hover:text-blue-500 focus:outline-none"
          >
            <FaBars className="text-2xl" /> {/* Hamburger icon */}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md py-4 px-6">
          <Link
            to="/loginMember"
            className="block text-gray-800 hover:text-blue-500 font-medium py-2"
          >
            Member
          </Link>
          <Link
            to="/loginOwner"
            className="block text-gray-800 hover:text-blue-500 font-medium py-2"
          >
            Car Owner
          </Link>
        </div>
      )}
    </nav>
  );
};

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-50 to-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* <CarAnimation /> */}


      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
          {/* Card 1: Members Only */}
          <div className="w-full md:w-1/3">
            <div className="card bg-blue-100 rounded-lg shadow-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={img1} alt="Members" className="w-full h-48" />
              <div className="p-6">
                <div className="heading text-2xl font-bold text-gray-800 mb-4">
                  Members Only
                </div>
                <div className="icons">
                  <Link to="/loginMember">
                    <button className="px-4 py-2 bg-blue-500 text-white text-md font-semibold rounded-lg hover:bg-blue-700 hover:cursor-pointer transition duration-300 shadow-md">
                      Click Here
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Car Owners Only */}
          <div className="w-full md:w-1/3">
            <div className="card bg-green-100 rounded-lg shadow-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={img2}
                alt="Car Owners"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="heading text-2xl font-bold text-gray-800 mb-4">
                  Car Owners Only
                </div>
                <div className="icons">
                  <Link to="/loginOwner">
                    <button className="px-4 py-2 bg-green-500 text-white text-md font-semibold rounded-lg hover:bg-green-700 hover:cursor-pointer transition duration-300 shadow-md">
                      Click Here
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainPage;
