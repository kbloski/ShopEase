export async function sendError(req, res,statusCode, errorMessage = 'Error message' ){
    res.statusMessage = errorMessage;
    res.status(statusCode).json( {msg: errorMessage.trim()});
}


export async function sendSuccess(req, res, statusCode=200, {
    msg = 'Success',
    data = {},
} ){
    res.status(statusCode).json(      
        {
            msg, 
            ...data
        }  
    );
};
