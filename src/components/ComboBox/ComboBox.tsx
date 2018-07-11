import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { COMBOBOX } from '../ThemeIdentifiers';
import ComboBoxItem from './ComboBoxItem';
import TextField from '../TextField';
import Popover from '../Popover';
import * as baseTheme from './ComboBox.scss';

export type Mode = 'collapsible' | 'multiple';

export interface ComboBoxProps {
  type? : string;
  key?: string;
  value: any;
}

export interface Props {
  items: ComboBoxProps[];
  label: string;
  style?:any;
}

interface State {
  open: boolean;
  items: ComboBoxProps[];
  initialItems: ComboBoxProps[];
  anchorEl?: HTMLElement | null;
  value: string;
}

class ComboBox extends React.Component<Props, State> {
  private getUniqueID = createUniqueIDFactory('ComboBox');
  private id = this.getUniqueID();

  constructor(props: Props) {
    super(props);

    this.state = {
      open: false,
      items: props.items,
      initialItems: JSON.parse(JSON.stringify(props.items)),
      value: '',
    };
  }

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
      value,
      items: newItems,
    });
  }

  onFocus = (event: React.FormEvent<HTMLElement>) => {
    this.setState({
      open: true,
      anchorEl: event.target as HTMLElement
    });
  }

  handleClick = (value: string) => {
    this.setState({ value, open: false });
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
      <div key={this.id}>
        <TextField
          label={label}
          onChange={this.onChange}
          onFocus={this.onFocus}
          value={this.state.value}
        />
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
