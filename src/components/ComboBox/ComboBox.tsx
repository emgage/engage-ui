import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { COMBOBOX } from '../ThemeIdentifiers';
import ComboBoxItem from './ComboBoxItem';
import Icon from '../Icon';
import TextField from '../TextField';
import Popover from '../Popover';
import arrowSvg from './icons/arrow.svg';
import * as baseTheme from './ComboBox.scss';
import { PreferredPosition } from './../PositionedOverlay';

export type Mode = 'collapsible' | 'multiple';
export type ItemType = 'Accordian' | 'Tabular';
export interface ComboBoxItemProps {
  type?: any;
  key?: string;
  value: any;
  column?: any;
  renderer?(value: any, type?: string): React.ReactElement<any>;
}

export interface ServerSort {
  field: string;
  order: string;
  callback?(field: string, order: string, sortBy: string): void;
}
export interface Props {
  currentValue?: string;
  items: ComboBoxItemProps[];
  label: string;
  style?: any;
  suffix?: any;
  loading?: boolean;
  onSelect?(item: any): void;
  onChangeText?(value: string): void;
  sortEntity?(field: string, order: string, sortBy: string): void;
  theme?: any;
  disabled?: boolean;
  readOnly?: boolean;
  helpText?: string;
  errors?: [string];
  onKeyUp?(value: string, e?: any): void;
  handleScroll?(): void;
  // Visually hide the border.
  backdropHidden?: boolean;
  // Callback when Input is focussed
  onFocus?(): void;
}

interface State {
  open: boolean;
  items: ComboBoxItemProps[];
  initialItems: ComboBoxItemProps[];
  anchorEl?: HTMLElement;
  selectedValue: string;
  popoverWidth: string;
  serverSort: ServerSort;
  maxHeight: number;
  activeIndex: number;
}
class ComboBox extends React.PureComponent<Props, State> {
  private getUniqueID = createUniqueIDFactory('ComboBox');
  private id = this.getUniqueID();
  private wrapperRef: HTMLDivElement;
  UP = 38;
  DOWN = 40;
  ENTER = 13;
  constructor(props: Props) {
    super(props);
    const { items, currentValue = '' } = props;

    this.state = {
      items,
      open: false,
      // In case use is searching something, and then removes its search text, combobox shud list the initialItem
      // Therefore, keeping copy of it so that its not lose, as items is changed depending on search and selection.
      initialItems: this.addRenderer(items, JSON.parse(JSON.stringify(items))),
      popoverWidth: '',
      selectedValue: '' || currentValue,
      maxHeight: 0,
      serverSort: {
        field: '',
        order: '',
        callback: this.sortEntity,
      },
      activeIndex: -1,
    };
  }

  sortEntity = (field: string, order: string, sortBy: string) => {
    this.setState({
      serverSort: {
        ...this.state.serverSort,
        field,
        order,
      },
    });

    if (this.props.sortEntity) {
      this.props.sortEntity(field, order, sortBy);
    }
  }

  componentDidMount() {
    const { items } = this.props;
    this.wrapperRef && this.wrapperRef.addEventListener('keydown', this.handleUpDownEvent);
    if (items && items[0]) {
      const { type = '' } = items && items[0];
      if (type !== 'Tabular') {
        document.addEventListener('click', this.handleClickOutside);
      }
    }
  }

  componentWillUnmount() {
    const { items } = this.props;
    if (items && items[0]) {
      const { type = '' } = items && items[0];
      if (type !== 'Tabular') {
        document.removeEventListener('click', this.handleClickOutside);
      }
    }
    this.wrapperRef && this.wrapperRef.removeEventListener('keydown', this.handleUpDownEvent);
  }

  componentWillReceiveProps(nextProps: any) {
    // Updated as we need to require search api call while user type.
    const { items, currentValue } = nextProps;
    const { items: oldItems, currentValue: oldCurrentValue } = this.props;

    if (JSON.stringify(oldItems) !== JSON.stringify(items)) {
      const initialItems = this.addRenderer(
        items,
        JSON.parse(JSON.stringify(items))
      );
      this.setState({ initialItems, items, activeIndex: -1 });
    }

    if (currentValue !== oldCurrentValue) {
      this.setState({ selectedValue: currentValue });
    }
  }

  handleClickOutside = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.open) {
        this.setState({ open: false, activeIndex: -1 });
      }
    }
  }

  setWrapperRef = (node: any) => {
    if (node && !this.state.popoverWidth) {
      const maxHeight = (window.innerHeight) - node.getBoundingClientRect().bottom - node.offsetHeight;
      this.setState({ maxHeight, popoverWidth: node.offsetWidth });
      this.wrapperRef = node;
    }
  }

  addRenderer = (items: any, cloneItems: any) => {
    items.forEach((item: any, index: number) => {
      if (item.renderer) {
        cloneItems[index]['renderer'] = item.renderer;
      }
    });

    return cloneItems;
  }

  getKey = (e: any) => {
    if (window.event) { // IE
      return e.keyCode;
    }
    if (e.which) { // Netscape/Firefox/Opera
      return e.which;
    }
  }

  handleUpDownEvent = (event: any) => {
    const keyCode = this.getKey(event);
    const { theme } = this.props;
    let { activeIndex } = this.state;
    const { items } = this.state;
    if (items.length === 0 || !items[0].value) {
      return;
    }
    if (keyCode === this.DOWN) {
      activeIndex += 1;
    } else if (keyCode === this.UP) {
      activeIndex -= 1;
    }
    const isValidActiveIndex = activeIndex > -1 && activeIndex <= (items[0].value.length - 1);
    if (keyCode === this.ENTER && isValidActiveIndex) {
      const selectedItem = items[0].value[activeIndex];
      const indexKey = items[0].key;
      this.handleClick(selectedItem, indexKey);
      return;
    }
    if (isValidActiveIndex && [this.UP, this.DOWN].includes(keyCode)) {
      this.setState({ activeIndex, open: true }, () => {
        setTimeout(() => {
          const ele = this.wrapperRef.querySelector(`.${theme.active}`);
          ele && ele.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
          });
        },         200);
      });
      event.preventDefault();
    }
  }

  onKeyUp = (event: any) => {
    const keyCode = this.getKey(event);
    // if (event.keyCode !== 18 || event.keyCode !== 91) {
    if (![this.UP, this.DOWN, this.ENTER].includes(keyCode)) {
      if (this.props.onKeyUp) {
        this.props.onKeyUp(this.state.selectedValue, event);
      }
    }
  }
  /*
     on Change of combobox item, cloning the initial Items which was added to combobox,
     and then search the value on those items, and list it in popover.
     In case if its Accordian, then check for values with key specified and filter them out.
  */

  onChange = (value: string, event: React.FormEvent<HTMLElement>) => {
    let newItems = this.state.initialItems;

    if (value && value !== '') {
      let cloneItems = JSON.parse(JSON.stringify(this.state.initialItems));
      cloneItems = this.addRenderer(this.state.items, cloneItems);

      newItems = cloneItems.map((it: any) => {
        const itemValues = it.value;
        const key = it.key;
        let data;

        if (it.type === 'Accordian') {
          data = itemValues.map((itv: any) => {
            itv.children = itv.children.filter((child: any) => {
              const flag = key
                ? child[key].toLowerCase().includes(value.toLowerCase())
                : child.toLowerCase().includes(value.toLowerCase());

              return flag;
            });

            return itv;
          });
        } else {
          data = itemValues.filter((itv: any) => {
            const smallVal = value.toLowerCase();
            const flag = key
              ? itv[key].toLowerCase().includes(smallVal)
              : itv.toLowerCase().includes(smallVal);

            return flag;
          });
        }

        it.value = data;
        return it;
      });
    }

    this.setState({
      anchorEl: event.target as HTMLElement,
      selectedValue: value,
      items: newItems,
    });

    if (this.props.onChangeText) {
      this.props.onChangeText(value);
    }
  }

  onArrowClick = (event: React.FormEvent<HTMLElement>) => {
    const eventTarget: any = event.target;
    // triggering unwanted event for label click
    if (eventTarget && eventTarget.nodeName !== 'LABEL') {
      const maxHeight = (window.innerHeight) - this.wrapperRef.getBoundingClientRect().bottom - this.wrapperRef.offsetHeight;
      this.setState({
        maxHeight,
        open: !this.state.open,
        anchorEl: event.target as HTMLElement,
      });
    }
  }

  handleClick = (value: string | any, key: any) => {
    const selectedValue = typeof value === 'string' ? JSON.parse(value) : value;
    if (this.props.onSelect) {
      this.props.onSelect(selectedValue);
    }
    this.setState({
      selectedValue:
        typeof selectedValue === 'object' ? selectedValue[key] : selectedValue,
      open: false,
      activeIndex: -1,
    });
  }

  render() {
    const {
      label,
      theme,
      suffix,
      loading,
      disabled,
      readOnly,
      helpText,
      backdropHidden,
      errors,
      handleScroll = () => {},
      onFocus = () => {},
    } = this.props;

    const { items, open, serverSort, activeIndex } = this.state;

    const itemsComponent = items.map((item, index) => (
      <ComboBoxItem
        key={index}
        item={item}
        clickHandler={this.handleClick}
        theme={theme}
        serverSort={serverSort}
        activeIndex={activeIndex}
      />
    ));
    let preferredPosition:PreferredPosition = 'below';
    let maxHeight = 300;
    if (this.state.maxHeight > 300) {
      maxHeight = this.state.maxHeight;
    } else {
      preferredPosition = 'above';
    }
    return (
      <>
        <div
          key={this.id}
          className={theme.comboboxContainer}
          onClick={this.onArrowClick}
          ref={this.setWrapperRef}
        >
          <TextField
            errors={errors}
            type="text"
            label={label}
            onChange={this.onChange}
            value={this.state.selectedValue}
            theme={theme}
            suffix={<Icon source={suffix} componentColor="inkLighter" />}
            loading={loading}
            disabled={disabled}
            autoComplete={false}
            readOnly={readOnly}
            helpText={helpText}
            onKeyUp={this.onKeyUp}
            onFocus={onFocus}
            backdropHidden={backdropHidden}
          />

          {!suffix && (
            <div className={theme.comboboxArrow}>
              <Icon source={arrowSvg} theme={theme} />
            </div>
          )}

          {!disabled && !readOnly && open && (
            <Popover
              addArrow={false}
              componentStyle={{
                maxHeight,
                overflow: 'auto',
              }}
              anchorEl={this.state.anchorEl}
              open={open}
              theme={theme}
              preferredAlignment="left"
              handleScroll={handleScroll}
              preferredPosition= {preferredPosition}
            >
              {itemsComponent}
            </Popover>
          )}
        </div>
      </>
    );
  }
}

export { ComboBox as UnthemedComboBox };
export default themr(COMBOBOX, baseTheme)(ComboBox) as ThemedComponentClass<
  Props,
  {}
>;
