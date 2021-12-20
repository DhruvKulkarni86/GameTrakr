  import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Genres.css";

const Genres = () => {
  const [Genres, setGenres] = useState([]);
  const [loading, isLoading] = useState(true);

  let POP_URL = `https://api.rawg.io/api/genres`;
  useEffect(() => {
    axios({
      url: `${POP_URL}?key=${process.env.REACT_APP_RAWG_KEY}&ordering=-metacritic`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      method: "GET",
    })
      .then((res) => {
        setGenres(res.data.results);
        isLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [POP_URL]);

  console.log(Genres);
  return (
    <div className="genre-container">
      {loading}
      <div className="genre-head">
        <h3 className="genre-title">Explore your Favorite Genres </h3>
      </div>
      <div className="genre-wrap">
        {Genres.slice(0,16).map((genre, index) => {
          // console.log("OMG", genre.image_background);
          let urlArr =  genre.image_background.split('/');
          let newURL = `https://media.rawg.io/media/crop/600/400/${urlArr[4]}/${urlArr[5]}/${urlArr[6]}`;
          // console.log("OMGNEW", newURL);
          return (
            <div className="inner-genre-wrap" key={index}>
              <div className="genre-card">
                <a
                  href={`/genre/${genre.name}/${genre.id}`}
                  className="genre-href"
                >
                  <div className="genre-img">
                    <img
                      src={newURL}
                      alt={genre.name}
                      className="img-genre"
                    ></img>
                  </div>
                  <div className="genre-name">{genre.name}</div>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Genres;
