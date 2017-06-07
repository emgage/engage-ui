import { PeoplePickerSearchType } from '../PickerEnum';
import { PeopleInfo } from '../PeopleInfo';
import { IPickerSource } from '../IPickerSource';


export class PeoplePickerSource implements IPickerSource {

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
            { Id: 0, Name: 'ranmal0', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups },
            { Id: 1, Name: 'ranmal1', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups },
            { Id: 2, Name: 'ranmal2', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups },
            { Id: 3, Name: 'ranmal3', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups },
            { Id: 4, Name: 'ranmal4', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups },
            { Id: 5, Name: 'ranmal5', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Users },
            { Id: 6, Name: 'ranmal6', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Users },
            { Id: 7, Name: 'ranmal7', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Users },
            { Id: 8, Name: 'ranmal8', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Users },
            { Id: 9, Name: 'ranmal9', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Users },
        ];
        if (searchType === PeoplePickerSearchType.Both) {
            return data.filter((x) => x.Name.startsWith(filterString));
        } else {
            return data.filter((x) => x.Name.startsWith(filterString) && x.Type === searchType);
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
