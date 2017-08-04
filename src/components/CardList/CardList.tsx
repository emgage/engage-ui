import * as React from 'react';
import Item from './Item';
import List from '../List';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { CARDLIST } from '../ThemeIdentifiers';
import * as baseTheme from './CardList.scss';

export interface INodeItem {
  id: number;
  name: string;
  people?: INodeItem[];
}

export interface Props {
  data: INodeItem[];
  selectedId?: number;
  theme?: any;
}

class CardList extends React.Component<Props, never> {

  render() {

    const nodes = this.props.data.map((person: INodeItem, index: number) => {
      return (
        <Item
          key={person.id || index}
          node={person}
          children={person.people}
          selectedId={this.props.selectedId}
        />
      );
    });

    return (
      <div>
        <List>
          {nodes}
        </List>
      </div>
    );
  }
}

export default themr(CARDLIST, baseTheme)(CardList) as ThemedComponentClass<Props, {}>;
