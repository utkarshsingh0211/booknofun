const hotelRouter = require('express').Router()
const {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels,
    countByCity,
    countByType,
    getHotelRooms
} = require('../controllers/hotel')



// create
hotelRouter.route('/').post(createHotel).get(getHotels)

// update and delete
hotelRouter.route('/:id').patch(updateHotel).delete(deleteHotel)

// get
hotelRouter.route('/find/:id').get(getHotel)

// get all
hotelRouter.route('/countByCity').get(countByCity)
hotelRouter.route('/countByType').get(countByType)
hotelRouter.route('/room/:id').get(getHotelRooms)

module.exports = hotelRouter
