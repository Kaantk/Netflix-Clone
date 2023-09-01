import React, { useState } from "react";
import { Icon } from "../../public/Icons";

export const Movie = ({ movie }) => {
  const [like, setLike] = useState(true);

  const getData = (movie) => {
    console.log(movie);
  };
  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] relative overflow-hidden transition-transform duration-200 hover:scale-95">
      <div className="w-full h-full bg-black"></div>
      <img
        className="w-full h-auto cursor-pointer inline-block rounded-md"
        src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
        alt={movie?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {movie?.title}
        </p>
        <p onClick={getData}>
          {like ? (
            <Icon
              name="favorite"
              className="absolute top-4 left-4 text-gray-300"
            />
          ) : (
            <Icon
              name="favorite"
              className="absolute top-4 left-4 text-gray-300"
            />
          )}
        </p>
      </div>
    </div>
  );
};
