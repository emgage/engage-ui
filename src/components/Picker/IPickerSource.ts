import { PeopleInfo } from './PeopleInfo';
export interface IPickerSource {
    performFilter(filterString: string): Promise<PeopleInfo[]>,
}
