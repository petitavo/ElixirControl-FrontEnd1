import http from "../../../shared/services/http-common.js";


export class FermentationApiService {

    constructor(_resourceEndpoint) {
        this.resourceEndpoint = "/winemakingProcess";
    }

    //Get a Fermentation by Batch
    //GET /WinemakingProcess/batch/{batchId}/fermentation
    getFermentationByBatch(batchId) {
        return http.get(`${this.resourceEndpoint}/batch/${batchId}/fermentation`);
    }

    //Create a Fermentation by Batch
    //POST /WinemakingProcess/{batchId}/fermentation
    create(batchId, resource) {
        return http.post(`${this.resourceEndpoint}/${batchId}/fermentation`, resource);
    }

    //Update a Fermentation by Batch
    //PUT /WinemakingProcess/{batchId}/fermentation
    update(batchId, resource) {
        return http.put(`${this.resourceEndpoint}/${batchId}/fermentation`, resource);
    }

    //Delete a Fermentation by Batch
    //DELETE /WinemakingProcess/{batchId}/fermentation
    delete(batchId) {
        return http.delete(`${this.resourceEndpoint}/${batchId}/fermentation`);
    }

}