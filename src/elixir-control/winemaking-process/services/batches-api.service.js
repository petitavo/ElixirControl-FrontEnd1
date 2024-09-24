import axios from "axios";

const http = axios.create({baseURL: "https://my-json-server.typicode.com/SV51-MetaSoft-App-Web/endpoint-winemaking-process"});

export class BatchesApiService {

    resourceEndpoint = '/batches';

    getAllBatches() {
        return http.get(this.resourceEndpoint);
    }

    getBatchById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    createBatch(batch) {
        return http.post(this.resourceEndpoint, batch);
    }

    updateBatch(batch_id, batchObject) {
        return http.put(`${this.resourceEndpoint}/${batch_id}`, batchObject);
    }

    deleteBatch(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findBatchByBatchId(batch_id) {
        return http.get(`${this.resourceEndpoint}?batch_id=${batch_id}`);
    }

}