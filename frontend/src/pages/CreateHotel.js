import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SideBar from "../components/SideBar";
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, styled } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { setIsHotelCreated } from '../redux/slices/pakageSlice';
import { createHotel, getPakageAction } from '../redux/actions/pakageAction';
import Loader from '../components/Loader';
import NotFound from './NotFound';
import Meta from '../utils/Meta';

const availableSpecifications = [
    "Free Car",
    "Air Condition",
    "Free Breakfast",
];

const availableType = [
    'Single',
    'Double'
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

const CustomSelect = styled(Select)(() => ({
    "&.MuiOutlinedInput-root": {
        "& fieldset": {
            border: "1px solid rgb(156 163 175)"
        },
        "&:hover fieldset": {
            border: "1px solid rgb(156 163 175)"
        },
        "&.Mui-focused fieldset": {
            border: "1px solid rgb(156 163 175)"
        }
    }
}));

const CreateHotel = () => {
    const [specification, setSpecification] = useState([]);
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({}); // New state for storing validation errors
    const { isHotelCreated, isLoading, pakage } = useSelector((state) => state.pakageState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (isHotelCreated) {
            navigate(`/admin/pakage/${id}/hotels`);
            dispatch(setIsHotelCreated(false));
        }
    }, [isHotelCreated, dispatch, navigate, id]);

    useEffect(() => {
        if (id) {
            dispatch(getPakageAction(id));
        }
    }, [dispatch, id]);

    const handleSpecificationChange = (event) => {
        const {
            target: { value },
        } = event;
        setSpecification(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const validateForm = () => {
        const errors = {};

        if (name.trim() === '') {
            errors.name = 'Hotel name is required.';
        }

        if (number.trim() === '') {
            errors.number = 'Hotel number is required.';
        }

        if (price.trim() === '') {
            errors.price = 'Price per day is required.';
        } else if (isNaN(price)) {
            errors.price = 'Price per day must be a valid number.';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0; // Return true if there are no errors
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            const formData = {
                name,
                number: Number(number),
                pricePerDay: Number(price),
                specification,
                type
            }

            dispatch(createHotel(formData, id));
        }
    }

    return (
        <Fragment>
            <Meta title="Create Hotel" />
            <div className="flex">
                <SideBar />
                {isLoading ? <Loader /> : (
                    <Fragment>
                        {!pakage ? <NotFound /> : (
                            <div className="w-[80%] sm:w-[60%] md:w-[70%] mx-auto mt-3">
                                <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-center md:justify-between ">
                                    <div className="flex">
                                        <Button onClick={() => navigate(`/admin/pakage/${pakage?._id}/hotels`)} variant="contained"
                                            className="!text-gray-100 !bg-blue-400 w-60 !py-3 md:w-min">
                                            <ArrowBackIosNewIcon fontSize="small" className="mr-2" />
                                            Back
                                        </Button>
                                    </div>
                                    <div>
                                        <div className="flex gap-4">
                                            <h4 className="font-medium">Package Name:</h4><p className="font-normal text-blue-400"><Link to={`/pakage/${id}`} >{pakage?.name}</Link></p>
                                        </div>
                                        <div className="flex gap-4">
                                            <h4 className="font-medium">Id: </h4> <p className="break-words break-all">{id}</p>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-medium text-center my-8">Create Hotel</h2>
                                <form className="flex flex-col gap-4 px-2 max-w-fit mx-auto mb-8" onSubmit={(e) => handleSubmit(e)}>
                                    <div className="border border-solid border-gray-400 py-3 px-5 rounded">
                                        <FormatColorTextIcon className="text-gray-600" />
                                        <input type="text" required={true} value={name} onChange={(e) => setName(e.target.value)} placeholder="Hotel Name" className="w-40 sm:w-60 md:w-80 ml-3 outline-none bg-transparent" />
                                        {errors.name && <p className="text-red-500">{errors.name}</p>/* Display error message if name is empty*/}
                                    </div>
                                    <div className="border border-solid border-gray-400 py-3 px-5 rounded">
                                        <MeetingRoomIcon className="text-gray-600" />
                                        <input type="number" required={true} value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Hotel Number" className="w-40 sm:w-60 md:w-80 ml-3 outline-none bg-transparent" />
                                        {errors.number && <p className="text-red-500">{errors.number}</p>/* Display error message if number is empty*/} 
                                    </div>
                                    <div className="border border-solid border-gray-400 py-3 px-5 rounded">
                                        <RequestQuoteIcon className="text-gray-600" />
                                        <input type="number" required={true} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price Per Day" className="w-40 sm:w-60 md:w-80 ml-3 outline-none bg-transparent" />
                                        {errors.price && <p className="text-red-500">{errors.price}</p>/* Display error message if price is empty or not a number*/} 
                                    </div>
                                    <FormControl className="md:w-[25rem] w-60 sm:w-80">
                                        <InputLabel id="demo-single-checkbox-label" className="!text-gray-400">Hotel Type</InputLabel>
                                        <CustomSelect
                                            labelId="demo-single-checkbox-label"
                                            id="demo-single-checkbox"
                                            value={type}
                                            onChange={handleTypeChange}
                                            input={<OutlinedInput label="Hotel Type" />}
                                            MenuProps={MenuProps}
                                            required={true}
                                        >
                                            {availableType.map((t) => (
                                                <MenuItem key={t} value={t}>
                                                    <ListItemText primary={t} />
                                                </MenuItem>
                                            ))}
                                        </CustomSelect>
                                    </FormControl>
                                    <FormControl className="md:w-[25rem] w-60 sm:w-80">
                                        <InputLabel id="demo-multiple-checkbox-label" className="!text-gray-400">Specifications</InputLabel>
                                        <CustomSelect
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={specification}
                                            onChange={handleSpecificationChange}
                                            input={<OutlinedInput label="Specifications" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {availableSpecifications.map((spec) => (
                                                <MenuItem key={spec} value={spec}>
                                                    <Checkbox checked={specification.indexOf(spec) > -1} />
                                                    <ListItemText primary={spec} />
                                                </MenuItem>
                                            ))}
                                        </CustomSelect>
                                    </FormControl>
                                    <Button variant="contained" type="submit" className="!bg-blue-400 !py-4">Create</Button>
                                </form>
                            </div>
                        )}
                    </Fragment>
                )}
            </div >
        </Fragment>
    )
}

export default CreateHotel;