import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCar, FaUserCircle, FaBars } from "react-icons/fa";
import { signupCarOwner } from "../../../utils/api";

const Footer = () => {
  return (
    <div className="bg-green-100 text-gray-800 py-4 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Side - LPUBER pvt ltd */}
        <div className="text-sm mb-4 md:mb-0">
        ©2025 - Car-Pooling services by LPU
        </div>

        {/* Right Side - Links */}
        <div className="flex space-x-6">
          <Link
            to="/terms-and-services"
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
    <nav className="w-full bg-green-100 py-4 px-6 flex justify-between items-center">
      {/* Left Side - LPUBER Logo */}
      <div className="text-xl font-bold flex items-center space-x-2 text-gray-800">
        <FaCar className="text-green-700" />
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

const SignupOwner = () => {
  const navigate = useNavigate();

  // City and Colony Data (Mock API Data - Replace with API Call)
  const cityToColoniesMap = {
    Jalandhar: [
      "Wariana",
      "Sangal Sohal",
      "Shiv Nagar",
      "Nandanpur",
      "Maqsudan",
      "Rajnagar",
      "Gulmohar Garden Colony",
      "Ravidass Nagar",
      "Basti Bawa Khel",
      "Basti Guzan",
      "Satnam Nagar",
      "New Dashmesh Nagar",
      "Guru Teg Bahadur Nagar",
      "Khurla Kingra",
      "AbadPura",
      "Civil Lines",
      "Urban Estate",
      "Punjab Housing Board Colony",
      "Mithapur",
      "Ekta Nagar",
      "Karol Bagh",
      "Santokh Pura",
      "KishanPura",
    ],
    "Jalandhar Cantt": [
      "New SA Colony",
      "Defence Colony",
      "Rama Mandi",
      "Dakoha",
      "Dhanowali",
      "Binngaan Village",
      "ParagPur",
      "Salempur Masandan",
      "Kot Kalan",
      "Khajrula",
    ],
    Phagwara: [
      "Mehat",
      "Khangura",
      "Chak Hakim",
      "Green Avenue",
      "Dashmesh Nagar",
      "Green Park",
      "Satnampura",
      "Hajipur",
      "Bulla Rai",
      "Khalsa Enclave",
      "Purewal Nagar",
      "Phagwara Sharki",
      "Subhash Nagar",
      "Gurdwara Singh Sabha",
      "Jasdil Nagar",
      "Green Town",
      "Sham Nagar",
      "Dhak Chachoki",
      "Onkar Nagar",
      "New Model Town",
      "Guru Hargobind Nagar",
      "S.B.S Nagar",
      "Adarsh Nagar",
      "Raja Garden",
      "Narang Shahpur",
      "Mast Nagar",
      "Bhagatpura",
      "Raja Garden",
      "Basant Nagar",
      "Prem Nagar",
      "Nangal Colony",
      "Industrial Area",
    ],
    Ludhiana: ["Colony I", "Colony J"],
  };

  const [formData, setFormData] = useState({
    name: "",
    uid: "",
    carModel: "",
    carNumberPlate: "",
    mobile: "",
    password: "",
    seats: "",
    place: "", // City
    colony: "",
    parkingPlaceAtLPU: "",
    profilePhoto: null,
  });

  const [colonies, setColonies] = useState([]); // Holds the colonies for selected city
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle city change and update colonies list
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setFormData({ ...formData, place: selectedCity, colony: "" }); // Reset colony on city change
    setColonies(cityToColoniesMap[selectedCity] || []); // Update colonies based on city
  };

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

    // Validation checks
    if (formData.uid.length !== 5) {
      setError("UID must be exactly 5 digits.");
      setLoading(false);
      return;
    }
    if (formData.mobile.length !== 10) {
      setError("Mobile number must be 10 digits.");
      setLoading(false);
      return;
    }
    const seatsNumber = parseInt(formData.seats, 10);
    if (isNaN(seatsNumber) || seatsNumber <= 0) {
      setError("Number of seats must be a positive number.");
      setLoading(false);
      return;
    }

    if (!formData.profilePhoto) {
      setError("Please upload a profile photo");
      setLoading(false);
      return;
    }

    const formattedData = new FormData();
    formattedData.append("name", formData.name);
    formattedData.append("uid", formData.uid);
    formattedData.append("carModel", formData.carModel);
    formattedData.append("carNumberPlate", formData.carNumberPlate);
    formattedData.append("mobile", formData.mobile);
    formattedData.append("password", formData.password);
    formattedData.append("seats", formData.seats);
    formattedData.append("city", formData.place);
    formattedData.append("colony", formData.colony);
    formattedData.append("parkingPlaceAtLPU", formData.parkingPlaceAtLPU);
    formattedData.append("profilePhoto", formData.profilePhoto);

    try {
      const response = await signupCarOwner(formattedData);
      if (response.success) {
        localStorage.setItem("loggedInOwner", JSON.stringify(response.data));
        navigate("/dashboardOwner");
      } else {
        setError(response.message || "Signup failed. Try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-green-100 min-h-screen">
      <Navbar />
      {/* Add margin-top to the form container to avoid collision with the navbar */}
      <div className="flex justify-center items-center mt-16"> {/* Adjusted margin-top */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-100 mb-10">
          <h2 className="text-2xl font-bold text-green-700 text-center">
            Signup as Car Owner
          </h2>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="number"
              name="uid"
              placeholder="Enter UID (5 digits)"
              value={formData.uid}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="carModel"
              placeholder="Enter Car Model"
              value={formData.carModel}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="carNumberPlate"
              placeholder="Enter Car Number Plate"
              value={formData.carNumberPlate}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="number"
              name="seats"
              placeholder="Enter Number of Seats"
              value={formData.seats}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <select
              name="place"
              value={formData.place}
              onChange={handleCityChange}
              required
              className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select City</option>
              {Object.keys(cityToColoniesMap).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              name="colony"
              value={formData.colony}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Colony</option>
              {colonies.map((colony) => (
                <option key={colony} value={colony}>
                  {colony}
                </option>
              ))}
            </select>

            <select
              name="parkingPlaceAtLPU"
              value={formData.parkingPlaceAtLPU}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Parking Place at LPU</option>
              <option value="LPU main gate parking">
                LPU main gate parking
              </option>
              <option value="Animation building k side me">
                Animation building k side me
              </option>
              <option value="Kids school k samne">Kids school k samne</option>
              <option value="Girls hostel 5 6 ki side me">
                Girls hostel 5 6 ki side me
              </option>
              <option value="Block 34 k peche">Block 34 k peche</option>
              <option value="BH-2 BH-3 k samne">BH-2 BH-3 k samne</option>
              <option value="Block 55 56 57 k samne">
                Block 55 56 57 k samne
              </option>
            </select>

            <div className="flex flex-col">
              <label htmlFor="profilePhoto" className="text-sm text-gray-600">
                Upload Profile Photo
              </label>
              <input
                type="file"
                name="profilePhoto"
                id="profilePhoto"
                onChange={handleFileChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            >
              {loading ? "Signing Up..." : "Signup"}
            </button>
          </form>
          <p className="text-center text-sm mt-3">
            Already a user?{" "}
            <Link to="/loginOwner" className="text-green-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default SignupOwner;