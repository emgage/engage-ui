import * as React from 'react';
import { mount } from 'enzyme';
import Banner from '../banner';
import {Action} from '../../../types';
import Link from '../../Link';

describe('Banner Component Test Suit', () => {

    describe('Verify Banner component properties', () => {
        it('should verify banner title property', () => {
            const bannerWrapper = mount(<Banner title="Order archived" >
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('title')).toBe('Order archived');
        });

        it('should verify banner title property is not defined', () => {
            const bannerWrapper = mount(<Banner>
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('title')).toBeUndefined();
        });

        it('should verify banner status property', () => {
            const bannerWrapper = mount(<Banner title="Order archived" status="success" >
                                        <p>This order was archived on March 7.</p> 
                                        </Banner>);
            expect(bannerWrapper.prop('status')).toBe('success');
        });

        it('should verify banner status property is not defined', () => {
            const bannerWrapper = mount(<Banner>
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('title')).toBeUndefined();
        });

        it('should verify banner icon property', () => {
            const bannerWrapper = mount(<Banner status="success" icon="arrowDown">
                                        <p>This order was archived on March 7.</p> 
                                        </Banner>);
            expect(bannerWrapper.prop('icon')).toBe('arrowDown');
        });

        it('should verify banner icon property is not defined', () => {
            const bannerWrapper = mount(<Banner>
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('title')).toBeUndefined();
        });

        it('should verify banner children property', () => {
            const bannerWrapper = mount(<Banner
                                        title="Some of your product variants are missing weights"
                                        status="warning"
                                        action={{content: 'Edit variant weights'}}>
                                        <p>Add weights to show accurate rates.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('children').props.children).toBe('Add weights to show accurate rates.');
        });

        it('should verify banner children property is not defined', () => {
            const bannerWrapper = mount(<Banner/>);
            expect(bannerWrapper.prop('children')).toBeUndefined();
        });
    });

    describe('Verify Banner component functions called', () => {
        it('should verify banner action is called', () => {
            const spy = jest.fn();
            const action: Action = {content: 'Action Content', onAction: () => { spy(); } };
            const bannerWrapper = mount(<Banner title="Order archived" status="success" action={action}>
                                        <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p> 
                                        </Banner>);
            bannerWrapper.find('button').simulate('click');
            expect(spy).toBeCalled();
        });

        it('should verify banner secondaryAction is called', () => {
            const spy = jest.fn();
            const secondaryAction: Action = {content: 'Action Content', onAction: () => { spy(); } };
            const bannerWrapper = mount(<Banner title="Order archived" status="success" action={secondaryAction}>
                                        <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p> 
                                        </Banner>);
            bannerWrapper.find('button').simulate('click');
            expect(spy).toBeCalled();
        });

        it('should verify banner onDismiss is called', () => {
            const spy = jest.fn();
            const onDismiss: Action = {content: 'Action Content', onAction: () => { spy(); } };
            const bannerWrapper = mount(<Banner title="Order archived" action={onDismiss}>
                                        <p>Use your finance report.
                                        <Link url="http://google.com">
                                        Let us know what you think.</Link></p>
                                        </Banner>);
            bannerWrapper.find('button').simulate('click');
            expect(spy).toBeCalled();
        });
    });

    describe('Verify Banner component different status', () => {
        it('should verify banner status set as default', () => {
            const bannerWrapper = mount(<Banner title="Order archived" >
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('title')).toBe('Order archived');
        });

        it('should verify banner status set as success', () => {
            const bannerWrapper = mount(<Banner title="Order archived" status="success" >
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('status')).toBe('success');
        });

        it('should verify banner status set as info', () => {
            const bannerWrapper = mount(<Banner title="Order archived" status="info" >
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('status')).toBe('info');
        });

        it('should verify banner status set as warning', () => {
            const bannerWrapper = mount(<Banner title="Order archived" status="warning" >
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('status')).toBe('warning');
        });

        it('should verify banner status set as critical', () => {
            const bannerWrapper = mount(<Banner title="Order archived" status="critical" >
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('status')).toBe('critical');
        });

        it('should verify banner status set as onDismiss', () => {
            const bannerWrapper = mount(<Banner onDismiss={ () => {} } >
                                        <p>Use your finance report. 
                                        <Link url="">Let us know what you think.</Link></p>
                                        </Banner>);
            expect(typeof bannerWrapper.prop('onDismiss')).toBe('function');
        });
    });

    describe('Verify Banner component with different icon', () => {
        it('should verify banner icon prop set as placeholder ', () => {
            const bannerWrapper = mount(<Banner title="Order archived" status="success" icon="placeholder">
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('icon')).toBe('placeholder');
        });

        it('should verify banner icon prop set as arrowDown ', () => {
            const bannerWrapper = mount(<Banner title="Order archived" status="success" icon="arrowDown">
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('icon')).toBe('arrowDown');
        });

        it('should verify banner icon prop set as arrowUp ', () => {
            const bannerWrapper = mount(<Banner title="Order archived" status="success" icon="arrowUp">
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('icon')).toBe('arrowUp');
        });

        it('should verify banner icon prop set as arrowLeft ', () => {
            const bannerWrapper = mount(<Banner title="Order archived" status="success" icon="arrowLeft">
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('icon')).toBe('arrowLeft');
        });

        it('should verify banner icon prop set as arrowRight ', () => {
            const bannerWrapper = mount(<Banner title="Order archived" status="success" icon="arrowRight">
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('icon')).toBe('arrowRight');
        });

        it('should verify banner icon prop set as add ', () => {
            const bannerWrapper = mount(<Banner title="Order archived" status="success" icon="add">
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('icon')).toBe('add');
        });

        it('should verify banner icon prop set as alert ', () => {
            const bannerWrapper = mount(<Banner title="Order archived" status="success" icon="alert">
                                        <p>This order was archived on March 7.</p>
                                        </Banner>);
            expect(bannerWrapper.prop('icon')).toBe('alert');
        });
    });
});
