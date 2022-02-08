import { useEffect, useState } from "react"
// import OpenById from "../open-by-id/OpenById";
import './VideoItems.scss';
import { setVideoItem, setNextPage, setNewItemLoading, setScrol } from "./videoSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from "../../hooks/http.hook";
import { fetchVideo } from "./videoSlice";


const VideoItems = ({searchName}) => {

    const dispatch = useDispatch();
    const videoItems = useSelector(state => state.video.videoItems);
    const nextPage = useSelector(state => state.video.nextPage);
    const newItemLoading = useSelector(state => state.video.newItemLoading);
    const scrol = useSelector(state => state.video.scrol);

    // console.log(videoItems);
    // console.log(nextPage);

    const {request} = useHttp();

    // const [videoItems, setVideoItems] = useState([]);
    // const [newItemLoading, setNewItemLoading] = useState(true);
    // const [nextPage, setNextPage] = useState('https://api.pexels.com/videos/popular?per_page=20');
    // const [videoId, setVideoId] = useState(null);
    // const [scrol, setScrol] =useState(document.body.offsetHeight);

    // useEffect(() => {
    //     // getVideoItems('https://api.pexels.com/videos/popular?per_page=20');
    //     // setNewItemLoading(false);
    //     // dispatch(fetchVideo());
    //     request(nextPage)
    //         .then(({next_page, videos}) => {
    //             dispatch(setNextPage(next_page));      
    //             dispatch(setVideoItem(videos));
    //         })
    // }, []);

    useEffect(()=>{
        dispatch(fetchVideo(nextPage));

        // request(nextPage)
        //     .then(({next_page, videos}) => {
        //         dispatch(setNextPage(next_page));      
        //         dispatch(setVideoItem(videos));
        //         dispatch(setScrol(document.body.offsetHeight));
        //     })
        
        // getVideoItems(nextPage); 
        // setNewItemLoading(false);
    },[newItemLoading]);

    // useEffect(() => {
    //     // setVideoItems([]);
    //     getVideoItems(`https://api.pexels.com/videos/search?query=${searchName}&per_page=20`);
    // },[searchName]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    },[scrol]);

    // function  getVideoItems (url) {
    //     fetch(url, {
    //     headers: {
    //       Authorization: '563492ad6f91700001000001314f065284704358b9e31f8ff396929b'
    //     }})
    //     .then(response => response.json())
    //     .then(({next_page, videos}) => {
    //         // setNextPage(next_page);
    //         // setVideoItems([...videoItems, ...videos]);
    //         dispatch(setVideoItem(videos));
    //         // setVideoItem(videos);
    //     })
    //     // .then(data => console.log(data))
    //     .catch(err => console.log(err))
    // };

    const handlOnMouthOver = (e) => {
        e.currentTarget.play();
    }

    const handlOnMouthOut = (e) => {
        e.currentTarget.pause();
    }

    function onScroll () {
        if (window.scrollY + document.documentElement.clientHeight >= document.body.offsetHeight) {
            // return dispatch(fetchVideo());
            return dispatch(setNewItemLoading(!newItemLoading));
           
        }
    };

    const showVideoItems = (arr) => {
        const items = arr.map(item => {
            return(
                <video className="video col-12 col-md-6 col-xl-3" 
                key={item.id} 
                loop
                muted
                onMouseOver={handlOnMouthOver}
                onMouseOut={handlOnMouthOut}
                // onClick={() => setVideoId(item.id)}
                >
                    <source src={item.video_files[0].link} />
                </video>
            )
        });

        return(
            <>
                {items}
            </>
        )
    }

    const videoList = showVideoItems(videoItems);
    
    return(
        <>
            <div className="row video__row">
                {videoList}
            </div>
            {/* <OpenById 
                    videoId={videoId}s
                    /> */}
        </>
    )
}

export default VideoItems;