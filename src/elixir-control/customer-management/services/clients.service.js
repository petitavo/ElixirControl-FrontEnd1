import http from "../../../shared/services/http-common.js";

export class ClientsService {
    constructor() {
        this.resourceEndpoint = "/clients";
    }

    //Get All Clients
    getAllClients() {
        return http.get(this.resourceEndpoint);
    }

    //Get all Clients by Profile Id
    getAllResourcesByProfileId(profileId) {
        return http.get(`${this.resourceEndpoint}/profile/${profileId}`);
    }

    //Create a Client by Profile Id
    create(resource, profileId) {
        return http.post(`${this.resourceEndpoint}/profile/${profileId}`, resource);
    }

    //Update a Client by Profile Id and clientId
    update(clientId, resource) {
        return http.put(`${this.resourceEndpoint}/${clientId}`, resource);
    }

    //Delete a Client by clientId
    delete(clientId) {
        return http.delete(`${this.resourceEndpoint}/${clientId}`);
    }

    //Get a Client by clientId
    getResourceById(clientId) {
        return http.get(`${this.resourceEndpoint}/${clientId}`);
    }
}