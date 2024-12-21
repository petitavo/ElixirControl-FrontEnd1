import http from "../../../shared/services/http-common.js";

export class ClientsService {
    constructor() {
        this.resourceEndpoint = '/clients';
    }

    getAllByProfileId(profileId) {
        return http.get(`${this.resourceEndpoint}/profile/${profileId}`);
    }

    create(resource, profileId) {
        return http.post(`${this.resourceEndpoint}/profile/${profileId}`, resource);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    update(id, data) {
        return http.put(`${this.resourceEndpoint}/${id}`, data);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }
}

