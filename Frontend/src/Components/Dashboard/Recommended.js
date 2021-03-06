import axios from "axios";
import React, { useEffect, useState } from "react";

const Recommended = () => {
  const [recommended, setRecommended] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  let user = localStorage.getItem("Username")
  useEffect(() => {
    setWishlist(
      localStorage.getItem("Wishlist")
        ? JSON.parse(localStorage.getItem("Wishlist"))
        : []
    );
  }, []);

  const DET_URL = `https://api.rawg.io/api/games`;
  useEffect(() => {
    const Recommend = () => {
      wishlist &&
        wishlist.map(async (game, index) => {
          try {
            console.log(game.slug);
            const res = await axios({
              url: `${DET_URL}/${game.slug}/game-series?key=${process.env.REACT_APP_RAWG_KEY}`,
              headers: {
                "X-Requested-With": "XMLHttpRequest",
              },
              method: "GET",
            });
            setRecommended((recommended) =>
              recommended.concat(res.data.results)
            );
            setLoading(false);
          } catch (err) {
            console.log(err);
          }
        });
    };
    Recommend();
  }, [DET_URL, wishlist]);
  // console.log(recommended);

  const uniqueGames = Array.from(new Set(recommended.map(a => a.id)))
 .map(id => {
   return recommended.find(a => a.id === id)
 })
  if (wishlist.length > 0 && user !== null) {
    return (
      <div className="transform">
        {loading}
        <div className="recommend_container">
          {recommended.length !== 0 ? 
          <h3 className="wishlistcard_header">Recommended Games Based On Your Wishlist</h3>
        :<h4 className="recommend_span">Add more Games to wishlist to see your Recommendations</h4>}
        </div>
        <div id="slide" className="pop_explore_container">
          {wishlist.length > 0 ? (
            uniqueGames.slice(0,10).sort(() => (Math.random() > .5) ? 1 : -1).map((game, index) => {
              let gameurl = game.background_image.split("/");
              let newURL = ` https://media.rawg.io/media/crop/600/400/${gameurl[4]}/${gameurl[5]}/${gameurl[6]}`;
              return (
                <div className="slide" key={index}>
                  <div>
                    <a href={`/view/${game.id}/${game.slug}`}>
                      <div className="explore_page">
                        <div className="recommend_game_image">
                          <img
                            src={newURL}
                            alt={game.name}
                            className="recommend_game_image"
                          />
                        </div>
                        <div className="explore_content">
                          <p className="recommend_game_title">{game.name}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <h3>Add Games to Wishlist to see Recommendations</h3>
          )}
        </div>
      </div>
    );
  } else if (wishlist.length === 0 & user !== null) {
    return (
      <div className="recommend_container">
        <div className="error_text">
          <h1 className="err_head">Add some Games to your Wishlist</h1>
        </div>
      </div>
    )
  }
};

export default Recommended;
