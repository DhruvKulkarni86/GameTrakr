import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Explore.css";
import "animate.css";
const NewReleases = () => {
  const [actiongames, setActionGames] = useState([]);
  const [loading, isLoading] = useState(true)

  let POP_URL = `https://api.rawg.io/api/games`;
  useEffect(() => {
    axios({
      url: `${POP_URL}?key=${process.env.REACT_APP_RAWG_KEY}&dates=2021-01-01,2022-10-10&ordering=-added`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      method: "GET",
    })
      .then((res) => {
        setActionGames(res.data.results);
        isLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [POP_URL]);

  const scroll = (scrollOffset) => { 
    let elem = document.getElementById("slide-new-rel");
    elem.scrollLeft += scrollOffset;
    console.log(scrollOffset);
    console.log(elem);
  };

  return (
    <div className="anim">
      {loading}
      <div className="explore_container">
        <h3 className="own_span">New and Trending Games</h3>
        <div className="slide-btn">
        <button onClick={() => scroll(-1400)} className="prev-btn">
          {
            <p className="btn-left">{"<"}</p>
          }
        </button>
        <button onClick={() => scroll(1400)} className="next-btn">
          {
            <p className="btn-right">{">"}</p>
          }
        </button>
        </div>
        <div className="slide-btn-width-4">
        <button onClick={() => scroll(-1100)} className="prev-btn">
          {
            <p className="btn-left">{"<"}</p>
          }
        </button>
        <button onClick={() => scroll(1100)} className="next-btn">
          {
            <p className="btn-right">{">"}</p>
          }
        </button>
        </div>
         <div className="slide-btn-width-3">
        <button onClick={() => scroll(-870)} className="prev-btn">
          {
            <p className="btn-left">{"<"}</p>
          }
        </button>
        <button onClick={() => scroll(870)} className="next-btn">
          {
            <p className="btn-right">{">"}</p>
          }
        </button>
        </div>
      </div>
      <div id="slide-new-rel" className="explore_inner_container">
        {actiongames.length !== 0 ? (
          actiongames.map((game, index) => {
            let gameurl = game.background_image.split("/");
            let newURL = ` https://media.rawg.io/media/crop/600/400/${gameurl[4]}/${gameurl[5]}/${gameurl[6]}`;
            return (
              <div key={index} className="explore-wrap">
                <a
                  href={`/view/${game.id}/${game.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="explore_page">
                    <div className="explore_game_image">
                      <img
                        src={newURL}
                        alt={game.name}
                        className="explore_game_image"
                      />
                    </div>
                    <div className="explore_content">
                      <p className="game_title">{game.name}</p>
                    </div>
                  </div>
                </a>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NewReleases;
