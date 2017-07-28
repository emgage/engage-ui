import * as React from 'react';
import {Slot} from 'react-page-layout';

export default() => (
    <div>
        <header>engage-ui documentation [Header]</header>
        <div style={{border: 'red 1px solid'}}>
            <Slot name="documentHeader"/>
        </div>
        <br />
        <div style={{border: 'red 1px solid'}}>
            <Slot name="props"/>
        </div>
        <div style={{border: 'red 1px solid'}}>
            <Slot name="mainExample"/>
        </div>
        <div style={{border: 'red 1px solid'}}>
            <Slot name="otherExamples"/>
        </div>
        <footer>Copyright Emgage !! [Footer]</footer>
    </div>
);
