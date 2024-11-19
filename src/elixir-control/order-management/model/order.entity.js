export class Order {
    constructor(
        id,
        businessName,
        requestedDate,
        quantity,
        phone,
        status,
        contactName,
        productName,
        transportCondition,
        paymentTerms,
        name,
        address,
        email,
        ruc,
        wineType,
        paymentMethod,
        deliveryDate
    ) {
        this.id = id;
        this.businessName = businessName;
        this.requestedDate = requestedDate;
        this.quantity = quantity;
        this.phone = phone;
        this.status = status;
        this.contactName = contactName;
        this.productName = productName;
        this.transportCondition = transportCondition;
        this.paymentTerms = paymentTerms;
        this.address = address;
        this.email = email;
        this.ruc = ruc;
        this.wineType = wineType;
        this.paymentMethod = paymentMethod;
        this.deliveryDate = deliveryDate;
    }
}

