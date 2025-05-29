// This is where request set up is made

import axios from "axios";
import { url } from "../screens/utils/urlstorage";

export const loginUser = async (login) => {
  return await axios.post(`${url}/auth/login`, login);
};

export const registerUser = async (register) => {
  return await axios.post(`${url}/auth/register`, register);
};
