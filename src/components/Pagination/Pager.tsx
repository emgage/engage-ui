import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import * as baseTheme from './Pagination.scss';
import Button from '../Button';

interface IProps {
  page: any;
  active?: boolean;
  last?: boolean;
  locale: any;
  className?: string;
  showTitle: boolean;
  rootPrefixCls: string;
  onClick(value: number): void;
  onKeyPress(event: any, callback: any, value: number): void;
  itemRender(param1: number, param2: string, param3: any): any;
  theme?: any;
}

class Pager extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { active, className = '', itemRender, onClick, onKeyPress, showTitle, page, theme } = this.props;

    const prefixCls = theme['rc-pagination-item'];
    const cls = classNames(prefixCls, `${prefixCls}-${page}`, {
      [`${prefixCls}-active`]: active,
      [className]: !!className,
      [`${prefixCls}-disabled`]: !page,
    });

    const handleClick = () => {
      onClick(page);
    };

    const handleKeyPress = (e: any) => {
      onKeyPress(e, onClick, page);
    };

    return (
      <li
        title={showTitle ? page : null}
        className={cls}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        tabIndex={0}
      >
        {itemRender(page, 'page', <Button componentClass={theme.button} primary={active}>{page}</Button>)}
      </li>
    );
  }
}

export default themr('ThPaginationPager', baseTheme)(Pager) as ThemedComponentClass<IProps, {}>;
