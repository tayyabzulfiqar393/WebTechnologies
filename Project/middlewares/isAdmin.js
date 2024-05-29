module.exports =  isAdmin = async (req, res, next)=>{
    try {
        if(req.session.user.isAdmin === false ){
            return res.status(401).send({
                message: "Unauthorized access"
            })
        }else{
            next();
        }
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internel Server error"
        })
    }
}