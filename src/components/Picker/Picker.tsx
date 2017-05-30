import * as React from 'react';
import TextField from '../TextField';

export enum PeoplePickerSearchType {
    Users,
    Groups,
}

export interface IPickerSource {
    performFilter(filterString: string, onSuccess: (items: any) => void, onError: (error?: any) => void): void,
}

export interface Props {
    required?: boolean,
    selectedResultsBehavior?: string,
    filterPlaceHolder?: string,
    maxSelectedItems?: number,
    minSelectedItems?: number,
    searchBehavior?: void,
    millisecondsToWaitBeforeSearch?: number,
    chipComponent?: React.ReactNode,
    searchResultComponent?: React.ReactNode,
    moreInfoComponent?: React.ReactNode,
    peoplePickerSearchType?: PeoplePickerSearchType,
    source?: IPickerSource,
    onSelect?(): void,
    onRemove?(): void,
    moreInfoComponentShowOn?(): void,
}


export default class Picker extends React.PureComponent<Props, {}> {
    render() {
        const {
            // TODO:
        } = this.props;

        return (
            <div>
                <div></div>
                <TextField label="lbl" placeholder="example@email.com" required={this.props.required} />
                <div>{this.props.chipComponent}</div>
            </div>
        );
    }
}

