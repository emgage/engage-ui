import * as React from 'react';
import { Page, Section } from 'react-page-layout';
import { Properties } from '../layout';

export interface IProps {
    children?: React.ReactNode,
    header?: React.ReactNode,
    properties?: React.ReactNode,
    examples?: React.ReactNode,
}

export default({children, header, properties, examples}: IProps) => (
    <Page layout="docs">
        <Section slot="header">
            {header}
        </Section>
        <Section slot="props">
            <Properties data={properties}/>
        </Section>
        <Section slot="example">
            {examples}
        </Section>
        <Section slot="optional">
            {children}
        </Section>
    </Page>
);
