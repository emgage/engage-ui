import { IPickerSource } from '../../src/components/Picker';
import { PeoplePickerSearchType } from './PickerEnum';
import { PeopleInfo } from './PeopleInfo';

export class PeoplePickerSource implements IPickerSource<PeopleInfo> {

    private readonly searchType: PeoplePickerSearchType;
    private readonly activeOnly: boolean;
    private readonly searchSpecifiesGroup?: number;

    constructor(searchType: PeoplePickerSearchType = PeoplePickerSearchType.Users, activeOnly = true, searchSpecifiesGroup?: number) {
        this.searchType = searchType;
        this.activeOnly = activeOnly;
        this.searchSpecifiesGroup = searchSpecifiesGroup;
    }
    performFilter(filterString: string): Promise<PeopleInfo[]> {
        return Promise.all(this.peoplePickerArray(filterString, this.searchType));
    }

    peoplePickerArray(filterString: string, searchType: PeoplePickerSearchType): PeopleInfo[] {
       let data: PeopleInfo[] = [];
       if (filterString === '') {
          return data;
        }
        data = [
            { id: 0, name: 'ranmal0', description: 'r', imageUrl: '', url: '', type: PeoplePickerSearchType.Groups },
            { id: 1, name: 'ranmal1', description: 'r', imageUrl: '', url: '', type: PeoplePickerSearchType.Groups },
            { id: 2, name: 'ranmal2', description: 'r', imageUrl: '', url: '', type: PeoplePickerSearchType.Groups },
            { id: 3, name: 'ranmal3', description: 'r', imageUrl: '', url: '', type: PeoplePickerSearchType.Groups },
            { id: 4, name: 'ranmal4', description: 'r', imageUrl: '', url: '', type: PeoplePickerSearchType.Groups },
            { id: 5, name: 'ranmal5', description: 'r', imageUrl: '', url: '', type: PeoplePickerSearchType.Users },
            { id: 6, name: 'ranmal6', description: 'r', imageUrl: '', url: '', type: PeoplePickerSearchType.Users },
            { id: 7, name: 'ranmal7', description: 'r', imageUrl: '', url: '', type: PeoplePickerSearchType.Users },
            { id: 8, name: 'ranmal8', description: 'r', imageUrl: '', url: '', type: PeoplePickerSearchType.Users },
            { id: 9, name: 'ranmal9', description: 'r', imageUrl: '', url: '', type: PeoplePickerSearchType.Users },
        ];
        if (searchType === PeoplePickerSearchType.Both) {
            return data.filter((x) => x.name.startsWith(filterString));
        } else {
            return data.filter((x) => x.name.startsWith(filterString) && x.type === searchType);
        }
    }

    // private peoplePickerApi(filterString: string) {
    //     // TODO: API call and get data
    //     peoplePickerApi.search(this.searchType, this.activeOnly, this.searchSpecifiecGroup, filterString)
    //         .then((items: any) => {
    //             return items;
    //         });
    // }
}
