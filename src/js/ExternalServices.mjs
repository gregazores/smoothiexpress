//const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'
//const baseURL = 'https://wdd330-backend.onrender.com/'
// const baseURL = "https://wdd330-backend.vercel.app/";
// export const baseURL = 'https://smoothiexpress-api.onrender.com'
// const baseURL = 'http://localhost:8000'


async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor(category) {
    this.baseURL = 'https://smoothiexpress-api.onrender.com'
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    console.log(baseURL + `products/search/${category}`)
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(category, id) {
    const response = await fetch(this.baseURL + `/${category}/${id}`);
    const data = await convertToJson(response);
    return data;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }


async loginRequest(user) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(baseURL + "login", options).then(
    convertToJson
  );
  return response.accessToken;
}

 // make a request to the server for the current orders
  // requires: a valid token
  // returns: a list of orders
async getOrders(token) {
    const options = {
      method: "GET",
      // the server will reject our request if we don't include the Authorization header with a valid token!
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(baseURL + "orders", options).then(
      convertToJson
    );
    return response;
  }
}