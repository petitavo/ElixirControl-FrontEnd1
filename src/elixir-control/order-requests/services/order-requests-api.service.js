import axios from "axios";
import { OrderRequests } from "../model/order-requests.entity.js";

const http = axios.create({
    baseURL: "http://localhost:5097/api/v1",
});

export class OrderRequestsProcessApiService {
    constructor() {
        this.resourceEndpoint = '/order-requests';
    }

    async getAllOrderRequests() {
        const response = await http.get(this.resourceEndpoint);
        return response.data.map(item => new OrderRequests(
            item.id,
            item.quantity,
            item.price,
            item.status,
            item.orderNumber,
            item.orderDate,
            item.transportCondition,
            item.paymentMethod,
            item.consumerPhone,
            item.producerPhone,
            item.paymentTerms,
            item.date,
            item.deliveryDate,
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

    async deleteOrderRequests(id) {
        return await http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findOrderRequestsById(id) {
        return http.get(`${this.resourceEndpoint}?id=${id}`);
    }
}

export default new OrderRequestsProcessApiService();
