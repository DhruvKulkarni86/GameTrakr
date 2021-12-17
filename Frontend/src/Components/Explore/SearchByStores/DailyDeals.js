import React from "react";
import "./DailyDeals.css";

const DailyDeals = ({
  data: {
    title,
    salePrice,
    normalPrice,
    savings,
    storeID,
    dealID,
    steamAppID,
    thumb,
    releaseDate,
    steamRatingPercent,
  },
}) => {
  const regularPrice = normalPrice;
  savings = Math.round(10 * savings) / 10;
  let thumbnail = thumb;
  let image = <img src={thumbnail} alt={title} />;
  storeID === "25" ? (
    image = (
      <img
        src={thumbnail}
        alt={title}
        width="120px"
        height="45px"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://cdn.worldvectorlogo.com/logos/epic-games-2.svg";
        }}
      />
    )
  ) : storeID === "13" ? (
    (image = (
      <img
        src={thumb}
        alt={title}
        width="120px"
        height="45px"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://cdn.worldvectorlogo.com/logos/ubisoft-2.svg";
        }}
      />
    ))
  ) : (
    <> {image} </>
  );
  let gameID = dealID;
  let gameURL = `https://www.cheapshark.com/redirect?dealID=${gameID}`;
  let sale = Math.round(savings);

  if (sale !== 0) {
    sale = `-${sale}%`;
  }
  // console.log("sale", sale);

  let free;
  if (salePrice === `0.00`) {
    free = `Free!`;
  } else free = `$${salePrice}`;

  return (
    <div className="main-sales-wrap">
    <div className="sales_wrapper">
      <div className="sales_row">
      <div className="sales_img_container"><img src={thumb} alt={title} className="sales_image"/></div>
      <p className="sales_content">{title}</p>
      </div>
      <div className="sales_discount_area">{sale}</div>
      <div className="sales_discount_prices">
        <span className="sales_discount_original_price">{regularPrice}</span>
        <span className="sales_discount-final-price">{free}</span>
      </div>
          <button className="view-sales-btn">
            <a
              className="sales_url"
              href={gameURL}
              target="_blank"
              rel="_ noreferrer"
            >
              Buy Now
            </a>
          </button>
    </div>
    </div>
  );
};

export default DailyDeals;
