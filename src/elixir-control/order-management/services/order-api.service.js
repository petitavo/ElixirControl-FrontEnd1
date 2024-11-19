import axios from "axios";
import { Order } from "../model/order.entity.js";

const http = axios.create({ baseURL: "http://localhost:5097/api/v1" });

export class OrderProcessApiService {
    constructor() {
        this.resourceEndpoint = '/orders';
    }

    async getAllOrders(profileId) {
        const response = await http.get(this.resourceEndpoint, {
            params: { profileId }
        });

        // Mapear los datos de respuesta a instancias de Order
        return response.data.map(item => new Order(
            item.id,
            item.businessName,
            item.requestedDate,
            item.quantity,
            item.phone,
            item.status,
            item.contactName,
            item.productName,
            item.transportCondition,
            item.paymentTerms,
            item.address,
            item.email,
            item.ruc,
            item.wineType,
            item.paymentMethod,
            item.deliveryDate
        ));
    }

    getOrderById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(order) {
        return http.post(this.resourceEndpoint, order);
    }

    update(id, order) {
        return http.put(`${this.resourceEndpoint}/${id}`, order);
    }

    async delete(id) {
        return await http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findOrderById(id) {
        return http.get(`${this.resourceEndpoint}?id=${id}`);
    }
}

export default new OrderProcessApiService();