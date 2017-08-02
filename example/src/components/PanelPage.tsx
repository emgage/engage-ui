import * as React from 'react';
import {DocumentPage, Header, Example} from '../layout';

import PanelExample from '../example/PanelExample';
const PanelExampleSource = require('!raw-loader!../example/PanelExample')as string;

const properties = [
    {
        property: 'title',
        type: 'string',
        value: '',
        notes: 'Panel title',
    },
];

export default() => (
    <DocumentPage
        header={
            <Header title="Panel">
                This is a short description for Panel component.
            </Header>
        }
        properties={properties}
        examples={<Example source={PanelExampleSource} demo={<PanelExample/>} />}
    />
);
