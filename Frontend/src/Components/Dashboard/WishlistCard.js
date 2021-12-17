import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WishlistCards.css";

const Wishlist = ({
  title,
  image,
  slug,
  gameID,
  plat,
}) => {

  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.rawg.io/api/games/${slug}/stores?key=${process.env.REACT_APP_RAWG_KEY}`
      )
      .then((res) => {
        setStores((stores) => stores.concat(res.data.results));
      });
  }, [slug]);

  console.log("stores", stores);

  let stmURL, steamid;
  let stm = stores.filter((ul) => {
    return ul.store_id === 1;
  }); //getting an array with object contaning info for steam store
  console.log(stm, "sstm");
  if (stm.length !== 0) {
    stmURL = stm[0]; //accessing the ONLY value of stm array, the steam object
    let id = stmURL.url.split("/");
    steamid = id[4]; //! give this as URL prop to buy now
    console.log("Steam ID of app : ", steamid);
  }

  let redirect = `/view/${gameID}/${slug}`
  let gameurl = image.split("/");
  let newURL = ` https://media.rawg.io/media/crop/600/400/${gameurl[4]}/${gameurl[5]}/${gameurl[6]}`;

  return (
      <div className="wishlistcard_row">
        <div className="card_capsule">
          <a href={redirect}>
            <img src={`${newURL}`} alt="o" className="card_capsule_img" />
          </a>
        </div>
        <h3 className="card_title"><a href={`/view/${gameID}/${slug}`}>{title}</a></h3>
      </div>
  );
};

export default Wishlist;
