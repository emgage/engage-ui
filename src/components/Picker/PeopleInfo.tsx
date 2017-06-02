import { PeoplePickerSearchType } from './PickerSearchType';

export class PeopleInfo {
    Id?: number;
    Name: string;
    Description: string;
    ImageUrl?: string;
    Url?: string;
    Type?: PeoplePickerSearchType;
}
