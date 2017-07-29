import * as React from 'react';
import {mount} from 'enzyme';
import Stack from '../Stack';
import Badge from '../';
import Item from '../Item';
import Heading from '../';

describe('Stack Component Suit', () => {
    describe('Test children property', () => {
        it('should verify children property is defined', () => {
            const stackWrapper = mount(
                                        <Stack>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.childAt(0).prop('children').props.children).toBe('Paid');
            expect(stackWrapper.childAt(1).prop('children').props.children).toBe('Fulfilled');

        });

         it('should verify children property is not defined', () => {
            const stackWrapper = mount(<Stack/>);
            expect(stackWrapper.prop('children')).toBeUndefined();
        });
    });

    describe('Test vertical property', () => {
        it('should verify vertical property is set', () => {
            const stackWrapper = mount(
                                        <Stack vertical>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('vertical')).toBe(true);
        });

         it('should verify vertical property is not defined', () => {
            const stackWrapper = mount(
                                        <Stack>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('vertical')).toBeUndefined();
        });

         it('should verify type of vertical property ', () => {
            const stackWrapper = mount(
                                        <Stack vertical>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 ).prop('vertical');
            expect(typeof (stackWrapper)).toBe('boolean');
        });
    });

      describe('Test spacing property', () => {
        it('should verify spacing property when set as tight', () => {
            const stackWrapper = mount(
                                        <Stack spacing="tight">
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('spacing')).toBe('tight');
        });

        it('should verify spacing property when set as loose', () => {
            const stackWrapper = mount(
                                        <Stack spacing="loose">
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('spacing')).toBe('loose');
        });

        it('should verify spacing property when set as none', () => {
            const stackWrapper = mount(
                                        <Stack spacing="none">
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('spacing')).toBe('none');
        });

         it('should verify spacing property is not defined', () => {
            const stackWrapper = mount(
                                        <Stack>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('spacing')).toBeUndefined();
        });
    });

    describe('Test alignment property', () => {
        it('should verify alignment property when set as leading', () => {
            const stackWrapper = mount(
                                        <Stack alignment="leading">
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('alignment')).toBe('leading');
        });

        it('should verify alignment property when set as trailing', () => {
            const stackWrapper = mount(
                                        <Stack alignment="trailing">
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('alignment')).toBe('trailing');
        });

        it('should verify alignment property when set as center', () => {
            const stackWrapper = mount(
                                        <Stack alignment="center">
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('alignment')).toBe('center');
        });

         it('should verify alignment property when set as fill', () => {
            const stackWrapper = mount(
                                        <Stack alignment="fill">
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('alignment')).toBe('fill');
        });

         it('should verify alignment property when set as baseline', () => {
            const stackWrapper = mount(
                                        <Stack alignment="baseline">
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('alignment')).toBe('baseline');
        });

         it('should verify alignment property is not defined', () => {
            const stackWrapper = mount(
                                        <Stack>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('alignment')).toBeUndefined();
        });
    });

    describe('Test distribution property', () => {
        it('should verify distribution property when set as leading', () => {
            const stackWrapper = mount(
                                        <Stack distribution="leading">
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('distribution')).toBe('leading');
        });

        it('should verify distribution property when set as trailing', () => {
            const stackWrapper = mount(
                                        <Stack distribution="trailing">
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('distribution')).toBe('trailing');
        });

        it('should verify distribution property when set as center', () => {
            const stackWrapper = mount(
                                        <Stack distribution="center">
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('distribution')).toBe('center');
        });

         it('should verify distribution property when set as fill', () => {
            const stackWrapper = mount(
                                        <Stack distribution="fill">
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('distribution')).toBe('fill');
        });

         it('should verify distribution property when set as equalSpacing', () => {
            const stackWrapper = mount(
                                        <Stack distribution="equalSpacing">
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('distribution')).toBe('equalSpacing');
        });

        it('should verify distribution property when set as fillEvenly', () => {
            const stackWrapper = mount(
                                        <Stack distribution="fillEvenly">
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('distribution')).toBe('fillEvenly');
        });

         it('should verify distribution property is not defined', () => {
            const stackWrapper = mount(
                                        <Stack>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                 );
            expect(stackWrapper.prop('distribution')).toBeUndefined();
        });
    });

    describe('Test stack with item', () => {
        it('should verify stack where a single item fills the remaining space', () => {
            const stackWrapper = mount(
                                        <Stack >
                                        <Item fill >
                                            <Heading>Order #1136</Heading>
                                        </Item>
                                        <Item >
                                            <Badge>Paid</Badge>
                                        </Item>
                                        <Item >
                                            <Badge>Fulfilled</Badge>
                                        </Item>
                                        </Stack>,
                                 );
            expect(stackWrapper.childAt(0).prop('fill')).toBe(true);
        });
    });
});
