import * as React from 'react';
import SectionTitle from './SectionTitle';
import ItemList from './ItemList';
const createSectionIterator = require('section-iterator');
const themeable = require('react-themeable');

const emptyObject = {};
const defaultRenderInputComponent = (props: any) => <input {...props} />;
const defaultRenderItemsContainer = ({ containerProps, children }: any) => (
  <div {...containerProps}>{children}</div>
);
const defaultTheme = {
  container: 'react-autowhatever__container',
  containerOpen: 'react-autowhatever__container--open',
  input: 'react-autowhatever__input',
  inputOpen: 'react-autowhatever__input--open',
  inputFocused: 'react-autowhatever__input--focused',
  itemsContainer: 'react-autowhatever__items-container',
  itemsContainerOpen: 'react-autowhatever__items-container--open',
  itemsList: 'react-autowhatever__items-list',
  item: 'react-autowhatever__item',
  itemFirst: 'react-autowhatever__item--first',
  itemHighlighted: 'react-autowhatever__item--highlighted',
  sectionContainer: 'react-autowhatever__section-container',
  sectionContainerFirst: 'react-autowhatever__section-container--first',
  sectionTitle: 'react-autowhatever__section-title',
};

export interface Props {
  id?: string; // Used in aria-* attributes. If multiple Autowhatever's are rendered on a page, they must have unique ids.
  multiSection?: boolean; // Indicates whether a multi section layout should be rendered.
  renderInputComponent?(): void; // When specified, it is used to render the input element.
  renderItemsContainer?(props: any): void; // Renders the items container.
  items: any[]; // Array of items or sections to render.
  renderItem?(): void; // This function renders a single item.
  renderItemData?: object; // Arbitrary data that will be passed to renderItem()
  renderSectionTitle?(): void; // This function gets a section and renders its title.
  getSectionItems?(): void; // This function gets a section and returns its items, which will be passed into `renderItem` for rendering.
  containerProps?: object; // Arbitrary container props
  inputProps?: object; // Arbitrary input props
  itemProps?: any; // Arbitrary item props
  highlightedSectionIndex?: number; // Section index of the highlighted item
  highlightedItemIndex?: number; // Highlighted item index (within a section)
  theme?: any; // Styles. See: https://github.com/markdalgleish/react-themeable
}
export interface State {
}

export default class Autowhatever extends React.Component<Props, State>  {
  static defaultProps = {
    id: '1',
    multiSection: false,
    renderInputComponent: defaultRenderInputComponent,
    renderItemsContainer: defaultRenderItemsContainer,
    renderItem: () => {
      throw new Error('`renderItem` must be provided');
    },
    renderItemData: emptyObject,
    renderSectionTitle: () => {
      throw new Error('`renderSectionTitle` must be provided');
    },
    getSectionItems: () => {
      throw new Error('`getSectionItems` must be provided');
    },
    containerProps: emptyObject,
    inputProps: emptyObject,
    itemProps: emptyObject,
    highlightedSectionIndex: null,
    highlightedItemIndex: null,
    theme: defaultTheme,
  };
  highlightedItem: null;
  sectionsItems: any;
  sectionsLengths: any;
  allSectionsAreEmpty: any;
  sectionIterator: any;
  theme: any;
  input: any;
  itemsContainer: any;
  storeItemsListReference: any;

  constructor(props: any) {
    super(props);

    this.highlightedItem = null;

    this.state = {
      isInputFocused: false,
    };

    this.setSectionsItems(props);
    this.setSectionIterator(props);
    this.setTheme(props);
  }

  componentDidMount() {
    this.ensureHighlightedItemIsVisible();
  }

  // tslint:disable-next-line:function-name
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (nextProps.items !== (this as any).props.items) {
      this.setSectionsItems(nextProps);
    }

    if (
      nextProps.items !== (this as any).props.items ||
      nextProps.multiSection !== (this as any).props.multiSection
    ) {
      this.setSectionIterator(nextProps);
    }

    if (nextProps.theme !== (this as any).props.theme) {
      this.setTheme(nextProps);
    }
  }

  componentDidUpdate() {
    this.ensureHighlightedItemIsVisible();
  }

  setSectionsItems(props: any) {
    if (props.multiSection) {
      this.sectionsItems = props.items.map((section: any) =>
        props.getSectionItems(section)
      );
      this.sectionsLengths = this.sectionsItems.map((items: any) => items.length);
      this.allSectionsAreEmpty = this.sectionsLengths.every(
        (itemsCount: any) => itemsCount === 0
      );
    }
  }

  setSectionIterator(props: any) {
    this.sectionIterator = createSectionIterator({
      multiSection: props.multiSection,
      data: props.multiSection ? this.sectionsLengths : props.items.length,
    });
  }

  setTheme(props: any) {
    this.theme = themeable(props.theme);
  }

  storeInputReference = (input: any) => {
    if (input !== null) {
      this.input = input;
    }

    const userRef = (this as any).props.inputProps.ref;

    if (userRef) {
      if (typeof userRef === 'function') {
        userRef(input);
      } else if (
        typeof userRef === 'object' &&
        Object.prototype.hasOwnProperty.call(userRef, 'current')
      ) {
        userRef.current = input;
      }
    }
  }

  storeItemsContainerReference = (itemsContainer: any) => {
    if (itemsContainer !== null) {
      this.itemsContainer = itemsContainer;
    }
  }

  onHighlightedItemChange = (highlightedItem: any) => {
    this.highlightedItem = highlightedItem;
  }

  getItemId = (sectionIndex: any, itemIndex: any) => {
    if (itemIndex === null) {
      return null;
    }

    const { id } = (this as any).props;
    const section = sectionIndex === null ? '' : `section-${sectionIndex}`;

    return `react-autowhatever-${id}-${section}-item-${itemIndex}`;
  }

  renderSections() {
    if (this.allSectionsAreEmpty) {
      return null;
    }

    const { theme } = this;
    const {
      id,
      items,
      renderItem,
      renderItemData,
      renderSectionTitle,
      highlightedSectionIndex,
      highlightedItemIndex,
      itemProps,
    } : any = this.props;

    return items.map((section: any, sectionIndex: any) => {
      const keyPrefix = `react-autowhatever-${id}-`;
      const sectionKeyPrefix = `${keyPrefix}section-${sectionIndex}-`;
      const isFirstSection = sectionIndex === 0;

      // `key` is provided by theme()
      /* eslint-disable react/jsx-key */
      return (
        <div
          {...theme(
            `${sectionKeyPrefix}container`,
            'sectionContainer',
            isFirstSection && 'sectionContainerFirst'
          )}
        >
          <SectionTitle
            section={section}
            renderSectionTitle={renderSectionTitle}
            theme={theme}
            sectionKeyPrefix={sectionKeyPrefix}
          />
          <ItemList
            items={this.sectionsItems[sectionIndex]}
            itemProps={itemProps}
            renderItem={renderItem}
            renderItemData={renderItemData}
            sectionIndex={sectionIndex}
            highlightedItemIndex={
              highlightedSectionIndex === sectionIndex
                ? highlightedItemIndex
                : null
            }
            onHighlightedItemChange={this.onHighlightedItemChange}
            getItemId={this.getItemId}
            theme={theme}
            keyPrefix={keyPrefix}
            ref={this.storeItemsListReference}
          />
        </div>
      );
      /* eslint-enable react/jsx-key */
    });
  }

  renderItems() {
    const { items } = (this as any).props;

    if (items.length === 0) {
      return null;
    }

    const { theme } = this;
    const {
      id,
      renderItem,
      renderItemData,
      highlightedSectionIndex,
      highlightedItemIndex,
      itemProps,
    } = (this as any).props;

    return (
      <ItemList
        items={items}
        itemProps={itemProps}
        renderItem={renderItem}
        renderItemData={renderItemData}
        highlightedItemIndex={
          highlightedSectionIndex === null ? highlightedItemIndex : null
        }
        onHighlightedItemChange={this.onHighlightedItemChange}
        getItemId={this.getItemId}
        theme={theme}
        keyPrefix={`react-autowhatever-${id}-`}
      />
    );
  }

  onFocus = (event: any) => {
    const { inputProps } = (this as any).props;

    this.setState({
      isInputFocused: true,
    });

    inputProps.onFocus && inputProps.onFocus(event);
  }

  onBlur = (event: any) => {
    const { inputProps } = (this as any).props;

    this.setState({
      isInputFocused: false,
    });

    inputProps.onBlur && inputProps.onBlur(event);
  }

  onKeyDown = (event: any) => {
    const {
      inputProps,
      highlightedSectionIndex,
      highlightedItemIndex,
    } = (this as any).props;
    const { keyCode } = event;

    switch (keyCode) {
      case 40: // ArrowDown
      case 38: {
        // ArrowUp
        const nextPrev = keyCode === 40 ? 'next' : 'prev';
        const [
          newHighlightedSectionIndex,
          newHighlightedItemIndex,
        ] = this.sectionIterator[nextPrev]([
          highlightedSectionIndex,
          highlightedItemIndex,
        ]);

        inputProps.onKeyDown(event, {
          newHighlightedSectionIndex,
          newHighlightedItemIndex,
        });
        break;
      }

      default:
        inputProps.onKeyDown(event, {
          highlightedSectionIndex,
          highlightedItemIndex,
        });
    }
  }

  ensureHighlightedItemIsVisible() {
    const { highlightedItem } = (this as any);

    if (!highlightedItem) {
      return;
    }

    const { itemsContainer } = this;
    const itemOffsetRelativeToContainer =
      highlightedItem.offsetParent === itemsContainer
        ? highlightedItem.offsetTop
        : highlightedItem.offsetTop - itemsContainer.offsetTop;

    let { scrollTop } = itemsContainer; // Top of the visible area

    if (itemOffsetRelativeToContainer < scrollTop) {
      // Item is off the top of the visible area
      scrollTop = itemOffsetRelativeToContainer;
    } else if (
      itemOffsetRelativeToContainer + highlightedItem.offsetHeight >
      scrollTop + itemsContainer.offsetHeight
    ) {
      // Item is off the bottom of the visible area
      scrollTop =
        itemOffsetRelativeToContainer +
        highlightedItem.offsetHeight -
        itemsContainer.offsetHeight;
    }

    if (scrollTop !== itemsContainer.scrollTop) {
      itemsContainer.scrollTop = scrollTop;
    }
  }

  render() {
    const { theme } = this;
    const {
      id,
      multiSection,
      renderInputComponent,
      renderItemsContainer,
      highlightedSectionIndex,
      highlightedItemIndex,
    } = (this as any).props;
    const { isInputFocused } = (this as any).state;
    const renderedItems = multiSection
      ? this.renderSections()
      : this.renderItems();
    const isOpen = renderedItems !== null;
    const ariaActivedescendant = this.getItemId(
      highlightedSectionIndex,
      highlightedItemIndex
    );
    const itemsContainerId = `react-autowhatever-${id}`;
    const containerProps = {
      role: 'combobox',
      'aria-haspopup': 'listbox',
      'aria-owns': itemsContainerId,
      'aria-expanded': isOpen,
      ...theme(
        `react-autowhatever-${id}-container`,
        'container',
        isOpen && 'containerOpen'
      ),
      ...(this as any).props.containerProps,
    };
    const inputComponent = renderInputComponent({
      type: 'text',
      value: '',
      autoComplete: 'off',
      'aria-autocomplete': 'list',
      'aria-controls': itemsContainerId,
      'aria-activedescendant': ariaActivedescendant,
      ...theme(
        `react-autowhatever-${id}-input`,
        'input',
        isOpen && 'inputOpen',
        isInputFocused && 'inputFocused'
      ),
      ...(this as any).props.inputProps,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onKeyDown: (this as any).props.inputProps.onKeyDown && this.onKeyDown,
      ref: this.storeInputReference,
    });
    const itemsContainer = renderItemsContainer({
      containerProps: {
        id: itemsContainerId,
        role: 'listbox',
        ...theme(
          `react-autowhatever-${id}-items-container`,
          'itemsContainer',
          isOpen && 'itemsContainerOpen'
        ),
        ref: this.storeItemsContainerReference,
      },
      children: renderedItems,
    });

    return (
      <div {...containerProps}>
        {inputComponent}
        {itemsContainer}
      </div>
    );
  }
}
