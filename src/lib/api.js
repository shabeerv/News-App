import axios from "axios";

export const fetchWorldNews = async (type) => {
  var config = {
    method: "get",
    url: `https://api.nytimes.com/svc/topstories/v2/${type}.json?api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`,
    // headers: {
    //     // Authorization: `Bearer ${localStorage.getItem("userToken")}`
    // },
  };

  try {
    const response = await axios(config);

    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchArticle = async (query, page) => {
  var axios = require("axios");

  var config = {
    method: "get",
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`,
    headers: {},
  };

  try {
    const response = await axios(config);

    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async (email, password) => {
  var data = JSON.stringify({
    email: email,
    password: password,
  });

  var config = {
    method: "post",
    url: "http://localhost:8000/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);

    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export const userRegister = async (email, password) => {
  var data = JSON.stringify({
    email: email,
    password: password,
  });

  var config = {
    method: "post",
    url: "http://localhost:8000/auth/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);

    return await response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getComments = async () => {
  var axios = require("axios");

  var config = {
    method: "get",
    url: "https://dummyjson.com/comments?limit=10",
    headers: {},
  };

  try {
    const response = await axios(config);

    return await response.data;
  } catch (error) {
    console.log(error);
  }
};
