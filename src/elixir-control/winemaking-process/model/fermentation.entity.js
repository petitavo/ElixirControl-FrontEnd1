
export class Fermentation {


    constructor({id, batchId, startDate, endDate, averageTemperature, initialDensity, initialPh, finalDensity, finalPh, residualSugar}) {
        this.id = id;
        this.batchId = batchId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.averageTemperature = averageTemperature;
        this.initialDensity = initialDensity;
        this.initialPh = initialPh;
        this.finalDensity = finalDensity;
        this.finalPh = finalPh;
        this.residualSugar = residualSugar;
    }
}