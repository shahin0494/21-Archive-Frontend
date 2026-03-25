import commonAPI from '../Services/commonAPI'
import SERVERURL from '../Services/serverUrrl'

// register user
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/register`, reqBody)
}

// login user
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/login`, reqBody)
}

// ------------- ADDRESS SECTION -------------------------------------

// add adress
export const addAddressAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POSt", `${SERVERURL}/addaddress`, reqBody, reqHeader)
}

// get address
export const getAddressAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/allAddress`, {}, reqHeader)
}

// update address
export const updateAddressAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVERURL}/address/${id}`, reqBody, reqHeader)
}