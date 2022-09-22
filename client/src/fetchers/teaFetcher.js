import axios from "axios"


const rootUrl = process.env.REACT_APP_BE_URL
const teaFetcher = async (teaId) =>{

    return await axios.get(`${rootUrl}tea/teadetails/${teaId}`,{
        withCredentials:true,
        credential:"include"

    })
    .then(response => response)
    .catch(err =>  console.log("err in fetch", err))

    }
    export default teaFetcher