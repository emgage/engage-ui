import * as React from 'react';
import {Slot} from 'react-page-layout';

export default() => (
    <div>
        <div style={{margin: '8px'}}>
            <Slot name="header"/>
        </div>
        <div style={{margin: '8px'}}>
            <Slot name="props"/>
        </div>
        <div style={{margin: '8px'}}>
            <Slot name="example"/>
        </div>
        <div style={{margin: '8px'}}>
            <Slot name="optional"/>
        </div>
    </div>
);
