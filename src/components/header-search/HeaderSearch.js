import { useState } from "react"
import VideoItems from "../video-items/VideoItems";

import './HeaderSearch.scss';
import pictureSearch from '../../resources/img/5402443_search_find_magnifier_magnifying_magnifying glass_icon.png';


const HeaderSearch = () => {
    const [searchName, setSearchName] = useState('');

    const sentSearch = (e) => {
        e.preventDefault();
    }
    return(
        <>
            <div className="header">
                <div className="row">
                    <div></div>
                    <div className='header__content'>
                        <h1 className='header__h1'>
                            The best free stock photos, royalty free images & videos shared by creators.
                        </h1>
                        <form className='header__search'>
                            <input placeholder='Search for free videos and photos'
                                onChange={(e)=> setSearchName(e.target.value)}></input>
                            <button className='header__button'
                                onClick={(e) => sentSearch(e)}>
                                <img src={pictureSearch} alt='search'></img>
                            </button>
                        </form>
                    </div>
                    <div></div>
                </div>
            </div>
            <VideoItems searchName={searchName}/>
        </>
    )
}

export default HeaderSearch;