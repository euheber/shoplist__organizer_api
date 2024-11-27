import jwt from "jsonwebtoken"

const generateToken = (payload) => { 
    const {date} = payload
    const today = new Date()
    const futureDate = new Date(date)
    const diffInMilliseconds = futureDate - today;
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

    const options = { expiresIn:  `${diffInDays}d` };
        return new Promise( (resolve, reject) => { 

            jwt.sign(payload, process.env.SECRET, options, (err, token) => {
                if(err){
                    reject(err)
                } else {
                    resolve(token)
                }
            })
        })
}




export default generateToken