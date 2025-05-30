import { productService } from "../services/product.service";

export async function getProduct(setIsGettingProduct, setGetThreeProducts) {
  try {
    setIsGettingProduct(true);
    const res = await productService();
    // console.log("Res", res.data.products);

    const data = res.data.products;

    let newData = [];
    for (let i = 0; i < 3; i++) {
      const randomNumber = Math.floor(Math.random() * data.length);
      const randomProduct = data[randomNumber];
      const isContain = newData.some(
        (product) => product._id === randomProduct._id
      );
      if (isContain) {
        return;
      }
      newData.push(randomProduct);
      // newData = randomProduct;
    }
    // console.log(newData);

    setGetThreeProducts(newData);

    setIsGettingProduct(false);
  } catch (error) {
    setIsGettingProduct(false);
    console.log(error.response.data.message);
  }
}
