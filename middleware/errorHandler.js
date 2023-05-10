const errorHandler = (err, req, res, next) =>{
    const status = err.status || 400;
    let error = err.message;
    // send back an easily understandable error message to the caller
    if(err.name == 'ValidationError'){
        let errors = {};
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
        });
        error = errors;
    }
    if(err.code == 11000){
        let message = `Duplicate ${Object.keys(Object(err).keyValue)[0]} value entered!`;
        error = new Error(message);
    }

    if(err.name == 'Error'){
        let message = `${err}!`;
        error = new Error(message);
    }
    res.status(status).json({
        success:false,
        error:error.message,
        validation:error
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