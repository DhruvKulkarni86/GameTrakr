import React, { useState, useEffect } from "react";
import axios from "axios";

import DailyDeals from "./DailyDeals";

// import "../../../App.css";

import Navbar from "../../Navbar/Navbar";
import LoadMan from "../../LoadMan/LoadMan";


const Uplay = () => {
  const [loaded, setLoaded] = useState(true);
  const [gameData, setGameData] = useState([]);


  const SetPrices = (res) => {
    setGameData(res.data);
    setLoaded(true);
  };

  useEffect(() => {
    let uPlayURL = `https://www.cheapshark.com/api/1.0/deals?storeID=7&onSale=1`;
    axios
      .get(uPlayURL)
      .then(SetPrices)
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(()=> {
    setTimeout(()=> {
      setLoaded(false)
    },2000)
  })
    return (
      <div className="steam-sales">
        {loaded && <LoadMan />}
        <Navbar />
        <div className="main-background">
        <div className="sales_header"><img src="https://img.icons8.com/fluency/48/000000/gog-galaxy.png" className="header-svg" width="70px" alt="gog"/><h4>GOG GALAXY</h4><p>Games on sale</p></div>
        </div>
        <div id="sale_ctn">
          {gameData.map((gameNum, index) => {
            return <DailyDeals data={gameNum} key={index} />;
          })}
        </div>
        </div>
    );
};

export default Uplay;
