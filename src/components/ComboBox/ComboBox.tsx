import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { COMBOBOX } from '../ThemeIdentifiers';
import ComboBoxItem from './ComboBoxItem';
import Icon from '../Icon';
import TextField from '../TextField';
import Popover from '../Popover';
import arrowSvg from './icons/arrow.svg';
import * as baseTheme from './ComboBox.scss';

export type Mode = 'collapsible' | 'multiple';

export interface ComboBoxItemProps {
  type? : "Accordian" | undefined; 
  key?: string;
  value: any;
}

export interface Props {
  items: ComboBoxItemProps[];
  label: string;
  style?:any;
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

    this.state = {
      open: false,
      items: props.items,
      // In case use is searching something, and then removes its search text, combobox shud list the initialItem
      // Therefore, keeping copy of it so that its not lose, as items is changed depending on search and selection.
      initialItems: JSON.parse(JSON.stringify(props.items)), 
      selectedValue: '',
    };
  }

  /*
     on Change of combobox item, cloning the initial Items which was added to combobox,
     and then search the value on those items, and list it in popover.
     In case if its Accordian, then check for values with key specified and filter them out.
  */

  onChange = (value: string) => {
    let newItems = this.state.initialItems;
    if (value && value !== '') {
      const cloneItems = JSON.parse(JSON.stringify(this.state.initialItems));
      newItems = cloneItems.map((it: any) => {
        const itemValues = it.value;
        const key = it.key;
        let data;
        if (it.type === 'Accordian') {
          data = itemValues.map((itv: any) => {
            itv.children = itv.children.filter((child: any) => {
              const flag = key ? (child[key].includes(value)) : child.includes(value);
              return flag;
            });
            return itv;
          });
        } else {
          data = itemValues.filter((itv: any) => {
            const flag = key ? (itv[key].includes(value)) : itv.includes(value);
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

  handleClick = (value: string) => {
    this.setState({ selectedValue: value, open: false });
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
export default themr(COMBOBOX, baseTheme)(ComboBox) as ThemedComponentClass<Props, {}>;
