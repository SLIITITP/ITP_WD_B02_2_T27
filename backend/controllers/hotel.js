import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

//CREATE 
export const createHotel = async(req, res, next)=>{
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }
}

//UPDATE
export const updateHotel = async(req, res, next)=>{
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}

//DELETE
export const deleteHotel = async(req, res, next)=>{
    try {
        await Hotel.findByIdAndDelete(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json("Hotel has been deleted")
    } catch (err) {
        next(err)
    }
}

//GET A HOTEL
export const getHotel = async(req, res, next)=>{
    try {
        const hotel = await Hotel.findById(
            req.params.id,
        );
        res.status(200).json(hotel);
    } catch (err) {
        next(err); 
    }
}

//GET ALL HOTELS
export const getHotels = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;

  try {
    const query = Hotel.find({
      ...others,
      cheapestPrice: { $gte: min || 1, $lte: max || 10000 }
    }).limit(Number(limit) || 0);

    const hotels = await query.exec();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};


//Count By City
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };

  // Count By Type
  export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };

  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };





