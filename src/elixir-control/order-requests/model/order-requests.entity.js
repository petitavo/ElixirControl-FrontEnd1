export class OrderRequests {
    constructor(
        id,
        quantity,
        price,
        status,
        orderNumber,
        orderDate,
        transportCondition,
        paymentMethod,
        consumerPhone,
        producerPhone,
        paymentTerms,
        date,
        deliveryDate,
        type
    ) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.status = status;
        this.orderNumber = orderNumber;
        this.orderDate = orderDate;
        this.transportCondition = transportCondition;
        this.paymentMethod = paymentMethod;
        this.consumerPhone = consumerPhone;
        this.paymentTerms = paymentTerms;
        this.deliveryDate = deliveryDate;
        this.producerPhone = producerPhone;
        this.date = date;
        this.type = type;
    }
}