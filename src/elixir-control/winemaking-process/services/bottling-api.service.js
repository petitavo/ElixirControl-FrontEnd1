import axios from "axios";

const http = axios.create({baseURL: "https://my-json-server.typicode.com/SV51-MetaSoft-App-Web/endpoint-winemaking-process2"});

export class BottlingApiService {

        resourceEndpoint = '/bottling';

        getAllBottling() {
            return http.get(this.resourceEndpoint);
        }

        getBottlingById(id) {
            return http.get(`${this.resourceEndpoint}/${id}`);
        }

        createBottling(bottling) {
            return http.post(this.resourceEndpoint, bottling);
        }

        updateBottling(bottling_id, bottlingObject) {
            return http.put(`${this.resourceEndpoint}/${bottling_id}`, bottlingObject);
        }

        deleteBottling(id) {
            return http.delete(`${this.resourceEndpoint}/${id}`);
        }

        findBottlingByBatchId(batch_id) {
            return http.get(`${this.resourceEndpoint}?batch_id=${batch_id}`);
        }
}