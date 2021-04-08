import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import Button from '../Button';
import Pager from './Pager';
import PageSize from './PageSize';
// import Options from './Options';
import { default as KEYCODE } from './KeyCode';
import { default as LOCALE } from './locale/en_US';
import { polyfill } from 'react-lifecycles-compat';
import { PAGINATION } from '../ThemeIdentifiers';

import * as baseTheme from './Pagination.scss';
import Label from '../Label';
import Icon from '../Icon';
import Select from '../Select';

const MAX_PAGER_BUTTONS = 7;

interface IProps {
  disabled?: boolean;
  prefixCls?: string;
  className?: string;
  current: number;
  defaultCurrent?: number;
  total: number;
  pageSize: number;
  defaultPageSize?: number;
  onChange?(page: number, pageSize: number): void;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  showLessItems?: boolean;
  onShowSizeChange?(current: any, size: any): void;
  selectComponentClass?(): void;
  selectPrefixCls?: string;
  showPrevNextJumpers?: boolean;
  showQuickJumper?: any;
  showTitle?: boolean;
  pageSizeOptions?: any; // string[];
  showTotal?(param1: any, param2: any): any;
  locale?: any;
  style?: any;
  itemRender?(param1: any, param2: any, param3: any): any;
  prevIcon?: any;
  nextIcon?: any;
  jumpPrevIcon?: any;
  jumpNextIcon?: any;
  simple?: any;
  theme?: any;
  lazyLoading?: any;
  pageSizeList?: number[];
  fixedSize?: boolean;
  simplePagination?: boolean;
  showJumpToPage?: boolean;
}

interface IState {
  current: number;
  currentInputValue: number;
  pageSize: number;
  pageSizeList: number[];
  initialPageSize: number;
}

export const DefaultProps = {
  disabled: false,
  defaultCurrent: 1,
  current: 1,
  total: 0,
  pageSize: 10,
  defaultPageSize: 10,
  onChange: noop,
  onShowSizeChange: noop,
  className: '',
  selectPrefixCls: 'rc-select',
  prefixCls: 'rc-pagination',
  selectComponentClass: noop,
  hideOnSinglePage: false,
  showPrevNextJumpers: true,
  showQuickJumper: { goButton: true },
  showSizeChanger: true,
  showLessItems: true,
  showTitle: true,
  locale: LOCALE,
  style: {},
  itemRender: defaultItemRender,
  pageSizeOptions: [],
  showTotal: noop,
  pageSizeList: [],
  simple: false,
  lazyLoading: false,
  fixedSize: true,
  simplePagination: false,
  showJumpToPage: false
};

function noop() {}

function isInteger(value: number) {
  return (
    typeof value === 'number' && isFinite(value) && Math.floor(value) === value
  );
}

function defaultItemRender(page: any, type: any, element: any) {
  return element;
}

function calculatePage(p: any, state: any, props: IProps) {
  let pageSize = p;
  if (typeof pageSize === 'undefined') {
    pageSize = state.pageSize;
  }
  return Math.floor((props.total - 1) / pageSize) + 1;
}

class Pagination extends React.PureComponent<IProps, IState> {
  paginationNode: any;
  static defaultProps = DefaultProps;

  constructor(props: IProps) {
    super(props);

    const hasOnChange = props.onChange !== noop;
    const hasCurrent = 'current' in props;
    if (hasCurrent && !hasOnChange) {
      console.warn(
        'Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.'
      ); // eslint-disable-line
    }

    let current = props.defaultCurrent || 1;
    if ('current' in props) {
      current = props.current;
    }

    const pageSizeList: number[] =
      props.pageSizeList && props.pageSizeList.length > 0
        ? props.pageSizeList
        : [10, 50, 100];
    let pageSize = pageSizeList[0];
    pageSize = props.defaultPageSize || pageSize || 10;

    if ('pageSize' in props) {
      pageSize = props.pageSize;
    }

    current = Math.min(current, calculatePage(pageSize, undefined, props));

    this.state = {
      current,
      pageSize,
      pageSizeList,
      currentInputValue: current,
      initialPageSize: pageSize,
    };
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    // When current page change, fix focused style of prev item
    // A hacky solution of https://github.com/ant-design/ant-design/issues/8948
    const { theme } = this.props;
    if (prevState.current !== this.state.current && this.paginationNode) {
      const lastCurrentNode = this.paginationNode.querySelector(
        theme[`rc-pagination-item-${prevState.current}`]
      );
      if (lastCurrentNode && document.activeElement === lastCurrentNode) {
        lastCurrentNode.blur();
      }
    }
  }

  componentWillReceiveProps(newProps: IProps) {
    const { current } = newProps;
    if (this.props.current !== current) {
      this.setState({ current });
    }
  }

  getJumpPrevPage = () => {
    return Math.max(1, this.state.current - (this.props.showLessItems ? 3 : 5));
  }

  getJumpNextPage = () => {
    return Math.min(
      calculatePage(undefined, this.state, this.props),
      this.state.current + (this.props.showLessItems ? 3 : 5)
    );
  }

  /**
   * computed icon node that need to be rendered.
   * @param {React.ReactNode | React.PureComponentType<PaginationProps>} icon received icon.
   * @returns {React.ReactNode}
   */
  getItemIcon = (icon: any, iconType: string, disableProp?: boolean) => {
    const { theme } = this.props;
    let iconButton;

    if (iconType === 'prev') {
      iconButton = (
        <Button
          icon="chevronLeft"
          componentClass={theme.button}
          disabled={disableProp}
        />
      );
    } else if (iconType === 'next') {
      iconButton = (
        <Button
          icon="chevronRight"
          componentClass={theme.button}
          disabled={disableProp}
        />
      );
    }

    let iconNode = icon || iconButton;
    if (typeof icon === 'function') {
      iconNode = React.createElement(icon, { ...this.props });
    }
    return iconNode;
  }

  getValidValue(e: any) {
    const inputValue = e.target.value;
    const numPages = calculatePage(undefined, this.state, this.props);
    const { currentInputValue } = this.state;
    let value;
    if (inputValue === '') {
      value = inputValue;
    } else if (isNaN(Number(inputValue))) {
      value = currentInputValue;
    } else if (inputValue >= numPages) {
      value = numPages;
    } else {
      value = Number(inputValue);
    }
    return value;
  }

  savePaginationNode = (node: any) => {
    this.paginationNode = node;
  }

  isValid = (page: number) => {
    return isInteger(page) && page !== this.state.current;
  }

  shouldDisplayQuickJumper = () => {
    const { showQuickJumper, pageSize, total } = this.props;
    if (total <= pageSize) {
      return false;
    }
    return showQuickJumper;
  }

  handleKeyDown = (e: any) => {
    if (e.keyCode === KEYCODE.ARROW_UP || e.keyCode === KEYCODE.ARROW_DOWN) {
      e.preventDefault();
    }
  }

  handleKeyUp = (e: any) => {
    const value = this.getValidValue(e);
    const { currentInputValue } = this.state;
    if (value !== currentInputValue) {
      this.setState({
        currentInputValue: value,
      });
    }

    if (e.keyCode === KEYCODE.ENTER) {
      this.handleChange(value);
    } else if (e.keyCode === KEYCODE.ARROW_UP) {
      this.handleChange(value - 1);
    } else if (e.keyCode === KEYCODE.ARROW_DOWN) {
      this.handleChange(value + 1);
    }
  }

  changePageSize = (size: number) => {
    let current = this.state.current;
    const newCurrent = calculatePage(size, this.state, this.props);
    current = current > newCurrent ? newCurrent : current;
    // fix the issue:
    // Once 'total' is 0, 'current' in 'onShowSizeChange' is 0, which is not correct.
    if (newCurrent === 0) {
      current = this.state.current;
    }

    if (typeof size === 'number') {
      this.setState({
        current,
        pageSize: size,
        currentInputValue: current,
      });
    }
    if (this.props.onShowSizeChange) {
      this.props.onShowSizeChange(current || 1, size);
    }
    if (this.props.onChange) {
      this.props.onChange(current || 1, size);
    }
  }

  handleChange = (p: any) => {
    const { disabled } = this.props;

    let page = p;
    if (this.isValid(page) && !disabled) {
      const currentPage = calculatePage(undefined, this.state, this.props);
      if (page > currentPage) {
        page = currentPage;
      } else if (page < 1) {
        page = 1;
      }

      this.setState({
        current: page,
        currentInputValue: page,
      });

      const pageSize = this.state.pageSize;
      if (this.props.onChange) {
        this.props.onChange(page, pageSize);
      }
      return page;
    }

    return this.state.current;
  }

  prev = () => {
    if (this.hasPrev()) {
      this.handleChange(this.state.current - 1);
    }
  }

  next = () => {
    if (this.hasNext()) {
      this.handleChange(this.state.current + 1);
    }
  }

  jumpPrev = () => {
    this.handleChange(this.getJumpPrevPage());
  }

  jumpNext = () => {
    this.handleChange(this.getJumpNextPage());
  }

  hasPrev = () => {
    return this.state.current > 1;
  }

  hasNext = () => {
    return (
      this.state.current < calculatePage(undefined, this.state, this.props)
    );
  }

  // tslint:disable-next-line:prefer-array-literal
  runIfEnter = (event: any, callback: any, ...restParams: any) => {
    if (event.key === 'Enter' || event.charCode === 13) {
      callback(...restParams);
    }
  }

  runIfEnterPrev = (e: any) => {
    this.runIfEnter(e, this.prev);
  }

  runIfEnterNext = (e: any) => {
    this.runIfEnter(e, this.next);
  }

  runIfEnterJumpPrev = (e: any) => {
    this.runIfEnter(e, this.jumpPrev);
  }

  runIfEnterJumpNext = (e: any) => {
    this.runIfEnter(e, this.jumpNext);
  }

  handleGoTO = (e: any) => {
    if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
      this.handleChange(this.state.currentInputValue);
    }
  }

  getPageNumberOptions = (pagerList: any) => {
    const options: any = [];
    const lastKey = pagerList[pagerList.length - 1].key;
    for (let i = 1; i <= parseInt(lastKey, 10); i++) {
      options.push({
        value: i,
        label: i,
      });
    }
    return options;
  }

  getLowPageSize = () => {
    const { pageSizeList = [] } = this.state;
    let lowPageSize = 0;
    if (pageSizeList.length > 0) {
      lowPageSize = pageSizeList[0];
      pageSizeList.forEach((size) => {
        if (size < lowPageSize) {
          lowPageSize = size;
        }
      });
    }
    return lowPageSize;
  }

  loadMore = () => {
    const prevPageSize = this.state.pageSize;
    const newPageSize = prevPageSize + this.props.pageSize;

    this.setState({ pageSize: newPageSize }, () => {
      this.changePageSize(newPageSize);
    });
  }

  getDataOrAriaAttributeProps = (props: any) => {
    return Object.keys(props).reduce(
      (prev: any, key: any) => {
        if (
          key.substr(0, 5) === 'data-' ||
          key.substr(0, 5) === 'aria-' ||
          key === 'role'
        ) {
          prev[key] = (props as any)[key];
        }
        return prev;
        // tslint:disable-next-line:align
      },
      {}
    );
  }

  renderTablePagination = () => {
    const {
      style,
      showQuickJumper,
      locale,
      showTitle,
      itemRender = defaultItemRender,
      nextIcon,
      prevIcon,
      theme,
      className,
    } = this.props;

    let gotoButton = null;
    const numPages = calculatePage(undefined, this.state, this.props);
    const { current } = this.state;

    const prevPage = current - 1 > 0 ? current - 1 : 0;
    const nextPage = current + 1 < numPages ? current + 1 : numPages;

    const dataOrAriaAttributeProps = this.getDataOrAriaAttributeProps(this.props);

    const goButton = showQuickJumper && showQuickJumper.goButton;

    if (goButton) {
      if (typeof goButton === 'boolean') {
        gotoButton = (
          <button
            type="button"
            onClick={this.handleGoTO}
            onKeyUp={this.handleGoTO}
          >
            {locale.jump_to_confirm}
          </button>
        );
      } else {
        gotoButton = (
          <span onClick={this.handleGoTO} onKeyUp={this.handleGoTO}>
            {goButton}
          </span>
        );
      }
      gotoButton = (
        <li
          title={
            showTitle
              ? `${locale.jump_to}${this.state.current}/${numPages}`
              : undefined
          }
          className={theme['rc-pagination-simple-pager']}
        >
          {gotoButton}
        </li>
      );
    }

    const className1 = classNames(
      theme['rc-pagination'],
      theme['rc-pagination-simple'],
      className
    );

    const className2 = classNames(
      !this.hasPrev() && theme['rc-pagination-disabled'],
      !this.hasPrev() && theme['rc-pagination-prev']
    );

    const className3 = classNames(
      !this.hasNext() && theme['rc-pagination-disabled'],
      !this.hasPrev() && theme['rc-pagination-next']
    );

    return (
      <ul
        className={className1}
        style={style}
        ref={this.savePaginationNode}
        {...dataOrAriaAttributeProps}
      >
        <li
          title={showTitle ? locale.prev_page : undefined}
          onClick={this.prev}
          tabIndex={this.hasPrev() ? 0 : undefined}
          onKeyPress={this.runIfEnterPrev}
          className={className2}
          aria-disabled={!this.hasPrev()}
        >
          {itemRender(prevPage, 'prev', this.getItemIcon(prevIcon, 'prev'))}
        </li>
        <li
          title={showTitle ? `${this.state.current}/${numPages}` : undefined}
          className={theme['rc-pagination-simple-pager']}
        >
          <input
            type="text"
            value={this.state.currentInputValue}
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
            onChange={this.handleKeyUp}
            size={3}
          />
          <span className={theme['rc-pagination-slash']}>/</span>
          {numPages}
        </li>
        <li
          title={showTitle ? locale.next_page : null}
          onClick={this.next}
          tabIndex={this.hasPrev() ? 0 : undefined}
          onKeyPress={this.runIfEnterNext}
          className={className3}
          aria-disabled={!this.hasNext()}
        >
          {itemRender(nextPage, 'next', this.getItemIcon(nextIcon, 'next'))}
        </li>
        {gotoButton}
      </ul>
    );
  }

  getPagerRange = () => {
    const { fixedSize, showLessItems } = this.props;

    const numPages = calculatePage(undefined, this.state, this.props);
    const pageBufferSize = showLessItems ? 1 : 2;
    const { current } = this.state;

    let left = Math.max(1, current - pageBufferSize);
    let right = Math.min(current + pageBufferSize, numPages);

    const maxPageLimit = showLessItems ? MAX_PAGER_BUTTONS : MAX_PAGER_BUTTONS + 2;

    if (numPages <= maxPageLimit) {
      left = 1;
      right = numPages;

      return [left, right];
    }

    if (current - 1 <= pageBufferSize) {
      right = 1 + pageBufferSize * 2;
    }

    if (numPages - current <= pageBufferSize) {
      left = numPages - pageBufferSize * 2;
    }

    const minButtons = fixedSize ? 3 : 1;

    if (fixedSize && current < 5) {
      left = minButtons;
      right = left + 2;
    } else if (fixedSize && numPages - current < 4) {
      right = numPages - 2;
      left = right - 2;
    }

    return [left, right];
  }

  addPrevNextNavigation = (pagerList: any) => {
    const {
      showLessItems,
      locale,
      showTitle,
      itemRender = defaultItemRender,
      jumpNextIcon,
      jumpPrevIcon,
      theme,
    } = this.props;

    const numPages = calculatePage(undefined, this.state, this.props);
    const pageBufferSize = showLessItems ? 1 : 2;
    const { current } = this.state;

    let jumpPrev;
    let jumpNext;

    const prevItemTitle = showLessItems ? locale.prev_3 : locale.prev_5;
    const nextItemTitle = showLessItems ? locale.next_3 : locale.next_5;

    const className4 = classNames(
      theme['rc-pagination-jump-prev'],
      jumpPrevIcon && theme['rc-pagination-jump-prev-custom-icon']
    );

    jumpPrev = (
      <li
        title={showTitle ? prevItemTitle : null}
        key="prev"
        onClick={this.jumpPrev}
        tabIndex={0}
        onKeyPress={this.runIfEnterJumpPrev}
        className={className4}
      >
        {itemRender(
          this.getJumpPrevPage(),
          'jump-prev',
          this.getItemIcon(jumpPrevIcon, 'jump-prev')
        )}
      </li>
    );

    const className5 = classNames(
      theme['rc-pagination-jump-next'],
      jumpNextIcon && theme['rc-pagination-jump-next-custom-icon']
    );

    jumpNext = (
      <li
        title={showTitle ? nextItemTitle : null}
        key="next"
        tabIndex={0}
        onClick={this.jumpNext}
        onKeyPress={this.runIfEnterJumpNext}
        className={className5}
      >
        {itemRender(
          this.getJumpNextPage(),
          'jump-next',
          this.getItemIcon(jumpNextIcon, 'jump-next')
        )}
      </li>
    );

    if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
      pagerList[0] = React.cloneElement(pagerList[0], {
        className: theme['rc-pagination-item-after-jump-prev'],
      });
      pagerList.unshift(jumpPrev);
    }

    if (numPages - current >= pageBufferSize * 2 && current !== numPages - 2) {
      pagerList[pagerList.length - 1] = React.cloneElement(
        pagerList[pagerList.length - 1],
        {
          className: theme['rc-pagination-item-before-jump-next'],
        }
      );
      pagerList.push(jumpNext);
    }
  }

  addFirstLastNavigation = (pagerList: any) => {
    const {
      locale,
      showTitle,
      itemRender = defaultItemRender,
      theme,
    } = this.props;

    const numPages = calculatePage(undefined, this.state, this.props);
    const { current } = this.state;

    let firstPager;
    let lastPager;

    let active = false;

    active = current === 1;

    firstPager = (
      <Pager
        locale={locale}
        rootPrefixCls={theme['rc-pagination']}
        onClick={this.handleChange}
        onKeyPress={this.runIfEnter}
        key={1}
        page={1}
        active={active}
        showTitle={showTitle === true}
        itemRender={itemRender}
      />
    );

    active = current === numPages;

    lastPager = (
      <Pager
        locale={locale}
        last
        rootPrefixCls={theme['rc-pagination']}
        onClick={this.handleChange}
        onKeyPress={this.runIfEnter}
        key={numPages}
        page={numPages}
        active={active}
        showTitle={showTitle === true}
        itemRender={itemRender}
        componentStyle={{ transition: 'none' }}
      />
    );

    const [left, right] = this.getPagerRange();

    if (left !== 1) {
      pagerList.unshift(firstPager);
    }
    if (right !== numPages) {
      pagerList.push(lastPager);
    }
  }

  addSpacer = (pagerList: any, adjacent = true) => {
    const {
      locale,
      showTitle,
      itemRender = defaultItemRender,
      theme,
    } = this.props;

    const numPages = calculatePage(undefined, this.state, this.props);
    const { current } = this.state;

    if (
      Math.abs(
        parseInt(pagerList[1].key, 10) - parseInt(pagerList[0].key, 10)
      ) > 2
    ) {
      const className = classNames(theme['rc-pagination-spacer']);

      const classNameIcon = classNames(theme['rc-pagination-spacer-icon']);

      const firstDotsPager = (
        <li title="" key="spacer-first" tabIndex={-1} className={className}>
          <Icon source="horizontalDots" componentClass={classNameIcon} />
        </li>
      );

      pagerList.splice(1, 0, [firstDotsPager]);
    } else if (
      Math.abs(
        parseInt(pagerList[1].key, 10) - parseInt(pagerList[0].key, 10)
      ) === 2 &&
      adjacent
    ) {
      const active = current === 2;

      const adjacent = (
        <Pager
          locale={locale}
          last
          rootPrefixCls={theme['rc-pagination']}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={2}
          page={2}
          active={active}
          showTitle={showTitle === true}
          itemRender={itemRender}
          componentStyle={{ transition: 'none' }}
        />
      );

      pagerList.splice(1, 0, adjacent);
    }

    if (
      Math.abs(
        parseInt(pagerList[pagerList.length - 1].key, 10) -
          parseInt(pagerList[pagerList.length - 2].key, 10)
      ) > 2
    ) {
      const className = classNames(theme['rc-pagination-spacer']);

      const classNameIcon = classNames(theme['rc-pagination-spacer-icon']);

      const lastDotsPager = (
        <li title="" key="spacer-last" tabIndex={-1} className={className}>
          <Icon source="horizontalDots" componentClass={classNameIcon} />
        </li>
      );

      pagerList.splice(pagerList.length - 1, 0, [lastDotsPager]);
    } else if (
      Math.abs(
        parseInt(pagerList[pagerList.length - 1].key, 10) -
          parseInt(pagerList[pagerList.length - 2].key, 10)
      ) === 2 &&
      adjacent
    ) {
      const active = current === numPages - 1;

      const adjacent = (
        <Pager
          locale={locale}
          last
          rootPrefixCls={theme['rc-pagination']}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={numPages - 1}
          page={numPages - 1}
          active={active}
          showTitle={showTitle === true}
          itemRender={itemRender}
          componentStyle={{ transition: 'none' }}
        />
      );

      pagerList.splice(pagerList.length - 1, 0, [adjacent]);
    }
  }

  addPageButtons = (pagerList: any) => {
    const {
      locale,
      showTitle,
      itemRender = defaultItemRender,
      theme,
    } = this.props;

    const { current } = this.state;

    const [left, right] = this.getPagerRange();

    for (let i = left; i <= right; i++) {
      const active = current === i;
      pagerList.push(
        <Pager
          locale={locale}
          rootPrefixCls={theme['rc-pagination']}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={i}
          page={i}
          active={active}
          showTitle={showTitle === true}
          itemRender={itemRender}
          componentStyle={{ transition: 'none' }}
        />
      );
    }
  }

  renderSimplePagination = () => {
    const { simplePagination, pageSize, theme } = this.props;

    const { initialPageSize } = this.state;

    const numPages = calculatePage(undefined, this.state, this.props);

    if (simplePagination && numPages > 1) {
      return (
        <li className={theme['rc-pagination-simple-pagination']}>
          <Button onClick={this.loadMore}>Show More Results</Button>
        </li>
      );
    }
    if (simplePagination && numPages === 1 && initialPageSize !== pageSize) {
      return (
        <li className={theme['rc-pagination-simple-pagination']}>
          <Button
            disabled={initialPageSize !== pageSize && numPages === 1}
            onClick={this.loadMore}
          >
            Show More Results
          </Button>
        </li>
      );
    }
    return null;
  }

  renderJumpToPage = () => {

    const {
      theme,
      showLessItems,
    } = this.props;

    const { current = 1, pageSize } = this.state;

    const numPages = calculatePage(undefined, this.state, this.props);

    const maxPageLimit = showLessItems ? MAX_PAGER_BUTTONS : MAX_PAGER_BUTTONS + 2;

    if (numPages <= maxPageLimit) {
      return null;
    }

    const options: any = [...Array(numPages).keys()].map(x => ({ label: x + 1, value: x + 1 }));

    const onChange = (x: any) => {
      this.setState({
        current: parseInt(x, 10)
      },            () => {
        if (this.props.onChange) {
          this.props.onChange(parseInt(x, 10) || 1, pageSize);
        }
      });
    };

    return (
      <div className={theme['rc-pagination-jump-to-page-wrapper']}>
        <span className={theme['rc-pagination-jump-to-page-label']}>Jump to page:</span>
      <Select
        componentId="rc-pagination"
        label=""
        options={options}
        labelHidden={true}
        value={current.toString()}
        onChange={onChange}
        theme={theme}
      />
      </div>);
  }

  render() {
    const {
      className /*, disabled*/ = false,
      theme,
      simplePagination,
      showLessItems,
      showTitle,
      itemRender = defaultItemRender,
      showJumpToPage,
    } = this.props;

    // When hideOnSinglePage is true and there is only 1 page, hide the pager
    const isHideOnSinglePage =
      this.props.hideOnSinglePage && this.props.total <= this.state.pageSize;
    const isHidePageSizer = this.props.total <= this.getLowPageSize();
    if (isHidePageSizer) {
      return null;
    }

    const props: any = this.props;
    const locale = props.locale;

    const numPages = calculatePage(undefined, this.state, this.props);
    const pagerList: any = [];

    const { current, pageSize } = this.state;

    const prevPage = current - 1 > 0 ? current - 1 : 0;
    const nextPage = current + 1 < numPages ? current + 1 : numPages;

    if (!numPages) {
      pagerList.push(
        <Pager
          locale={locale}
          rootPrefixCls={theme['rc-pagination']}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key="noPager"
          page={numPages}
          className={theme['rc-pagination-disabled']}
          showTitle={showTitle === true}
          itemRender={itemRender}
          componentStyle={{ transition: 'none' }}
        />
      );
    }

    const dataOrAriaAttributeProps = this.getDataOrAriaAttributeProps(props);

    const maxPageLimit = showLessItems ? MAX_PAGER_BUTTONS : MAX_PAGER_BUTTONS + 2;

    if (props.simple) {
      return this.renderTablePagination();
    }
    if (numPages <= maxPageLimit) {
      this.addPageButtons(pagerList);
    } else {
      this.addPageButtons(pagerList);

      // showPrevNextJumpers && this.addPrevNextNavigation(pagerList);
      this.addFirstLastNavigation(pagerList);
      this.addSpacer(pagerList);
    }

    let totalText = null;

    if (props.showTotal) {
      totalText = (
        <li className={theme['rc-pagination-total-text']}>
          {props.showTotal(props.total, [
            props.total === 0 ? 0 : (current - 1) * pageSize + 1,
            current * pageSize > props.total ? props.total : current * pageSize,
          ])}
        </li>
      );
    }
    const prevDisabled = !this.hasPrev() || !numPages;
    const nextDisabled = !this.hasNext() || !numPages;
    const className6 = classNames(
      prevDisabled && theme['rc-pagination-disabled'],
      prevDisabled && theme['rc-pagination-prev']
    );

    const className7 = classNames(
      nextDisabled && theme['rc-pagination-disabled'],
      nextDisabled && theme['rc-pagination-next']
    );

    return (
      <ul
        className={classNames(theme['rc-pagination'], className)}
        style={props.style}
        unselectable="unselectable"
        ref={this.savePaginationNode}
        {...dataOrAriaAttributeProps}
      >
        {!isHideOnSinglePage && !simplePagination && (
          <>
            {totalText}
            <li
              title={props.showTitle ? locale.prev_page : null}
              onClick={this.prev}
              tabIndex={prevDisabled ? undefined : 0}
              onKeyPress={this.runIfEnterPrev}
              className={className6}
              aria-disabled={prevDisabled}
            >
              {props.itemRender(
                prevPage,
                'prev',
                this.getItemIcon(props.prevIcon, 'prev', prevDisabled)
              )}
            </li>
            {pagerList}
            <li
              title={props.showTitle ? locale.next_page : null}
              onClick={this.next}
              tabIndex={nextDisabled ? undefined : 0}
              onKeyPress={this.runIfEnterNext}
              className={className7}
              aria-disabled={nextDisabled}
            >
              {props.itemRender(
                nextPage,
                'next',
                this.getItemIcon(props.nextIcon, 'next', nextDisabled)
              )}
            </li>
          </>
        )}

        {!simplePagination && showJumpToPage && this.renderJumpToPage()}

        {!simplePagination && (
          <li className={theme.ItemPerPage}>
            <Label componentId={'rc-pagination'}>Items per page: </Label>
            <PageSize
              onKeyPress={() => {}}
              currentPageSize={this.state.pageSize}
              onClick={(currentPageSize: number) =>
                this.setState({ pageSize: currentPageSize }, () => {
                  this.changePageSize(currentPageSize);
                })
              }
              pageSizeList={this.state.pageSizeList}
              className="cl"
            />{' '}
          </li>
        )}

        {this.renderSimplePagination()}
      </ul>
    );
  }
}

polyfill(Pagination);

export default themr(
  PAGINATION,
  baseTheme
)(Pagination) as ThemedComponentClass<IProps, IState>;
