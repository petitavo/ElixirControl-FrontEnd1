
export class Batch {

    //"id": 0,
    //"profileId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //"vineyardCode": "string",
    //"grapeVariety": "string",
    //"harvestDate": "string",
    //"grapeQuantity": 0,
    //"vineyardOrigin": "string",
    //"processStartDate": "string",
    //"status": "string"

    constructor({ id='', profileId='', vineyardCode='', grapeVariety='', harvestDate='', grapeQuantity=0, vineyardOrigin='', processStartDate='', status='' }) {
        this.id = id;
        this.profileId = profileId;
        this.vineyardCode = vineyardCode;
        this.grapeVariety = grapeVariety;
        this.harvestDate = harvestDate;
        this.grapeQuantity = grapeQuantity;
        this.vineyardOrigin = vineyardOrigin;
        this.processStartDate = processStartDate;
        this.status = status;
    }
}