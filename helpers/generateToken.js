import jwt from "jsonwebtoken";
// import config from "config"

/**
 * @returns it returns the token as string
 * @params it expects user data with userName and fullName
 *
 *  */ 

const generateToken = (user) => {



    return jwt.sign(
        user,
        process.env.ACCESS_SECRET,
        // config.get('jwt_secret.access',
        {expiresIn: '3600s'}
        )
    
}

export default generateToken; 