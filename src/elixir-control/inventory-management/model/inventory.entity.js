export class InventoryItem {
    constructor(
        inventory_id,
        name,
        quantity,
        unit,
        supplier,
        costPerUnit,
        expiration,
        lastUpdated,
        type
    ) {
        this.inventory_id = inventory_id;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.supplier = supplier;
        this.costPerUnit = costPerUnit;
        this.expiration = expiration;
        this.lastUpdated = lastUpdated;
        this.type = type;
    }
}