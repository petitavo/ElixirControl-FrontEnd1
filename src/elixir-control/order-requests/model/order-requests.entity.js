export class OrderRequests {
    constructor(
        id,
        quantity,
        price,
        status,
        ordernumber,
        orderdate,
        transportcondition,
        paymentmethod,
        consumerphone,
        producerphone,
        paymentterms,
        date,
        deliverydate,
        type
    ) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.status = status;
        this.ordernumber = ordernumber;
        this.orderdate = orderdate;
        this.transportcondition = transportcondition;
        this.paymentmethod = paymentmethod;
        this.consumerphone = consumerphone;
        this.paymentterms = paymentterms;
        this.deliverydate = deliverydate;
        this.producerphone = producerphone;
        this.date = date;
        this.type = type;
    }
}