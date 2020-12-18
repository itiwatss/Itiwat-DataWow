import axios from 'axios'
import CONSTANT from '../constant'

const fetchData = async (method,path = "",data = null) => {
    const config = {
      method: method,
      url: CONSTANT.ENDPOINT_URL + path,
      data: data
    };
  
    try {
        const response = await axios(config);
        return response.data;
    }
    catch (error) {
        return error
    }
  };

export default fetchData;