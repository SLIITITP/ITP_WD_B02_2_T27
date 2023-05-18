import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    pakages: undefined,
    pakage: undefined,
    hasSearched: false,
    hotel: undefined,
    hasBooked: false,
    allPakages: [],
    isPakageCreated: false,
    isHotelCreated: false,
    isPakageUpdated: false,
    isHotelUpdated: false
}

const pakageSlice = createSlice({
    name: 'pakage',
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.isLoading = action.payload;
        },
        setPakages: (state, action) => {
            state.pakages = action.payload;
        },
        setHasSearched: (state, action) => {
            state.hasSearched = action.payload;
        },
        setPakage: (state, action) => {
            state.pakage = action.payload;
        },
        setHotel: (state, action) => {
            state.hotel = action.payload;
        },
        setHasBooked: (state, action) => {
            state.hasBooked = action.payload;
        },
        setAllPakages: (state, action) => {
            state.allPakages = action.payload;
        },
        setIsPakageCreated: (state, action) => {
            state.isPakageCreated = action.payload;
        },
        setIsHotelCreated: (state, action) => {
            state.isHotelCreated = action.payload;
        },
        setIsPakageUPdated: (state, action) => {
            state.isPakageUpdated = action.payload;
        },
        setIsHotelUpdated: (state, action) => {
            state.isHotelUpdated = action.payload;
        }
    }
});

export const { setLoader, setPakages, setHasSearched , setPakage, setHotel, setHasBooked, setAllPakages, setIsPakageCreated, setIsHotelCreated, setIsPakageUPdated, setIsHotelUpdated} = pakageSlice.actions;

export default pakageSlice.reducer;