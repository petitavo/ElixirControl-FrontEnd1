import axios from "axios";

const http = axios.create({baseURL: "https://my-json-server.typicode.com/SV51-MetaSoft-App-Web/endpoint-winemaking-process"});

export class AgingApiService {

    resourceEndpoint = '/aging';

    getAllAging() {
        return http.get(this.resourceEndpoint);
    }

    getAgingById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    createAging(aging) {
        return http.post(this.resourceEndpoint, aging);
    }

    updateAging(aging_id, agingObject) {
        return http.put(`${this.resourceEndpoint}/${aging_id}`, agingObject);
    }

    deleteAging(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    fynAgingByBatchId(batch_id) {
        return http.get(`${this.resourceEndpoint}?batch_id=${batch_id}`);
    }


}