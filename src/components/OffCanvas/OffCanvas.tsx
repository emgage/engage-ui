import * as React from 'react';

export const OffCanvas: any = ({ width, transitionDuration, isMenuOpened, position, children }: any) => {
  
  const transferProps = (element: any) => {
    return React.cloneElement(element, { width, transitionDuration, isMenuOpened, position });
  };

  const offCanvasChildren = React.Children.map(children, transferProps);
  return (
    <div>
      {offCanvasChildren}
    </div>
  );

};
