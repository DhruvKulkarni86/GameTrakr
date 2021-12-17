import React from 'react'
import './StoreTile.css';
import Tooltip from '../../Tooltip/Tooltip';
//!Stores: 25:Epic 1:Steam 7:GoG 8:Origin 11:Humble 13:Uplay

const StoreTile = ({stores, year, deals}) => {
    // console.log("DEALS", deals);
    let gameURL = `https://www.cheapshark.com/redirect?dealID=`;
    // console.log("Stores", stores);

    //* getting cheapStores
    let csStm = deals.filter((ol)=>{
        return ol.storeID === "1";
    })
    let csGog = deals.filter((ol)=>{
        return ol.storeID === "7";
    })
    let csOrig = deals.filter((ol)=>{
        return ol.storeID === "8";
    })
    let csHumb = deals.filter((ol)=>{
        return ol.storeID === "11";
    })
    let csUplay = deals.filter((ol)=>{
        return ol.storeID === "13";
    })
    let csEpic = deals.filter((ol)=>{
        return ol.storeID === "25";
    })
    //* getting stores
    let stm = stores.filter((ul)=>{
        return ul.store_id === 1;
    })
    // console.log("STMMMM", stm);
    let ps = stores.filter((ul)=>{
        return ul.store_id === 3;
    })
    let nin = stores.filter((ul)=>{
        return ul.store_id === 6;
    })
    let xbox = stores.filter((ul)=>{
        return ul.store_id === 2||ul.store_id === 7;
    })
    let andr = stores.filter((ul)=>{
        return ul.store_id === 8;
    })
    let ios = stores.filter((ul)=>{
        return ul.store_id === 4;
    })
    let gog = stores.filter((ul)=>{
        return ul.store_id === 5;
    })
    let epic = stores.filter((ul)=>{
        return ul.store_id === 11;
    })


    return (
            <div>
                {stores.length!==0?
                <div className="st-wrap">
                    {stm.length!==0?
                    <Tooltip text="Steam">
                        <h2>
                            <a href={stm[0].url} target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn.worldvectorlogo.com/logos/steam-icon-logo.svg" alt="steam" className="stm"/>
                            </a>
                            {csStm.length!==0?csStm[0].isOnSale==="0"?<p className='tile-text'>${csStm[0].salePrice}</p>:<p><span className='st-strike'>{csStm[0].normalPrice}</span><br/>${csStm[0].salePrice}</p>:null}
                        </h2>
                    </Tooltip>
                    :null}
                    {gog.length!==0?
                    <Tooltip text="GoG Store">
                    <h2>
                        <a href={gog[0].url} target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluency/48/000000/gog-galaxy.png" alt="gog" className="stm"/>
                        </a>
                        {csGog.length!==0?csGog[0].isOnSale==="0"?<p>${csGog[0].salePrice}</p>:<p><span className='st-strike'>{csGog[0].normalPrice}</span><br/>${csGog[0].salePrice}</p>:null}
                    </h2>
                    </Tooltip>
                    :null}
                    {epic.length!==0?
                    <Tooltip text="Epic Games">
                    <h2>
                        <a href={epic[0].url} target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.worldvectorlogo.com/logos/epic-games-2.svg
                        " alt="epic" className="stm"/>
                        </a>
                        {csEpic.length!==0?csEpic[0].isOnSale==="0"?<p>${csEpic[0].salePrice}</p>:<p><span className='st-strike'>{csEpic[0].normalPrice}</span><br/>${csEpic[0].salePrice}</p>:null}
                    </h2>
                    </Tooltip>
                    :null}
                    {csOrig.length!==0?
                    <Tooltip text="Origin">
                    <h2>
                        <a href={`${gameURL}${csOrig[0].dealID}`} target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.worldvectorlogo.com/logos/origin-1.svg
                        " alt="epic" className="stm"/>
                        </a>
                        {csOrig[0].isOnSale==="0"?<p>${csOrig[0].salePrice}</p>:<p><span className='st-strike'>{csOrig[0].normalPrice}</span><br/>${csOrig[0].salePrice}</p>}
                    </h2>
                    </Tooltip>
                    :null}
                    {csHumb.length!==0?
                    <Tooltip text="Humble Bundle">
                    <h2>
                        <a href={`${gameURL}${csHumb[0].dealID}`} target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.worldvectorlogo.com/logos/humble-bundle-logo.svg
                        " alt="epic" className="stm"/>
                        </a>
                        {csHumb[0].isOnSale==="0"?<p>${csHumb[0].salePrice}</p>:<p><span className='st-strike'>{csHumb[0].normalPrice}</span><br/>${csHumb[0].salePrice}</p>}
                    </h2>
                    </Tooltip>
                    :null}
                    {csUplay.length!==0?
                    <Tooltip text="Ubisoft Store">
                    <h2>
                        <a href={`${gameURL}${csUplay[0].dealID}`} target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.worldvectorlogo.com/logos/ubisoft-logo.svg
                        " alt="epic" className="stm"/>
                        </a>
                        {csUplay[0].isOnSale==="0"?<p>${csUplay[0].salePrice}</p>:<p><span className='st-strike'>{csUplay[0].normalPrice}</span><br/>${csUplay[0].salePrice}</p>}
                    </h2>
                    </Tooltip>
                    :null}
                    
                    {xbox.length!==0?
                    <Tooltip text="Xbox">
                    <h2>
                        <a href={xbox[0].url} target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.worldvectorlogo.com/logos/xbox-9.svg
                        " alt="epic" className="stm"/>    
                        </a>
                        <p></p>
                    </h2>
                    </Tooltip>
                    :null}
                    {ps.length!==0&&year>=2014?
                    <Tooltip text="PlayStation">
                    <h2>
                        <a href={ps[0].url} target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.worldvectorlogo.com/logos/playstation-6.svg
                        " alt="epic" className="stm"/>    
                        </a>
                    </h2>
                    </Tooltip>
                    :null}
                    {nin.length!==0?
                    <Tooltip text="Nintendo">
                    <h2>
                        <a href={nin[0].url} target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.worldvectorlogo.com/logos/nintendo-2.svg
                        " alt="epic" className="stm"/>    
                        </a>
                    </h2>
                    </Tooltip>
                    :null}
                    {andr.length!==0?
                    <Tooltip text="Play Store">
                    <h2>
                        <a href={andr[0].url} target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.worldvectorlogo.com/logos/google-play-5.svg
                        " alt="epic" className="stm"/>    
                        </a>
                    </h2>
                    </Tooltip>
                    :null}
                    {ios.length!==0?
                    <Tooltip text="App Store">
                    <h2>
                        <a href={ios[0].url} target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.worldvectorlogo.com/logos/app-store-1.svg
                        " alt="epic" className="stm"/>    
                        </a>
                    </h2>
                    </Tooltip>
                    :null}
                </div>:null}
            </div>
    )
}
export default StoreTile
