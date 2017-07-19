'use strict';

import * as React from 'react';

export let OffCanvas:any = ({ width, transitionDuration, isMenuOpened, position, children }:any) => {
  
  const transferProps = (element:any) => {
    return React.cloneElement(element, { width, transitionDuration, isMenuOpened, position });
  };

  let offCanvasChildren = React.Children.map(children, transferProps);
  return (
    <div>
      {offCanvasChildren}
    </div>
  );

};
