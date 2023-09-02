import React, { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "./Movie";
import { Icon } from "../../public/Icons";

export const Row = ({ rowID, title, fetchURL }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchURL);
        setMovies(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log("Hata:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchURL]);

  const handleScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    setScrollPosition(scrollLeft);
  };

  const slideLeft = () => {
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = scrollPosition + 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = scrollPosition - 500;
  };

  return (
    <>
      {isLoading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="flex flex-col mx-2 mt-4 relative ">
          <span className="text-white mb-2 font-semibold text-3xl ">
            {title}
          </span>
          <button
            className={`absolute right-0 top-1/2 z-[100] ${
              scrollPosition >= movies.length * 200 ? "hidden" : ""
            }`}
            onClick={slideLeft}
          >
            <Icon name="forward" />
          </button>
          <div
            id={"slider" + rowID}
            className="flex gap-3 w-full overflow-x-scroll"
            style={{ overflowX: "hidden" }}
            onScroll={handleScroll}
          >
            {movies.map((movie, index) => (
              <div key={index}>
                <Movie movie={movie} />
              </div>
            ))}
          </div>
          <button
            className={`absolute top-1/2 ml-2 ${
              scrollPosition === 0 ? "hidden" : ""
            }`}
            onClick={slideRight}
          >
            <Icon name="back" />
          </button>
        </div>
      )}
    </>
  );
};
