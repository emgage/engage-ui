
import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { PICKER } from '../ThemeIdentifiers';
import TextField from './TextField';
import { DisplayMoreInfo } from './PickerEnum';
import * as baseTheme from './Picker.scss';

export interface State {
  people: string;
  searchItems: IPickerInfo[];
  selectedItems: IPickerInfo[];
  moreInfo: boolean;
}
export interface IPickerInfo {
  id?: number;
  name: string;
  description: string;
  imageUrl?: string;
  url?: string;
}
export interface IPickerSource<T> {
  performFilter(filterString: string): Promise<T[]>;
}
export type Type = 'hide' | 'mark';
export interface Props {
  required?: boolean;
  selectedResultsBehavior?: Type;
  filterPlaceHolder?: string;
  maxSelectedItems?: number;
  minSelectedItems?: number;
  millisecondsToWaitBeforeSearch?: number;
  chipComponent?: React.ReactNode;
  searchResultComponent?: React.ReactNode;
  moreInfoComponent?: React.ReactNode;
  moreInfoComponentShowOn?: DisplayMoreInfo;
  style?: React.CSSProperties;
  theme?: any;
  autoSuggest?: boolean;
  autoSuggestMethods?: object[];
  stateProps?: {chipListState: any, suggestions: any, inputProps: object, value?: any};
  searchBehavior?(): void;
  onSelect?(item: any): void;
  onRemove?(item: any): void;
  onMoreInfo?(): void;
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
      autoSuggestMethods,
      autoSuggest,
      filterPlaceHolder,
      selectedResultsBehavior,
      chipComponent,
      onRemove = this.handleRemove,
      theme,
    } = this.props;
    let className = '';
    if (selectedResultsBehavior === 'hide') {
      className = theme.pickerResultHide;
    } else {
      className = theme.pickerResultShow;
    }
    return (
      <div>
           <div>
              <div className={className}>
                  {
                      this.state.selectedItems.map((i) => {
                        return React.createElement(chipComponent as React.ComponentClass<{ clickable: boolean, removable: boolean, onRemove(item: any): void }>, { onRemove, key: i.id, clickable: false, removable: true }, [i.name]);
                      })
                  }
              </div>
                <TextField
                  autoSuggest={autoSuggest}
                  autoSuggestMethods={autoSuggestMethods}
                  label="lbl"
                  value={this.state.people}
                  placeholder={filterPlaceHolder}
                  stateProps={this.props.stateProps}
                />
           </div>
      </div>
    );
  }
  private handleRemove = (event: any) => {
    const item = this.state.selectedItems.find(x => x.name === event.currentTarget.previousElementSibling.innerText);
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
}

export { Picker as UnthemedPicker };
export default themr(PICKER, baseTheme)(Picker) as ThemedComponentClass<Props, State>;
