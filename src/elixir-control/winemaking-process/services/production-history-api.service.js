import axios from "axios";

const http = axios.create({baseURL: "https://my-json-server.typicode.com/SV51-MetaSoft-App-Web/endpoint-winemaking-process2"});

export class ProductionHistoryApiService {

    resourceEndpoint = '/production-history';

    getAllProductionHistory() {
        return http.get(this.resourceEndpoint);
    }

    getProductionHistoryById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    createProductionHistory(productionHistory) {
        return http.post(this.resourceEndpoint, productionHistory);
    }

    updateProductionHistory(productionHistory_id, productionHistoryObject) {
        return http.put(`${this.resourceEndpoint}/${productionHistory_id}`, productionHistoryObject);
    }

    deleteProductionHistory(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findProductionHistoryByBatchId(batch_id) {
        return http.get(`${this.resourceEndpoint}?batch_id=${batch_id}`);
    }
}