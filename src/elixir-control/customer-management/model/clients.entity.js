export class Clients {
    /**
     * Creates an instance of Clients.
     * @param {Object} [params={}] - The parameters to create a Clients instance
     * @param {number} [params.id=0] - The unique identifier of the Clients
     * @param {string} [params.personName=''] - The name of the person
     * @param {number} [params.dni=0] - The DNI (identification number)
     * @param {string} [params.email=''] - The email of the Clients
     * @param {string} [params.businessName=''] - The business name
     * @param {number} [params.phone=0] - The phone number
     * @param {string} [params.address=''] - The address
     * @param {string} [params.country=''] - The country
     * @param {string} [params.city=''] - The city
     * @param {number} [params.ruc=0] - The RUC (tax identification number)
     * @returns {Clients} - An instance of Clients
     */
    constructor({
                    id = 0,
                    personName = '',
                    dni = 0,
                    email = '',
                    businessName = '',
                    phone = 0,
                    address = '',
                    country = '',
                    city = '',
                    ruc = 0
                } = {}) {
        this.id = id;
        this.personName = personName;
        this.dni = dni;
        this.email = email;
        this.businessName = businessName;
        this.phone = phone;
        this.address = address;
        this.country = country;
        this.city = city;
        this.ruc = ruc;
    }
}