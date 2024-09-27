import axios from "axios";
import { InventoryItem } from "../model/inventory.entity.js";

const http = axios.create({ baseURL: "https://my-json-server.typicode.com/SV51-MetaSoft-App-Web/endpoint-inventory-management" });

export class InventoryProcessApiService {
    constructor() {
        this.resourceEndpoint = '/inventoryList'; // Asegúrate de que esto sea correcto
    }

    async getAllResources() {
        const response = await http.get(this.resourceEndpoint); // Asegúrate de usar solo this.resourceEndpoint
        return response.data.map(item => new InventoryItem(
            item.inventory_id,
            item.name,
            item.quantity,
            item.unit,
            item.supplier,
            item.costPerUnit,
            item.expiration,
            item.lastUpdated,
            item.type
        ));
    }

    getResourceById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(resource) {
        return http.post(this.resourceEndpoint, resource);
    }

    update(id, resource) {
        return http.put(`${this.resourceEndpoint}/${id}`, resource);
    }

    async delete(id) {
        return await http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findResourceById(id) {
        return http.get(`${this.resourceEndpoint}?inventory_id=${id}`);
    }
}

export default new InventoryProcessApiService();