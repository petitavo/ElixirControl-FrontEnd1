import axios from "axios";

const http = axios.create({baseURL: "https://my-json-server.typicode.com/SV51-MetaSoft-App-Web/endpoint-winemaking-process"});

export class PressingApiService {

    resourceEndpoint = '/pressing';

    getAllPressing() {
        return http.get(this.resourceEndpoint);
    }

    getPressingById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    createPressing(pressing) {
        return http.post(this.resourceEndpoint, pressing);
    }

    updatePressing(pressing_id, pressingObject) {
        return http.put(`${this.resourceEndpoint}/${pressing_id}`, pressingObject);
    }

    deletePressing(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findPressingByBatchId(batch_id) {
        return http.get(`${this.resourceEndpoint}?batch_id=${batch_id}`);
    }
}