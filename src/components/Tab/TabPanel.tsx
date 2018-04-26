import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { TAB } from '../ThemeIdentifiers';
import * as baseTheme from './Tab.scss';

export type Position = 'top' | 'bottom' | 'left' | 'right';
export type Alignment = 'left' | 'center' | 'right';

export interface Props {
  children?: any;
  position?: Position;
  alignment?: Alignment;
  activetab?: number;
  theme?: any;
}

export interface State {
  activetab: number;
}

class TabPanel extends React.Component<Props, State> {
  static defaultProps: Props = {
    activetab: 0,
    position: 'top',
    alignment: 'left'
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      activetab: props.activetab ? props.activetab : 0
    };
  }


  renderChildrenWithTabsApiAsProps() {
    const { activetab } = this.state;

    return React.Children.map(this.props.children, (child: React.ReactElement<any>, index) => {
      return React.cloneElement(child, {
        activetab,
        onClick: this.onTabClick.bind(this, index),
        cardindex: index
      });
    });
  }

  renderActiveTabContent() {
    const { children } = this.props;
    const { activetab } = this.state;
    if (children[activetab]) {
      return children[activetab].props.children;
    }
  }

  render() {
    const { theme, position, alignment } = this.props;
    const locationClassName = classNames(
      theme.tabpanel,
      position === 'top' && theme.top,
      position === 'bottom' && theme.bottom,
      position === 'left' && theme.left,
      position === 'right' && theme.right
    );

    const alignmentClassName = classNames(
      theme.tabstrip,
      alignment === 'left' && theme.start,
      alignment === 'center' && theme.center,
      alignment === 'right' && theme.end
    );

    return (
      <div {...this.props} className={locationClassName} >
        <div className={alignmentClassName}>
          {this.renderChildrenWithTabsApiAsProps()}
        </div>
        <div className={theme.cardct}>
          {this.renderActiveTabContent()}
        </div>
      </div>
    );
  }

  onTabClick(activetab: number) {
    this.setState({
      activetab
    });
  }
}

export default themr(TAB, baseTheme)(TabPanel) as ThemedComponentClass<Props, State>;
