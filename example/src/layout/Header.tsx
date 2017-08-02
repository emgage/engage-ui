import * as React from 'react';

export interface IProps {
    children?: React.ReactNode,
    title: string,
}

export default({children, title}: IProps) => (
    <header>
        <h2>{title}</h2>
        <div>
            {children}
        </div>
    </header>
);
