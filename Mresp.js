const apiBaseUrl= `https://graph.facebook.com/v22.0/${process.env.PHONE_NUMBER_ID}/messages`;
const authtoken = `Bearer ${process.env.TOKEN}`;


const Mresp = async(from, body)=>{
    try{
        body.to= from;
        const response = await axios.post(
            apiBaseUrl,
            body,
            {
                headers:{
                    Authorization: authtoken,
                    "Content-Type": "application/json",
                }
            }
        );
        
        console.log("mensaje enviao",response.data);
        return response.data;
    }catch(error){
    console.error("error enviao: ",error.response?.data || error.message);
    throw error;
    }
};
module.exports= {
    Mresp,

};