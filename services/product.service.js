import axios from "axios";
import { url } from "../screens/utils/urlstorage";

export async function productService() {
  return await axios.get(`${url}/products`);
}
