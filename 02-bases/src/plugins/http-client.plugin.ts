//Only default export is available in axios (can't destructure)
// const axios = require("axios");

//New import
import axios from "axios";


//Wrapper/adapter para...
export const httpClientPlugin = {
  get: async (url: string) => {
    //...fetch API
    // const resp = await fetch(url);
    // return await resp.json();

    //...axios
    const { data } = await axios.get(url);
    return data;
  },
  post: async (url: string, body: any) => {},
  put: async (url: string, body: any) => {},
  delete: async (url: string, body: any) => {},
};

// module.exports = {
//   http: httpClientPlugin,
// };
