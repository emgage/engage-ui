import * as React from 'react';
import {Page, Section} from 'react-page-layout';
import PrismCode from 'react-prism';
import ChoiceListExample from '../example/ChoiceListExample';
import ChoiceListMultipleExample from '../example/ChoiceListMultipleExample';

const ChoiceListExampleSource = require('!raw-loader!../example/ChoiceListExample') as string;

export default() => (
    <div>
        <Page layout="docs">
            <Section slot="documentHeader">
                <h1>
                    Choice List
                </h1>
            </Section>
            <Section slot="mainExample">
                <ChoiceListExample/>
                <PrismCode className="language-jsx">
                    {ChoiceListExampleSource}
                </PrismCode>
            </Section>
            <Section slot="props">
                <table style={{border: '1px solid black'}}>
                    <thead>
                        <tr>
                            <th>Proeprty</th>
                            <th>Type</th>
                            <th>Default Value</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>name</td>
                            <td>string</td>
                            <td>''</td>
                            <td>Name of component</td>
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>any</td>
                            <td>undefined</td>
                            <td>Value of component</td>
                        </tr>
                    </tbody>
                </table>
            </Section>
            <Section slot="otherExamples">
                <ChoiceListMultipleExample/>
            </Section>
        </Page>
    </div>
);
