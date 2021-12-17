import React, {useState} from 'react'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import 'animate.css';
import './Caro.css';

const Caro = ({ss}) => {
    // console.log("IMAGES", ss);
    const [current, setCurrent] = useState(0);
    const [dir, setDir] = useState("");
    const length = ss.length;
    const nextSlide =() => {
        setCurrent(current === length - 1?0:current+1)
        setDir("R");
    }
    const prevSlide =() => {
        setCurrent(current === 0?length - 1: current - 1)
        setDir("L");
    }
    if (length<=0){
        return null;
    }
    //! Cropped Images!!!
    let crops = ss.map((img)=>{
        let url = img.image.split('/');
        let newUrl = `https://media.rawg.io/media/resize/640/-/screenshots/${url[5]}/${url[6]}`;
        return newUrl;
    })
    // console.log("CROPS", crops);
    //!
    return (
        <div className="cr-slider">
            <IoIosArrowForward className="cr-right cr-arr" onClick={nextSlide}/>
            <IoIosArrowBack className="cr-left cr-arr" onClick={prevSlide}/>
            {crops.map((img, index)=>{
                return(
                    <div className={index===current ? 'cr-active' : 'cr-slide'} key={index}>
                        {index === current && (
                            <img src={img} alt="" className={dir==="L"?"cr-image animate__animated animate__fadeIn":dir==="R"?"cr-image animate__animated animate__fadeIn":"cr-image"}/>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Caro
