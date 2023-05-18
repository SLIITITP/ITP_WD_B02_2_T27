import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPakages } from '../redux/actions/pakageAction';
import { Fragment, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Link } from "react-router-dom";
import { Chart as ChartJS, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale } from "chart.js";
import Meta from '../utils/Meta';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

const Dashboard = () => {
    const dispatch = useDispatch();
    const { allPakages } = useSelector((state) => state.pakageState);

    useEffect(() => {
        dispatch(getAllPakages());

    }, [dispatch]);

    

    return (
        <Fragment>
            <Meta title="Admin Dashboard" />
            <div className="flex">
                <SideBar />
                <div className="mx-auto w-full lg:mt-16 sm:mt-8 mt-5 md:mt-12">
                    <h2 className="text-center mb-12 font-medium text-2xl text-blue-400">Admin DashBoard</h2>
                    <div className=" px-4 lg:px-20 flex flex-col gap-5 sm:gap-8 md:gap-12 lg:gap-28 sm:flex-row sm:justify-center" >
                        <Card className="px-5 py-3 shadow-2xl sm:w-1/4 sm:px-2 sm:py-2 !bg-zinc-200">
                            <CardContent className="w-full flex justify-between items-center sm:aspect-square sm:flex-col-reverse sm:justify-center">
                                <div className="text-center">
                                    <Link to="/admin/pakages" className="text-3xl font-medium text-blue-500"> {allPakages.length}</Link>
                                    <p className="text-gray-500 text-md">{allPakages.length > 1 ? "Packages" : "Packages"}</p>
                                </div>
                                <ApartmentIcon className="text-blue-400 !text-4xl mb-4" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Dashboard;