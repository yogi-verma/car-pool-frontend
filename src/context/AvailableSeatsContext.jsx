import { createContext, useState } from "react";

// Create a context for availableSeats
export const AvailableSeatsContext = createContext();

// Create a provider component
export const AvailableSeatsProvider = ({ children }) => {
  const [availableSeats, setAvailableSeats] = useState(0); // Initial value

  return (
    <AvailableSeatsContext.Provider value={{ availableSeats, setAvailableSeats }}>
      {children}
    </AvailableSeatsContext.Provider>
  );
};