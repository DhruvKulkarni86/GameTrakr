import React, {useState, useEffect} from 'react'
import './MainRes.css'
import StoreTile from '../StoreTile/StoreTile'
import axios from 'axios';
import LoadMan from '../LoadMan/LoadMan';
import Navbar from '../Navbar/Navbar';
import Tooltip from '../../Tooltip/Tooltip';
import Caro from '../Caro/Caro';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const DET_URL = `https://api.rawg.io/api/games`;
const DEAL_URL = `https://www.cheapshark.com/api/1.0`;

const MainRes = ({match}) => {
    const{
        params: {gameid, slug},
    } = match;

    const [details, setDetails] = useState([])
    const [ss, setSS] = useState([])
    const [stores, setStores] = useState([])
    const [deals, setDeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [wish, setWish] = useState([]);
    const [exists, setExists] = useState(false);
    const [errCode, setErrCode] = useState("");

    const  tkn = localStorage.getItem("token");
    let user = localStorage.getItem("Username");
    let localWL = JSON.parse(localStorage.getItem("Wishlist"));

    console.log("MAIN WISH", wish);
    console.log("UUU", user);

    useEffect(()=>{
        setWish(localStorage.getItem("Wishlist") ? JSON.parse(localStorage.getItem("Wishlist")):[]);
    },[]);

    //! getting steamID
    let stmURL, steamid;
    let stm = stores.filter((ul)=>{
        return ul.store_id === 1;
    }) //getting an array with object contaning info for steam store
    if (stm.length !== 0){
        stmURL = stm[0];//accessing the ONLY value of stm array, the steam object
        let id = stmURL.url.split('/');
        steamid = id[4]; //! give this as URL prop to buy now 
        // console.log("Steam ID of app : ", steamid);
    }
    //! steamID end

    useEffect(() => {
        const gameDet = () => {
            axios({
                url: `${DET_URL}/${gameid}?key=${process.env.REACT_APP_RAWG_KEY}`,
                headers:{
                    'X-Requested-With': 'XMLHttpRequest'
                }, 
                method: 'GET',
            }).then(response => {setDetails(response.data);
                setIsLoading(false);
            }
            ).catch(err=>{console.log(err);})
        }
        gameDet();
        const gameSS = () =>{
            axios({
                url: `${DET_URL}/${slug}/screenshots?key=${process.env.REACT_APP_RAWG_KEY}`,
                headers:{
                    'X-Requested-With': 'XMLHttpRequest'
                }, 
                method: 'GET',
            }).then(response=>{setSS(response.data.results);
                setIsLoading(false);
            }
            ).catch(err=>{console.log(err);})
        }
        gameSS();
        const gameStore = () =>{
            axios({
                url: `${DET_URL}/${slug}/stores?key=${process.env.REACT_APP_RAWG_KEY}`,
                headers:{
                    'X-Requested-With': 'XMLHttpRequest'
                }, 
                method: 'GET',
            }).then(response=>{setStores(response.data.results);
                setIsLoading(false);
            }
            ).catch(err=>{console.log(err);})
        }
        gameStore();
        const gameDeal = () =>{
            axios({
                url: `${DEAL_URL}/deals?&storeID=1,4,7,8,11,13,25&steamAppID=${steamid}`,
                headers:{
                    'Access-Control-Allow-Origin':'https://www.cheapshark.com/api',
                    'X-Requested-With': 'XMLHttpRequest'
                }, 
                method: 'GET',
            }).then(response=>{setDeals(response.data);
                setIsLoading(false);
            }
            ).catch(err=>{console.log(err);})
        }
        gameDeal();
    }, [gameid, slug, steamid]);

    let devArr = details.developers;
    console.log("ARARA",devArr);
    console.log("Details", details);
    console.log("DEALS", deals);

    //!get year
    let releaseYr = new Date(details.released).getFullYear();
    console.log("RELEASE!!!!!", releaseYr);

    //!title
    useEffect(() => {
        document.title = details.name!==undefined?details.name:"GameTrakr";
    }, [details.name]);

    //!Exists
    useEffect(()=>{
        let gID = details.id;
        const gameExists =(ID)=>{
            return localWL.some(el=>{return el.gameID===ID;})
        }
        if(user!==null){
            let doesExist = gameExists(gID);
            if (doesExist === true){
                setExists(true);
            } 
        }
    },[localWL, details, user])
    console.log("SET EXISTS", exists);

    //!addToWish
    const addToWish = () =>{
        const WL = {
            "slug" : details.slug,
            "gameID" : details.id,
            "steamID" : steamid
        };
        setWish(wish.push(WL));
        setExists(true);
        localStorage.setItem("Wishlist", JSON.stringify(wish));
        console.log("U2", wish);
        console.log(tkn);
        axios({
            url: `${process.env.REACT_APP_BACK_URL}/wishlist`,
            headers:{
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization':localStorage.getItem("token")
            }, 
            data:{WL
            },
            method: 'PUT',
        }).then(response => 
            {
                console.log(response);
            })
        .catch(err=>{console.log(err);
            if(err.response.status===403){
                setErrCode("403");
            }
        })
    }
    //!addTowish

    //!removeWish
    const removeWish = () =>{
        const WL = {
            "slug" : details.slug,
            "gameID" : details.id,
            "steamID" : steamid
        };
        // let bruharr = localWL.filter(obj=>obj.gameID!==details.id);
        // setWish(bruharr);
        localStorage.setItem("Wishlist", JSON.stringify(wish));
        console.log("U2", wish);
        console.log(tkn);
        axios({
            url: `${process.env.REACT_APP_BACK_URL}/wishlist`,
            headers:{
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization':localStorage.getItem("token")
            }, 
            data:{WL
            },
            method: 'DELETE',
        }).then(response => 
            {
                // console.log("RESP",response);
                // console.log("NEW WL",response.data.wishlist);
                localStorage.setItem("Wishlist", JSON.stringify(response.data.wishlist));
                setWish(JSON.parse(localStorage.getItem("Wishlist")));
                setExists(false);
            })
        .catch(err=>{console.log(err);
            if(err.response.status===403){
                setErrCode("403");
            }
        })
    }
    //!removeWish
    // console.log("BRUH ARR", bruharr);
    let d = new Date(details.released).toLocaleString().split(',')[0]
    console.log("DDDD", d);

    return (
        <div className="page">
            { isLoading && <LoadMan/>}
                <header>
                    <Navbar/>
                </header>
                <div className="main-wrap">
                    <div className="main-title">
                            <h1>{details.name}</h1>
                    </div>
                    <div className="main-top">
                        <Caro ss={ss}/>
                        <div className="main-side">
                            <div className="side-top">
                                <div className="wish-but">
                                    {user!==null&&exists===false?
                                        <button className="main-but" onClick={addToWish}>
                                        Add to Wishlist
                                        </button>:exists===true&&errCode!=="403"?
                                        <button className="main-but" onClick={removeWish}>Remove</button>:
                                        <Link to="/reg">
                                        <button className="main-but">Log In to add game to wishlist</button>
                                        </Link>}
                                        {exists===true&&errCode!=="403"?
                                        <Link to="/" target="_blank" rel="noopener noreferrer">
                                            <button className='main-but'>
                                                View Wishlist
                                            </button>
                                        </Link>:null}
                                </div>
                                <div className='main-err'>
                                    {errCode===""?null:errCode==="403"?<Link className="link sr-link" to="/reg"><p className='pub-name'>Action Failed, Login Again!</p></Link>:"bruh"}
                                </div>
                                <div className="main-genre">
                                {details.length!==0?details.genres.map((gen, pos)=>
                                        <Link key={pos} target="_blank" rel="noopener noreferrer" className="link sr-lnk" to={`/genre/${gen.name}/${gen.id}`}>
                                            {gen.name}
                                        </Link>):null}
                                </div>
                                <div className="side-hori">
                                    <div className="main-pub">
                                        <p className='pub-head'>Developers:</p>
                                            {devArr!==undefined?devArr.map(pub=>
                                            <Link key={`${pub.id}`} className="link" target="_blank" rel="noopener noreferrer" to={`/dev/${pub.id}/${pub.name}`}>
                                                <p className='pub-name'>{pub.name}</p>
                                            </Link>):"Loading"}
                                    </div>
                                    <div className="main-release">
                                        <p className='pub-head'>Release Date:</p>
                                        {details!==null?details.released===null?"Comming Soon":<p className='date-name'>{d}</p>:null}
                                    </div>
                                </div>
                                <div className="main-reddit">
                                    {details.reddit_url!==""?
                                    <a href={details.reddit_url} target="_blank" rel="noopener noreferrer">
                                        <Tooltip text={`visit ${details.name} subreddit`}> 
                                            <img src="https://cdn.worldvectorlogo.com/logos/reddit-4.svg" alt="reddit" className='stm' />
                                        </Tooltip>
                                    </a>:null}
                                </div>                          
                            </div>
                            <div className="store">
                                <StoreTile stores={stores} year={releaseYr} deals={deals}/>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="main-desc" dangerouslySetInnerHTML={{ __html: details.description }}/>
                            {/* {details.description_raw} */}
                            {/* </div> */}
                    </div>
                </div>
        </div>
    )
}

export default MainRes

//!Stores: 25:Epic 1:Steam 7:GoG 8:Origin 11:Humble 13:Uplay