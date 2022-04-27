import axios from "axios";

export const getProducts = async () => {
  const result = await axios
    .post("http://localhost:3001/merchant/product")
    .then((response) => {
      return response;
    })
    .catch((e) => {
      return e.response;
    });
  return result;
};
export const getMerchantProducts = async (id, token) => {
  const config = {
    method: "GET",
    url: `http://localhost:3001/merchant/${id}/product`,
    headers: {
      authorization: token,
    },
  };
  const result = await axios(config)
    .then((response) => {
      return response;
    })
    .catch((e) => {
      return e.response;
    });
  return result;
};

export const createProducts = async (newData, id, token) => {
  try {
    const data = await axios.post(
      `http://localhost:3001/merchant/${id}/product`,
      newData,
      {
        headers: { authorization: token },
      }
    );
    return {
      code: 200,
      status: "success",
      products: data,
      msg: "Product has been added",
    };
  } catch (e) {
    return { code: 400, status: "error", products: null, msg: "Service Error" };
  }
};

export const updateProducts = async (form, id, prodid, token) => {
  try {
    const data = await axios.patch(
      `http://localhost:3001/merchant/${id}/product/${prodid}`,
      form,
      {
        headers: { authorization: token },
      }
    );
    return {
      code: 200,
      status: "success",
      product: data,
      msg: "Product Edited",
    };
  } catch (e) {
    return { code: 400, status: "error", products: null, msg: "Service Error" };
  }
};

export const deleteProducts = async (id, prodid, token) => {
  try {
    const config = {
      method: "DELETE",
      url: `http://localhost:3001/merchant/${id}/product/${prodid}`,
      headers: {
        authorization: token,
      },
    };
    const data = await axios(config);
    return {
      code: 200,
      status: "success",
      products: data,
      msg: "Product Deleted",
    };
  } catch (e) {
    return { code: 400, status: "error", products: null, msg: "Service Error" };
  }
};
