import http from "../../shared/services/http-common.js";


export class AgingApiService {

    constructor(_resourceEndpoint) {
        this.resourceEndpoint = "/winemakingProcess";
    }

    //Get a Aging by Batch
    //GET /WinemakingProcess/batch/{batchId}/aging
    getAgingByBatch(batchId) {
        return http.get(`${this.resourceEndpoint}/batch/${batchId}/aging`);
    }

    //Create Aging by Batch
    //POST /WinemakingProcess/{batchId}/aging
    create(batchId, resource) {
        return http.post(`${this.resourceEndpoint}/${batchId}/aging`, resource);
    }

    //Update Aging by Batch
    //PUT /WinemakingProcess/{batchId}/aging
    update(batchId, resource) {
        return http.put(`${this.resourceEndpoint}/${batchId}/aging`, resource);
    }

    //Delete a Aging by Batch
    //DELETE /WinemakingProcess/{batchId}/aging
    delete(batchId) {
        return http.delete(`${this.resourceEndpoint}/${batchId}/aging`);
    }

}