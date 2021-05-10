import * as React from 'react';
import Item from './Item';
import compareObjects from './compareObjects';

export interface Props {
  items: any[];
  itemProps?: any;
  renderItem(): void;
  renderItemData: object;
  sectionIndex?: number;
  highlightedItemIndex?: number;
  onHighlightedItemChange(highlightedItem: any): void;
  getItemId(sectionIndex: any, itemIndex: any): void;
  theme(): void;
  keyPrefix: string;
}

export interface State {
}

export default class ItemsList extends React.Component<Props, State> {
  static defaultProps = {
    sectionIndex: null,
  };

  shouldComponentUpdate(nextProps: any) {
    return compareObjects(nextProps, this.props, ['itemProps']);
  }

  storeHighlightedItemReference = (highlightedItem: any) => {
    (this as any).props.onHighlightedItemChange(
      highlightedItem === null ? null : highlightedItem.item
    );
  }

  render() {
    const {
      items,
      itemProps,
      renderItem,
      renderItemData,
      sectionIndex,
      highlightedItemIndex,
      getItemId,
      theme,
      keyPrefix,
    } = (this as any).props;
    const sectionPrefix =
      sectionIndex === null
        ? keyPrefix
        : `${keyPrefix}section-${sectionIndex}-`;
    const isItemPropsFunction = typeof itemProps === 'function';

    return (
      <ul role="listbox" {...theme(`${sectionPrefix}items-list`, 'itemsList')}>
        {items.map((item: any, itemIndex: any) => {
          const isFirst = itemIndex === 0;
          const isHighlighted = itemIndex === highlightedItemIndex;
          const itemKey = `${sectionPrefix}item-${itemIndex}`;
          const itemPropsObj = isItemPropsFunction
            ? itemProps({ sectionIndex, itemIndex })
            : itemProps;
          const allItemProps = {
            id: getItemId(sectionIndex, itemIndex),
            'aria-selected': isHighlighted,
            ...theme(
              itemKey,
              'item',
              isFirst && 'itemFirst',
              isHighlighted && 'itemHighlighted'
            ),
            ...itemPropsObj,
          };

          if (isHighlighted) {
            allItemProps.ref = this.storeHighlightedItemReference;
          }

          // `key` is provided by theme()
          /* eslint-disable react/jsx-key */
          return (
            <Item
              {...allItemProps}
              sectionIndex={sectionIndex}
              isHighlighted={isHighlighted}
              itemIndex={itemIndex}
              item={item}
              renderItem={renderItem}
              renderItemData={renderItemData}
            />
          );
          /* eslint-enable react/jsx-key */
        })}
      </ul>
    );
  }
}
