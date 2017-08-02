import { IPickerInfo } from '../../src/components/Picker/Picker';
import { PeoplePickerSearchType } from './PickerEnum';

export class PeopleInfo implements IPickerInfo {
    Id?: number;
    Name: string;
    Description: string;
    ImageUrl?: string;
    Url?: string;
    Type?: PeoplePickerSearchType;
}
