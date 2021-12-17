import React, { useEffect, useState } from "react";
import Wishlist from "./Wishlist";
import Navbar from "../Navbar/Navbar"
import Loadman from "../LoadMan/LoadMan"
import "./Wishlist.css";
import "animate.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
const WishlistData = () => {
  const [gamedet, setGameDet] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [price, setPrice] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [render, setRender] = useState(true);
  const [user, setUser] = useState("")
  useEffect(() => {
    setWishlist(
      localStorage.getItem("Wishlist")
        ? JSON.parse(localStorage.getItem("Wishlist"))
        : []
    );
  }, []);

  useEffect(()=> {
    setUser(localStorage.getItem("Username"))
  },[])

  const RemoveFromWishlist = (id, name) => {
    const WL = {
      slug: name,
      gameID: id,
    };
    let newList = wishlist.filter((game) => game.gameID !== id);
    setWishlist(newList);
    setGameDet(gamedet.filter((gm) => gm.id !== id));
    setRender(false);
    console.log(user);
    axios({
      url: `${process.env.REACT_APP_BACK_URL}/wishlist`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: localStorage.getItem("token"),
      },
      data: { WL },
      method: "DELETE",
    })
      .then((response) => {
        localStorage.setItem("Wishlist", JSON.stringify(response.data.wishlist));
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
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
          if (render && !isCancelled) {
            setGameDet((gamedet) => gamedet.concat(res.data));
          }
          setLoaded(false);
        });
    };
    RAWGdet();
    return () => {
      isCancelled = true;
    };
  }, [DET_URL, wishlist, render]);

  console.log(gamedet, "gamedet");
  useEffect(() => {
    let isCancelled = false;
    wishlist.length !== 0 &&
      wishlist.map((game, index) => {
        return (
          <div key={index}>
            {axios
              .get(
                `https://www.cheapshark.com/api/1.0/deals?storeID=1&steamAppID=${game.steamID}`
              )
              .then((res) => {
                if (!isCancelled) {
                  setPrice((price) => price.concat(res.data));
                  setLoaded(true);
                }
              })
              .catch((err) => {
                console.log("ERR", err);
              })}
          </div>
        );
      });
    return () => {
      isCancelled = true;
    };
  }, [wishlist]);
  console.log(price, "price");
  let tempArr1 = [];
  console.log(tempArr1);
  if (wishlist.length > 0) {
    return (
      <div className="wishlist_main">
        <Navbar />
        {loaded && <Loadman />}
        <div className="wishlist_header">
          <h3>Wishlist</h3>
        </div>
        {gamedet.map((game, index) => {
          let gameurl = game.background_image.split("/");
          let newURL = ` https://media.rawg.io/media/crop/600/400/${gameurl[4]}/${gameurl[5]}/${gameurl[6]}`;
          console.log("mad2", game);
          return (
            <>
              <div id="wishlist_ctn" key={index}>
                <Wishlist
                  key={index}
                  title={game.name}
                  gameID={game.id}
                  desc={game.description_raw}
                  image={newURL}
                  rem={() => RemoveFromWishlist(game.id, game.name)}
                  slug={game.slug}
                  plat={game.parent_platforms}
                />
              </div>
            </>
          );
        })}
      </div>
    );
  } else if (wishlist.length === 0 && user !== null) {
    return (
      <div className="explore_main_container">
        <Navbar />
      <div className="error-text">
        <h3 className="error-head">You haven't added anything to your wishlist yet.</h3>
        <p className="error-option"><NavLink to="/explore">Add Games Now</NavLink></p>
      </div>
  </div>
    );
  } else
    return (
      <div className="explore_main_container">
        <Navbar />
      <div className="error-text">
        <h3 className="error-head">You need to be Logged in to View This page</h3>
        <p className="error-option"><NavLink to="/reg">Sign In</NavLink></p>
      </div>
  </div>
    );
};

export default WishlistData;
