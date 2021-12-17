import React, { useEffect, useState } from "react";
import WishlistCard from "./WishlistCard";
import "./WishlistCards.css";
import "animate.css";
import axios from "axios";
import { NavLink } from "react-router-dom";


const WishlistData = () => {
  const [gamedet, setGameDet] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [price, setPrice] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    setWishlist(
      localStorage.getItem("Wishlist")
        ? JSON.parse(localStorage.getItem("Wishlist"))
        : []
    );
  }, []);

  const RemoveFromWishlist = (id) => {
    let newList = wishlist.filter((game) => game.gameID !== id);
    setWishlist(newList)
    localStorage.setItem("Wishlist", JSON.stringify(newList));
    console.log("id", [wishlist.pop(id)]);
    console.log("newlist", wishlist);
  };
  const DET_URL = `https://api.rawg.io/api/games`;
  useEffect(() => {
    let isCancelled = false;
    const RAWGdet = () => {
      wishlist &&
        wishlist.map(async (game, index) => {
          const res = await axios({
            url: `${DET_URL}/${game.gameID}?key=${process.env.REACT_APP_RAWG_KEY}`,
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
            method: "GET",
          });
          if (!isCancelled) {
            setGameDet((gamedet) => gamedet.concat(res.data));
          }
          setLoaded(true);
        });
    };
    RAWGdet();
    return () => {
      isCancelled = true;
    };
  }, [DET_URL, wishlist]);


console.log(gamedet, "gamedet");
  useEffect(() => {
    let isCancelled = false
    wishlist.length !==0 &&
      wishlist.map((game, index) => {
        return (
          <div key={index}>
            {axios
              .get(
                `https://www.cheapshark.com/api/1.0/deals?storeID=1&steamAppID=${game.steamID}`
              )
              .then((res) => {
                if (!isCancelled){
                  setPrice((price) => price.concat(res.data));
                  setLoaded(true)
                }
              })
              .catch((err) => {
                console.log("ERR", err);
              })}
          </div>
        );
      });
      return () => {
        isCancelled = true
      }

  }, [wishlist]);
  console.log(price, "price");
  let tempArr1 = [];
console.log(tempArr1);

    return (
      <>
      <div className="wishlistcard_header">
        <h4 className="own_h3">Games From Your Wishlist</h4>
        <NavLink to="/wishlist">
        <h3 className="wishlist">see all</h3>
      </NavLink>
      </div>
      <div className="wishlistcard_wrapper">
        {loaded}
        {wishlist.length !== 0 ?  (
          gamedet.slice(0,3).map((game, index) => {
            console.log("mad2", game.slug);
            return (
              <div id="wishlist_ctn" key={index}>
                <WishlistCard
                  key={index}
                  title={game.name}
                  gameID={game.id}
                  image={game.background_image}
                  rem={() => RemoveFromWishlist(game.id)}
                  slug = {game.slug}
                  plat={game.parent_platforms}
                />
              </div>
            );
          })
        ) 
        : (
          <div className="explore_main_container">
          <div className="error-text">
            <h3 className="error-head">You haven't added anything to your wishlist yet.</h3>
            <p className="error-option"><NavLink to="/explore">Explore Now</NavLink></p>
          </div>
      </div>
        )}
      </div>
      </>
    );
};

export default WishlistData;