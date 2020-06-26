import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import * as baseTheme from './Pagination.scss';
import { PAGESIZE } from '../ThemeIdentifiers';
import { classNames } from '@shopify/react-utilities';
import { default as LOCALE } from './locale/en_US';
import Pager from './Pager';

export interface IPageSizeProps {
  /**
   * Theme for component
   */
  theme?: any;
  /**
   *  Classname for ul
   */
  className?: any;
  /**
   * List od page size
   */
  pageSizeList: number[];
  /**
   * Current page size
   */
  currentPageSize: number;

  /**
   * onClick handler
   * @param value
   */
  onClick(value: number): void;

  /**
   *  onKeyPress handler
   * @param event
   * @param callback
   * @param value
   */
  onKeyPress(event: any, callback: any, value: number): void;
}

class PageSize extends React.PureComponent<IPageSizeProps, any>{
  render() {
    const { currentPageSize, theme, className, pageSizeList, onClick, onKeyPress } = this.props;
    return <ul
       className={classNames(theme['rc-pagination'], className)}
     >
      {
        pageSizeList.map((page: number) => {
          const plain = page !== currentPageSize;
          return <Pager
                    componentStyle={plain ? { padding: '20px' } : {}}
                    plain={plain}
                    itemRender={(page: any, type: any, element: any) => element}
                    onKeyPress={onKeyPress}
                    onClick={onClick}
                    rootPrefixCls="pageSize"
                    showTitle
                    page={page}
                    locale={LOCALE}
                />;
        })
      }     </ul>;
  }
}

export default themr(PAGESIZE, baseTheme)(PageSize) as ThemedComponentClass<IPageSizeProps, any>;
