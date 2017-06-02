import * as React from 'react';
import TextField from '../TextField';
import Chip from '../Chip';
import { PeoplePickerSearchType } from './PickerSearchType';
import { PeopleInfo } from './PeopleInfo';
import { IPickerSource } from './IPickerSource';
import { PeoplePickerSource } from './PickerSource';
export interface State {
    people: string,
    searchItems: PeopleInfo[],
    selectedItems: PeopleInfo[],
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
    onSelect?(item: any): void,
    onRemove?(item: any): void,
    moreInfoComponentShowOn?(): void,
}

class Picker extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            people: '',
            searchItems: [],
            selectedItems: [],
        };
    }
    render() {
        const {
            required,
            filterPlaceHolder,
            selectedResultsBehavior,
            moreInfoComponent,
            chipComponent = Chip,
            searchResultComponent = Chip,
            searchBehavior = this.handleChange,
            moreInfoComponentShowOn = this.handleClick,
            onSelect = this.handleSelect,
            onRemove = this.handleRemove,
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
                    <div className={className}>
                        {
                             this.state.selectedItems.map(function(i) {
                                return React.createElement(chipComponent, {key: i.Id, clickable: true, removable: true, onRemove: onRemove}, [i.Name]);
                             })
                        }
                     </div>
                    <TextField
                        label="lbl"
                        value={this.state.people}
                        placeholder={filterPlaceHolder}
                        onChange={searchBehavior}
                        required={required} />
                    {moreInfoComponent}
                    <a onClick={moreInfoComponentShowOn}>Info</a>
                </div>
                <div>
                    {
                        this.state.searchItems.map(function(i) {
                            return React.createElement(searchResultComponent, {key: i.Id, clickable: true, onClick: onSelect}, [i.Name]);
                        })
                    }
                   
                </div>
            </div>
        );

    }
    private handleChange = (value: string) => {
       this.setState({ ['people']: value });
        setTimeout(() => {
           new PeoplePickerSource(PeoplePickerSearchType.Both).performFilter(value).then(this.onSuccess).catch(this.onError);
           // this.props.source.performFilter(value, this.onFilterSuccess, this.onFilterError);
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
        const item = this.state.selectedItems.find((x) => x.Name === event.currentTarget.previousElementSibling.text);
        const items = this.state.selectedItems;
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

    private handleClick = (event: any) => {
        // TODO: show more info control
        alert(event);
        return;
    }
}

export default Picker;

