import * as React from 'react';
import ShowCode from './ShowCode';

export interface IProps {
    children?: React.ReactNode,
    source?: string,
    demo?: React.ReactNode,
}

export default ({children, source, demo}: IProps) => {
    return (
        <div>
            <h3>Example</h3>
            <br />
            {demo}
            
            <ShowCode>
                {source}
            </ShowCode>
        </div>
    );
};
