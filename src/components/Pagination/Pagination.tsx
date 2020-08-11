import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import Button from '../Button';
import Pager from './Pager';
import PageSize from './PageSize';
import Options from './Options';
import { default as KEYCODE }  from './KeyCode';
import { default as LOCALE } from './locale/en_US';
import { polyfill } from 'react-lifecycles-compat';
import { PAGINATION } from '../ThemeIdentifiers';

import * as baseTheme from './Pagination.scss';
import Label from '../Label';

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
  pageSizeList?: number[];
  lazyLoading?: boolean;
}

interface IState {
  current: number;
  currentInputValue: number;
  pageSize: number;
  pageSizeList: number[];
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
  showQuickJumper: { goButton : true },
  showSizeChanger: true,
  showLessItems: true,
  showTitle: true,
  locale: LOCALE,
  style: {},
  itemRender: defaultItemRender,
  pageSizeOptions: [],
  showTotal: noop,
  pageSizeList: [],
  lazyLoading: false
};

function noop() {
}

function isInteger(value: number) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
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
    const hasCurrent = ('current' in props);
    if (hasCurrent && !hasOnChange) {
      console.warn('Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.'); // eslint-disable-line
    }

    let current = props.defaultCurrent || 1;
    if ('current' in props) {
      current = props.current;
    }

    let pageSize = props.defaultPageSize || 10;
    if ('pageSize' in props) {
      pageSize = props.pageSize;
    }

    const pageSizeList: number[] = props.pageSizeList && props.pageSizeList.length > 0 ? props.pageSizeList  : [10, 50, 100];
    pageSize = pageSizeList[0];

    current = Math.min(current, calculatePage(pageSize, undefined, props));

    this.state = {
      current,
      pageSize,
      pageSizeList,
      currentInputValue: current,
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
      iconButton = <Button icon="chevronLeft" componentClass={theme.button} disabled={disableProp} />;
    } else if (iconType === 'next') {
      iconButton = <Button icon="chevronRight" componentClass={theme.button} disabled={disableProp} />;
    }

    let iconNode = icon || iconButton;
    if (typeof icon === 'function') {
      iconNode = React.createElement(icon, { ...this.props });
    }
    return iconNode;
  }

  getValidValue(e: any) {
    const inputValue = e.target.value;
    const allPages = calculatePage(undefined, this.state, this.props);
    const { currentInputValue } = this.state;
    let value;
    if (inputValue === '') {
      value = inputValue;
    } else if (isNaN(Number(inputValue))) {
      value = currentInputValue;
    } else if (inputValue >= allPages) {
      value = allPages;
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
      this.props.onShowSizeChange(current, size);
    }
    if (this.props.onChange) {
      this.props.onChange(current, size);
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
    return this.state.current < calculatePage(undefined, this.state, this.props);
  }

  // tslint:disable-next-line:prefer-array-literal
  runIfEnter = (event: any, callback: any, ...restParams: Array<any>) => {
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
        label: i
      });
    }
    return options;
  }

  render() {
    const { className, disabled = false, theme, lazyLoading } = this.props;

    // When hideOnSinglePage is true and there is only 1 page, hide the pager
    if (this.props.hideOnSinglePage && this.props.total <= this.state.pageSize) {
      return null;
    }

    const props: any = this.props;
    const locale = props.locale;

    const allPages = calculatePage(undefined, this.state, this.props);
    const pagerList: any = [];
    let jumpPrev = null;
    let jumpNext = null;
    let firstPager = null;
    let lastPager = null;
    let gotoButton = null;

    const goButton = (props.showQuickJumper && props.showQuickJumper.goButton);
    const pageBufferSize = props.showLessItems ? 1 : 2;
    const { current, pageSize } = this.state;

    const prevPage = current - 1 > 0 ? current - 1 : 0;
    const nextPage = current + 1 < allPages ? current + 1 : allPages;

    const dataOrAriaAttributeProps = Object.keys(props).reduce((prev: any, key: any) => {
      if ((key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role')) {
        prev[key] = props[key];
      }
      return prev;
    // tslint:disable-next-line:align
    }, {});

    if (props.simple) {
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
            <span
              onClick={this.handleGoTO}
              onKeyUp={this.handleGoTO}
            >{goButton}</span>
          );
        }
        gotoButton = (
          <li
            title={props.showTitle ? `${locale.jump_to}${this.state.current}/${allPages}` : undefined}
            className={theme['rc-pagination-simple-pager']}
          >
            {gotoButton}
          </li>
        );
      }

      const className1 = classNames(
        theme['rc-pagination'],
        theme['rc-pagination-simple'],
        props.className
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
          style={props.style}
          ref={this.savePaginationNode}
          {...dataOrAriaAttributeProps}
        >
          <li
            title={props.showTitle ? locale.prev_page : undefined}
            onClick={this.prev}
            tabIndex={this.hasPrev() ? 0 : undefined}
            onKeyPress={this.runIfEnterPrev}
            className={className2}
            aria-disabled={!this.hasPrev()}
          >
            {props.itemRender(prevPage, 'prev', this.getItemIcon(props.prevIcon, 'prev'))}
          </li>
          <li
            title={props.showTitle ? `${this.state.current}/${allPages}` : undefined}
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
            {allPages}
          </li>
          <li
            title={props.showTitle ? locale.next_page : null}
            onClick={this.next}
            tabIndex={this.hasPrev() ? 0 : undefined}
            onKeyPress={this.runIfEnterNext}
            className={className3}
            aria-disabled={!this.hasNext()}
          >
            {props.itemRender(nextPage, 'next', this.getItemIcon(props.nextIcon, 'next'))}
          </li>
          {gotoButton}
        </ul>
      );
    }

    if (allPages <= 5 + pageBufferSize * 2) {
      const pagerProps = {
        locale,
        rootPrefixCls: theme['rc-pagination'],
        onClick: this.handleChange,
        onKeyPress: this.runIfEnter,
        showTitle: props.showTitle,
        itemRender: props.itemRender,
      };
      if (!allPages) {
        pagerList.push(
          <Pager
            {...pagerProps}
            key="noPager"
            page={allPages}
            className={theme['rc-pagination-disabled']}
          />
        );
      }
      for (let i = 1; i <= allPages; i++) {
        const active = this.state.current === i;
        pagerList.push(
          <Pager
            {...pagerProps}
            key={i}
            page={i}
            active={active}
          />
        );
      }
    } else {
      const prevItemTitle = props.showLessItems ? locale.prev_3 : locale.prev_5;
      const nextItemTitle = props.showLessItems ? locale.next_3 : locale.next_5;
      if (props.showPrevNextJumpers) {
        const className4 = classNames(
          theme['rc-pagination-jump-prev'],
          props.jumpPrevIcon && theme['rc-pagination-jump-prev-custom-icon']
        );

        jumpPrev = (
          <li
            title={props.showTitle ? prevItemTitle : null}
            key="prev"
            onClick={this.jumpPrev}
            tabIndex={0}
            onKeyPress={this.runIfEnterJumpPrev}
            className={className4}
          >
            {props.itemRender(
              this.getJumpPrevPage(),
              'jump-prev',
              this.getItemIcon(props.jumpPrevIcon, 'jump-prev')
            )}
          </li>
        );

        const className5 = classNames(
          theme['rc-pagination-jump-next'],
          props.jumpNextIcon && theme['rc-pagination-jump-next-custom-icon']
        );

        jumpNext = (
          <li
            title={props.showTitle ? nextItemTitle : null}
            key="next"
            tabIndex={0}
            onClick={this.jumpNext}
            onKeyPress={this.runIfEnterJumpNext}
            className={className5}
          >
            {props.itemRender(
              this.getJumpNextPage(),
              'jump-next',
              this.getItemIcon(props.jumpNextIcon, 'jump-next')
            )}
          </li>
        );
      }
      lastPager = (
        <Pager
          locale={props.locale}
          last
          rootPrefixCls={theme['rc-pagination']}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={allPages}
          page={allPages}
          active={false}
          showTitle={props.showTitle}
          itemRender={props.itemRender}
        />
      );
      firstPager = (
        <Pager
          locale={props.locale}
          rootPrefixCls={theme['rc-pagination']}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={1}
          page={1}
          active={false}
          showTitle={props.showTitle}
          itemRender={props.itemRender}
        />
      );

      let left = Math.max(1, current - pageBufferSize);
      let right = Math.min(current + pageBufferSize, allPages);

      if (current - 1 <= pageBufferSize) {
        right = 1 + pageBufferSize * 2;
      }

      if (allPages - current <= pageBufferSize) {
        left = allPages - pageBufferSize * 2;
      }

      for (let i = left; i <= right; i++) {
        const active = current === i;
        pagerList.push(
          <Pager
            locale={props.locale}
            rootPrefixCls={theme['rc-pagination']}
            onClick={this.handleChange}
            onKeyPress={this.runIfEnter}
            key={i}
            page={i}
            active={active}
            showTitle={props.showTitle}
            itemRender={props.itemRender}
          />
        );
      }

      if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
        pagerList[0] = React.cloneElement(pagerList[0], {
          className: theme['rc-pagination-item-after-jump-prev'],
        });
        pagerList.unshift(jumpPrev);
      }
      if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
        pagerList[pagerList.length - 1] = React.cloneElement(pagerList[pagerList.length - 1], {
          className: theme['rc-pagination-item-before-jump-next'],
        });
        pagerList.push(jumpNext);
      }

      if (left !== 1) {
        pagerList.unshift(firstPager);
      }
      if (right !== allPages) {
        pagerList.push(lastPager);
      }
    }

    let totalText = null;

    if (props.showTotal) {
      totalText = (
        <li className={theme['rc-pagination-total-text']}>
          {props.showTotal(
            props.total,
            [
              props.total === 0 ? 0 : (current - 1) * pageSize + 1,
              current * pageSize > props.total ? props.total : current * pageSize,
            ]
          )}
        </li>
      );
    }
    const prevDisabled = !this.hasPrev() || !allPages;
    const nextDisabled = !this.hasNext() || !allPages;
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
        <Label componentId={'rc-pagination'}>Jump To:</Label>
        <Options
          disabled={disabled}
          locale={props.locale}
          rootPrefixCls={theme['rc-pagination']}
          selectComponentClass={() => {
            return <select>{props.children}</select>;
          }}
          selectPrefixCls={props.selectPrefixCls}
          selectValue={current.toString()}
          changeSize={this.props.showSizeChanger ? this.handleChange : undefined}
          current={this.state.current}
          pageSize={this.state.pageSize}
          pageSizeOptions={this.getPageNumberOptions(pagerList)}
          quickGo={this.shouldDisplayQuickJumper() ? this.handleChange : undefined}
          goButton={goButton}
        />
        <Label componentId={'rc-pagination'}>Items per page: </Label>
        <PageSize
          onKeyPress={() => {}}
          currentPageSize={this.state.pageSize}
          onClick={(currentPageSize: number) =>  this.setState({ pageSize: currentPageSize }, () => {
            this.changePageSize(currentPageSize);
          })}
          pageSizeList={this.state.pageSizeList}
          className="cl"
        />
        { lazyLoading && pagerList.length !== 1 ? <Button onClick={() => {
          const prevPageSize = this.state.pageSize;
          const newPageSize = prevPageSize + this.props.pageSize;
          this.setState({ pageSize: newPageSize }, () => {
            this.changePageSize(newPageSize);
          });
        }}>Show More Results</Button> : null }
      </ul>
    );
  }
}

polyfill(Pagination);

export default themr(PAGINATION, baseTheme)(Pagination) as ThemedComponentClass<IProps, IState>;
