import { createContext, useState } from "react";

const MovieCards = createContext();

const MovieContext = ({ children }) => {
  const [seats, setSeats] = useState([]);
  return (
    <MovieCards.Provider value={{ seats, setSeats }}>
      {children}
    </MovieCards.Provider>
  );
};

export { MovieCards, MovieContext };
