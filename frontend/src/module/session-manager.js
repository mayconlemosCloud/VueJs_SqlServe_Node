import {WebAuth} from "auth0-js";

const auth0 = new WebAuth({
    responseType: "token id_token",
    domain: process.env.DEMO_AUTH0_DOMAIN,
    clientID: process.env.DEMO_AUTH0_CLIENT_ID,
    redirectUri: "http://localhost:8080/login-callback"
});
export{auth0}