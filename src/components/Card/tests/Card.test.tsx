import * as React from 'react';
import { mount } from 'enzyme';
import Card from '../Card';
import Section from '../Section';
import {Action} from '../../../types';

describe('Card - Test Suit', () => {
    const theme = {Card: 'Card',
    subdued: 'subdued',
    Header: 'Header',
    Section: 'Section',
    SectionHeader: 'SectionHeader',
    Footer: 'Footer',
    };

    it('Verify that Card has <h2> tag.', () => {
        const cardWrapper = mount( <Card title="Online store dashboard - Card" sectioned subdued>
                                        <p>View a summary of your online store’s performance.</p>
                                   </Card>);
        expect(cardWrapper.find('h2').length).toBe(1);
    });
    it('Verify Card title.', () => {
        const cardWrapper = mount( <Card title="Online store dashboard - Card" sectioned subdued>
                                        <p>View a summary of your online store’s performance.</p>
                                   </Card>);
        expect(cardWrapper.prop('title')).toBe('Online store dashboard - Card');
    });
    it('Verify sectioned when it is set', () => {
        const cardWrapper = mount( <Card title="Online store dashboard - Card" sectioned subdued>
                                        <p>View a summary of your online store’s performance.</p>
                                   </Card>);
        expect(cardWrapper.prop('sectioned')).toBe(true);
    });
    it('Verify sectioned when it is not set', () => {
        const cardWrapper = mount( <Card title="Online store dashboard - Card" subdued>
                                        <p>View a summary of your online store’s performance.</p>
                                   </Card>);
        expect(cardWrapper.prop('sectioned')).toBeFalsy();
        cardWrapper.setProps({sectioned: false});
        expect(cardWrapper.prop('sectioned')).toBeFalsy();
    });
    it('Verify subdued is set', () => {
        const cardWrapper = mount( <Card title="Online store dashboard - Card" sectioned subdued>
                                        <p>View a summary of your online store’s performance.</p>
                                   </Card>);
        expect(cardWrapper.prop('subdued')).toBe(true);
    });
    it('Verify subdued is no set', () => {
        const cardWrapper = mount( <Card title="Online store dashboard - Card" sectioned>
                                        <p>View a summary of your online store’s performance.</p>
                                   </Card>);
        expect(cardWrapper.prop('subdued')).toBeFalsy();
    });

    it('Verify actions is called', () => {
        const spy = jest.fn();
        const action: Action = {content: 'Action Content', onAction: () => {spy(); }};
        const cardWrapper = mount( <Card title="Online store dashboard - Card"  actions={[action]}  >
            <p>View a summary of your online store’s performance.</p> </Card>);
        cardWrapper.find('button').simulate('click');
        expect(spy).toHaveBeenCalled();
    });
    it('Verify primaryFooterAction is called', () => {
        const spy = jest.fn();
        const action: Action = {content: 'Action Content', onAction: () => {spy(); }};
        const cardWrapper = mount( <Card title="Online store dashboard - Card"  primaryFooterAction={action}  >
                                        <p>View a summary of your online store’s performance.</p> 
                                   </Card>);
        cardWrapper.find('button').simulate('click');
        expect(spy).toHaveBeenCalled();
    });
    it('Verify secondaryFooterAction is called', () => {
        const spy = jest.fn();
        const action: Action = {content: 'Action Content', onAction: () => {spy(); }};
        const cardWrapper = mount( <Card title="Online store dashboard - Card"  secondaryFooterAction={action}  >
                                        <p>View a summary of your online store’s performance.</p> 
                                   </Card>);
        cardWrapper.find('button').simulate('click');
        expect(spy).toHaveBeenCalled();
    });
    it('Verify sectioned is boolean type', () => {
        const cardWrapper = mount( <Card title="Online store dashboard - Card" sectioned >
                                        <p>View a summary of your online store’s performance.</p> 
                                   </Card>);
        expect(typeof cardWrapper.prop('sectioned')).toBe('boolean');
    });
    it('Verify subdued is boolean type', () => {
        const cardWrapper = mount( <Card title="Online store dashboard - Card" subdued >
                                        <p>View a summary of your online store’s performance.</p> 
                                   </Card>);
        expect(typeof cardWrapper.prop('subdued')).toBe('boolean');
    });
    it('Verify that Card can have multiple sections with title.', () => {
        const cardWrapper = mount(<Card title="Online store dashboard - Card" sectioned theme={theme}>
                                        <Section title="Reports" theme={theme}> 
                                            <p>View a summary of your online store’s performance.</p>
                                        </Section>
                                        <Section title="Summary Reports" theme={theme}>
                                            <p>View a summary of your online store’s performance, including sales, visitors, top products, and referrals.</p>
                                        </Section>
                                   </Card>);
        expect(cardWrapper.prop('sectioned')).toBe(true);
        expect(cardWrapper.find('Section').at(1).text()).toBe('ReportsView a summary of your online store’s performance.');
        expect(cardWrapper.find('Section').at(2).text()).toBe('Summary ReportsView a summary of your online store’s performance, including sales, visitors, top products, and referrals.');
        expect(cardWrapper.find('h3').length).toBe(2);
        expect(cardWrapper.find('p').length).toBe(2);
    });
    it('Verify Card with subdued option.', () => {
        const cardWrapper = mount( <Card title="Online store dashboard - Card" sectioned >
                                        <Section title="Reports" subdued> 
                                            <p>View a summary of your online store’s performance.</p>
                                        </Section>
                                        <Section title="Summary Reports" subdued>
                                            <p>View a summary of your online store’s performance, including sales, visitors, top products, and referrals.</p>
                                        </Section>
                                   </Card>);
        expect(cardWrapper.find('h3').length).toBe(2);
        expect(cardWrapper.find('p').length).toBe(2);
        expect(cardWrapper.find('h3').at(0).text()).toBe('Reports');
        expect(cardWrapper.find('h3').at(1).text()).toBe('Summary Reports');
    });
    it('Verify Card with theme.', () => {
        const cardWrapper = mount( <Card title="Online store dashboard - Card" sectioned >
                                        <Section title="Reports" subdued > 
                                            <p>View a summary of your online store’s performance.</p>
                                        </Section>
                                        <Section title="Summary Reports" subdued theme={theme}>
                                            <p>View a summary of your online store’s performance, including sales, visitors, top products, and referrals.</p>
                                        </Section>
                                   </Card>);
        expect(cardWrapper.find('h3').length).toBe(2);
        expect(cardWrapper.find('p').length).toBe(2);
        expect(cardWrapper.find('h3').at(0).text()).toBe('Reports');
        expect(cardWrapper.find('h3').at(1).text()).toBe('Summary Reports');
    });
});
