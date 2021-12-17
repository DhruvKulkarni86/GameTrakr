import React, { useState, useEffect } from "react";
import axios from "axios";
import DailyDeals from "./DailyDeals";


import Navbar from "../../Navbar/Navbar";
import LoadMan from "../../LoadMan/LoadMan";


const Steam = () => {
  const [loaded, setLoaded] = useState(true);
  const [gameData, setGameData] = useState([]);
  const[cheaper, setCheaper] = useState([])

  const SetPrices = (res) => {
    setGameData(res.data);
    setCheaper(res.data)
  };

  console.log(cheaper,"cheap");

  useEffect(() => {
    let EpicURL = `https://www.cheapshark.com/api/1.0/deals?storeID=1&onSale=1`;
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
        <div className="sales_header"><img src="https://cdn.worldvectorlogo.com/logos/steam-icon-logo.svg" className="header-svg" width="70px" alt="steam"/><h4>Steam Store</h4><p>Games on sale</p></div>
        </div>
          {gameData.map((gameNum, index) => {
            return <DailyDeals data={gameNum} key={index} />
          })}
        </div>
    );
};

export default Steam;
