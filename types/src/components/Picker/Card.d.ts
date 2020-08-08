import * as React from 'react';
export interface Props {
    image?: string;
    nameBefore?: string;
    bold?: string;
    nameAfter?: string;
    email?: string;
    isHighlighted?: boolean;
    alt?: string;
}
declare class Card extends React.PureComponent<Props, {}> {
    constructor(props: Props);
    render(): JSX.Element;
}
export default Card;
