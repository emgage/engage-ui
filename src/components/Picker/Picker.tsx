import * as React from 'react';
import TextField from '../TextField';
import { PeoplePickerSearchType, MoreInfoOn } from './PickerEnum';
import { PeopleInfo } from './PeopleInfo';
import { IPickerSource } from './IPickerSource';
export interface State {
    people: string,
    searchItems: PeopleInfo[],
    selectedItems: PeopleInfo[],
    moreInfo: boolean,
}
export type Type = 'hide' | 'mark' ;
export interface Props {
    required?: boolean,
    selectedResultsBehavior?: Type,
    filterPlaceHolder?: string,
    maxSelectedItems?: number,
    minSelectedItems?: number,
    millisecondsToWaitBeforeSearch?: number,
    chipComponent: React.ReactNode,
    searchResultComponent: React.ReactNode,
    moreInfoComponent?: React.ReactNode,
    peoplePickerSearchType: PeoplePickerSearchType,
    source: IPickerSource,
    moreInfoComponentShowOn?: MoreInfoOn,
    searchBehavior?(): void,
    onSelect?(item: any): void,
    onRemove?(item: any): void,
    onMoreInfo?(): void,

}

class Picker extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            people: '',
            searchItems: [],
            selectedItems: [],
            moreInfo: false,
        };
    }
    render() {
        const {
            required,
            filterPlaceHolder,
            selectedResultsBehavior,
            moreInfoComponent,
            chipComponent,
            searchResultComponent,
            searchBehavior = this.handleChange,
            moreInfoComponentShowOn = MoreInfoOn.onClick,
            onSelect = this.handleSelect,
            onRemove = this.handleRemove,
            onMoreInfo = this.handleMoreInfo,
          } = this.props;
        let className = '';
        if (selectedResultsBehavior === 'hide' || selectedResultsBehavior === undefined) {
            className += 'hideClass';
        } else {
            className += 'showClass';
        }
        return (
            <div>
                <div>
                    <div className={className}>
                        {
                             this.state.selectedItems.map(function(i) {
                                return React.createElement(chipComponent as React.ComponentClass<{ clickable: boolean, removable: boolean, onRemove(item: any): void}>, {key: i.Id, clickable: false, removable: true, onRemove}, [i.Name]);
                             })
                        }
                     </div>
                    <TextField
                        label="lbl"
                        value={this.state.people}
                        placeholder={filterPlaceHolder}
                        onChange={searchBehavior}
                        required={required} />
                 </div>
                <div>
                    {
                        this.state.searchItems.map(function(i) {
                            return React.createElement(searchResultComponent as React.ComponentClass<{ clickable: boolean, moreInfoComponent: React.ReactNode, moreInfoComponentShowOn: MoreInfoOn, onClick(item: any): void, handleMoreInfo(): void }>, { key: i.Id, clickable: true, moreInfoComponent, moreInfoComponentShowOn, onClick: onSelect, handleMoreInfo: onMoreInfo }, [i.Name]);
                        })
                    }
                   
                </div>
            </div>
        );

    }
    private handleChange = (value: string) => {
       this.setState({ ['people']: value });
        setTimeout(() => {
           this.props.source.performFilter(value).then(this.onSuccess).catch(this.onError);
        }, this.props.millisecondsToWaitBeforeSearch === undefined ? 0 : this.props.millisecondsToWaitBeforeSearch);
    }
    private onSuccess = (item: any) => {
       this.setState({ ['searchItems']: item });
    }
    private onError = (item: any) => {
        // TODO: Error display
         alert(item);
    }
    private handleRemove = (event: any) => {
        const item = this.state.selectedItems.find((x) => x.Name === event.currentTarget.previousElementSibling.innerText);
        const items = this.state.selectedItems;
         if (this.props.minSelectedItems !== undefined && this.props.minSelectedItems === items.length) {
            return;
        }
        if (item !== undefined) {
            const index: number = items.indexOf(item);
            if (index !== -1) {
                items.splice(index, 1);
            }
        }
        this.setState({ ['selectedItems']: items });
        return;
    }

    private handleSelect = (event: any) => {
        const item = this.state.searchItems.find((x) => x.Name === event.currentTarget.text);
        const items = this.state.selectedItems;
        if (this.props.maxSelectedItems !== undefined && this.props.maxSelectedItems === items.length) {
            return;
        }
        if (item !== undefined) {
            if (!items.some((x) => x.Name === item.Name)) {
                items.push(item);
            }
        }
        this.setState({ ['selectedItems']: items });
        this.setState({ ['searchItems']: [] });
        return;
    }

    private handleMoreInfo = () => {
        this.setState({ ['moreInfo']: !this.state.moreInfo });
        return;
    }
}

export default Picker;

