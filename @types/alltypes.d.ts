declare module 'hoist-non-react-statics' {
  import {ComponentClass} from 'react';

  function hoistNonReactStatics<P>(to: ComponentClass<P>, from: ComponentClass<any>): ComponentClass<P>;
  export = hoistNonReactStatics;
}

declare module 'rc-form';

declare module 'react-addons-perf';import * as React from "react";

declare module "react-css-themr" {
  type TReactCSSThemrTheme = {
    [key: string]: string | TReactCSSThemrTheme
  }

  export function themeable(...themes: Array<TReactCSSThemrTheme>): TReactCSSThemrTheme;

  export interface IThemrOptions {
    /** @default "deeply" */
    composeTheme?: "deeply" | "softly" | false,
  }

  export interface ThemeProviderProps {
    innerRef?: Function,
    theme: {}
  }

  export class ThemeProvider extends React.Component<ThemeProviderProps, any> {
  }

  interface ThemedComponent<P, S> extends React.Component<P, S> {
  }

  interface ThemedComponentClass<P, S> extends React.ComponentClass<P> {
    new(props?: P, context?: any): ThemedComponent<P, S>;
  }

  export function themr(
    identifier: string | number | symbol,
    defaultTheme?: {},
    options?: IThemrOptions
  ): <P, S>(component: (new(props?: P, context?: any) => React.Component<P, S>) | React.SFC<P>) => ThemedComponentClass<P, S>;
}declare module 'react-page-layout';

declare module 'react-perf-tool';
declare module 'react-prism';
declare module 'react-router-dom';
declare module 'velocity-animate';
