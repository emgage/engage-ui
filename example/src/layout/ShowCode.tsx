import * as React from 'react';
import PrismCode from 'react-prism';

export interface IProps {
    children?: React.ReactNode,
}

export default({children}: IProps) => {
    return (
        <pre>
            <PrismCode className="language-jsx">
                {children}
            </PrismCode>
        </pre>
    );
};
