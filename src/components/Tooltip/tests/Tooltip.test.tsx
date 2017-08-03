import * as React from 'react';
import {mount} from 'enzyme';
import Tooltip from '../Tooltip';
import Link from '../';


describe('Tooltip Component Suit', () => {
    describe('Test children property', () => {
        it('should verify children property is defined as link', () => {
            const tooltipWrapper = mount(
                                        <Tooltip content="This order has shipping labels.">
                                            <Link content="Hello World!">Order #1001</Link>
                                        </Tooltip>,
                                   );
            expect(tooltipWrapper.children().prop('children')).toBe('Order #1001');
        });

        it('should verify children property is not defined', () => {
            const tooltipWrapper = mount(<Tooltip content="This order has shipping labels1."/>);
            expect(tooltipWrapper.prop('children')).toBeUndefined();
        });
    });

    describe('Test content property', () => {
        it('should verify content property is available', () => {
            const tooltipWrapper = mount(<Tooltip content="This order has shipping labels1."/>);
            expect(tooltipWrapper.prop('content')).toBe('This order has shipping labels1.');
        });
    });

    describe('Test active property', () => {
        it('should verify active property is available', () => {
            const tooltipWrapper = mount(<Tooltip content="This order has shipping labels1." active/>);
            expect(tooltipWrapper.prop('active')).toBe(true);
        });

        it('should verify activate property is not defined', () => {
            const tooltipWrapper = mount(<Tooltip content="This order has shipping labels1."/>);
            expect(tooltipWrapper.prop('activate')).toBeUndefined();
        });
    });

    describe('Test light property', () => {
        it('should verify light property is available', () => {
            const tooltipWrapper = mount(<Tooltip content="This order has shipping labels1." light />);
            expect(tooltipWrapper.prop('light')).toBe(true);
        });

        it('should verify light property is not defined', () => {
            const tooltipWrapper = mount(<Tooltip content="This order has shipping labels1."/>);
            expect(tooltipWrapper.prop('light')).toBeUndefined();
        });
    });

    describe('Test preferredPosition property', () => {
        it('should verify preferredPosition property when position as below', () => {
            const tooltipWrapper = mount(<Tooltip content="This order has shipping labels1." preferredPosition="below" />);
            expect(tooltipWrapper.prop('preferredPosition')).toBe('below');
        });

        it('should verify preferredPosition property when position as above', () => {
            const tooltipWrapper = mount(<Tooltip content="This order has shipping labels1." preferredPosition="above" />);
            expect(tooltipWrapper.prop('preferredPosition')).toBe('above');
        });

        it('should verify preferredPosition property when position as mostSpace', () => {
            const tooltipWrapper = mount(<Tooltip content="This order has shipping labels1." preferredPosition="mostSpace" />);
            expect(tooltipWrapper.prop('preferredPosition')).toBe('mostSpace');
        });

        it('should verify preferredPosition property is not defined', () => {
            const tooltipWrapper = mount(<Tooltip content="This order has shipping labels1."/>);
            expect(tooltipWrapper.prop('preferredPosition')).toBeUndefined();
        });
    });

    describe('Test activatorWrapper property', () => {
        it('should verify activatorWrapper property is available', () => {
            const tooltipWrapper = mount(<Tooltip content="This order has shipping labels1." activatorWrapper="Test" />);
            expect(tooltipWrapper.prop('activatorWrapper')).toBe('Test');
        });

        it('should verify activatorWrapper property is not defined', () => {
            const tooltipWrapper = mount(<Tooltip content="This order has shipping labels1."/>);
            expect(tooltipWrapper.prop('activatorWrapper')).toBeUndefined();
        });
  });
});

