import SideBar from "../components/SideBar";
import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePakage, getAllPakages, uploadPakagePicture } from '../redux/actions/pakageAction';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination, IconButton, Dialog, DialogContent, DialogTitle, DialogActions, Button, DialogContentText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { setError } from "../redux/slices/appSlice";
import Meta from "../utils/Meta";
import jsPDF from 'jspdf';

const AllPakages = () => {
    const dispatch = useDispatch();
    const { isLoading, allPakages } = useSelector((state) => state.pakageState);
    const [open, setOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [pakageRef, setPakageRef] = useState(undefined);
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - allPakages?.length);

    useEffect(() => {
        dispatch(getAllPakages());
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const updloadImageHandler = () => {
        const formData = new FormData();

        images.forEach((image) => {
            formData.append('pictures', image);
        })

        dispatch(uploadPakagePicture(formData, pakageRef._id))
        setOpen(!open);
        setImages([]);
        setPakageRef(undefined);
    };

    const deleteHandler = () => {
        dispatch(deletePakage(pakageRef._id));
        setIsDeleteOpen(false);
        setPakageRef(undefined);
    };
    const generateReport = () => {
        // Create a new PDF document
        const doc = new jsPDF();
        let y = 15;
      
        // Set the title of the report
        const title = 'Report';
        const titleFontSize = 18;
        const titleWidth = doc.getTextWidth(title) * (titleFontSize / doc.internal.scaleFactor);
        const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
      
        doc.setFontSize(titleFontSize);
        doc.text(title, titleX, y);
        y += 10;
      
        // Generate the report for each package
        allPakages.forEach((pakage) => {

        // Adding the package name with a bigger font size
          doc.setFontSize(16);
          doc.text(`Name: ${pakage.name}`, 15, y);
          y += 8;

          // Adding the package ID
          doc.setFontSize(12);
          doc.text(`ID: ${pakage._id}`, 15, y);
          y += 8;
      

      
          // Add other package details (location, distance, description, hotels, etc.) as needed
          doc.setFontSize(12);
          doc.text(`Location: ${pakage.location}`, 15, y);
          y += 8;
          doc.text(`Distance: ${pakage.distance}`, 15, y);
          y += 8;
          doc.text(`Description: ${pakage.description}`, 15, y);
          y += 8;
      
          // Add a line separator
          doc.line(15, y, 195, y);
          y += 5;
        });
      
        // Save the PDF file
        doc.save('serandib Travel Packages.pdf');
      };
      



    return (
        <Fragment>
            <Meta title="All Packages" />
            <div className="flex">
                <SideBar />
                <Fragment>
                    {isLoading ? <Loader /> : (
                        <div className="w-[80%] sm:w-[60%] md:w-[70%] mx-auto mt-3">
                            <h2 className="text-2xl font-medium text-center my-8">All Packages</h2>
                            <button
                                id="save-button"
                                startIcon={<GetAppIcon />}
                                onClick={generateReport}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-4"
                            >
                                Download Report
                            </button>

                            <TableContainer component={Paper}>
                                <Table className="min-w-[700px]">
                                    <TableHead >
                                        <TableRow className="bg-blue-300">
                                            <TableCell align="center">Id</TableCell>
                                            <TableCell align="center">Name</TableCell>
                                            <TableCell align="center">Upload Images</TableCell>
                                            <TableCell align="center">Update</TableCell>
                                            <TableCell align="center">Delete</TableCell>
                                            <TableCell align="center">Hotels</TableCell>
                                            <TableCell align="center">Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 2 ? allPakages?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : allPakages)?.map((pakage) => (
                                            <TableRow key={pakage._id} style={{ height: 72.8 }}>
                                                <TableCell align="center">{pakage._id}</TableCell>
                                                <TableCell align="center">{pakage.name}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton onClick={() => {
                                                        setOpen(!open);
                                                        setPakageRef(pakage);
                                                    }}>
                                                        <AddPhotoAlternateIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Link to={`/admin/pakage/${pakage._id}/update`}>
                                                        <IconButton><EditIcon /></IconButton>
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton onClick={() => {
                                                        setIsDeleteOpen(!isDeleteOpen);
                                                        setPakageRef(pakage);
                                                    }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Link to={`/admin/pakage/${pakage._id}/hotels`}>
                                                        <IconButton><HolidayVillageIcon /></IconButton>
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Link to={`/pakage/${pakage._id}`}>
                                                        <IconButton><LaunchIcon /></IconButton>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 72.8 * emptyRows }}>
                                                <TableCell colSpan={4} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                page={page}
                                                count={allPakages?.length}
                                                rowsPerPageOptions={[]}
                                                onPageChange={handleChangePage}
                                                rowsPerPage={rowsPerPage} />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            <Dialog open={open} scroll="body" className="!w-screen" fullWidth={true}>
                                <div className="p-4" >
                                    <DialogTitle className="text-center">Upload Package Images</DialogTitle>
                                    <DialogContent className="m-4 flex justify-center items-center">
                                        {images.length < 1 && (
                                            <Button component="label">
                                                <FileUploadIcon color="action" fontSize="large" />
                                                <input hidden accept="image/*" multiple type="file" onChange={(e) => {
                                                    if (e.target.files.length <= 5) {
                                                        setImages(Array.from(e.target.files));
                                                    } else {
                                                        dispatch(setError("Maximum 5 Images can be uploaded."))
                                                    }
                                                }
                                                } />
                                            </Button>
                                        )}

                                        {images?.length > 0 && (
                                            <div> {images?.map((image) => (
                                                <input key={image.name} type="text" value={image.name} disabled={true} className="block w-36 sm:w-96  py-3 my-2 px-5 border border-solid border-slate-400 rounded bg-neutral-300" />
                                            ))}
                                            </div>
                                        )}

                                    </DialogContent>
                                    <DialogActions className="mt-4">
                                        <button onClick={() => {
                                            setOpen(!open);
                                            setImages([]);
                                            setPakageRef(undefined);
                                        }
                                        } className="bg-blue-400 hover:bg-blue-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                        <button disabled={images.length < 1 ? true : false} onClick={updloadImageHandler} className=" border-blue-400 text-blue-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-200 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Upload</button>
                                    </DialogActions>
                                </div>
                            </Dialog>
                            <Dialog open={isDeleteOpen}>
                                <DialogTitle className="text-center">Delete Package?</DialogTitle>
                                <DialogContent className="m-8">
                                    <DialogContentText className="text-gray-900">This will delete package's pakage and pakages booking details also.</DialogContentText>
                                </DialogContent>
                                <DialogActions className="m-4">
                                    <button onClick={() => {
                                        setIsDeleteOpen(!isDeleteOpen);
                                        setPakageRef(undefined);
                                    }
                                    } className="bg-blue-400 hover:bg-blue-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                    <button onClick={deleteHandler} className=" border-blue-400 text-blue-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-200 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Delete</button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    )}
                </Fragment>
            </div>
        </Fragment>
    )
}
export default AllPakages;