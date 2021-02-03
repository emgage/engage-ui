import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { classNames } from '@shopify/react-utilities/styles';
import { POPOVERPICKER } from '../ThemeIdentifiers';
import * as baseTheme from './PopoverPicker.scss';
import Icon from '../Icon';
import TextField from '../TextField';
import Popover from '../Popover';
import arrowSvg from './icons/arrow.svg';
import PopoverPikerItem from './PopoverPikerItem';
// import { Table } from '../Table';
// import Icon, { IconList } from '../Icon';
import Chip from '../Chip';

export type Mode = 'collapsible' | 'multiple';
export type ItemType = 'Accordian' | 'Tabuler';
export interface PopoverItemProps {
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
  items: PopoverItemProps[];
  label: string;
  style?:any;
  suffix?: any;
  loading?: boolean;
  onSelect?(item: any): void;
  onChangeText?(value: string): void;
  onRemove?(value: string): void;
  sortEntity?(field: string, order: string, sortBy: string): void;
  theme?: any;
  defaultSelectedItems?: any;
  noOptionsMessage?: string;
  disabled?: boolean;
}

interface State {
  chipListState: any[];
  items: PopoverItemProps[];
  initialItems: PopoverItemProps[];
  anchorEl?: HTMLElement;
  selectedValue: string;
  popoverWidth: string;
  isEmpty: boolean;
  serverSort: ServerSort;
}

class PopoverPicker extends React.PureComponent<Props, State> {
  private getUniqueID = createUniqueIDFactory('PopoverPicker');
  private id = this.getUniqueID();
  public wrapperRef: HTMLDivElement;
  constructor(props: Props) {
    super(props);
    const { items, currentValue = '' } = props;

    this.state = {
      items,
      // In case use is searching something, and then removes its search text, PopoverPicker shud list the initialItem
      // Therefore, keeping copy of it so that its not lose, as items is changed depending on search and selection.
      initialItems: this.addRenderer(items, JSON.parse(JSON.stringify(items))),
      popoverWidth: '',
      selectedValue: '' || currentValue,
      isEmpty: false,
      chipListState: props.defaultSelectedItems || [],
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
  };
  
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps: any) {
    const { items } = nextProps;
    const { items: oldItems } = this.props;
    if (JSON.stringify(oldItems) !== JSON.stringify(items)) {
      const isEmpty: boolean = items && items[0] && items[0].value && items[0].value.length === 0 || false;
      this.setState({ items: items, isEmpty });
    }
    if (JSON.stringify(nextProps.defaultSelectedItems) !== JSON.stringify(this.props.defaultSelectedItems)) {
      const { defaultSelectedItems = [] } = nextProps;
      if (nextProps.source.length && defaultSelectedItems.length) {
        defaultSelectedItems.forEach((chip: any) => {
          const currentText = nextProps.source.find((source: any) => source.id === (chip.id || chip.key) || source.key === (chip.id || chip.key));
          if (currentText) {
            chip.text = currentText.name;
          }
        });
      }
      this.setState({ items, chipListState: defaultSelectedItems });
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

  /*
     on Change of PopoverPicker item, cloning the initial Items which was added to PopoverPicker,
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

  handleClick = (value: string | any, key: any) => {
    const selectedValue = typeof value === 'string' ? JSON.parse(value) : value;
    if (this.props.onSelect) {
      this.props.onSelect(selectedValue);
    }

    this.updateList(value);
    const chipListState = this.state.chipListState.concat(value);
    const item = Object.assign({}, chipListState[0], { tabIndex: 0 });
    chipListState[0] = item;
    this.setState({
      chipListState,
      selectedValue: '',
    });
  }
  
  updateList = (input: any) => {
    const { items } = this.state;
    const { value } = items[0];
    const langIndex = value.indexOf(input);
    const itemsListLength = value;
    const newLangState = itemsListLength.slice(0, langIndex).concat(itemsListLength.slice(langIndex + 1, itemsListLength.length));
    console.log(newLangState);
    
    items[0].value = newLangState;
    this.setState({ items });
  }

  chipRemove = (item: any) => {
    const number = typeof item === 'number' ? item : this.state.chipListState.indexOf(item);
    const existingChipList = this.state.chipListState;
    const addedItem = this.state.chipListState.slice(number, number + 1);
    const addedItemObj = Object.assign({}, addedItem[0], { tabIndex: -1 });
    const chipListState = existingChipList.slice(0, number).concat(existingChipList.slice(number + 1));
    const { items } = this.state;
    const { value } = items[0];
    const itemsList = [addedItemObj, ...value];
    items[0].value = itemsList;
    
    this.setState({
      items,
      chipListState,
    });

    if (this.props.onRemove) {
      this.props.onRemove(item);
    }
  }

  onKeyDown = (e: KeyboardEvent) => {
    if ((e.keyCode === 8) && this.state.chipListState.length && !this.state.selectedValue.length) {
      const chipListState = this.state.chipListState.slice(0, this.state.chipListState.length - 1);
      const selectedChip = this.state.chipListState.slice(this.state.chipListState.length - 1)[0];
      const { items } = this.state;
      const value = items[0].value;
      const itemsList = value.concat(selectedChip);
      items[0].value = itemsList;
      this.setState({
        chipListState,
        items
      });
      if (this.props.onRemove) {
        this.props.onRemove(selectedChip);
      }
    }
  }

  render() {
    const {
      label,
      theme,
      suffix,
      loading,
      noOptionsMessage,
      disabled
    } = this.props;

    const {
      items,
      popoverWidth,
      isEmpty,
      serverSort,
      chipListState
    } = this.state;

    const itemsComponent = items.map((item, index) =>
      <PopoverPikerItem
          key={index}
          item={item}
          clickHandler={this.handleClick}
          theme={theme}
          serverSort={serverSort}
        />
    );
    
    const { value = []} = items[0];
    let open: boolean = this.state.selectedValue.length !== 0 && value.length !== 0 || false;
    const isEmptyResult: boolean = this.state.selectedValue.length !== 0 && value.length === 0 || false;

    const classNameChip = classNames(
      theme.containerWrapper,
      chipListState.length !== 0 ? null : theme.empty
    );
    
    let hasValue: boolean = chipListState.length !== 0;

    return (
      <div id={this.id}>
        <div className={classNameChip}>
        {chipListState.length !== 0 ? chipListState.map((input: any) => <Chip icon={input.icon} onIconClick={input.onIconClick} theme={theme} image={{ url: input.image }} removable={!disabled} onRemove={() => this.chipRemove(input)} key={input.key}>{input.text}</Chip>) : null}
        <div key={this.id} className={theme.tabulerSuggestContainer} ref={node => this.setWrapperRef(node)} >
          <TextField
            type="text"
            label={label}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            value={this.state.selectedValue}
            theme={theme}
            suffix={<Icon source={suffix} componentColor="inkLighter" />}
            loading={loading}
            disabled={disabled}
            backdropHidden={true}
            isFocused={false}
            hasValue={hasValue}
          />
          {!suffix && <div className={theme.comboboxArrow}>
            <Icon source={arrowSvg} theme={theme} />
          </div>}
          {open && !isEmpty && <Popover
            addArrow={false}
            componentStyle={{ maxHeight: window.outerHeight < 768 ? 500 : 800, overflow: 'auto', width: popoverWidth }}
            anchorEl={this.state.anchorEl}
            open={open}
            theme={theme}
            preferredAlignment="left"
          >
              {itemsComponent}
            </Popover>}

          {isEmptyResult && <Popover
            addArrow={false}
            componentStyle={{ maxHeight: window.outerHeight < 768 ? 500 : 800, overflow: 'auto', width: popoverWidth }}
            anchorEl={this.state.anchorEl}
            open={isEmptyResult}
            theme={theme}
            preferredAlignment="left"
          >
              {noOptionsMessage}
            </Popover>}
          </div>
        </div>
      </div>
    );
  }
}

export { PopoverPicker as UnthemedPopoverPicker };
export default themr(POPOVERPICKER, baseTheme)(PopoverPicker) as ThemedComponentClass<Props, State>;