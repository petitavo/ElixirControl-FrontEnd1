import http from "../../../shared/services/http-common.js";

export class ClientsService {
    resourceEndpoint = '/clients';

    getAllByProfileId(profileId) {
        return http.get(`${this.resourceEndpoint}/profile/${profileId}`);
    }

    createByProfileId(profileId, data) {
        return http.post(`${this.resourceEndpoint}/profile/${profileId}`, data);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    update(id, data) {
        return http.put(`${this.resourceEndpoint}/${id}`, data);
    }

    create(resource, profileId) {
        return http.post(`${this.resourceEndpoint}/profile/${profileId}`, resource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }
}
