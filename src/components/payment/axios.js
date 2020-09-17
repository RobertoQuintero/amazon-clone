import axios from "axios";
const instance = axios.create({
  baseURL: "https://us-central1-clone-513f7.cloudfunctions.net/api",
});

export default instance;

// https://us-central1-clone-5cb92.cloudfunctions.net/api

// http://localhost:5001/clone-513f7/us-central1/api
