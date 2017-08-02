import * as React from 'react';
import {DocumentPage, Header, Example} from '../layout';

import ChoiceListExample from '../example/ChoiceListExample';
// import ChoiceListMultipleExample from '../example/ChoiceListMultipleExample';

const ChoiceListExampleSource = require('!raw-loader!../example/ChoiceListExample')as string;
// const ChoiceListMultipleExampleSource = require('!raw-loader!../example/ChoiceListMultipleExample')as string;

const properties = [
    {
        property: 'name',
        type: 'string',
        value: '',
        notes: 'Name of component',
    }, {
        property: 'value',
        type: 'any',
        value: 'undefined',
        notes: 'Value of component',
    }, {
        property: 'onClick',
        type: 'void',
        value: 'Function',
        notes: 'onClick event function.',
    },
];

export default() => (
    <DocumentPage
        header={
            <Header title="Choice List">
                This is a short description for choice list component.
            </Header>
        }
        properties={properties}
        examples={<Example source={ChoiceListExampleSource} demo={<ChoiceListExample/>} />}
    />
);

/*
    <DocumentPage>
        <Section slot="documentHeader">
            <Header>
                Choice List
            </Header>
            <div>
                description
                </div>
        </Section>
        <Section slot="mainExample">
            <Example>
                <ChoiceListExample/>
                <ShowCode>
                    {ChoiceListExampleSource}
                </ShowCode>
            </Example>
        </Section>
        <Section slot="props">
            <Properties data={properties}/>
        </Section>
        <Section slot="otherExamples">
            <Example>
            <ChoiceListMultipleExample/>
            <ShowCode>
                {ChoiceListMultipleExampleSource}
            </ShowCode>
            </Example>
        </Section>
    </DocumentPage>
*/
