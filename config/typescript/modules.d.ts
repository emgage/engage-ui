declare module 'hoist-non-react-statics' {
  import {ComponentClass} from 'react';

  function hoistNonReactStatics<P>(to: ComponentClass<P>, from: ComponentClass<any>): ComponentClass<P>;
  export = hoistNonReactStatics;
  
}

declare module 'react-popper' {
  import {ComponentClass} from 'react';

  function Manager<P>(to: ComponentClass<P>, from: ComponentClass<any>): ComponentClass<P>;
  function Target<P>(to: ComponentClass<P>, from: ComponentClass<any>): ComponentClass<P>;
  function Popper<P>(to: ComponentClass<P>, from: ComponentClass<any>): ComponentClass<P>;
  

  export {Manager,Target,Popper} ;
}

declare module 'consolidated-events' {
  import {ComponentClass} from 'react';

  function addEventListener(target: any, eventName: any, listener: any, options?: any): any;
  function removeEventListener(unsubscribeFn: any): any;

  export {addEventListener,removeEventListener} ;
  
}

declare module 'object.values' {
  import {ComponentClass} from 'react';

  function values(value: any): any;
  export = values;
}

declare module 'velocity-animate';
declare module 'react-router-dom';
declare module 'react-prism';
declare module 'react-table';
