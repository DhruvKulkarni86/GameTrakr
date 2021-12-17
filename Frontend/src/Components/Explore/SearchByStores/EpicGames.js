import React, { useState, useEffect } from "react";
import axios from "axios";

import DailyDeals from "./DailyDeals";

// import "../../../App.css";

import Navbar from "../../Navbar/Navbar";
import LoadMan from "../../LoadMan/LoadMan";

const EpicGames = () => {
  const [loaded, setLoaded] = useState(false);
  const [gameData, setGameData] = useState([]);



  const SetPrices = (res) => {
    setGameData(res.data);
    setLoaded(true);
  };

  useEffect(() => {
    let EpicURL = `https://www.cheapshark.com/api/1.0/deals?storeID=25&onSale=1}`;
    axios
      .get(EpicURL)
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
        <div className="sales_header"><img src="https://cdn.worldvectorlogo.com/logos/epic-games-2.svg" className="header-svg" width="70px" alt="epic"/><h4 className="head-sales">Epic Games Store</h4><p>Games on Sale</p></div>
        </div>
          {gameData.map((gameNum, index) => {
            return <DailyDeals data={gameNum} key={index} />;
          })}
        </div>
    );
};

export default EpicGames;
