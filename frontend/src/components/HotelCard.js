import { Slide } from 'react-slideshow-image';
import picture from '../images/nopicture.jpg';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { Calendar } from 'react-date-range';
import { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';

const HotelCard = ({ hotel }) => {
    const navigate = useNavigate();
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [disableDates, setDisableDates] = useState([]);

    useEffect(() => {
        if (hotel.notAvailable.length > 0) {
            const dates = hotel.notAvailable.map((date) => new Date(date));
            setDisableDates(dates);
        }
    }, [hotel])

    return (
        <div className="flex flex-col w-80 gap-8 bg-stone-100 shadow-md rounded-md">
            <div className="h-60 rounded-t-md overflow-hidden">
                {hotel.pictures.length < 1 ? (
                    <div className="h-60">
                        <img src={picture} alt="Not available" className="w-full h-full object-fill overflow-hidden" />
                    </div>
                ) : (
                    <Slide duration={3000} transitionDuration={400} prevArrow={<ArrowBackIosNewIcon className="text-zinc-200" />} nextArrow={<ArrowForwardIosIcon className="text-zinc-200" />}>
                        {hotel.pictures.map((pic) => (
                            <div className="h-60 overflow-hidden" key={pic.public_id}>
                                <img src={pic.url} alt={pic.public_id} className="w-full h-full object-cover overflow-hidden" />
                            </div>
                        ))}
                    </Slide>
                )}
            </div >
            <div className="mx-4 mb-6">
                <h2 className="text-xl capitalize font-semibold">{hotel.name}</h2>
                <p className=" my-3 font-medium">Type: <span className="font-normal font-mono">{hotel.type}</span></p>
                <div className="flex gap-4 flex-wrap mt-6 mb-5 h-24 items-end">
                    {hotel.specification?.map((spec) => (
                        <div key={spec} className="py-2 px-3 bg-gray-300 rounded-lg">
                            <AddIcon className="mr-1" />
                            <span>{spec}</span>
                        </div>
                    ))}
                </div>
                <span className="text-xl font-medium"><RequestQuoteIcon className="mb-1 mr-1" />{hotel.pricePerDay} Taka/day</span>
                <div className="flex justify-between gap-4 mt-4">
                    <button onClick={() => setIsDateOpen(!isDateOpen)} className=" border-blue-400 text-blue-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-200 border-solid border py-2 rounded-lg w-36 text-center transition duration-200 box-border">Availability</button>
                    <button onClick={() => navigate(`/hotel/${hotel._id}/book`)} className="bg-blue-400 hover:bg-blue-500 py-2 rounded-lg w-36 text-center text-neutral-50  transition duration-200 font-semibold">Book Now</button>
                </div>
                <Dialog className="flex items-center justify-center" open={isDateOpen} onClose={() => setIsDateOpen(!isDateOpen)}>
                    <div className=" bg-white sm:p-8 rounded">
                        <Calendar disabledDates={disableDates} minDate={new Date()} className="rounded" />
                    </div>
                </Dialog>
            </div>
        </div >
    )
}
export default HotelCard;