import axios from "axios";

const http = axios.create({baseURL: "https://my-json-server.typicode.com/SV51-MetaSoft-App-Web/endpoint-winemaking-process"});

export class ClarificationApiService {

        resourceEndpoint = '/clarification';

        getAllClarification() {
            return http.get(this.resourceEndpoint);
        }

        getClarificationById(id) {
            return http.get(`${this.resourceEndpoint}/${id}`);
        }

        createClarification(clarification) {
            return http.post(this.resourceEndpoint, clarification);
        }

        updateClarification(clarification_id, clarificationObject) {
            return http.put(`${this.resourceEndpoint}/${clarification_id}`, clarificationObject);
        }

        deleteClarification(id) {
            return http.delete(`${this.resourceEndpoint}/${id}`);
        }

        findClarificationByBatchId(batch_id) {
            return http.get(`${this.resourceEndpoint}?batch_id=${batch_id}`);
        }
}