import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCar, FaBars } from "react-icons/fa";
import { loginCarOwner } from "../../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-green-100 text-gray-800 py-4 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm mb-4 md:mb-0">©2025 - Car-Pooling services by LPU</div>
        <div className="flex space-x-6">
          <Link to="/terms-and-services" className="text-sm hover:text-blue-500 transition-colors duration-300">
            Terms and Services
          </Link>
          <Link to="/review" className="text-sm hover:text-blue-500 transition-colors duration-300">
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
    <nav className="w-full bg-green-100 py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold flex items-center space-x-2 text-gray-800">
        <FaCar className="text-green-700" />
        <Link to="/">LPUBER</Link>
      </div>
      <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
        <Link to="/loginMember" className="text-gray-800 hover:text-blue-500 font-medium hover:underline transform hover:scale-110 transition-all duration-300">
          Member
        </Link>
        <Link to="/loginOwner" className="text-gray-800 hover:text-blue-500 font-medium hover:underline transform hover:scale-110 transition-all duration-300">
          Car Owner
        </Link>
      </div>
      <div className="flex items-center space-x-3 md:space-x-6">
        <Link to="/admin" className="text-gray-800 hover:text-blue-500 transform hover:scale-110 transition-all duration-300">
          <FaUserCircle className="text-2xl" />
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-800 hover:text-blue-500">
          <FaBars className="text-2xl" />
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md py-4 px-6">
          <Link to="/loginMember" className="block text-gray-800 hover:text-blue-500 font-medium py-2">
            Member
          </Link>
          <Link to="/loginOwner" className="block text-gray-800 hover:text-blue-500 font-medium py-2">
            Car Owner
          </Link>
        </div>
      )}
    </nav>
  );
};

const LoginOwner = () => {
  const [formData, setFormData] = useState({ uid: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginCarOwner(formData);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("loggedInOwner", JSON.stringify(response.carOwner));
        toast.success("Login successful!", { position: "top-right", autoClose: 2000 });
        setTimeout(() => navigate("/dashboardOwner"), 2000);
      } else {
        toast.error(response.message || "Login failed. Check your credentials.");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-green-100 min-h-screen">
      <Navbar />
      <ToastContainer />
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-green-700 text-center">Login as Car Owner</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="number"
              name="uid"
              placeholder="Enter UID"
              value={formData.uid}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
              />
              <button type="button" className="absolute inset-y-0 right-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-600" /> : <Eye className="w-5 h-5 text-gray-600" />}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition mt-3 flex justify-center items-center"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Login"}
            </button>
          </form>
          <p className="text-center text-sm mt-3">
            New User? <Link to="/signupOwner" className="text-green-600 hover:underline">Signup here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginOwner;
