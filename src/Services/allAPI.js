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

// ------------- SNEAKER SECTION -------------------------------------

// add sneaker
export const addSneakerAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVERURL}/addSneakers`, reqBody, reqHeader)
}

// get all sneakrs
export const getAllSneakersAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/allSneakers`, {}, reqHeader)
}

// get single sneaker
export const getSingleSneakerAPI = async (sneakerID, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/sneakers/${sneakerID}/view`, {}, reqHeader)
}

// ------------- WISHLISt SECTION -------------------------------------

// add to wishlist
export const addToWishlistAPI = async (id, reqHeader) => {
    return await commonAPI("POST", `${SERVERURL}/wishlist/${id}/add`, {}, reqHeader)
}
