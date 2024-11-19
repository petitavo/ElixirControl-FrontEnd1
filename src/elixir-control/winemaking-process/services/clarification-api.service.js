import http from "../../../shared/services/http-common.js";

export class ClarificationApiService {

    constructor(_resourceEndpoint) {
        this.resourceEndpoint = "/winemakingProcess";
    }

    //Get a Clarification by Batch
    //GET /WinemakingProcess/batch/{batchId}/clarification
    getClarificationByBatch(batchId) {
        return http.get(`${this.resourceEndpoint}/batch/${batchId}/clarification`);
    }

    //Create a Clarification by Batch
    //POST /WinemakingProcess/{batchId}/clarification
    create(batchId, resource) {
        return http.post(`${this.resourceEndpoint}/${batchId}/clarification`, resource);
    }

    //Update a Clarification by Batch
    //PUT/api/v1/winemakingProcess/{batchId}/clarification
    update(batchId, resource) {
        return http.put(`${this.resourceEndpoint}/${batchId}/clarification`, resource);
    }

    //Delete a Clarification by Batch
    //DELETE /WinemakingProcess/{batchId}/clarification
    delete(batchId) {
        return http.delete(`${this.resourceEndpoint}/${batchId}/clarification`);
    }




}