

// Helper function to handle responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw errorData.message || "Something went wrong";
    }
    return response.json();
};

// Register Car Owner
export const signupCarOwner = async (formData) => {
    try {
        const response = await fetch(`http://localhost:5000/api/carowners/signupOwner`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json(); // Properly parse response

        if (!response.ok) {
            throw new Error(data.message || "Signup failed");
        }

        return data; // Return parsed response
    } catch (error) {
        console.error("Signup API Error:", error);
        throw error;
    }
};


// Login Car Owner
export const loginCarOwner = async (formData) => {
    try {
        const response = await fetch(`http://localhost:5000/api/carowners/loginOwner`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
        }

        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};


// Fetch Dashboard Data (Requires Auth)
export const getDashboard = async (token) => {
    try {
        const response = await fetch(`http://localhost:5000/api/carowners/dashboardOwner`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch dashboard data");
        }

        // console.log("Dashboard Response:", response);



        return response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};



// ***************************************************************************************************************************************************
// For Members only

// Register Member
export const signupMember = async (userData) => {
    try {
        const response = await fetch("http://localhost:5000/api/members/signupMember", {
            method: "POST",
            body: userData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Signup failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Signup API Error:", error.message);
        throw error;
    }
};


// Login Member
export const loginMember = async (credentials) => {
    try {
        const response = await fetch("http://localhost:5000/api/members/loginMember", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        return data;
    } catch (error) {
        console.error("API error:", error);
        throw error;
    }
};


// Fetch Member Dashboard Data
export const getDashboardMember = async (token) => {
    try {
        // console.log("Sending Token:", token); // Debugging log

        const response = await fetch("http://localhost:5000/api/members/dashboardMember", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token // Sending raw token
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch dashboard data");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
};


// ****************************************************************************************************************88

export const getCarOwnersByLocation = async (location) => {
    try {
        const response = await fetch(`http://localhost:5000/api/carowners/${location}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch car owners");
        }

        return data.data; // Return only the car owners data
    } catch (error) {
        console.error("Error fetching car owners:", error);
        throw error;
    }
};



export const getBookings = async (ownerId) => {
    try {
        // Make the API request to fetch bookings
        const response = await fetch(`http://localhost:5000/api/bookings/owner/${ownerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Use token from localStorage for authentication
            },
        });

        // Check if the response status is OK (200)
        if (!response.ok) {
            throw new Error("Failed to fetch booking requests");
        }

        // Parse the response as JSON
        const data = await response.json();

        // Return the booking data
        return data.bookings; // Assuming the response contains a "bookings" array
    } catch (error) {
        // Handle errors and log them
        console.error("Error fetching bookings:", error);
        throw error; // Re-throw error so it can be handled further up
    }
};