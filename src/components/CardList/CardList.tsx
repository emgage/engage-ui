import * as React from 'react';
import Item from './Item';

export interface INodeItem {
  id: number,
  name: string,
  people?: INodeItem[],
}

export interface Props {
  data: INodeItem[],
  selectedId?: number,
}

class CardList extends React.Component<Props, never> {

  render() {

    const nodes = this.props.data.map((person: INodeItem, index: number) => {
      return (
        <Item key={person.id || index}
          node={person}
          children={person.people}
          selectedId={this.props.selectedId} />
      );
    });

//indentation is not proper for List Component, So used <ul />, SO need to replace it with List.
    return <div>
      <ul>
        {nodes}
      </ul>
    </div>;
  }
}

export default CardList;
