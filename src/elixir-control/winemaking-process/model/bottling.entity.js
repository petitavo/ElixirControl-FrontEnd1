
export class Bottling {

    constructor({ bottling_id='', batch_id='', bottling_date='', bottle_size_ml='',
                    number_of_bottles='', label_type='', cork_type=''
    }) {

        this.bottling_id = bottling_id;
        this.batch_id = batch_id;
        this.bottling_date = bottling_date;
        this.bottle_size_ml = bottle_size_ml;
        this.number_of_bottles = number_of_bottles;
        this.label_type = label_type;
        this.cork_type = cork_type;
    }
}