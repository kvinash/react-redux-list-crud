
import DataService from "../middlewares/dataService";
import Constant from "../constant";
import axios from "axios";

export const addProduct = (product) =>({
    type:'ADD_PRODUCT',
    payload : axios.post(Constant.saveProductUrl, product)
})

export const deleteProduct = (id) =>({
    type : 'DELETE_PRODUCT',
    payload : axios.delete(Constant.deleteProductUrl + "/" + id )
})

export const editProduct = (product) =>({
    type : 'EDIT_PRODUCT',
    payload : axios.post(Constant.updateProductUrl, product)
})
export const allProduct = () => ({
  type: "ALL_PRODUCT",
  payload: axios.get(Constant.getProductsUrl)
});