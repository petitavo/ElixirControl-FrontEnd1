
export class Product {

    constructor({ id, productName, grapeVariety, wineType, origin, alcoholContent, price, foodPairing, quantity, imageUrl }) {
        this.id = id;
        this.productName = productName;
        this.grapeVariety = grapeVariety;
        this.wineType = wineType;
        this.origin = origin;
        this.alcoholContent = alcoholContent;
        this.price = price;
        this.foodPairing = foodPairing;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
    }

}