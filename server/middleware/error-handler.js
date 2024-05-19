const errorHandlerMiddleware = (err, req, res, next)=>{
    let customError = {
        msg: err.message || "Internal Server Error",
        statusCode: err.statusCode || 500
    }

    res.status(customError.statusCode).json({ "msg":customError.msg })
}

module.exports = errorHandlerMiddleware