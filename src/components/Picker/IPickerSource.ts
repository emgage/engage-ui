import { IPickerInfo } from './IPickerInfo';
export interface IPickerSource<IPickerInfo> {
    performFilter(filterString: string): Promise<IPickerInfo[]>,
}
