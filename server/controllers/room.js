const Room = require('../model/Room')
const Hotel = require('../model/Hotel')

const CustomAPIError = require('../error/error')

const createRoom = async(req, res)=>{
    const tempRoom = await Room.create(req.body)
    
    if(!tempRoom) 
    throw new CustomAPIError('Bad Request in request body', 401)

    const room = await Hotel.findByIdAndUpdate(req.params.hotelId,
        {
            $push: { rooms: tempRoom._id }
        },
        {
            runValidators:true,
            new: true
        })
    res.status(201).json({ data:tempRoom })
    
}

const updateRoom = async(req, res)=>{
    const room = await Room.findByIdAndUpdate(req.params.id,
        req.body,
        {
            runValidators: true,
            new: true
        })
    res.status(201).json({ data:room })
}

const updateRoomAvailability = async(req, res)=>{
    const room = await Room.updateOne(
    { 'roomNumbers._id': req.params.id  },
    {
        $addToSet: {
            'roomNumbers.$.unavailableDates': req.body.dates
        }
    },
    {
        runValidators:true,
        new:true
    }
    )

    res.status(200).json({ data:room })

}

const deleteRoom = async(req, res)=>{
    await Room.findByIdAndDelete(req.params.id)
    const hotel = await Hotel.findByIdAndUpdate(req.params.hotelId,
        {
            $pull: { rooms: req.params.id }
        },
        {runValidators:true,
        new: true})
    res.status(201).json({msg: "room deleted and hotel updated", data: hotel})
}

const getRoom = async(req, res)=>{
    const room = await Room.findById(req.params.id)
    res.status(201).json({data:room})
}

const getRooms = async(req, res)=>{
    const rooms = await Room.find({})
    res.status(200).json({
        nbHits: rooms.length,
        data: rooms
    })
}

module.exports = {
    createRoom, updateRoom, updateRoomAvailability,
    deleteRoom, getRoom, getRooms
}
