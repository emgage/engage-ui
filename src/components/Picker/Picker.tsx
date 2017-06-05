import * as React from 'react';
import TextField from '../TextField';
import Chip from '../Chip';
import { PeoplePickerSearchType, MoreInfoOn } from './PickerEnum';
import { PeopleInfo } from './PeopleInfo';
import { IPickerSource } from './IPickerSource';
export interface State {
    people: string,
    searchItems: PeopleInfo[],
    selectedItems: PeopleInfo[],
    moreInfo: boolean,
}

export interface Props {
    required?: boolean,
    selectedResultsBehavior?: string,
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
            chipComponent = Chip,
            searchResultComponent = Chip,
            searchBehavior = this.handleChange,
            moreInfoComponentShowOn = MoreInfoOn.onClick,
            onSelect = this.handleSelect,
            onRemove = this.handleRemove,
         } = this.props;
        let className = '';
        if (selectedResultsBehavior === 'hide' || selectedResultsBehavior === undefined) {
            className += ' hideclass';
        } else {
            className += ' showclass';
        }
        let InfoLinkComponent = null;
        if (moreInfoComponentShowOn === MoreInfoOn.onClick) {
            InfoLinkComponent = <a onClick={this.handleMoreInfo}>Info</a>;
        } else {
            InfoLinkComponent = <a onMouseEnter={this.handleMoreInfo} onMouseLeave={this.handleMoreInfo}>Info</a>;
        }
        let InfoComponent = null;
        if (this.state.moreInfo) {
            InfoComponent = moreInfoComponent;
        } else {
            InfoComponent = null;
        }
        return (
            <div>
                <div>
                    <div className={className}>
                        {
                             this.state.selectedItems.map(function(i) {
                                return React.createElement(chipComponent, {key: i.Id, clickable: true, removable: true, onRemove}, [i.Name]);
                             })
                        }
                     </div>
                    <TextField
                        label="lbl"
                        value={this.state.people}
                        placeholder={filterPlaceHolder}
                        onChange={searchBehavior}
                        required={required} />
                    {InfoLinkComponent}                        
                    {InfoComponent}
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
           // new PeoplePickerSource(PeoplePickerSearchType.Both).performFilter(value).then(this.onSuccess).catch(this.onError);
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
        const item = this.state.selectedItems.find((x) => x.Name === event.currentTarget.previousElementSibling.text);
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

