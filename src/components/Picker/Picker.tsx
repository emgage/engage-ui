import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { PICKER } from '../ThemeIdentifiers';
import TextField from '../TextField';
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
  chipComponent: React.ReactNode;
  searchResultComponent: React.ReactNode;
  moreInfoComponent?: React.ReactNode;
  source: IPickerSource<IPickerInfo>;
  moreInfoComponentShowOn?: DisplayMoreInfo;
  style?: React.CSSProperties;
  theme?: any;
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
      required,
      filterPlaceHolder,
      selectedResultsBehavior,
      moreInfoComponent,
      chipComponent,
      searchResultComponent,
      searchBehavior = this.handleChange,
      moreInfoComponentShowOn = DisplayMoreInfo.onClick,
      onSelect = this.handleSelect,
      onRemove = this.handleRemove,
      onMoreInfo = this.handleMoreInfo,
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
                      label="lbl"
                      value={this.state.people}
                      placeholder={filterPlaceHolder}
                      onChange={searchBehavior}
                      required={required}
                    />
                </div>
                <div>
                    {
                        this.state.searchItems.map((i) => {
                          return React.createElement(searchResultComponent as React.ComponentClass<{ clickable: boolean, moreInfoComponent: React.ReactNode, moreInfoComponentShowOn: DisplayMoreInfo, onClick(item: any): void, handleMoreInfo(): void }>, { moreInfoComponent, moreInfoComponentShowOn, key: i.id, clickable: true, onClick: onSelect, handleMoreInfo: onMoreInfo }, [i.name]);
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
    },         this.props.millisecondsToWaitBeforeSearch === undefined ? 0 : this.props.millisecondsToWaitBeforeSearch);
  }
  private onSuccess = (item: any) => {
    this.setState({ ['searchItems']: item });
  }
  private onError = (item: any) => {
        // TODO: Error display
    alert(item);
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

  private handleSelect = (event: any) => {
    const item = this.state.searchItems.find(x => x.name === event.currentTarget.text);
    const items = this.state.selectedItems;
    if (this.props.maxSelectedItems !== undefined && this.props.maxSelectedItems === items.length) {
      return;
    }
    if (item !== undefined) {
      if (!items.some(x => x.name === item.name)) {
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

export { Picker as UnthemedPicker };
export default themr(PICKER, baseTheme)(Picker) as ThemedComponentClass<Props, State>;

