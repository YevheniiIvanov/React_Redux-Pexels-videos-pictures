import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";



const initialState = {
    nextPage: 'https://api.pexels.com/videos/popular?per_page=20',
    videoItems: [],
    newItemLoading: false,
    scrol: null,
    videoId: null,
    newPageLoad: '',
};

export const fetchVideo = createAsyncThunk(
    'video/fetchVideo',
    async(url) => {
        const {request} = useHttp();
        return await request(url)
    }
);


const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        setNewItemLoading: (state, action) => {
            state.newItemLoading = action.payload;
        },
        setNextPage: (state, action) => {
            state.nextPage = action.payload;
        },
        setVideoItem: (state, action) => {
            state.videoItems = [...state.videoItems, ...action.payload];
        },
        setScrol: (state, action) => {
            state.scrol = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchVideo.pending, state => {state.newPageLoad = 'loading'})
            .addCase(fetchVideo.fulfilled, (state, action) => {
                        state.newPageLoad = 'idle';
                        state.videoItems = [...state.videoItems, ...action.payload.videos];
                        state.nextPage = action.payload.next_page;
                        state.scrol = action.payload;
                    })
            .addCase(fetchVideo.rejected, state => {
                        state.newPageLoad = 'error';
                    })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = videoSlice;

export default reducer;

export const { setNewItemLoading, setNextPage, setVideoItem, setScrol} = actions;