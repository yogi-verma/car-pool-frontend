import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaCar, FaUserCircle, FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-100 shadow-md py-4 px-6 flex justify-between items-center z-50">
      {/* Left Side - LPUBER Logo */}
      <div className="text-xl font-bold flex items-center space-x-2 text-gray-800">
        <FaCar className="text-gray-800" />
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

const TermsAndServices = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-50 to-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-700 mb-6 text-center">
            Terms and Services
          </h1>

          {/* Introduction */}
          <p className="text-gray-700 mb-6 text-sm">
            Welcome to LPUBER! By using our services, you agree to comply with and be bound by the
            following terms and conditions. Please read them carefully before using our platform.
          </p>

          {/* Section 1: Acceptance of Terms */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              1. Acceptance of Terms
            </h1>
            <p className="text-gray-700 text-sm">
              By accessing or using LPUBER, you agree to these Terms and Services. If you do not
              agree to these terms, you may not use our services.
            </p>
          </div>

          {/* Section 2: User Responsibilities */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              2. User Responsibilities
            </h1>
            <p className="text-gray-700 text-sm">
              As a user of LPUBER, you are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-700 pl-4 text-sm">
              <li>Providing accurate and up-to-date information.</li>
              <li>Respecting the rights of other users.</li>
              <li>Complying with all applicable laws and regulations.</li>
              <li>Not engaging in any fraudulent or harmful activities.</li>
            </ul>
          </div>

          {/* Section 3: Privacy Policy */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              3. Privacy Policy
            </h1>
            <p className="text-gray-700 text-sm">
              Your privacy is important to us. Please review our{" "}
              <Link to="/privacy-policy" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>{" "}
              to understand how we collect, use, and protect your personal information.
            </p>
          </div>

          {/* Section 4: Limitation of Liability */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              4. Limitation of Liability
            </h1>
            <p className="text-gray-700 text-sm">
              LPUBER shall not be liable for any indirect, incidental, or consequential damages
              arising out of or related to the use of our services. We strive to provide accurate
              and reliable information, but we do not guarantee the completeness or accuracy of the
              content on our platform.
            </p>
          </div>

          {/* Section 5: Changes to Terms */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              5. Changes to Terms
            </h1>
            <p className="text-gray-700 text-sm">
              LPUBER reserves the right to modify these Terms and Services at any time. Any changes
              will be effective immediately upon posting on our platform. Your continued use of our
              services constitutes acceptance of the updated terms.
            </p>
          </div>

          {/* Contact Information */}
          <div className="text-center mt-8">
            <p className="text-gray-700 text-sm">
              If you have any questions about these Terms and Services, please contact us at{" "}
              <a href="mailto:yogeshvermapys143@.com" className="text-blue-500 hover:underline">
                yogeshvermapys143@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default TermsAndServices;