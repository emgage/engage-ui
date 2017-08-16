import * as React from 'react';
import { OffCanvasAnimationType, OffCanvasPosition } from './OffCanvasProps';

export interface Props {
  width?: number;
  transitionDuration?: number;
  isMenuOpened?: boolean;
  position?: OffCanvasPosition;
  children?: any;
  style?: any;
  animation?: OffCanvasAnimationType;
}
export default class OffCanvas extends React.PureComponent<Props, {}> {
  render() {
    const{
        width,
        transitionDuration,
        isMenuOpened,
        position,
        children,
    } = this.props;
    const transferProps = (element: any) => {
      return React.cloneElement(element, { width, transitionDuration, isMenuOpened, position });
    };

    const offCanvasChildren = React.Children.map(children, transferProps);
    return (
      <div>
        {offCanvasChildren}
      </div>
    );
  }
}
