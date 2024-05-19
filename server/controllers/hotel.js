const Hotel = require('../model/Hotel')
const Room = require('../model/Room')

const CustomAPIError = require('../error/error')

const createHotel = async(req, res)=>{
    
    const hotel = await Hotel.create(req.body)
    res.status(201).json({data:hotel})

}

const updateHotel = async(req, res)=>{
    const {photos, ...otherDetails} = req.body
    console.log(otherDetails)
    const hotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        {
            ...otherDetails,
            $push: {photos: photos}
        },
        {   
            runValidators:true,
            new:true    
        })
    res.status(201).json({data:hotel})

}

const deleteHotel = async(req, res)=>{

    await Hotel.findByIdAndDelete( req.params.id )
    res.status(201).json({data:"success"})

}

const getHotel = async(req, res)=>{
    
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json({hotel})

}

const getHotels = async(req, res)=>{

    const { min, max, ...others } = req.query
    const keys = Object.keys(others)
    
    let limit = req.query.limit||10

    const filter ={}
    keys.map((key)=>{
        if(others[key]!='')
        filter[key] = others[key]
    })
    const hotels = await Hotel.find({
        ...filter,
        cheapestPrice: {$gte: min||1, $lte: max||1200}
    }).limit(limit)

    res.status(200).json(hotels)
    
}

const countByCity = async(req, res)=>{
    const cities = req.query.cities.split(',')
    const list = await Promise.all(
        cities.map((city)=>{
            return Hotel.countDocuments({city})
        })
    )
    res.status(200).json(list)
}

const countByType = async(req, res)=>{
    const hotelCount = await Hotel.countDocuments({type:"hotel"})
    const appartmentCount = await Hotel.countDocuments({type:"appartment"})
    const resortCount = await Hotel.countDocuments({type:"resort"})
    const villaCount = await Hotel.countDocuments({type:"villa"})
    const cabinCount = await Hotel.countDocuments({type:"cabin"})

    res.status(200).json([
        {type: "hotels", count: hotelCount},
        {type: "appartments", count: appartmentCount},
        {type: "resorts", count: resortCount},
        {type: "villas", count: villaCount},
        {type: "cabins", count: cabinCount},
    ])
}   

const getHotelRooms = async(req, res)=>{
    const hotel = await Hotel.findById(req.params.id)
    const list = await Promise.all(hotel.rooms.map((room)=>{
        return Room.findById(room)
    }))
    console.log(list)
    res.status(200).json({count:list.length,list})

}

module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels,
    countByCity,
    countByType,
    getHotelRooms
}
