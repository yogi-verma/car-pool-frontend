import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardMember } from "../../../utils/api";
import { motion } from "framer-motion";
import { ImLocation2 } from "react-icons/im";
import axios from "axios";
import { BsWhatsapp } from "react-icons/bs";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// import { AvailableSeatsContext } from "../../../context/AvailableSeatsContext"; // Import the context
import { FaUserCircle } from "react-icons/fa";

const DashboardMember = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [carOwners, setCarOwners] = useState([]);
  const [filteredCarOwners, setFilteredCarOwners] = useState([]);
  const [selectedColony, setSelectedColony] = useState("");
  const [selectedParking, setSelectedParking] = useState("");
  const [colonies, setColonies] = useState([]);
  const [parkingPlaces, setParkingPlaces] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown




  // const { availableSeats } = useContext(AvailableSeatsContext); // Access the context

  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    name: "Fetching location...",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/loginMember");
        return;
      }

      try {
        const userData = await getDashboardMember(token);
        setUser(userData);
      } catch (err) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        navigate("/loginMember");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchCarOwners = async (place) => {
    setLoading(true);
    setSelectedPlace(place);
    setError("");
    setIsFilterApplied(false);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/carowners/${place}`
      );

      const sortedCarOwners = response.data.data.sort((a, b) => {
        return b.isOnline - a.isOnline;
      });

      setCarOwners(sortedCarOwners);
      setFilteredCarOwners(sortedCarOwners);

      const uniqueColonies = [
        ...new Set(sortedCarOwners.map((owner) => owner.colony)),
      ];
      const uniqueParkingPlaces = [
        ...new Set(sortedCarOwners.map((owner) => owner.parkingPlaceAtLPU)),
      ];

      setColonies(uniqueColonies);
      setParkingPlaces(uniqueParkingPlaces);
    } catch (err) {
      setError("Failed to fetch car owners. Please try again.");
    }
    setLoading(false);
  };



   const handleDeleteAccount = async () => {
      if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        try {
          await axios.delete(`http://localhost:5000/api/members/${user.muid}`);
          alert("Account deleted successfully.");
          localStorage.removeItem("token");
          localStorage.removeItem("loggedInOwner");
          navigate("/loginOwner");
        } catch (error) {
          console.error("Error deleting account:", error.message);
          alert("Failed to delete account. Please try again.");
        }
      }
    };




  const applyFilters = () => {
    let filteredList = carOwners;

    if (selectedColony) {
      filteredList = filteredList.filter(
        (owner) => owner.colony === selectedColony
      );
    }

    if (selectedParking) {
      filteredList = filteredList.filter(
        (owner) => owner.parkingPlaceAtLPU === selectedParking
      );
    }

    setFilteredCarOwners(filteredList);
    setIsFilterApplied(true);
  };

  const resetFilters = () => {
    setSelectedColony("");
    setSelectedParking("");
    setFilteredCarOwners(carOwners);
    setIsFilterApplied(false);
  };

  useEffect(() => {
    if (!isFilterApplied) {
      setFilteredCarOwners(carOwners);
    }
  }, [carOwners, isFilterApplied]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const response = await fetch(
              `https://us1.locationiq.com/v1/reverse.php?key=pk.a838246bf6b4978d6228b936371d2e54&lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            setLocation({
              lat: latitude,
              lon: longitude,
              name: data.display_name,
            });

            const map1 = L.map("map").setView([latitude, longitude], 16);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: "© Yogesh Verma",
            }).addTo(map1);

            L.marker([latitude, longitude])
              .addTo(map1)
              .bindPopup(`<b>Your Location</b><br>${data.display_name}`)
              .openPopup();
          } catch (error) {
            console.error("Error fetching location:", error);
            setLocation((prev) => ({
              ...prev,
              name: "Unable to fetch location.",
            }));
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation((prev) => ({ ...prev, name: "Location access denied." }));
        }
      );
    } else {
      setLocation({
        lat: null,
        lon: null,
        name: "Geolocation is not supported by your browser.",
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/loginMember");
  };

  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-50">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  // console.log("Available Seats in DashboardMember:", availableSeats);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-50 text-gray-800 pt-24">
      {" "}
      {/* Add pt-24 here */}
      {/* Navbar */}
      <motion.nav
        className="bg-white bg-opacity-80 backdrop-blur-lg shadow-lg p-4 flex justify-between items-center fixed w-full top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xl font-semibold tracking-wide text-blue-600">
          🚀 Hello, {user?.name || "User"}
        </span>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:outline-none hover:scale-105 transition"
          >
            <FaUserCircle className="text-3xl text-blue-500 hover:cursor-pointer transition-transform duration-200 hover:scale-105" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
              <ul className="py-2">
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-blue-900 hover:bg-blue-200"
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleDeleteAccount}
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                  >
                    Delete Account
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </motion.nav>
      {/* Member Profile Card */}
      <motion.div
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-26 h-26 rounded-full overflow-hidden border-4 border-blue-500">
          <img
            src={
              user?.profilePhoto?.startsWith("http")
                ? user.profilePhoto
                : user?.profilePhoto
                ? `http://localhost:5000/${user.profilePhoto}`
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mt-4">
          Name : {user?.name || "User"}
        </h3>
        <p className="text-gray-600 mt-2">
          "Drive with confidence and connect with fellow members."
        </p>
      </motion.div>
      {/* Rest of the Dashboard Content */}
      <motion.div
        className="flex flex-col items-center mt-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Select your location
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Jalandhar", "Jalandhar Cantt", "Phagwara", "Ludhiana"].map(
            (location, index) => (
              <motion.button
                key={index}
                className={`relative flex flex-col items-center justify-center px-6 py-3 ${
                  selectedPlace === location ? "bg-green-500" : "bg-blue-500"
                } text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition transform hover:scale-105`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchCarOwners(location)}
              >
                <motion.span
                  className="top-2 text-red-500 text-2xl"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImLocation2 />
                </motion.span>
                {location}
              </motion.button>
            )
          )}
        </div>
      </motion.div>
      {/* Filters Section */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <h4 className="text-xl font-semibold text-gray-800 mt-1">Filters</h4>
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm"
          onChange={(e) => setSelectedColony(e.target.value)}
          value={selectedColony}
        >
          <option value="">All Colonies</option>
          {colonies.map((colony, index) => (
            <option key={index} value={colony}>
              {colony}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm"
          onChange={(e) => setSelectedParking(e.target.value)}
          value={selectedParking}
        >
          <option value="">All Parking Places</option>
          {parkingPlaces.map((parking, index) => (
            <option key={index} value={parking}>
              {parking}
            </option>
          ))}
        </select>

        <motion.button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 transition rounded-lg shadow-md text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={applyFilters}
        >
          Enter
        </motion.button>

        <motion.button
          className="px-4 py-2 bg-red-500 hover:bg-red-600 transition rounded-lg shadow-md text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetFilters}
        >
          Reset
        </motion.button>
      </div>
      {/* Car Owners List */}
      <motion.div
        className="mt-10 p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-6">
          {selectedPlace
            ? `Car Owners in ${selectedPlace}`
            : "Select a Location"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCarOwners.map((owner) => (
            <motion.div
              key={owner._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Top Section: Profile Picture, Availability, and Name */}
              <div className="flex items-center gap-4">
                {/* Profile Picture */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-500">
                  <img
                    src={
                      owner?.profilePhoto?.startsWith("http")
                        ? owner.profilePhoto
                        : owner?.profilePhoto
                        ? `http://localhost:5000/${owner.profilePhoto}`
                        : "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Availability and Name */}
                <div>
                  <p className="text-gray-700 flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        owner.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                    {owner.isOnline ? "Available" : "Not Available"}
                  </p>
                  <h4 className="text-xl font-semibold text-blue-600">
                    {owner.name}
                  </h4>
                </div>
              </div>

              {/* Middle Section: Details */}
              <div className="mt-4 space-y-2">
                {/* <p className="text-blue-600 mt-2">
                  Available Seats:{availableSeats > 0 ? availableSeats : "Full"}

                </p> */}
                <p className="text-gray-700">
                  <strong>UID:</strong> {owner.uid}
                </p>
                <p className="text-gray-700">
                  <strong>Car Model:</strong> {owner.carModel}
                </p>
                <p className="text-gray-700">
                  <strong>Car Number Plate:</strong> {owner.carNumberPlate}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {owner.mobile}
                </p>
                <p className="text-gray-700">
                  <strong>Colony:</strong> {owner.colony}
                </p>
                <p className="text-gray-700">
                  <strong>Parking Place:</strong> {owner.parkingPlaceAtLPU}
                </p>
              </div>

              {/* Bottom Section: WhatsApp and Call Now Buttons */}
              <div className="flex items-center gap-3 mt-6">
                {/* WhatsApp Button */}
                <a
                  href={`https://api.whatsapp.com/send?phone=${owner.mobile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-green-500 transition-all duration-300"
                >
                  <BsWhatsapp className="text-green-500 text-2xl" />
                  <span>Send a message</span>
                </a>

                {/* Call Now Button */}
                <a
                  href={owner.isOnline ? `tel:${owner.mobile}` : "#"}
                  className={`flex-1 text-center px-4 py-2 rounded-lg transition-all duration-300 ${
                    owner.isOnline
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                  title={owner.isOnline ? "" : "Rider is not available"}
                >
                  Call Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardMember;
