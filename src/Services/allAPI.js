import commonAPI from '../Services/commonAPI'
import SERVERURL from '../Services/serverUrrl'

// register user
export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST" , `${SERVERURL}/register`,reqBody)
}

// login user
export const loginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/login`,reqBody)
}