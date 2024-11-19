
export class Pressing {

    //"id": 0,
    //"batchId": 0,
    //"pressingDate": "2024-11-19T08:23:01.051Z",
    //"mustVolume": 0,
    //"pressType": "string",
    //"appliedPressure": 0

    constructor({ id='', batch_id='', pressing_date='', must_volume='', press_type='', applied_pressure='' }) {

        this.id = id;
        this.batch_id = batch_id;
        this.pressing_date = pressing_date;
        this.must_volume = must_volume;
        this.press_type = press_type;
        this.applied_pressure = applied_pressure;

    }
}