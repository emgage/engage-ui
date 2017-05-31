import * as React from 'react';
import TextField from '../TextField';
import Chip from '../Chip';

export interface IPickerSource {
    performFilter(filterString: string, onSuccess: (items: any) => void, onError: (error?: any) => void): void,
}
export enum PeoplePickerSearchType {
    Users,
    Groups,
}
export interface IPeopleInfo {
    Id?: number,
    Name: string,
    Description: string,
    ImageUrl?: string,
    Url?: string,
    Type?: PeoplePickerSearchType,
}

export class PeopleInfo implements IPeopleInfo {
    Id?: number;
    Name: string;
    Description: string;
    ImageUrl?: string;
    Url?: string;
    Type?: PeoplePickerSearchType;
}
export interface State {
    people?: string,
    searchItems?: PeopleInfo[],
    selectedItems?: PeopleInfo[],
}

export interface Props {
    required?: boolean,
    selectedResultsBehavior?: string,
    filterPlaceHolder?: string,
    maxSelectedItems?: number,
    minSelectedItems?: number,
    millisecondsToWaitBeforeSearch?: number,
    chipComponent?: React.ReactNode,
    searchResultComponent?: React.ReactNode,
    moreInfoComponent?: React.ReactNode,
    peoplePickerSearchType?: PeoplePickerSearchType,
    source?: IPickerSource,
    searchBehavior?(): void,
    onSelect?(): void,
    onRemove?(): void,
    moreInfoComponentShowOn?(): void,
}

class Picker extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            people: '',
        };
    }
    render() {
        const {
            required,
            filterPlaceHolder,
            selectedResultsBehavior,
            chipComponent = Chip,
            searchResultComponent = Chip,
            searchBehavior = this.handleChange,
            moreInfoComponentShowOn = this.handleClick,
         } = this.props;
        let className = '';
        if (selectedResultsBehavior === 'hide') {
            className += ' hideclass';
        } else {
            className += ' showclass';
        }
        return (
            <div>
                <div>
                    <div className={className}>{chipComponent}</div>
                    <TextField
                        label="lbl"
                        value={this.state.people}
                        placeholder={filterPlaceHolder}
                        onChange={searchBehavior}
                        required={required} />
                    <a onClick={moreInfoComponentShowOn}>Info</a>
                </div>
                <div>{this.state.searchItems.map(function(item) {
                        return <Chip children={item}/>;
                     })
                }</div>
            </div>
        );

    }
    private  handleChange = (value: string) => {
        this.setState({ ['people']: value });
        // this.props.source.performFilter(value, this.onFilterSuccess, this.onFilterError);
        new PeoplePickerSource(PeoplePickerSearchType.Groups).performFilter(value, this.onFilterSuccess, this.onFilterError);
        return;
    }

    private onFilterSuccess = (items: any) => {
        alert(items);
        this.setState({ ['searchItems']: items });
        return items;
    }
    private onFilterError = (items: any) => {
       return items;
    }

    // private handleRemove = () => {
    //     return;
    // }

    // private handleSelect = () => {
    //     return;
    // }

    private handleClick = () => {
        return;
    }
}

export class PeoplePickerSource implements IPickerSource {

    private readonly searchType: PeoplePickerSearchType;
    private readonly activeOnly: boolean;
    private readonly searchSpecifiecGroup?: number;

    constructor(searchType: PeoplePickerSearchType = PeoplePickerSearchType.Users, activeOnly = true, searchSpecifiecGroup?: number) {
        this.searchType = searchType;
        this.activeOnly = activeOnly;
        this.searchSpecifiecGroup = searchSpecifiecGroup;
    }
    performFilter(filterString: string, onSuccess: (items: any) => void, onError: (error?: any) => void): void {
        try {
            onSuccess(this.peoplePickerArray(filterString, this.searchType));
        } catch (error) {
            onError(error);
        }
    }
    // private peoplePickerApi(filterString: string) {
    //     // TODO: API call and get data
    //     peoplePickerApi.search(this.searchType, this.activeOnly, this.searchSpecifiecGroup, filterString)
    //         .then((items: any) => {
    //             return items;
    //         });
    // }
    private peoplePickerArray(filterString: string, searchType: PeoplePickerSearchType) {
        const data: PeopleInfo[] = [
          {Id: 1, Name: 'ranmal0', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups},
          {Id: 2, Name: 'ranmal1', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups},
          {Id: 3, Name: 'ranmal2', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups},
          {Id: 4, Name: 'ranmal3', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups},
          {Id: 5, Name: 'ranmal4', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Users},
          {Id: 6, Name: 'ranmal5', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Users},
          {Id: 7, Name: 'ranmal6', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Users},
          {Id: 8, Name: 'ranmal7', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Users},
        ];
        return  data.filter((x) => x.Name.startsWith(filterString) && x.Type === searchType);
    }
}

export default Picker;

