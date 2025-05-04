import { Link } from "react-router-dom";
import { useState } from "react";
import { FaCar, FaUserCircle, FaBars } from "react-icons/fa";
import emailjs from "@emailjs/browser"; // For sending emails
import { ToastContainer, toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-green-200 text-black py-4 px-6">
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
    <nav className="w-full bg-gradient-to-r from-blue-200 to-green-200 py-4 px-6 flex justify-between items-center z-50">
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

const Review = () => {
  const [userType, setUserType] = useState("member"); // State for radio button selection
  const [uid, setUid] = useState(""); // State for UID input
  const [email, setEmail] = useState(""); // State for email input
  const [review, setReview] = useState(""); // State for review textarea
  const [error, setError] = useState(""); // State for error messages
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const [name, setName] = useState(""); // State for name input

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!uid || !email || !review || !name) {
      setError("Please fill in all fields.");
      return;
    }

    if (uid.length !== 5) {
      setError("UID must be exactly 5 digits.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Start loading
    setIsLoading(true);
    setError("");

    try {
      // Send email using EmailJS
      const templateParams = {
        userType,
        uid,
        email,
        review,
        name
      };

      await emailjs.send(
        "service_tjcbns5", // Replace with your EmailJS service ID
        "template_d25ijnp", // Replace with your EmailJS template ID
        templateParams,
        "3p5bfZi5XpAWtIm6e" // Replace with your EmailJS public key
      );

      // Show success toast
      toast.success("Email has been sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset form fields
      setUserType("member");
      setUid("");
      setEmail("");
      setReview("");
      setName("");
    } catch (err) {
      // Show error toast
      toast.error("Failed to send email. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-6 bg-gradient-to-r from-blue-200 to-green-200">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Help Us To Improve
          </h1>
          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Radio Buttons for User Type */}
            <div className="flex justify-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="member"
                  checked={userType === "member"}
                  onChange={() => setUserType("member")}
                  className="form-radio text-blue-500"
                />
                <span className="text-gray-800">Member</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="carOwner"
                  checked={userType === "carOwner"}
                  onChange={() => setUserType("carOwner")}
                  className="form-radio text-blue-500"
                />
                <span className="text-gray-800">Car Owner</span>
              </label>
            </div>

            {/* Name */}
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* UID Input */}
            <div>
              <input
                type="text"
                id="uid"
                name="uid"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                placeholder="Enter your UID"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Review Textarea */}
            <div>
              <textarea
                id="review"
                name="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review / report here..."
                rows="4"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition flex justify-center items-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Review;