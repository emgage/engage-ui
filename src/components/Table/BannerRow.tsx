import * as React from 'react';
import * as baseTheme from './Table.scss';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Banner, ComboBox } from '../index';
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
  theme?: any;
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

  onChangeHandler = (selectedValue: any) => {
    const selectedValId = selectedValue.value;
    const selectedValLabel = selectedValue.label;
    const { onChange, rowItem } = this.props;
    this.setState({ selectedValue:selectedValLabel });
    if (!selectedValId) {
      this.setState({ selectedValue: '' });
    }
    onChange && onChange(rowItem, +selectedValId);
  }

  onFocusHandle = () => {
    const { onFocus, rowItem } = this.props;
    onFocus && onFocus(rowItem);
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any) {
    if (!nextProps.selectedValue) {
      this.setState({ selectedValue: '' });
    }
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
      selectedValue,
      theme,
    } = this.props;

    const selectedVal = dropdownItems.find((op: any) => op.value.toString() === (selectedValue || "").toString());

    const selectedValLabel = selectedVal?.label || this.state.selectedValue;

    return(
      <Banner key={rowItem.id} componentTitle={bannerTitle} status={bannerType} icon={bannerIcon as keyof typeof IconList}>
         <ComboBox
            theme={theme}
            disabled={disabled}
            label={selectPlaceholder}
            loading={loading}
            items={[{
              key: 'label',
              value: dropdownItems,
            }]}
            currentValue={selectedValLabel}
            onFocus={this.onFocusHandle}
            onSelect={this.onChangeHandler}
            suffix="caretDown"
          />
        {/* <Select
          disabled={disabled}
          label={''}
          labelHidden={true}
          loading={loading}
          placeholder={selectPlaceholder}
          options={dropdownItems}
          onFocus={this.onFocusHandle}
          onChange={this.onChangeHandler}
          value={this.state.selectedValue ? this.state.selectedValue : selectedValue}
        /> */}
      </Banner>
    );
  }

}

export default themr(TABLE, baseTheme)(BannerRow) as ThemedComponentClass<Props, State>;
