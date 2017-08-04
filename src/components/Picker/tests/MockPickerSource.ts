import { IPickerSource } from '../Picker';
import { MockPeopleInfo } from './MockPeopleInfo';

export class MockPickerSource implements IPickerSource<MockPeopleInfo> {

    // tslint:disable-next-line:no-empty
  constructor() {

  }
  performFilter(): Promise<MockPeopleInfo[]> {
    const data: MockPeopleInfo[] = [];
    return Promise.all(data);
  }
}
