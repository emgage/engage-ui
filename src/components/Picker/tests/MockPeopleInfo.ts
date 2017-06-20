import { IPickerInfo } from '../IPickerInfo';
export class MockPeopleInfo implements IPickerInfo {
    Id?: number;
    Name: string;
    Description: string;
    ImageUrl?: string;
    Url?: string;
}
