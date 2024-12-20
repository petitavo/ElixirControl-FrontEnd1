import http from "../../../shared/services/http-common.js";


export class PressingApiService {

    constructor(_resourceEndpoint) {
        this.resourceEndpoint = "/winemakingProcess";
    }

    //Get a Pressing by Batch
    //GET /WinemakingProcess/batch/{batchId}/pressing
    getPressingByBatch(batchId) {
        return http.get(`${this.resourceEndpoint}/batch/${batchId}/pressing`);
    }

    //Create a Pressing by Batch
    //POST /WinemakingProcess/{batchId}/pressing
    create(batchId, resource) {
        return http.post(`${this.resourceEndpoint}/${batchId}/pressing`, resource);
    }

    //Update a Pressing by Batch
    //PUT /WinemakingProcess/{batchId}/pressing
    update(batchId, resource) {
        return http.put(`${this.resourceEndpoint}/${batchId}/pressing`, resource);
    }

    //Delete a Pressing by Batch
    //DELETE /WinemakingProcess/{batchId}/pressing
    delete(batchId) {
        return http.delete(`${this.resourceEndpoint}/${batchId}/pressing`);
    }



}