import { IPickerInfo } from '../../src/components/Picker/Picker';
import { PeoplePickerSearchType } from './PickerEnum';

export interface PeopleInfo extends IPickerInfo {
  id?: number;
  name: string;
  description: string;
  imageUrl?: string;
  url?: string;
  type?: PeoplePickerSearchType;
}
