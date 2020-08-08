import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import Button from '../Button';
import { PAGER } from '../ThemeIdentifiers';

import * as baseTheme from './Pagination.scss';

export interface IProps {
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
  plain?: boolean;
  componentStyle?: any;
}

class Pager extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { active = false, className = '', itemRender, onClick, onKeyPress, showTitle, page, theme, plain = false, componentStyle } = this.props;

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
        {itemRender(page, 'page', <Button componentStyle={componentStyle} plain={plain} componentClass={theme.button} primary={active}>{page}</Button>)}
      </li>
    );
  }
}

export default themr(PAGER, baseTheme)(Pager) as ThemedComponentClass<IProps, {}>;
