import axios from "axios";

export const authLogin = async (req) => {
  const result = await axios
    .post(`http://localhost:3001/merchant/login`, req)
    .then((result) => result)
    .catch((e) => e.response);
  return result;
};

export const authRegister = async (req) => {
  const result = await axios
    .post(`http://localhost:3001/merchant/register`, req)
    .then((result) => {
      return result;
    })
    .catch((e) => {
      return e.response;
    });
  return result;
};

export const getProfileID = async (id, token) => {
  //   try {
  const config = {
    method: "GET",
    url: `http://localhost:3001/merchant/${id}`,
    headers: {
      authorization: token,
    },
  };
  const result = await axios(config)
    .then((result) => {
      return result;
    })
    .catch((e) => {
      return e.response.data.errors;
    });
  return result;
};

export const deleteProfile = async (id, token) => {
  const config = {
    method: "delete",
    url: `http://localhost:3001/merchant/${id}`,
    headers: {
      authorization: token,
    },
  };
  const result = await axios(config)
    .then((response) => {
      return response;
    })
    .catch((e) => {
      return e;
    });

  return result;
};
