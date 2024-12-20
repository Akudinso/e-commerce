import AuthService from "../services/auth.service.js";
const {registerUser, loginUser} = new AuthService

export default class AuthController{
    async registerUser(req, res, next){
        try {

            const { password , email, name, phone,address} = req.body
        
            if(!password || !name || !phone){
                throw new Error("Please provide all the required field");
            }

           const user = await registerUser(req.body)
           res.status(200).send({message: 'user registered successfully', user})
        } catch (error) {
            console.log(error);
        }
    }
    async loginUser(req,res){
        try {
            const {email,password} = req.body
            const {user,token} = await loginUser(email,password)
            res.status(200).json({success:true, message: "User logged in Successfully", data: user})
        } catch (error) {
            console.log(error.message);
            res.status(500).json({success: true, message: "Something went wrong", error})
        }
    }
}
