import http from "../../../shared/services/http-common.js";

export class batchApiService {

    constructor(_resourceEndpoint) {
        this.resourceEndpoint = "/batch";
    }

    //Get All Batches
    getAllBatches() {
        return http.get(this.resourceEndpoint);
    }

    //Get all Batches by Profile Id
    getAllResourcesByProfileId(profileId) {
        return http.get(`${this.resourceEndpoint}/profile/${profileId}`);
    }

    //Create a Batch by Profile Id
    create(profileId, resource) {
        return http.post(`${this.resourceEndpoint}/profile/${profileId}`, resource);
    }

    //Update a Batch by Profile Id and batchId
    update(profileId, batchId, resource) {
        return http.put(`${this.resourceEndpoint}/profile/${profileId}/${batchId}`, resource);
    }

    //Delete a Batch by batchId
    delete(batchId) {
        return http.delete(`${this.resourceEndpoint}/${batchId}`);
    }

    //Get a Batch by batchId
    getResourceById(batchId) {
        return http.get(`${this.resourceEndpoint}/${batchId}`);
    }

}