import * as _ from 'lodash';

export class accessdata {
    usrEmail: string;
    existingSwimtimes = [];
    results = [];

    /**
   * Generates between a range (min, max) and the number of decimals that can be chosen
   * @param min minimum swimtime in seconds
   * @param max maximum swimtime in seconds
   * @param decimals number of decimals for swimtime in seconds
   */
    generateSwimtime(min, max, decimals) {
        const random = Math.random() * (max - min) + min;
        const power = Math.pow(10, decimals);
        return Math.floor(random * power) / power;
    }

    /**
     * Generates and returns a record with the email and swimtime
     */
    generateRecord() {
        let record = {};
        record['email'] = this.usrEmail;
        record['swimtime'] = this.generateSwimtime(46, 58, 2);
        console.log(record);
        return record;
    }

    /**
   * Sorts records by swimtime low to high (lodash)
   * @param records list of records
   */
  sortRecords(records) {
    return _.sortBy(records, ['value']);
  }

}