import axios from 'axios'

const commonAPI = async (httpRequest, url, reqBody, reqHeader) => {
    const requestConfig = {
        method: httpRequest,
        url,
        data: reqBody,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...(reqHeader || {})
        }
    };
    return await axios(requestConfig)
    .then(res => res)
    
    .catch(err => {
        console.log("API ERROR:", err.response || err);
        return err.response || err;
    })

}

export default commonAPI