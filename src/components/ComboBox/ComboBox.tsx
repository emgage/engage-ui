import * as React from 'react';
import { themr } from '@friendsofreactjs/react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { COMBOBOX } from '../ThemeIdentifiers';
import ComboBoxItem from './ComboBoxItem';
import Icon from '../Icon';
import TextField from '../TextField';
import Popover from '../Popover';
import arrowSvg from './icons/arrow.svg';
import * as baseTheme from './ComboBox.scss';

export type Mode = 'collapsible' | 'multiple';
export type ItemType = 'Accordian';

export interface ComboBoxItemProps {
  type?: ItemType;
  key?: string;
  value: any;
  renderer?(value: any, type?: string): React.ReactElement<any>;
}

export interface Props {
  currentValue?: string;
  items: ComboBoxItemProps[];
  label: string;
  style?:any;
  onSelect?(item: any): void;
}

interface State {
  open: boolean;
  items: ComboBoxItemProps[];
  initialItems: ComboBoxItemProps[];
  anchorEl?: HTMLElement | null;
  selectedValue: string;
}

class ComboBox extends React.Component<Props, State> {
  private getUniqueID = createUniqueIDFactory('ComboBox');
  private id = this.getUniqueID();

  constructor(props: Props) {
    super(props);

    const { items, currentValue = '' } = props;

    this.state = {
      items,
      open: false,
      // In case use is searching something, and then removes its search text, combobox shud list the initialItem
      // Therefore, keeping copy of it so that its not lose, as items is changed depending on search and selection.
      initialItems: this.addRenderer(items, JSON.parse(JSON.stringify(items))),
      selectedValue: '' || currentValue,
    };
  }

  addRenderer = (items: any , cloneItems: any) => {
    items.forEach((item: any, index: number) => {
      if (item.renderer) {
        cloneItems[index]['renderer'] = item.renderer;
      }
    });

    return cloneItems;
  }

  /*
     on Change of combobox item, cloning the initial Items which was added to combobox,
     and then search the value on those items, and list it in popover.
     In case if its Accordian, then check for values with key specified and filter them out.
  */

  onChange = (value: string) => {
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
      selectedValue: value,
      items: newItems,
      open: value && value !== '' ? true : false // open the popover only if there is some value on search text.
    });
  }

  onArrowClick = (event: React.FormEvent<HTMLElement>) => {
    this.setState({
      open: !this.state.open,
      anchorEl: event.target as HTMLElement
    });
  }

  handleClick = (value: string | any, key: any) => {
    if (this.props.onSelect) {
      this.props.onSelect(value);
    }

    this.setState({ selectedValue: typeof(value) === 'object' ? value[key] : value, open: false });
  }

  render() {
    const {
      label
    } = this.props;

    const {
      open,
      items
    } = this.state;

    const itemsComponent = items.map((item, index) =>
        <ComboBoxItem
          key={index}
          item={item}
          clickHandler={this.handleClick}
        />
      );

    return (
      <div key={this.id} className={baseTheme.comboboxContainer}>
        <TextField
          label={label}
          onChange={this.onChange}
          value={this.state.selectedValue}
        />

        <div className={baseTheme.comboboxArrow} onClick={this.onArrowClick}>
          <Icon source={arrowSvg} />
        </div>

        {open && <Popover
          style={{ background: '#dcdcdc', width: '100%', padding: '10px 100px' }}
          active={this.state.open}
          anchorEl={this.state.anchorEl}>
            {itemsComponent}
        </Popover>}
      </div>
    );
  }
}

export { ComboBox as UnthemedComboBox };
export default themr(COMBOBOX, baseTheme)(ComboBox);
