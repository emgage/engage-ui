import * as React from 'react';
import compareObjects from './compareObjects';

export interface Props {
  sectionIndex?: number;
  isHighlighted: boolean;
  itemIndex: number;
  item: any;
  renderItem(): void;
  renderItemData: object;
  onMouseEnter?(): void;
  onMouseLeave?(): void;
  onMouseDown?(): void;
  onClick?(): void;
}

export interface State {
}

export default class Item extends React.Component<Props, State> {

  item: any;

  shouldComponentUpdate(nextProps: any) {
    return compareObjects(nextProps, this.props, ['renderItemData']);
  }

  storeItemReference = (item: any) => {
    if (item !== null) {
      this.item = item;
    }
  }

  onMouseEnter = (event: any) => {
    const { sectionIndex, itemIndex } = (this as any).props;

    (this as any).props.onMouseEnter(event, { sectionIndex, itemIndex });
  }

  onMouseLeave = (event: any) => {
    const { sectionIndex, itemIndex } = (this as any).props;

    (this as any).props.onMouseLeave(event, { sectionIndex, itemIndex });
  }

  onMouseDown = (event: any) => {
    const { sectionIndex, itemIndex } = (this as any).props;

    (this as any).props.onMouseDown(event, { sectionIndex, itemIndex });
  }

  onClick = (event: any) => {
    const { sectionIndex, itemIndex } = (this as any).props;

    (this as any).props.onClick(event, { sectionIndex, itemIndex });
  }

  render() {
    const {
      isHighlighted,
      item,
      renderItem,
      renderItemData,
      ...restProps
    } = (this as any).props;

    delete restProps.sectionIndex;
    delete restProps.itemIndex;

    if (typeof restProps.onMouseEnter === 'function') {
      restProps.onMouseEnter = this.onMouseEnter;
    }

    if (typeof restProps.onMouseLeave === 'function') {
      restProps.onMouseLeave = this.onMouseLeave;
    }

    if (typeof restProps.onMouseDown === 'function') {
      restProps.onMouseDown = this.onMouseDown;
    }

    if (typeof restProps.onClick === 'function') {
      restProps.onClick = this.onClick;
    }

    return (
      <li role="option" {...restProps} ref={this.storeItemReference}>
        {renderItem(item, { isHighlighted, ...renderItemData })}
      </li>
    );
  }
}
