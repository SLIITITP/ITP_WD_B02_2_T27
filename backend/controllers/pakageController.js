const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Pakage = require('../models/Pakage');
const Hotel = require('../models/Hotel');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary').v2;
const getDataUri = require('../utils/getDataUri');

// create pakage -- admin
export const createPakage = catchAsyncErrors(async (req, res, next) => {
    const { name, location, distance, specification, description } = req.body;

    const pakage = await Pakage.create({
        name, location, distance, specification, description
    });

    res.status(201).json({
        success: true
    })
});

// upload pakage pictures -- admin
export const uploadPakagePictures = catchAsyncErrors(async (req, res, next) => {
    const pictures = req.files;
    const id = req.params.id;

    if (pictures.length < 1) {
        return next(new ErrorHandler('Please upload pakage pictures', 400));
    }

    const pakage = await Pakage.findById(id);

    if (!pakage) {
        return next(new ErrorHandler('Pakage not found', 404));
    }

    
    const picturePath = await Promise.all(pictures.map(async (picture) => {
        const pictureUri = getDataUri(picture);

        const myCloud = await cloudinary.uploader.upload(pictureUri.content, {
            folder: '/spotpakage/pakages',
            crop: "scale",
        })

        return {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }))

    // destroy previous pictures
    if (pakage.pictures.length > 0) {
        await Promise.all(pakage.pictures.map(async (picture) => {
            await cloudinary.uploader.destroy(picture.public_id)
            return;
        }));
    }

    pakage.pictures = picturePath;
    await pakage.save();

    res.status(200).json({
        success: true,
        pakage
    })
})

// update pakage details -- admin
export const updatePakage = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const { name, location, distance, specification, description } = req.body;

    const pakage = await Pakage.findByIdAndUpdate(id, {
        $set: {
            name,
            location,
            distance,
            description,
            specification
        }
    }, { new: true })

    if (!pakage) {
        return next(new ErrorHandler("Pakage not found", 404));
    }

    res.status(200).json({
        success: true,
        pakage
    })
})

// delete pakage -- admin
export const deletePakage = catchAsyncErrors(async (req, res, next) => {
    const pakage = await Pakage.findById(req.params.id);

    if (!pakage) {
        return next(new ErrorHandler("Pakage not found", 404));
    }

    // delete pakage hotels
    await Promise.all(pakage.hotels.map(async (hotelId) => {
        const hotel = await Hotel.findById(hotelId);

        hotel && await hotel.delete();

        return;
    }))

    if (pakage.pictures.length > 0) {
        await Promise.all(pakage.pictures.map(async (picture) => {
            await cloudinary.uploader.destroy(picture.public_id)
        }))
    }


    await pakage.delete();
    const pakages = await Pakage.find();

    res.status(200).json({
        success: true,
        pakages,
        message: "Pakage deleted successfully"
    })
})

// get pakage details
export const getPakageDetails = catchAsyncErrors(async (req, res, next) => {
    const pakage = await Pakage.findById(req.params.id).populate('hotels');

    if (!pakage) {
        return next(new ErrorHandler("Pakage not found", 404));
    }

    res.status(200).json({
        success: true,
        pakage
    })
})

// get all pakage
export const getAllPakages = catchAsyncErrors(async (req, res, next) => {
    const keyword = req.query.location;
    const hotelCount = Number(req.query.hotel);
    const personCount = Number(req.query.person);
    const dates = [];

    
    // for search query
    if (req.query.person && personCount < 1) return next(new ErrorHandler("At least one person required", 400));
    if (req.query.hotel && hotelCount < 1) return next(new ErrorHandler("At least one hotel required", 400));
    if (req.query.d1 && req.query.d2) {
        let startDate = req.query.d1;
        let endDate = req.query.d2;        

        if (startDate > endDate) return next(new ErrorHandler("Please check start and end date", 400));

        while ( new Date(startDate) <= new Date(endDate)) {
            dates.push(Date.parse(new Date(startDate)));

            startDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1));
        }
    }

    let pakages = await Pakage.find({
        location: {
            $regex: keyword ? keyword : '',
            $options: 'i'
        },
        $expr: { $gte: [{ $size: "$hotels" }, req.query.hotel ? hotelCount : 0] }

    }).populate('hotels');

    if (req.query.person) {
        pakages = pakages.filter((pakage) => {
            return pakage.hotels.some((hotel) => {
                return personCount > 1 ? hotel.type === "Double" :  true;
            })
        })
    }

    if (dates.length > 0) {
        pakages = pakages.filter((pakage) => {
            return pakage.hotels.some((hotel) => {
                return hotel.notAvailable.every((date) => {
                    return !dates.includes(Date.parse(date))
                })
            })
        })
    }

    res.status(200).json({
        success: true,
        pakages
    })
})
