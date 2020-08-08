import * as React from 'react';
import * as baseTheme from './Table.scss';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Banner, Select } from '../index';
import { Status } from '../Banner/Banner';
import { TABLE } from '../ThemeIdentifiers';
import { IconList } from '../Icon';

export interface Props {
  bannerTitle: string;
  bannerType: Status;
  bannerIcon?: string;
  disabled?: boolean;
  dropdownItems: any;
  rowItem?: any;
  loading?: boolean;
  onChange?(rowItem: any, selectedValue: number): void;
  onFocus?(rowItem: any): void;
  selectPlaceholder: string;
  selectedValue?: string;
}

export interface State {
  selectedValue?: string;
}

class BannerRow extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = ({
      selectedValue: ''
    });
  }

  onChangeHandler = (selectedValue: string) => {
    const { onChange, rowItem } = this.props;
    parseInt(selectedValue, 10) && this.setState({ selectedValue });
    onChange && onChange(rowItem, +selectedValue);
  }

  onFocusHandle = () => {
    const { onFocus, rowItem } = this.props;
    onFocus && onFocus(rowItem);
  }

  render () {
    const {
      bannerTitle,
      bannerType,
      bannerIcon,
      disabled = false,
      dropdownItems,
      loading = false,
      rowItem,
      selectPlaceholder,
      selectedValue
    } = this.props;

    return(
      <Banner key={rowItem.id} componentTitle={bannerTitle} status={bannerType} icon={bannerIcon as keyof typeof IconList}>
        <Select
          disabled={disabled}
          label={''}
          labelHidden={true}
          loading={loading}
          placeholder={selectPlaceholder}
          options={dropdownItems}
          onFocus={this.onFocusHandle}
          onChange={this.onChangeHandler}
          value={this.state.selectedValue ? this.state.selectedValue : selectedValue}
        />
      </Banner>
    );
  }

}

export default themr(TABLE, baseTheme)(BannerRow) as ThemedComponentClass<Props, State>;
