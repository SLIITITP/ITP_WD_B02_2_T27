import { setError, setSuccess } from '../slices/appSlice';
import { setLoader, setPakages, setHasSearched, setPakage, setHotel, setAllPakages, setIsPakageCreated, setIsHotelCreated, setIsPakageUPdated, setIsHotelUpdated } from '../slices/pakageSlice';
import axios from 'axios';

// search Package
export const searchPakagesAction = ({ location, person, hotel, d1, d2 }) => async (dispatch) => {
    try {
        dispatch(setHasSearched(true));
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/pakages?location=${location}&person=${person}&hotel=${hotel}&d1=${d1}&d2=${d2}`);

        dispatch(setPakages(data.pakages));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// get featured Pakages
export const getFeturedPakages = () => async (dispatch) => {
    try {
        dispatch(setHasSearched(false));
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/pakages`);

        dispatch(setPakages(data.pakages));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// get Pakage details
export const getPakageAction = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/pakage/${id}`);

        dispatch(setPakage(data.pakage));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// get Hotel details
export const getHotelAction = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/hotel/${id}`);
        dispatch(setHotel(data.hotel));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}



// get all Pakages -- admin
export const getAllPakages = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/pakages`);

        dispatch(setAllPakages(data.pakages));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// upload Pakage picture --admin
export const uploadPakagePicture = (formData, id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.put(`/api/v1/pakage/${id}/images`, formData, { headers: { "Content-Type": "multipart/form-data" } });

        dispatch(setSuccess("Image uploaded successfully"));
        dispatch(setHasSearched(false));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// upload Hotel picture --admin
export const uploadHotelPicture = (formData, id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.put(`/api/v1/hotel/${id}/images`, formData, { headers: { "Content-Type": "multipart/form-data" } });

        dispatch(setSuccess("Image uploaded successfully"));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// delete Pakage -- admin
export const deletePakage = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.delete(`/api/v1/pakage/${id}`);

        dispatch(setAllPakages(data.pakages));
        dispatch(setSuccess("Package deleted successfully"));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// delete Hotel -- admin
export const deleteHotel= (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.delete(`/api/v1/hotel/${id}`);

        dispatch(setPakage(data.pakage));
        dispatch(setSuccess("Package deleted successfully"));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// create new Pakage --admin
export const createPakage = (formData) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const res = await axios.post(`/api/v1/pakage/new`, formData, { headers: { "Content-Type": "application/json" } });
        console.log(res)
        dispatch(setSuccess("Package Created successfully"));
        dispatch(setIsPakageCreated(true));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// update Pakage --admin
export const updatePakage = (formData, pakageId) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.put(`/api/v1/pakage/${pakageId}`, formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setSuccess("Package Updated successfully"));
        dispatch(setIsPakageUPdated(true));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// create new Hotel --admin
export const createHotel = (formData, pakageId) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.post(`/api/v1/pakage/${pakageId}/hotel/new`, formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setSuccess("Package Created successfully"));
        dispatch(setIsHotelCreated(true));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// update Hotel --admin
export const updateHotel = (formData, hotelId) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.put(`/api/v1/hotel/${hotelId}`, formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setSuccess("Package Updated successfully"));
        dispatch(setIsHotelUpdated(true));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}



