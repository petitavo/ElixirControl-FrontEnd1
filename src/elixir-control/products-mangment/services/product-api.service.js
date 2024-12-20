import http from "../../../shared/services/http-common.js";


export class ProductApiService {

    constructor(_resourceEndpoint) {
        this.resourceEndpoint = "/product";
    }


    //GET
    ///api/v1/product/{productId}
    //Get Product by ProductId
    getProductById(productId) {
        return http.get(`${this.resourceEndpoint}/${productId}`);
    }

    //DELETE
    ///api/v1/product/{productId}
    //Delete Product by ProductId
    delete(productId) {
        return http.delete(`${this.resourceEndpoint}/${productId}`);
    }

    //PUT
    ///api/v1/product/{productId}
    //Update Product by ProductId
    update(productId, resource) {
        return http.put(`${this.resourceEndpoint}/${productId}`, resource);
    }


    getAllProductsByProfileId(profileId) {
        return http.get(`${this.resourceEndpoint}/profile/${profileId}`);
    }

    //GET
    ///api/v1/product/profile/{profileId}/productName/{productName}
    //Get All Products by ProfileId and ProductName
    getAllProductsByProfileIdAndProductName(profileId, productName) {
        return http.get(`${this.resourceEndpoint}/profile/${profileId}/productName/${productName}`);
    }


    getProductByProductName(productName) {
        return http.get(`${this.resourceEndpoint}/productName/${productName}`);
    }


    create(profileId, resource) {
        return http.post(`${this.resourceEndpoint}/profile/${profileId}`, resource);
    }


}