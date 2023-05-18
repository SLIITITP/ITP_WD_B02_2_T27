const Hotel = require('../models/Hotel');
const Pakage = require('../models/Pakage');
const cloudinary = require('cloudinary').v2;
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const getDataUri = require('../utils/getDataUri');

// create hotel -- admin
export const createHotel = catchAsyncErrors(async (req, res, next) => {
    const pakageId = req.params.id;
    const { number, name, type, specification, pricePerDay } = req.body;

    const pakage = await Pakage.findById(pakageId);
    if (!pakage) {
        return next(new ErrorHandler("Pakage not found", 404));
    }

    const isDuplicate = await Hotel.findOne({
        pakage: pakage.id,
        number
    })

    if (isDuplicate) {
        return next(new ErrorHandler("Duplicate hotel number", 400))
    }

    const hotel = await Hotel.create({
        number,
        name,
        type,
        specification,
        pricePerDay,
        hotel: pakage.id
    })

    pakage.hotels.push(hotel.id);
    await pakage.save();

    res.status(201).json({
        success: true,
        hotel
    })
})

// upload hotel pictures -- admin
export const uploadHotelPictures = catchAsyncErrors(async (req, res, next) => {
    const pictures = req.files;
    const id = req.params.id;

    if (pictures.length < 1) {
        return next(new ErrorHandler('Please upload hotel pictures', 400));
    }

    const hotel = await Hotel.findById(id);

    if (!hotel) {
        return next(new ErrorHandler('Hotel not found', 404));
    }


    const picturePath = await Promise.all(pictures.map(async (picture) => {
        const pictureUri = getDataUri(picture);

        const myCloud = await cloudinary.uploader.upload(pictureUri.content, {
            folder: '/spotpakage/hotels',
            crop: "scale",
        })

        return {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }))

    // destroy previous pictures
    if (hotel.pictures.length > 0) {
        await Promise.all(hotel.pictures.map(async (picture) => {
            await cloudinary.uploader.destroy(picture.public_id)
            return;
        }));
    }

    hotel.pictures = picturePath;
    await hotel.save();

    res.status(200).json({
        success: true,
        hotel
    })
})

// update hotel details
export const updateHotel = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const { number, name, type, bedCount, specification, pricePerDay } = req.body;

    if (number) {
        return next(new ErrorHandler("Hotel number can't be changed", 400))
    }

    const hotel = await Hotel.findByIdAndUpdate(id, {
        $set: {
            name,
            type,
            bedCount,
            specification,
            pricePerDay,
        }
    }, { new: true })

    if (!hotel) {
        return next(new ErrorHandler('Hotel not found', 404));
    }

    res.status(200).json({
        success: true,
        hotel
    })
})


// delete hotel -- admin
export const deleteHotel = catchAsyncErrors(async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
        return next(new ErrorHandler("Hotel not found", 404));
    }

    // delete hotel from pakage 
    const hotelsPakage = await Pakage.findById(hotel.pakage);
    hotelsPakage.hotels = hotelsPakage.hotels.filter((hotel) => hotel.toString() !== req.params.id)

    if (hotel.pictures.length > 0) {
        await Promise.all(hotel.pictures.map(async (picture) => {
            await cloudinary.uploader.destroy(picture.public_id)
        }))
    }


    await hotelsPakage.save();
    await hotel.delete();
    const pakage = await Pakage.findById(hotelsPakage.id).populate('hotels');

    res.status(200).json({
        success: true,
        pakage,
        message: "hotel deleted successfully"
    })
})

// get hotel details
export const getHotelDetails = catchAsyncErrors(async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.id).populate('hotel');

    if (!hotel) {
        return next(new ErrorHandler("Hotel not found", 404));
    }

    res.status(200).json({
        success: true,
        hotel
    })
})

// get all hotels
export const getPakageHotels = catchAsyncErrors(async (req, res, next) => {
    const pakageId = req.params.id;

    const pakage = await Pakage.findById(pakageId);
    if (!pakage) {
        return next(new ErrorHandler("Pakage not found.", 404));
    }

    const hotels = await Hotel.find({
        pakage: pakageId
    })

    res.status(200).json({
        success: true,
        hotels
    })
})
