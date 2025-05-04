import img from "../../assets/pic.jpg";
import { Link } from "react-router-dom";
import { FaCar, FaUserCircle, FaBars } from "react-icons/fa";
import { useState } from "react";
import img1 from "../../assets/mam-admin.jpg"


const Footer = () => {
    return (
      <div className="bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 py-4 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Left Side - LPUBER pvt ltd */}
          <div className="text-sm mb-4 md:mb-0">
          ©2025 - Car-Pooling services by LPU
          </div>
  
          {/* Right Side - Links */}
          <div className="flex space-x-6">
            <Link
              to="/terms"
              className="text-sm hover:text-blue-500 transition-colors duration-300"
            >
              Terms and Services
            </Link>
            
            <Link
              to="/review"
              className="text-sm hover:text-blue-500 transition-colors duration-300"
            >
              Review / Report
            </Link>
          </div>
        </div>
      </div>
    );
  };

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="w-full bg-gradient-to-r from-blue-300 to-purple-300 py-4 px-6 flex justify-between items-center">
        {/* Left Side - LPUBER Logo */}
        <div className="text-xl font-bold flex items-center space-x-2 text-gray-800">
          <FaCar className="text-gary-800" />
          <Link to="/">
          <span>LPUBER</span>
        </Link>
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

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-300">
    {/* Navbar at the Top */}
    <Navbar />
  
    {/* Centered Cards */}
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 p-4 w-full max-w-4xl">
        {/* Card 1 */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800  rounded-lg shadow-2xl p-8 w-full text-center text-white">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <img
              src={img1}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          </div>
  
          {/* Name */}
          <h1 className="text-2xl font-bold mt-4">Aastha Sharma(Admin)</h1>
  
          {/* Summary */}
          <p className="mt-4 text-sm leading-relaxed">
          As an Assistant Professor in Computer Applications at Lovely Professional University, I specialize in databases, teaching SQL, data modeling, and advanced concepts. I emphasize practical applications, mentor students, and integrate modern technologies into the curriculum, bridging the gap between theory and industry to prepare students for data-driven careers.          
          </p>
  
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mt-6">
            <a
              href="https://www.linkedin.com/in/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            
          </div>
        </div>
  
        {/* Card 2 */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-2xl p-8 w-full text-center text-white">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <img
              src={img}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          </div>
  
          {/* Name */}
          <h1 className="text-2xl font-bold mt-4">Yogesh Verma(Developer)</h1>
  
          {/* Summary */}
          <p className="mt-4 text-sm leading-relaxed">
          I am a B.Tech Computer Science student at Lovely Professional University, honing technical skills in C++ and web development in MERN stack. Passionate about learning, I balance academics with high-intensity workouts, singing, and dancing. A focused, optimistic and goal-driven team player, I approach challenges with optimism, adaptability, and a commitment to continuous growth and innovation.
          </p>
  
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mt-6">
            <a
              href="www.linkedin.com/in/pys123"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  
    {/* Footer at the Bottom */}
    <Footer />
  </div>
  );
};

export default Admin;
