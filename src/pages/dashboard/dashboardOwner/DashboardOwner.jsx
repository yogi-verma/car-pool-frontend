import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../../../utils/api";
import { motion } from "framer-motion";
import { PiHandHeartDuotone } from "react-icons/pi";
import { MdDirectionsCar, MdLocationOn } from "react-icons/md";
import { FaIdBadge, FaUserCircle } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import io from "socket.io-client";
import axios from "axios";
import { LuSquareParking } from "react-icons/lu";
const SOCKET_SERVER_URL = "https://car-pool-backend-eta.vercel.app";
const API_BASE_URL = "https://car-pool-backend-eta.vercel.app";

import "leaflet/dist/leaflet.css";
import L from "leaflet";


const DashboardOwner = () => {
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  const navigate = useNavigate();

  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    name: "Fetching location...",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/loginOwner");
      return;
    }

    const fetchOwnerDetails = async () => {
      try {
        const data = await getDashboard(token);
        setOwner(data);
        setIsOnline(data?.isOnline || false);


        localStorage.setItem("loggedInOwner", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching dashboard:", error.message);
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/loginOwner");
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerDetails();
  }, [navigate]);


  useEffect(() => {
    if (!owner) return;

    const socket = io(SOCKET_SERVER_URL);

    socket.emit("carOwnerOnline", owner.uid);
    setIsOnline(true);

    socket.on("updateCarOwnerStatus", ({ uid, isOnline }) => {
      if (uid === owner.uid) {
        setIsOnline(isOnline);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [owner]);

  const handleLogout = async () => {
    if (owner) {
      try {
        await axios.post(`${API_BASE_URL}/api/carowners/logoutOwner`, {
          uid: owner.uid,
        });
      } catch (error) {
        console.error("Error during logout:", error.message);
      }

      localStorage.removeItem("token");
      localStorage.removeItem("loggedInOwner");
      navigate("/loginOwner");
    }
  };



  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/carowners/${owner.uid}`);
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


  // Function to reverse geocode coordinates and get location name
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            // Fetch location name from LocationIQ API
            const response = await fetch(
              `https://us1.locationiq.com/v1/reverse.php?key=pk.a838246bf6b4978d6228b936371d2e54&lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            setLocation({
              lat: latitude,
              lon: longitude,
              name: data.display_name,
            });

            // Initialize the map
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

  if (loading)
    return (
      <motion.div
        className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </motion.div>
    );

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center">
      <motion.nav
        className="w-full bg-green-300 text-green-900 flex justify-between items-center p-4 shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-lg font-semibold">Hello, {owner?.name} 👋</span>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:outline-none hover:scale-105 transition"
          >
            <FaUserCircle className="text-3xl text-green-900" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
              <ul className="py-2">
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-green-900 hover:bg-green-100"
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

      <div className="w-full flex flex-col items-center p-6 bg-green-100">
        <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-2">
          Welcome to Your Dashboard <PiHandHeartDuotone className="text-4xl" />
        </h2>

        <motion.div
          className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-6 mb-5">
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
              <img
                src={
                  owner?.profilePhoto?.startsWith("http")
                    ? owner.profilePhoto
                    : owner?.profilePhoto
                    ? `${API_BASE_URL}/${owner.profilePhoto}`
                    : "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info (Online Status + Name) */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full ${
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></div>
                <span
                  className={`text-sm font-semibold ${
                    isOnline ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>

              <h3 className="text-3xl font-semibold text-green-700 mt-2">
                {owner?.name}
              </h3>
            </div>
          </div>

          {/* Owner Details */}
          <div className="grid grid-cols-2 gap-6 w-full">
            <div className="bg-green-100 p-4 rounded-xl shadow-md flex items-center gap-4">
              <FaIdBadge className="text-3xl text-green-700" />
              <div>
                <p className="text-gray-600 text-sm">Owner ID</p>
                <p className="text-green-800 font-bold">{owner?.uid}</p>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded-xl shadow-md flex items-center gap-4">
              <MdDirectionsCar className="text-3xl text-green-700" />
              <div>
                <p className="text-gray-600 text-sm">Car Model</p>
                <p className="text-green-800 font-bold">{owner?.carModel}</p>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded-xl shadow-md flex items-center gap-4">
              <AiOutlineNumber className="text-3xl text-green-700" />
              <div>
                <p className="text-gray-600 text-sm">Car Number Plate</p>
                <p className="text-green-800 font-bold">
                  {owner?.carNumberPlate}
                </p>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded-xl shadow-md flex items-center gap-4">
              <MdDirectionsCar className="text-3xl text-green-700" />
              <div>
                <p className="text-gray-600 text-sm">Total number of Seats</p>
                <p className="text-green-800 font-bold">
                  {owner?.numberOfSeats}
                </p>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded-xl shadow-md flex items-center gap-4">
              <MdLocationOn className="text-3xl text-green-700" />
              <div>
                <p className="text-gray-600 text-sm">City</p>
                <p className="text-green-800 font-bold">{owner?.city}</p>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded-xl shadow-md flex items-center gap-4">
              <MdLocationOn className="text-3xl text-green-700" />
              <div>
                <p className="text-gray-600 text-sm">Colony</p>
                <p className="text-green-800 font-bold">{owner?.colony}</p>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded-xl shadow-md flex items-center gap-4">
              <LuSquareParking className="text-3xl text-green-700" />
              <div>
                <p className="text-gray-600 text-sm">Parking Place</p>
                <p className="text-green-800 font-bold">
                  {owner?.parkingPlaceAtLPU}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-2xl border border-gray-300 p-6 max-w-md mx-auto m-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Your Current Location:
            </h2>
            <p className="text-gray-600 mt-2">{location.name}</p>
          </div>
          <div id="map" style={{ height: "400px", width: "100%" }}></div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOwner;
