const Hotel = require("../models/hotel")
const asyncHandler = require("express-async-handler");
const slugify = require('slugify');
// const {validateMongoDbId} = require("../utils/validateMongodbId");
const Room = require("../models/room")


// create new hotel
const createHotel = asyncHandler(async(req, res) => {
    try{
        // if (req.body.name){
        //     req.body.slug = slugify(req.body.name);
        // }
        
        const newHotel = await Hotel.create(req.body);
        res.json(newHotel);
      } catch (error) {
        throw new Error(error);
      }
    
});

// update hotel
const updateHotel = asyncHandler(async (req, res) => {

    try {
   
    //   const updateHotel = await Hotel.findOneAndUpdate({_id: id}, req.body,{
    //     new: true,
    // });
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
      res.status(200).json(updatedHotel);
    } catch (error) {
        return res.status(500).json({message:error})
    }
  });
  


// delete hotel
const deleteHotel = asyncHandler(async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");

    } catch (error) {
        return res.status(500).json({message:error})
    }
  });
  
// get single hotel
const getSingleHotel = asyncHandler(async(req, res) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
    } catch(error){
        return res.status(500).json({message:error})
    }
})

// get all hotels
const getAllHotels = asyncHandler(async(req, res, next) => {
   const {min, max, ...others} = req.query;
    try{
      const hotels = await Hotel.find({...others, cheapestPrice:{$gt:min | 1, $lt:max || 999},}).limit(req.query.limit);
    // const hotels = await Hotel.find();
       res.status(200).json(hotels)
    } catch(err){
        // return res.status(500).json({message:error})
        next(err)
    }
})


// get all city counts
const countByCity = asyncHandler(async(req, res, next) => {
    const cities = req.query.cities.split(",");
   
    try{
        const list = await Promise.all(cities.map((city) =>{
            return Hotel.countDocuments({city:city});
        }) );
       return  res.status(200).json(list);
    } catch(err){
        // return res.status(500).json({message:error})
        next(err)
    }
})


// get all type counts
const countByType = asyncHandler(async(req, res, next) => {

    try{
    const hotelCount = await Hotel.countDocuments({type:"hotel"})
    const apartmentCount = await Hotel.countDocuments({type:"apartment"})
    const resortCount = await Hotel.countDocuments({type:"resort"})
    const villaCount = await Hotel.countDocuments({type:"villa"})
    const cabinCount = await Hotel.countDocuments({type:"cabin"})
       return  res.status(200).json([
        {type:"hotel", count:hotelCount},
        {type:"apartments", count:apartmentCount},
        {type:"resorts", count:resortCount},
        {type:"villas", count:villaCount},
        {type:"cabins", count:cabinCount}
       ])
    } catch(err){
      
        next(err)
    }
})


const getHotelRooms = asyncHandler(async(req, res, next) => {

    try{
    const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room)
        }))
       return  res.status(200).json(list)
    } catch(err){
      
        next(err)
    }
})

module.exports = { createHotel, getAllHotels,
    updateHotel, deleteHotel, getSingleHotel,
    countByCity, countByType, getHotelRooms

}