import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { PICKER } from '../ThemeIdentifiers';
import TextField from '../TextField';
import Popover from '../Popover';
import * as baseTheme from './Picker.scss';
import { Table } from '../Table';

export type Mode = 'collapsible' | 'multiple';
export type ItemType = 'Accordian' | 'Tabuler';
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
  items: ComboBoxItemProps;
  label?: string;
  style?:any;
  suffix?: any;
  loading?: boolean;
  theme?: any;
  autoSuggestMethods?: any;
  disabled?: boolean;
}

interface State {
  items: ComboBoxItemProps;
  initialItems: ComboBoxItemProps;
  anchorEl?: HTMLElement;
  selectedValue: string;
  popoverWidth: string;
  isEmpty: boolean;
  serverSort?: any;
}

class TabulerSuggest extends React.PureComponent<Props, State> {
  private getUniqueID = createUniqueIDFactory('TabulerSuggest');
  private id = this.getUniqueID();
  private wrapperRef: HTMLDivElement;
  constructor(props: Props) {
    super(props);
    const { items, currentValue = '' } = props;

    this.state = {
      items,
      initialItems: this.addRenderer(items, JSON.parse(JSON.stringify(items))),
      popoverWidth: '',
      selectedValue: '' || currentValue,
      isEmpty: false,
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

    if (this.props.autoSuggestMethods) {
      if (this.props.autoSuggestMethods.sortEntity) {
        this.props.autoSuggestMethods.sortEntity(field, order, sortBy);;
      }
    }
  };
  
  componentDidMount() {
    // document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    // document.removeEventListener('click', this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps: any) {
    const { items } = nextProps;
    const { items: oldItems } = this.props;
    if (JSON.stringify(oldItems) !== JSON.stringify(items)) {
      const isEmpty: boolean = items && items.value && items.value.length === 0 || false;
      this.setState({ items: items, isEmpty });
    }
  }

  handleClickOutside = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.props.autoSuggestMethods) {
        if (this.props.autoSuggestMethods.onSuggestionsClearRequested) {
          this.setState({ selectedValue: '' });
          this.props.autoSuggestMethods.onSuggestionsClearRequested();
        }
      }
    }
  }

  setWrapperRef = (node: any) => {
    if (node && !this.state.popoverWidth) {
      this.setState({ popoverWidth: node.offsetWidth });
    }
  }

  setWrapperTableRef = (node: any) => {
    if (node) {
      this.wrapperRef = node;
    }
  }

  addRenderer = (items: any, cloneItems: any) => {
    if (items.renderer) {
      cloneItems['renderer'] = items.renderer;
    }
    return cloneItems;
  }

  onChange = (value: string, event: React.FormEvent<HTMLElement>) => {
    let newItems = this.state.initialItems;

    if (value && value !== '') {
      let cloneItems = JSON.parse(JSON.stringify(this.state.initialItems));
      cloneItems = this.addRenderer(this.state.items, cloneItems);

      const itemValues = cloneItems.value;
      const key = cloneItems.key;
      let data;
      data = itemValues.filter((itv: any) => {
        const smallVal = value.toLowerCase();
        const flag = key ? ((itv[key].toLowerCase()).includes(smallVal)) : (itv.toLowerCase()).includes(smallVal);

        return flag;
      });
      cloneItems.value = data;
      newItems = cloneItems;
    }

    this.setState({
      anchorEl: event.target as HTMLElement,
      selectedValue: value,
      items: newItems,
    });
    
    if (this.props.autoSuggestMethods) {
      if (this.props.autoSuggestMethods.onSuggestionsFetchRequested) {
        this.props.autoSuggestMethods.onSuggestionsFetchRequested({value});
      }
      if (this.props.autoSuggestMethods.onSuggestionsClearRequested) {
        if (value === "") {
          this.props.autoSuggestMethods.onSuggestionsClearRequested();
        }
      }
      if (this.props.autoSuggestMethods.onChangeText) {
        this.props.autoSuggestMethods.onChangeText(value);
      }
    }
  }

  handleClick = (value: string | any, key: any) => {
    const selectedValue = typeof value === 'string' ? JSON.parse(value) : value;
    if (this.props.autoSuggestMethods) {
      if (this.props.autoSuggestMethods.onSuggestionSelected) {
        this.props.autoSuggestMethods.onSuggestionSelected(selectedValue, selectedValue);
      }
      if (this.props.autoSuggestMethods.onSuggestionsClearRequested) {
        this.props.autoSuggestMethods.onSuggestionsClearRequested();
      }
    }
    this.setState({ selectedValue: '' });
  }

  render() {
    const {
      label,
      theme,
      disabled,
      loading
    } = this.props;

    const {
      items,
      popoverWidth,
      isEmpty,
      serverSort
    } = this.state;

    console.log("items.value", items.value);
    
    let open: boolean = items.value.length !== 0;

    console.log("open", open);
    

    const isEmptyResult: boolean = this.state.selectedValue.length !== 0 && isEmpty;

    const { key, value, column: columnConfig } = items;
    return (
      <div key={this.id} className={theme.tabulerSuggestContainer} ref={node => this.setWrapperRef(node)} >
        <TextField
          type="text"
          label={label}
          onChange={this.onChange}
          value={this.state.selectedValue}
          theme={theme}
          loading={loading}
          disabled={disabled}
          autoComplete={false}
        />
        {open && !isEmpty && <Popover
          addArrow={false}
          componentStyle={{ maxHeight: window.outerHeight < 768 ? 500 : 800, overflow: 'auto', width: popoverWidth }}
          anchorEl={this.state.anchorEl}
          open={open}
          theme={theme}
          preferredAlignment="left"
        >
          <div  data-isparent={true} data-key={key ? key : false} className={theme.itemContainer}>
            <Table
              sorting="all"
              data={value}
              column={columnConfig}
              onRowClick={this.handleRowClick}
              rowCallbackValue="id"
              serverSort={serverSort}
              ref={node => this.setWrapperTableRef(node)}
            />
          </div>
        </Popover>}

        {
          isEmptyResult &&
            <Popover
              addArrow={false}
              componentStyle={{ maxHeight: window.outerHeight < 768 ? 500 : 800, overflow: 'auto', width: popoverWidth }}
              anchorEl={this.state.anchorEl}
              open={isEmptyResult}
              theme={theme}
              preferredAlignment="left"
            >
              <span>No options available</span>
            </Popover>
        }
      </div>
    );
  }

  private handleRowClick = (data: any) => {
    const dataId: number = data;
    const { items : { value, key }} = this.state;
    const findIndex = value.findIndex((i: any) => i.id === dataId);

    if (findIndex !== -1 && this.handleClick) {
      this.handleClick(value[findIndex], key as string);
    }
  }
}

export { TabulerSuggest as UnthemedTabulerSuggest };
export default themr(PICKER, baseTheme)(TabulerSuggest) as ThemedComponentClass<Props, {}>;
