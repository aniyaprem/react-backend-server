const errorHandler = (error, request, response, next) =>{
    console.log( `error ${error.message}`)
    const status = error.status || 400
    // send back an easily understandable error message to the caller
    response.status(status).json({
        success:false,
        message:error.message
    })
}

// app.use(async (req, res, next)=>{
//     const error = new Error('Not found')
//     error.status = 404
//     next(error)
// })

// app.use((err, req, res, next)=>{
//     res.status(err.status || 500)
//     res.json({
//         error:{
//             status:err.status || 500,
//             message:err.message
//         }
//     })
// })

module.exports = errorHandler;