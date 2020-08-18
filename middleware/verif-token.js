const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if (token){
        jwt.verify(token, req.app.get('api_secret_key'), (err,decoded) => {
            if (err){
                res.json({
                    status: false,
                    message: 'Token Qabul Qilinishi Muvaffaqiyatsiz'
                })
            }else{
                req.decode = decoded
                //console.log(decoded);
                next()
            }
        })
    }else{
        res.json({
            status: false,
            message: 'Token Topilmadi Iltimos Token Kiriting !!!'
        })
    }
};
