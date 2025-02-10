//Only default export is available in axios (can't destructure)
const axios = require("axios");

//Wrapper/adapter para...
const httpClientPlugin = {
  get: async (url) => {
    //...fetch API
    // const resp = await fetch(url);
    // return await resp.json();

    //...axios
    const { data } = await axios.get(url);
    return data;
  },
};

module.exports = {
  http: httpClientPlugin,
};
