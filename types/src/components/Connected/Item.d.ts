import * as React from 'react';
export declare enum Position {
    Left = 0,
    Primary = 1,
    Right = 2
}
export interface Props {
    position: Position;
    children?: React.ReactNode;
}
export interface State {
    focused: boolean;
}
export default class Item extends React.PureComponent<Props, State> {
    state: State;
    render(): React.JSX.Element;
    private handleBlur;
    private handleFocus;
}
