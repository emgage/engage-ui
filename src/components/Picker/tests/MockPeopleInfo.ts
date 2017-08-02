import { IPickerInfo } from '../Picker';
export class MockPeopleInfo implements IPickerInfo {
  id?: number;
  name: string;
  description: string;
  imageUrl?: string;
  url?: string;
}
