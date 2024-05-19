const roomRouter =require('express').Router()
const {
    createRoom, updateRoom, updateRoomAvailability,
    deleteRoom, getRoom, getRooms
} = require('../controllers/room')
const {verifyToken, verifyAdmin} = require('../middleware/auth')

// create
roomRouter.route('/:hotelId').post(verifyToken, verifyAdmin, createRoom)

// update
roomRouter.patch('/availability/:id', updateRoomAvailability)

// delete
roomRouter.delete('/:id/:hotelId',verifyToken, verifyAdmin, deleteRoom)

// get all
roomRouter.get('/', getRooms)

// single room ops
roomRouter.route('/:id').get(getRoom).patch(updateRoom)

module.exports = roomRouter