import axios from "axios";

const http = axios.create({baseURL: "https://my-json-server.typicode.com/SV51-MetaSoft-App-Web/endpoint-winemaking-process"});

export class FermentationApiService {

    resourceEndpoint = '/fermentation';

    getAllFermentation() {
        return http.get(this.resourceEndpoint);
    }

    getFermentationById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    createFermentation(fermentation) {
        return http.post(this.resourceEndpoint, fermentation);
    }

    updateFermentation(fermentation_id, fermentationObject) {
        return http.put(`${this.resourceEndpoint}/${fermentation_id}`, fermentationObject);
    }

    deleteFermentation(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findFermentationByBatchId(batch_id) {
        return http.get(`${this.resourceEndpoint}?batch_id=${batch_id}`);
    }
}