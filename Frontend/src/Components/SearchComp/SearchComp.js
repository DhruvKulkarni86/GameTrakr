import React, { useState, useEffect } from 'react';
import SearchRes from '../SearchRes/SearchRes';
import axios from 'axios';
import {MdGamepad} from 'react-icons/md'
// import {FaArrowCircleUp} from 'react-icons/fa';
import {FiSearch} from 'react-icons/fi'
import 'animate.css';
import './SearchComp.css';

const API_URL = "https://api.rawg.io/api/games";

const SearchComp = () => {
    const [searchGame, setSearchGame] = useState("") //state of searchbar
    // const [stest, setStest] = useState("") //state of searchbar
    const [games, setGames] = useState([]) //main state of the search component
    const [searchLoaded, setSearchLoaded] = useState(false);
    const [errStatus, setErrStatus] = useState(false);
    // const [visible, setVisible] = useState(false);

    // const toggleVisible = () => {
    // const scrolled = document.documentElement.scrollTop;
    //     if (scrolled > 300){
    //     setVisible(true)
    //     } 
    //     else if (scrolled <= 300){
    //     setVisible(false)
    //     }
    // };

    // window.addEventListener('scroll', toggleVisible);


    const setQuery = e =>{
        e.preventDefault();
        setSearchGame(e.target.value);
    //!for dynamic search
    //     setStest(e.target.value);
    //     axios({
    //         url: `http://localhost:5001/${API_URL}?key=${process.env.REACT_APP_RAWG_KEY}&search=${stest}&platforms=1,3,4,7,18,21,186,187,16,15,19,17&page_size=20&search_precise=true`,
    //         headers:{
    //             'X-Requested-With': 'XMLHttpRequest'
    //         }, 
    //         method: 'GET',
    //     }).then(response => 
    //         {setGames(response.data.results);
    //         // setIsLoading(false);
    //         setSearchLoaded(true);
    //         })
    //     .catch(err=>{console.log(err);})
    }
    // console.log("URLLLLL", process.env.REACT_APP_CORS_URL);
    const gameSearch = () => {
        setGames([]);
        setSearchLoaded(false);
        axios({
            url: `${process.env.REACT_APP_CORS_URL}/${API_URL}?key=${process.env.REACT_APP_RAWG_KEY}&search=${searchGame}&platforms=1,3,4,7,18,21,186,187,16,15,19,17&page_size=20&search_precise=true`,
            headers:{
                'X-Requested-With': 'XMLHttpRequest'
            }, 
            method: 'GET',
        }).then(response => 
            {setGames(response.data.results);
            // setIsLoading(false);
            setSearchLoaded(true);
            })
        .catch(err=>{console.log(err);
            if(err.response.status===502){
                setErrStatus(true);
            }
        })
    }
    console.log(games);

    //reads the data stored in local storage
    useEffect(()=>{
        const data = sessionStorage.getItem("search-res");
        const term = sessionStorage.getItem("search-term");
        if(data){
            // setIsLoading(false);
            setGames(JSON.parse(data));
            setSearchGame(JSON.parse(term));
        }
    }, [])
    //stores the data in games state to local storage
    useEffect(()=>{
        sessionStorage.setItem('search-res', JSON.stringify(games));
        sessionStorage.setItem('search-term', JSON.stringify(searchGame));
    });
    const results = games.filter(
        game => game.background_image !== null && game.ratings_count >= 27 && (game.metacritic>40||game.ratings_count>=50)
    );

    // const scroll =()=>{
    //     window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    // }

    return (
        <div className="search-comp">
            <div className="search-bar">
                <input type="text"
                placeholder="Search..."
                value={searchGame}
                onChange={setQuery}
                autoFocus maxLength="50"
                onKeyPress={(e) => e.key === 'Enter' && gameSearch()}
                required
                />
                <FiSearch className="search-sub"  onClick={gameSearch}/>
            </div>
            {errStatus!==true?
            <div className={games.length!==0?"search-res animate__animated animate__fadeInDown":"search-res"}>
                {results.length?results.map(game=>
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
                ):!!searchLoaded&&<p className="sc-nod">No Results Found!</p>}
            </div>:<p>No connection!</p>}
            {/* {visible===true?<FaArrowCircleUp onClick={scroll} className='scroll'/>:null} */}
        </div>
    )
}

export default SearchComp
