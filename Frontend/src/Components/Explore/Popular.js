import React, { useEffect, useState } from "react";
import axios from "axios";

import "animate.css";

const Popular = () => {
  const [freeGames, setFreeGames] = useState([]);
  const [Loading, isLoading] = useState(true)

//!DATES
const toDate = new Date().toISOString().split('T')[0];
const d = new Date();
d.setMonth(d.getMonth()-6);
const prevDate = d.toISOString().split("T")[0];
// console.log("PREV", prevDate);
// console.log("TODATE", toDate);
//!

  let POP_URL = `https://api.rawg.io/api/games`;
  useEffect(() => {
    axios({
      url: `${POP_URL}?dates=${prevDate},${toDate}&ordering=rating,added&key=${process.env.REACT_APP_RAWG_KEY}&stores=1,5,6,11&page_size=100`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      method: "GET",
    })
      .then((res) => {
        setFreeGames(res.data.results);
        isLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [POP_URL, prevDate, toDate]);

  const scroll = (scrollOffset) => {
    let elem = document.getElementById("slide-pop");
    elem.scrollLeft += scrollOffset;
    // console.log(scrollOffset);
    // console.log(elem);
  };
  return (
    <div className="transform">
      {Loading}
      <div className="explore_container">
        <h3 className="pop_span">Trending Games</h3>
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
      <div id="slide-pop" className="explore_inner_container">
        {freeGames.length !== 0 ? (
          freeGames
            .map((game, index) => {
              let gameurl = game.background_image.split("/");
              let newURL = ` https://media.rawg.io/media/crop/600/400/${gameurl[4]}/${gameurl[5]}/${gameurl[6]}`;
              return (
                <div key={index}>
                  <a
                    href={`/view/${game.id}/${game.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="href"
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

export default Popular;
