
export class Pressing {
    constructor({pressing_id='', batch_id='', pressing_date='', must_volume='',
                    press_type='', applied_pressure=''
    }) {
        this.pressing_id = pressing_id;
        this.batch_id = batch_id;
        this.pressing_date = pressing_date;
        this.must_volume = must_volume;
        this.press_type = press_type;
        this.applied_pressure = applied_pressure;
    }
}