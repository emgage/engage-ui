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
  style?:any;
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
  onKeyUp?(value: string): void;
  handleScroll?(): void;
  // Visually hide the border.
  backdropHidden?: boolean;
}

interface State {
  open: boolean;
  items: ComboBoxItemProps[];
  initialItems: ComboBoxItemProps[];
  anchorEl?: HTMLElement;
  selectedValue: string;
  popoverWidth: string;
  serverSort: ServerSort;
}

class ComboBox extends React.PureComponent<Props, State> {
  private getUniqueID = createUniqueIDFactory('ComboBox');
  private id = this.getUniqueID();
  private wrapperRef: HTMLDivElement;
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
      serverSort: {
        field: '',
        order: '',
        callback: this.sortEntity
      },
    };
  }

  sortEntity = (field: string, order: string, sortBy: string) => {

    this.setState({
      serverSort: {
        ...this.state.serverSort,
        field,
        order,
      }
    });

    if (this.props.sortEntity) {
      this.props.sortEntity(field, order, sortBy);
    }
  }

  componentDidMount() {
    const { items } = this.props;
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
  }

  componentWillReceiveProps(nextProps: any) {
    // Updated as we need to require search api call while user type.
    const { items, currentValue } = nextProps;
    const { items: oldItems, currentValue: oldCurrentValue  } = this.props;

    console.log(oldItems);
    console.log(items);
    console.log((JSON.stringify(oldItems) !== JSON.stringify(items)));

    if (JSON.stringify(oldItems) !== JSON.stringify(items)) {
      const initialItems = this.addRenderer(items, JSON.parse(JSON.stringify(items)));
      this.setState({ initialItems, items });
    }

    if (currentValue !== oldCurrentValue) {
      this.setState({ selectedValue: currentValue });
    }
  }

  handleClickOutside = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.open) {
        this.setState({ open: false });
      }
    }
  }

  setWrapperRef = (node: any) => {
    if (node && !this.state.popoverWidth) {
      this.setState({ popoverWidth: node.offsetWidth });
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

  onKeyUp = (e: React.FormEvent<HTMLElement> | KeyboardEvent) => {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(this.state.selectedValue);
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
              const flag = key ? ((child[key].toLowerCase()).includes(value.toLowerCase())) : (child.toLowerCase()).includes(value.toLowerCase());

              return flag;
            });

            return itv;
          });
        } else {
          data = itemValues.filter((itv: any) => {
            const smallVal = value.toLowerCase();
            const flag = key ? ((itv[key].toLowerCase()).includes(smallVal)) : (itv.toLowerCase()).includes(smallVal);

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
      this.setState({
        open: !this.state.open,
        anchorEl: event.target as HTMLElement
      });
    }
  }

  handleClick = (value: string | any, key: any) => {
    const selectedValue = typeof value === 'string' ? JSON.parse(value) : value;
    if (this.props.onSelect) {
      this.props.onSelect(selectedValue);
    }
    this.setState({ selectedValue: typeof(selectedValue) === 'object' ? selectedValue[key] : selectedValue, open: false });
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
    } = this.props;

    const {
      items,
      open,
      serverSort
    } = this.state;

    const itemsComponent = items.map((item, index) =>
        <ComboBoxItem
          key={index}
          item={item}
          clickHandler={this.handleClick}
          theme={theme}
          serverSort={serverSort}
        />
      );

    return (
      <>
      <div key={this.id} className={theme.comboboxContainer} onClick={this.onArrowClick} ref={node => this.setWrapperRef(node)} >
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
          backdropHidden = {backdropHidden}
        />

        {!suffix && <div className={theme.comboboxArrow}>
          <Icon source={arrowSvg} theme={theme} />
        </div>}

        {!disabled && !readOnly && open && <Popover
          addArrow={false}
          componentStyle={{ maxHeight: window.outerHeight < 768 ? 300 : 800, overflow: 'auto' }}
          anchorEl={this.state.anchorEl}
          open={open}
          theme={theme}
          preferredAlignment="left"
          handleScroll={handleScroll}
        >
            {itemsComponent}
          </Popover>}
      </div>

      </>
    );
  }
}

export { ComboBox as UnthemedComboBox };
export default themr(COMBOBOX, baseTheme)(ComboBox) as ThemedComponentClass<Props, {}>;
