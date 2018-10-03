import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { STICKY } from '../ThemeIdentifiers';
import { classNames } from '@shopify/react-utilities/styles';
import * as baseTheme from './Sticky.scss';

export type Position = 'top' | 'bottom';

export interface Props {
  children?: React.ReactNode;
  position: Position;
  componentStyle?: React.CSSProperties;
  componentClass?: string;
  // Theme to be injected via css-themr.
  theme?: any;
}

const Sticky = ({ position, theme, componentClass, componentStyle, children }:Props) => {

  // const { position, theme, componentClass, componentStyle } = this.props;

  const classes = classNames(
    position === 'top' ? theme.headerSticky : theme.footerSticky,
    theme.footerStyle,
    componentClass
  );

  return (
    <div className={ classes }>
      <div className={ theme.Sticky } style={ componentStyle }>
        {children}
      </div>
    </div>
  );
};

// class Sticky extends React.PureComponent<Props, any> {

//   render() {
//     const { position, theme, componentClass } = this.props;

//     const classes = classNames(
//       position === 'top' ? theme.headerSticky : theme.footerSticky,
//       theme.footerStyle,
//       componentClass
//     );

//     return (
//     <div className={ classes }>
//       <div className={ theme.Sticky } style={this.props.componentStyle}>
//         {this.props.children}
//       </div>
//     </div>
//     );
//   }
// }

export default themr(STICKY, baseTheme)(Sticky) as ThemedComponentClass<Props, {}>;
