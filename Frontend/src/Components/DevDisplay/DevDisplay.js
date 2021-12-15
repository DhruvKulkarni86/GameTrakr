import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DevDisplay.css'
import {MdGamepad} from 'react-icons/md'
import SearchRes from '../SearchRes/SearchRes';
import Navbar from '../Navbar/Navbar';
import LoadMan from '../LoadMan/LoadMan';

const API_URL = "https://api.rawg.io/api/games";
const DEVS_URL = "https://api.rawg.io/api/developers"

const DevDisplay = () => {
    const devDet = useParams();
    console.log("DEVDET", devDet);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [devs, setDevs] = useState([]);

    useEffect(() => {
        const gameDet = () => {
            axios({
                url: `${API_URL}?developers=${devDet.devId}&key=${process.env.REACT_APP_RAWG_KEY}&page_size=22&ordering=-rating`,
                headers:{
                    'X-Requested-With': 'XMLHttpRequest'
                }, 
                method: 'GET',
            }).then(response => {setResult(response.data.results);
                setLoading(false);
                // setIsLoading(false);
            }
            ).catch(err=>{console.log(err);})
        }
        gameDet();

        const devsData = () => {
            axios({
                url: `${DEVS_URL}/${devDet.devId}?key=${process.env.REACT_APP_RAWG_KEY}`,
                headers:{
                    'X-Requested-With': 'XMLHttpRequest'
                }, 
                method: 'GET',
            }).then(response => {setDevs(response.data);
                // setIsLoading(false);
            }
            ).catch(err=>{console.log(err);})
        }
        devsData();
    }, [devDet.devId, devDet.devName]);
    
    console.log("RESULTS", result);
    console.log("DEVSS", devs);
    
    const flt = result.filter(
        game => game.background_image !== null);

    useEffect(() => {
            document.title = "Developer : "+devDet.devName;
    }, [devDet.devName]);


    //!CSS HEAD STYLE
    // var ddHead = {
    //     width: "100%",
    //     height: "400px",
    //     backgroundImage: `../../assets/lpMain.jpg`,
    //     backgroundRepeat:"no-repeat",
    //     backgroundPosition: "50% 30%" 
    // };
    //!
    return (
        <div className="dd">
            {loading && <LoadMan/>}
            <header>
                    <Navbar/>
            </header>
            <div className='dd-wrap'>
                <div className="dd-head">
                    <div className="dd-title">
                        <h1>{devDet.devName}</h1>
                        <p>DEVELOPER SHOWCASE</p>
                    </div>
                </div>
                <div className={result.length!==0?"search-res animate__animated animate__fadeIn":"search-res"}>
                    {flt.map(game=>
                    <SearchRes
                    key={game.name} 
                    title={game.name} 
                    rating={game.metacritic===null?<MdGamepad/>:game.metacritic} 
                    genre={game.genres} 
                    imglnk={(game.background_image===null)?"":game.background_image}
                    gameid={game.id}
                    slug={game.slug}
                    plat={game.parent_platforms}
                    />
                    )}
                </div>
            </div>
        </div>
    )
}

export default DevDisplay
