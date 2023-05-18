import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPakageAction } from "../redux/actions/pakageAction";
import { Slide } from 'react-slideshow-image';
import picture from '../images/nopicture.jpg';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Loader from '../components/Loader';
import HotelCard from "../components/HotelCard";
import NotFound from './NotFound';
import Meta from "../utils/Meta";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Pakage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { pakage, isLoading } = useSelector((state) => state.pakageState);

    useEffect(() => {
        dispatch(getPakageAction(id));
    }, [id, dispatch]);

    return (
        <Fragment>
            <Navbar/>
        <Meta title={pakage?.name} />
        <Fragment>
            {isLoading ? <Loader /> : (
                <Fragment>
                    {!pakage ? <NotFound /> : (
                        <div className="flex flex-col md:min-h-60 gap-8 bg-gray-200  pt-4 md:items-center">
                            <div className="h-60 md:w-7/12">
                                {pakage?.pictures.length < 1 ? (
                                    <div className="h-60 -mr-[21.33px]">
                                        <img src={picture} alt="Not available" className="w-full h-full object-fill" />
                                    </div>
                                ) : (
                                    <Slide duration={3000} transitionDuration={400} prevArrow={<ArrowBackIosNewIcon className="text-zinc-200" />} nextArrow={<ArrowForwardIosIcon className="text-zinc-200" />}>
                                        {pakage?.pictures?.map((pic) => (
                                            <div className="h-60" key={pic.public_id}>
                                                <img src={pic.url} alt={pic.public_id} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </Slide>
                                )}
                            </div >
                            <div className="md:w-7/12 mx-4 md:my-6 mb-6">
                                <div className="flex justify-between">
                                    <h2 className="text-xl capitalize font-semibold">{pakage?.name}</h2>
                                    <a href={`/pakage/${id}/hotels`} className="bg-blue-400 text-gray-50 p-3 rounded hover:bg-blue-500">Book Now</a>
                                </div>
                                <h4 className="font-medium">{pakage?.location}</h4>
                                <p className="my-3">{pakage?.description}</p>
                                <span className="font-medium text-gray-700"><LocationOnIcon className="mb-1" /><span className=" font-normal">{pakage?.distance}m from zero point.</span></span>
                                <div className="flex gap-4 flex-wrap mt-6">
                                    {pakage?.specification?.map((spec) => (
                                        <div key={spec} className="py-2 px-3 bg-gray-100 rounded-lg">
                                            <AddIcon className="mr-2" />
                                            <span>{spec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div id="hotels" className="mx-4 md:mx-0 -mt-4 mb-8 md:w-9/12">
                                <span className="text-2xl mx-auto w-52 pb-2 block font-medium text-center border-b-2 border-solid border-gray-400">Choose your hotel</span>
                                <div className="flex flex-wrap gap-4 justify-center mt-12">
                                    {pakage?.hotels?.map((hotel) => (
                                        <HotelCard key={hotel._id} hotel={hotel} />
                                    ))}
                                </div>
                            </div>
                        </div >
                    )}
                </Fragment>
            )}
            </Fragment>
            <Footer/>
            </Fragment>
    )
}
export default Pakage;