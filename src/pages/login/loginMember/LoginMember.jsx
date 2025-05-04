import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginMember } from "../../../utils/api";
import { FaCar, FaBars } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";


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







const LoginMember = () => {
  const [formData, setFormData] = useState({ uid: "", password: "" });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      const response = await loginMember(formData);
      if (response?.token) {
        localStorage.setItem("authToken", response.token);

        // Show success toast
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
        });

        // Redirect after a short delay
        setTimeout(() => navigate("/dashboardMember"), 2000);
      } else {
        toast.error("Invalid UID or password.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally{
      setLoading(false);
    }
  };

  // console.log(formData);

  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Navbar */}
      <Navbar />
      
      

      {/* Login Form */}
      <div className="flex justify-center items-center flex-grow p-6">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-sm w-full">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
            Login as Member
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              name="uid"
              placeholder="Enter UID"
              value={formData.uid}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Password Input with Eye Icon */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-600" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer transition duration-200"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="text-gray-600 text-sm text-center mt-4">
            New User?{" "}
            <Link to="/signupMember" className="text-blue-500 hover:underline">
              Signup here
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginMember;
