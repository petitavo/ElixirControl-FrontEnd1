
export class Aging {


    constructor({id, batchId, barrelType, startDate, endDate, agingDurationMonths, inspectionsPerformed, inspectionResult}) {
        this.id = id;
        this.batchId = batchId;
        this.barrelType = barrelType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.agingDurationMonths = agingDurationMonths;
        this.inspectionsPerformed = inspectionsPerformed;
        this.inspectionResult = inspectionResult;
    }
}