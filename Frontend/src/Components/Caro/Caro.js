import React, {useState} from 'react'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import './Caro.css';

const Caro = ({ss}) => {
    const [current, setCurrent] = useState(0);
    const length = ss.length;
    const nextSlide =() => {
        setCurrent(current === length - 1?0:current+1)
    }
    const prevSlide =() => {
        setCurrent(current === 0?length - 1: current - 1)
    }
    if (length<=0){
        return null;
    }
    return (
        <div className="cr-slider">
            <IoIosArrowForward className="cr-right cr-arr" onClick={nextSlide}/>
            <IoIosArrowBack className="cr-left cr-arr" onClick={prevSlide}/>
            {ss.map((img, index)=>{
                return(
                    <div className={index===current ? 'cr-active' : 'cr-slide'} key={index}>
                        {index === current && (
                            <img src={img.image} alt="games" className="cr-image"/>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Caro
