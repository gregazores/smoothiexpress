//const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'
const secondURL = 'https://wdd330-backend.onrender.com/'
// const baseURL = "https://wdd330-backend.vercel.app/";
// export const baseURL = 'https://smoothiexpress-api.onrender.com'
// const baseURL = 'http://localhost:8000'
const mongooseURL = 'https://wdd341-smoothie-mongoose.onrender.com'
const x = "http://localhost:3000"


async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: data };
  }
}

export default class ExternalServices {
  constructor(category) {
    this.baseURL = mongooseURL
  }
  async getData(category) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // in the server, 'Access-Control-Allow-Credentials', 'true' for credentials: "include", to work
      credentials: "include"
    };
    const response = await fetch(this.baseURL + `/${category}`, options);
    const data = await convertToJson(response);
    return data;
  }
  async findProductById(category, id) {
    const response = await fetch(this.baseURL + `/${category}/${id}`);
    const data = await convertToJson(response);
    return data;
  }
  async checkout(payload) {
    console.log('payload', payload)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    };

    console.log('body', options)
    return await fetch(this.baseURL + "/checkout", options).then(convertToJson);
  }


async loginRequest(user) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // in the server, 'Access-Control-Allow-Credentials', 'true' for credentials: "include", to work
    credentials: "include",
    body: JSON.stringify(user),
  };
  const response = await fetch(this.baseURL + "/users/login/", options).then(
    convertToJson
  );
  return response;
}

async registerRequest (user) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // in the server, 'Access-Control-Allow-Credentials', 'true' for credentials: "include", to work
    credentials: "include",
    body: JSON.stringify(user),
  };
  const response = await fetch(this.baseURL + "/users/register/", options).then(
    convertToJson
  );
  return response;
}

 // make a request to the server for the current orders
  // requires: a valid token
  // returns: a list of orders
async getOrders(user) {
    // const options = {
    //   method: "GET",
    //   // the server will reject our request if we don't include the Authorization header with a valid token!
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // in the server, 'Access-Control-Allow-Credentials', 'true' for credentials: "include", to work
      credentials: "include"
    };
    try {

      const response = await fetch(this.baseURL + `/orders/${user}`, options).then(
        convertToJson
      );
      return response;
      
    } catch (error) {
        console.log(error)
    }

  }


  async logout() {

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // in the server, 'Access-Control-Allow-Credentials', 'true' for credentials: "include", to work
      credentials: "include"
    };
    try {

      const response = await fetch(this.baseURL + "/users/logout/", options).then(
        convertToJson
      );
      return response;
      
    } catch (error) {
        console.log(error)
    }

  }



  async amILoggedIn(params) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // in the server, 'Access-Control-Allow-Credentials', 'true' for credentials: "include", to work
      credentials: "include"
    };
    const response = await fetch(this.baseURL + "/users/protected/", options).then(
      convertToJson
    );
    return response;
  }

}
