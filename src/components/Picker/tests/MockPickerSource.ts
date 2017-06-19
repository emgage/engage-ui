import { PeopleInfo } from '../PeopleInfo';
import { IPickerSource } from '../IPickerSource';


export class MockPickerSource implements IPickerSource {

    // tslint:disable-next-line:no-empty
    constructor() {

    };
    performFilter(): Promise<PeopleInfo[]> {
        const data: PeopleInfo[] = [];
        return Promise.all(data);
    }
}
