import React, {useEffect} from 'react'
import {FaWindows, FaXbox, FaPlaystation, FaAndroid, FaApple, FaAppStoreIos, FaLinux} from 'react-icons/fa'
import {SiNintendoswitch} from 'react-icons/si'
import {Link} from 'react-router-dom';
import Tooltip from '../../Tooltip/Tooltip';
import 'animate.css';
import './SearchRes.css'
const SearchRes = ({title, rating, genre, imglnk, gameid, slug, plat}) => {
    // <FaWindows key="1"/>,
    //     <FaPlaystation key="2"/>,
    //     <FaXbox key="3"/>,
    //     <FaAppStoreIos key="4"/>,
    //     <FaApple key="5"/>,
    //     <FaLinux key="6"/>,
    //     <SiNintendoswitch key="7"/>,
    //     <FaAndroid key="8"/>
    const iconMap = [
        <Tooltip text="Windows" key="Windows">
            <FaWindows key="1" className="sr-ico"/>
        </Tooltip>,
        <Tooltip text="PlayStation" key="PS">
            <FaPlaystation key="2" className="sr-ico"/>
        </Tooltip>,
        <Tooltip text="Xbox" key="Xbox">
            <FaXbox key="3" className="sr-ico"/>
        </Tooltip>,
        <Tooltip text="IOS" key="IOS">
            <FaAppStoreIos key="4" className="sr-ico"/>
        </Tooltip>,
        <Tooltip text="Apple" key="Apple">
            <FaApple key="5" className="sr-ico"/>
        </Tooltip>,
        <Tooltip text="Linux" key="Linux">
            <FaLinux key="6" className="sr-ico"/>
        </Tooltip>,
        <Tooltip text="Nintendo" key="Nin">
            <SiNintendoswitch key="7" className="sr-ico"/>
        </Tooltip>,
        <Tooltip text="Android" key="And">
            <FaAndroid key="8" className="sr-ico"/>
        </Tooltip>
    ];
    let platMain;
    let icon = [];
    if(plat!==undefined){
        platMain = plat.map(plat=>plat.platform.id);
    for(let i = 0;i<platMain.length;i++){
        icon.push(iconMap[platMain[i]-1]);
    }
}

//! Cropped Images!!!
    // console.log("Image Link", imglnk);
    let urlArr = imglnk.split('/');
    let newURL = `https://media.rawg.io/media/crop/600/400/${urlArr[4]}/${urlArr[5]}/${urlArr[6]}`;
    // console.log("URL ARR", urlArr);
//!

//!hover state of card
    // const [isShown, setIsShown] = useState(false);
//!

//!Scroll to top
useEffect(() => {
    window.scrollTo(0, 0)
}, [])
//!
    return (
        <div className="sr-content">
        {/* onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)} */}
            <div className="sr-score animate__animated animate__flipInX">
                <Tooltip text="Metascore">
                <p
                className={rating>=80?"sr-gr":rating>=60&&rating<80?"sr-yl":rating<60?"sr-red":"sr-symb"}>
                    {rating}
                </p>  
                </Tooltip>
            </div>
            <div className="sr-stat-wrap">
                <div className="sr-front">
                        <img src={newURL} alt={title} className="sr-thumbnail"/>
                        <h3 className="sr-title">{title}</h3>
                        <div className="sr-icons" key="h">
                            {icon}   
                        </div>
                        <p className='sr-genre'>
                            {genre!==undefined?genre.map((gen, pos)=>
                                    <Link key={pos} className="link sr-lnk" to={`/genre/${gen.name}/${gen.id}`}>
                                        {gen.name}
                                    </Link>):"Loading"}
                            {/* {genre} */}
                        </p>
                </div>
                <div className="sr-back">
                        <div className="sr-button">
                            <Link to={`/view/${gameid}/${slug}`}>
                                <button>View Game</button>
                            </Link>
                        </div>
                </div>
            </div>
        </div>
    )
}
// target="_blank" rel="noopener noreferrer"
export default SearchRes
