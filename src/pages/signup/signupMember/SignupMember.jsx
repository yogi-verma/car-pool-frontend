import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupMember } from "../../../utils/api";
import { FaCar } from "react-icons/fa";
import { FaUserCircle, FaBars } from "react-icons/fa";


const Footer = () => {
  return (
    <div className="bg-blue-100 text-gray-800 py-4 px-6">
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
    <nav className="w-full bg-blue-100 py-4 px-6 flex justify-between items-center">
      {/* Left Side - LPUBER Logo */}
      <div className="text-xl font-bold flex items-center space-x-2 text-gray-800">
        <FaCar className="text-blue-500" />
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

const SignupMember = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uid: "",
    name: "",
    mobile: "",
    password: "",
    profilePhoto: null, // Add profile photo field
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePhoto: e.target.files[0] }); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (formData.uid.length !== 5) {
      setError("UID must be exactly 5 digits");
      setLoading(false);
      return;
    }
    if (formData.mobile.length !== 10) {
      setError("Mobile number must be 10 digits");
      setLoading(false);
      return;
    }
    if (!formData.profilePhoto) {
      setError("Please upload a profile photo");
      setLoading(false);
      return;
    }

    try {
      // Create FormData object
      const data = new FormData();
      data.append("uid", formData.uid);
      data.append("name", formData.name);
      data.append("mobile", formData.mobile);
      data.append("password", formData.password);
      data.append("profilePhoto", formData.profilePhoto); // Append the file

      // Call the API
      const response = await signupMember(data);
      console.log(response);
      if (response.token) {
        localStorage.setItem("authToken", response.token);
        navigate("/dashboardMember");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      {/* Navbar */}
      <Navbar />

      {/* Signup Form */}
      <div className="flex justify-center items-center flex-grow mt-16 mb-16"> {/* Added margin-top */}
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
            Signup as Member
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              name="uid"
              placeholder="Enter 5-digit UID"
              value={formData.uid}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* File Input for Profile Photo */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700">Upload Profile Photo</label>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*" // Allow only image files
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer transition duration-300"
            >
              {loading ? "Signing Up..." : "Signup"}
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/loginMember" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignupMember;