import * as React from 'react';
import Card from '../Card';
import { INodeItem } from './CardList';

export interface Props {
  node: INodeItem,
  selectedId?: number,
  onToggle?(): void,
  onSelect?(): void,
}

export interface State {
  isToggled: boolean,
}

class Item extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      isToggled: false,
    };
  }

  onSelect = () => {
    alert('Id =' + this.props.node.id + ' ' + 'Name =' + this.props.node.name);
  }

  onToggle = () => {
    const isToggled = !this.state.isToggled;
    this.setState(() => ({
      isToggled,
    }));
  }

  render() {

    let childnodes = null;
    let style: React.CSSProperties = {};
    let expandOrCollapse: string;

    const cardActions = [{ content: 'Select', onAction: this.onSelect }];
    const children = this.props.node.people;
    const collapseStyle: React.CSSProperties = { fontSize: '20px', color: 'green' };
    const expandStyle: React.CSSProperties = { fontSize: '25px', color: 'red' };

    if (this.state.isToggled) {
      style = {
        display: 'block',
      };
      expandOrCollapse = '-';
    } else {
      style = {
        display: 'none',
      };
      expandOrCollapse = '+';
    }

    if (children) {
      childnodes = children.map((childnode: INodeItem, index: number): React.ReactNode => {
        return (
          <Item key={childnode.id || index}
            node={childnode}
            children={childnode.people}
            selectedId={this.props.selectedId} />
        );
      });
    }

    //indentation is not proper for List Component, So used <ul />, SO need to replace it with List.
    return (
      <ul key={this.props.node.id}>
        <span>
          <Card title={this.props.node.name}  actions={cardActions}>
            {childnodes ?  <a style={this.state.isToggled ? expandStyle : collapseStyle} onClick={this.onToggle}>{expandOrCollapse}</a> : null}
          </Card>
        </span>
        {childnodes ?
          <span style={style}><Card><ul>{childnodes} </ul></Card></span>
          : null}
      </ul>
    );
  }
}

export default Item;
