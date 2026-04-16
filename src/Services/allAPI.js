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
export const addToWishlistAPI = (id, body, reqHeader) => {
    return commonAPI("POST", `${SERVERURL}/wishlist/${id}/add`, body, reqHeader);
};

// get all wishlist
export const getAllWishlistAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/wishlists`, {}, reqHeader)
}

// delete wishlist
export const deleteWishlistAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${SERVERURL}/wishlist/${id}/delete`, {}, reqHeader)
}

// add to cart from wishlist
export const wishlistToCartAPI = async (id, reqHeader) => {
    return await commonAPI("POST", `${SERVERURL}/wishlist/${id}/cart`, {}, reqHeader)
}

// ------------- CART SECTION -------------------------------------

// add to cart
export const addToCartAPI = async (id, body,reqHeader) => {
    return await commonAPI("POST", `${SERVERURL}/cart/${id}/add`, body, reqHeader)
}

// delete cart
export const deleteCartAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${SERVERURL}/cart/${id}/delete`, {}, reqHeader)
}

// get all cart
export const getAllCartAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/cart`, {}, reqHeader)
}

// create order 
export const createOrderAPI = async (reqHeader) => {
    return await commonAPI("POST", `${SERVERURL}/order/create`, {}, reqHeader)
}
