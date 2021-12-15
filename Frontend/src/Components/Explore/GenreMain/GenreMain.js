import React, {useState, useEffect} from 'react'
import axios from 'axios';
// import {BsChevronDown, BsChevronUp} from 'react-icons/bs';
import './GenreMain.css';
import {MdGamepad} from 'react-icons/md'
import './GenreMain.css';
import SearchRes from '../../SearchRes/SearchRes';
import Navbar from '../../Navbar/Navbar';
import LoadMan from '../../LoadMan/LoadMan';

const API_URL = "https://api.rawg.io/api/games";
const GEN_URL = "https://api.rawg.io/api/genres";

const GenreMain = ({match}) => {
    const{
        params: {genrename, genreid},
    } = match;

    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [genDet, setGenDet] = useState([]);
    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");
    
    useEffect(() => {
        const gameDet = () => {
            axios({
                url: `${API_URL}?genres=${genreid}&key=${process.env.REACT_APP_RAWG_KEY}&page_size=9`,
                headers:{
                    'X-Requested-With': 'XMLHttpRequest'
                }, 
                method: 'GET',
            }).then(response => {setResult(response.data.results);
                setNext(response.data.next);
                setPrev(response.data.previous);
                // setSearchLoaded(true);
                setLoading(false);
            }
            ).catch(err=>{console.log(err);})
        }
        gameDet();

        const genreDet = () => {
            axios({
                url: `${GEN_URL}/${genreid}?key=${process.env.REACT_APP_RAWG_KEY}`,
                headers:{
                    'X-Requested-With': 'XMLHttpRequest'
                }, 
                method: 'GET',
            }).then(response => {setGenDet(response.data);
            }
            ).catch(err=>{console.log(err);})
        }
        genreDet();
    }, [genrename, genreid]);
    
    console.log("RESULTS", result);
    console.log("GENRE", genDet);

    const loadNext =()=>{
        axios({
            url: `${next}`,
            headers:{
                'X-Requested-With': 'XMLHttpRequest'
            }, 
            method: 'GET',
        }).then(response => {setResult(response.data.results);
            setNext(response.data.next);
            setPrev(response.data.previous);
            // setIsLoading(false);
        }
        ).catch(err=>{console.log(err);})
    }

    const loadPrev =()=>{
        axios({
            url: `${prev}`,
            headers:{
                'X-Requested-With': 'XMLHttpRequest'
            }, 
            method: 'GET',
        }).then(response => {setResult(response.data.results);
            setPrev(response.data.previous);

        }
        ).catch(err=>{console.log(err);})
    }
    console.log("PREV", prev);
    console.log("NEXT", next);
    const flt = result.filter(
        gameRes => gameRes.background_image !== null);

    //!CSS HEAD STYLE
    var ddHead = {
        width: "100%",
        height: "400px",
        backgroundImage: `url(${genDet.image_background})`,
        backgroundRepeat:"no-repeat",
        backgroundPosition: "50% 30%",
        margin: "2.8em" 
    };
    //!

    useEffect(() => {
        document.title = "Genre : "+genrename;
}, [genrename]);

    return (
        <div className="dd">
            {loading && <LoadMan/>}
            <header>
                    <Navbar/>
            </header>
            <div className='dd-wrap'>
                <div style={ddHead}>
                    <div className="dd-title">
                        <p>GENRE</p>
                        <h1 className='gen-title'>{genrename}</h1>
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
                    {result.length!==0?
                    <div className="gen-buttons">
                        {prev!==null?<button className='main-but' onClick={loadPrev}>Prev</button>:null}
                        <button className='main-but' onClick={loadNext}>Load More</button>
                    </div>:null}
                </div>
            </div>
        </div>
    )
}

export default GenreMain
