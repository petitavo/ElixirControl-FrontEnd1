import http from "../../../shared/services/http-common.js";

export class ProfileApiService {

    constructor(_resourceEndpoint) {
        this.resourceEndpoint = "/profiles";
    }

    //Get All Profiles
    getAllProfiles() {
        return http.get(this.resourceEndpoint);
    }

    //Get a Profile by profileID Id
    getProfileByProfileId(userId) {
        return http.get(`${this.resourceEndpoint}/${userId}`);
    }


    //Get a Profile by user Id
    getProfileById(userId) {
        return http.get(`${this.resourceEndpoint}/user/${userId}`);
    }


    //Create a Profile by user Id
    create(userId, resource) {
        return http.post(`${this.resourceEndpoint}/${userId}`, resource);
    }

    //Update a Profile by user Id
    update(userId, resource) {
        return http.put(`${this.resourceEndpoint}/${userId}`, resource);
    }

}