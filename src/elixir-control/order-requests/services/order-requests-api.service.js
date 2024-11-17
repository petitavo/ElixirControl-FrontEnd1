import axios from "axios";
import { OrderRequests } from "../model/order-requests.entity.js";

const http = axios.create({
    baseURL: "http://localhost:3000",
});

export class OrderRequestsProcessApiService {
    constructor() {
        this.resourceEndpoint = "/OrderRequests";
    }

    async getAllOrderRequests() {
        const response = await http.get(this.resourceEndpoint);
        return response.data.map(item => new OrderRequests(
            item.id,
            item.quantity,
            item.price,
            item.status,
            item.ordernumber,
            item.orderdate,
            item.transportcondition,
            item.paymentmethod,
            item.consumerphone,
            item.producerphone,
            item.paymentterms,
            item.date,
            item.deliverydate,
            item.type
        ));
    }



    getOrdersRequestsById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(orderRequests) {
        return http.post(this.resourceEndpoint, orderRequests);
    }

    update(id, orderRequests) {
        return http.put(`${this.resourceEndpoint}/${id}`, orderRequests);
    }

    async delete(id) {
        return await http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findOrderRequestsById(id) {
        return http.get(`${this.resourceEndpoint}?id=${id}`);
    }
}

export default new OrderRequestsProcessApiService();
