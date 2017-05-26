import * as React from 'react';

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
  maxSelectedItems: number,
  minSelectedItems: number,
  searchBehavior?: void,
  millisecondsToWaitBeforeSearch: number,
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
            inline,
            direction ,
            justify,
            align,
         } = this.props;

        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

