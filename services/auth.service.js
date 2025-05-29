// This is where request set up is made

import axios from "axios";
import { url } from "../screens/utils/urlstorage";

export const loginUser = async (login) => {
  const res = await axios.post(`${url}/auth/login`, login);
  return res;
};
