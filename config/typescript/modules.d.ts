declare module 'hoist-non-react-statics' {
  import {ComponentClass} from 'react';

  function hoistNonReactStatics<P>(to: ComponentClass<P>, from: ComponentClass<any>): ComponentClass<P>;
  export = hoistNonReactStatics;
}

declare module 'fbjs/lib/keyMirror' {
    function keyMirror(obj: Object): any;
    export = keyMirror;
}

declare module 'fbjs/lib/shallowEqual' {
    function shallowEqual(a: any, b: any): any;
    export = shallowEqual;
}