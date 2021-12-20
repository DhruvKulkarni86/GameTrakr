import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import "./Wishlist.css";
import Tooltip from '../../Tooltip/Tooltip';
const Wishlist = ({
  title,
  steamRatingCount,
  image,
  rem,
  redirect,
  view,
  slug,
  gameID,
  desc,
  plat,
}) => {
  let dealurl = `https://www.cheapshark.com/redirect?dealID=`;
  const [stores, setStores] = useState([]);
  const [price, setPrice] = useState([]);
  const [user, setUser] = useState("")

  useEffect(()=> {
   setUser(localStorage.getItem("Username"))
  },[])
  document.title = "Wishlist";
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

  let steam = price.filter((ol) => {
    // console.log("ol",ol.storeID === '1');
    return ol.storeID === "1";
  });
  let epic = price.filter((ol) => {
    return ol.storeID === "25";
  });
  let gog = price.filter((ol) => {
    return ol.storeID === "7";
  });
  let origin = price.filter((ol) => {
    return ol.storeID === "8";
  });
  let humble = price.filter((ol) => {
    return ol.storeID === "11";
  });
  let uplay = price.filter((ol) => {
    return ol.storeID === "13";
  });

  let psprice = stores.filter((ol) => {
    return ol.store_id === 3;
  });
  let xboxprice = stores.filter((ol) => {
    return ol.store_id === 2;
  });
  let ninprice = stores.filter((ol) => {
    return ol.store_id === 6;
  });

  let ps = plat.filter((ol) => {
    return ol.platform.id === 2;
  });

  let xbox = plat.filter((ol) => {
    return ol.platform.id === 3;
  });

  let nin = plat.filter((ol) => {
    return ol.platform.id === 7 && 8 && 9 && 13 && 83;
  });

  const Logincheck = () => {
    if (user!== null){
      rem(gameID)
    }else{
      window.alert("Login Expired! Please Login Again");
      window.location = "/reg"
    }
  }


  useEffect(() => {
    axios
      .get(
        `https://www.cheapshark.com/api/1.0/deals?storeID=1,7,8,11,13,25&steamAppID=${steamid}`
      )
      .then((res) => {
        setPrice((price) => price.concat(res.data));
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }, [steamid]);
  let save;
  if (price.length >0 && price[0].savings !== 0) {
    save = Math.round(10 * price[0].savings) / 10;
  }
  return (
    <div className="page_content">
      <div className="wishlist_row">
        <div className="image_capsule">
          <a href={`/view/${gameID}/${slug}`}>
            <img src={`${image}`} alt="o" className="capsule_img" />
          </a>
        </div>
        <div className="wishlist_content">
          <h3 className="title">
            <a
              href={`/view/${gameID}/${slug}`}
              target="_blank"
              rel="noreferrer"
            >
              {title}
            </a>
          </h3>
          <div className="mid_container">
          <div className="price_container">
              <div className="svg_icon">
                {steam.length !== 0 ? (
                  <div className="icon_center">
                    <Tooltip text="Steam">
                    <a
                      href={`${dealurl}${steam[0].dealID}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn.worldvectorlogo.com/logos/steam-icon-logo.svg"
                        alt="steam"
                        className="logos"
                      />
                    </a>
                    </Tooltip>
                    <p className="prices">${steam[0].salePrice}</p>
                  </div>
                ) : (
                  <div className="console_game">
                    Available At:{" "}
                    {ps.length !== 0 && psprice.length > 0 ? (
                      <div>
                        <Tooltip text="Playstation">
                          <a
                          href={psprice[0].url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src="https://cdn.worldvectorlogo.com/logos/playstation-6.svg"
                            alt="steam"
                            className="ps_img"
                          />
                        </a>
                        </Tooltip>
                      </div>
                    ) : (
                      <>
                        {xbox.length !== 0 && xboxprice.length > 0 ? (
                          <div>
                        <Tooltip text="Xbox">

                            <a
                              href={xboxprice[0].url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src="https://cdn.worldvectorlogo.com/logos/xbox.svg"
                                alt="xbox"
                                className="ps_img"
                              />
                            </a>
                            </Tooltip>
                          </div>
                        ) : (
                          <>
                            {nin.length !== 0 && ninprice.length > 0 ? (
                              <div>
                        <Tooltip text="Nintendo">
                                <a
                                  href={ninprice[0].url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <img
                                    src="https://cdn.worldvectorlogo.com/logos/nintendo-switch.svg"
                                    alt="steam"
                                    className="ps_img"
                                  />
                                </a>
                                </Tooltip>
                              </div>
                            ) : null}
                          </>
                        )}
                      </>
                    )}
                    <button onClick={rem} className="remove_btn_hidden"><BsTrash /></button>
                  </div>
                )}
                {epic.length !== 0 ? (
                  <div className="icon_center">
                        <Tooltip text="Epic Games">

                    <a
                      href={`${dealurl}${epic[0].dealID}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn.worldvectorlogo.com/logos/epic-games-2.svg"
                        alt="epic"
                        className="logos"
                      />
                    </a>
                    </Tooltip>
                    <p className="prices">${epic[0].salePrice}</p>
                  </div>
                ) : null}
                {gog.length !== 0 ? (
                  <div className="icon_center">
                        <Tooltip text="GOG">
            
                    <a
                      href={`${dealurl}${gog[0].dealID}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://img.icons8.com/fluency/48/000000/gog-galaxy.png"
                        alt="gog"
                        className="logos"
                      />
                    </a>
                    </Tooltip>
                    <p className="prices">${gog[0].salePrice}</p>

                  </div>
                ) : null}
                {origin.length !== 0 ? (
                  <div className="icon_center">
                        <Tooltip text="Origin">

                    <a
                      href={`${dealurl}${origin[0].dealID}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn.worldvectorlogo.com/logos/origin-1.svg"
                        alt="origin"
                        className="logos"
                      />
                    </a>
                    </Tooltip>
                    <p className="prices">${origin[0].salePrice}</p>
                  </div>
                ) : null}
                {humble.length !== 0 ? (
                  <div className="icon_center">
                        <Tooltip text="Humble Bundle">

                    <a
                      href={`${dealurl}${humble[0].dealID}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn.freebiesupply.com/logos/large/2x/humblebundle-logo-png-transparent.png"
                        alt="humble"
                        className="logos"
                      />
                    </a>
                    </Tooltip>
                    <p className="prices">${humble[0].salePrice}</p>

                  </div>
                ) : null}
                {uplay.length !== 0 ? (
                  <div className="icon_center">
                        <Tooltip text="Ubisoft Store">

                    <a
                      href={`${dealurl}${uplay[0].dealID}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn.worldvectorlogo.com/logos/ubisoft-3.svg"
                        alt="uplay"
                        className="logos"
                      />
                    </a>
                    </Tooltip>
                    <p className="prices">${uplay[0].salePrice}</p>

                  </div>
                ) : null}
              </div>
            </div>
            {price.length > 0 ? (
              <>
                  <div className="purchase_area">
                  <span className="purchase_deal_txt">Best Deal: </span>
               
                      {price[0].savings !== "0.000000" ? (
                          <div className="deal_pct">
                            {save !== 0 ? (save = `-${save}%`) : null}
                          </div>
                      ) : null}
                    {price.length > 0 ? (
                      <div className="discount_prices">
                        <p className="normal-price">
                          {price[0].normalPrice !== price[0].salePrice
                            ? (price[0].normalPrice = `${price[0].normalPrice}`)
                            : null}
                        </p>
                        <p className="discount-price">${price[0].salePrice}</p>
                      </div>
                    ) : (
                      <>{null}</>
                    )}
                     <button onClick={rem} className="remove_btn_hidden"><BsTrash /></button>
                  </div>
              </>
            ) : (
              <>{console.log("err")}</>
            )}
          </div>
          <div className="delete">
              <button onClick={Logincheck} className="remove_btn">
                <BsTrash />
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
