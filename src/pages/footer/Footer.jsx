import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-200 text-gray-800 py-4 px-6">
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

export default Footer;