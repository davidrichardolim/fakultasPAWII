const logMiddleware = (req,res,next) => {
    console.log("Hallo Saya Middleware")

    next()
}
export default logMiddleware