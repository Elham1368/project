const statusCode = {
    not_found : 404,
};

const content_type = {
    json : "application/json"
};

const error = {
    notFound :{
        code : 404,
        message : "route or method not found"
    }
};
module.exports={
    statusCode ,
    content_type ,
    error ,
}