import * as React from 'react';
import { mount } from 'enzyme';
import Stack from '../Stack';
import Badge from '../';
import Item from '../Item';
import Heading from '../';


const theme = {
    Item: 'Item',
    Stack: 'Stack',
    vertical: 'vertical',
    spacingTight: 'spacingTight',
    spacingLoose: 'spacingLoose',
    spacingExtraLoose: 'spacingExtraLoose',
    distributionLeading: 'distributionLeading',
    distributionTrailing: 'distributionTrailing',
    distributionCenter: 'distributionCenter',
    distributionEqualSpacing: 'distributionEqualSpacing',
    distributionFill: 'distributionFill',
    distributionFillEvenly: 'distributionFillEvenly',
    Badge: 'Badge',
};

describe('<Stack />', () => {

    describe('when default props are provided', () => {
        it('basic stack should have rendered one div clss element', () => {
            const stackWrapper = mount(
                                        <Stack theme={theme} />,
                                );
            expect(stackWrapper.find('div')).toHaveLength(1);
        });
        it('basic stack should have default Stack css clss on div', () => {
            const stackWrapper = mount(
                                        <Stack theme={theme} />,
                                );
            expect(stackWrapper.find('div').hasClass('Stack')).toBe(true);
        });
    });

    describe('children property', () => {
        describe('when set', () => {
            it('basic stack should have rendered 5 div clss element', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div')).toHaveLength(5);
            });
            it('basic stack should have default Stack css clss on div', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('Stack')).toBe(true);
            });
            it('should verify children property is defined', () => {
                const stackWrapper = mount(
                                            <Stack theme={theme}>
                                                <Badge>Paid</Badge>
                                                <Badge>Fulfilled</Badge>
                                            </Stack>,
                                    );
                expect(stackWrapper.childAt(0).prop('children').props.children).toBe('Paid');
                expect(stackWrapper.childAt(1).prop('children').props.children).toBe('Fulfilled');
            });
            it('should have 2 children', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.children()).toHaveLength(2);
            });
        });

        describe('when not set', () => {
            it('basic stack should have rendered one div clss element', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme} />,
                                    );
                expect(stackWrapper.find('div')).toHaveLength(1);
            });
            it('basic stack should have default Stack css clss on div', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme} />,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('Stack')).toBe(true);
            });
            it('should verify children property is not defined', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme} />,
                                    );
                expect(stackWrapper.prop('children')).toBeUndefined();
            });
            it('should not have children property', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme} />,
                                    );
                expect(stackWrapper.children()).toHaveLength(0);
            });
        });
    });

    describe('vertical property', () => {
        describe('when set to true', () => {
            it('basic stack should have rendered 5 div clss element', () => {
                const stackWrapper = mount(
                                        <Stack vertical theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div')).toHaveLength(5);
            });
            it('basic stack should have default Stack css clss on div', () => {
                const stackWrapper = mount(
                                        <Stack vertical theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('vertical')).toBe(true);
            });
            it('should verify vertical property is set', () => {
                const stackWrapper = mount(
                                        <Stack vertical theme={theme}>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.prop('vertical')).toBe(true);
            });
            it('should have 2 children', () => {
                const stackWrapper = mount(
                                        <Stack vertical theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.children()).toHaveLength(2);
            });
        });

        describe('when set to false', () => {
            it('basic stack should have rendered 5 div clss element', () => {
                const stackWrapper = mount(
                                        <Stack vertical={false} theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div')).toHaveLength(5);
            });
            it('basic stack should have default Stack css clss on div', () => {
                const stackWrapper = mount(
                                        <Stack vertical={false} theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('Stack')).toBe(true);
            });
            it('should verify vertical property is set', () => {
                const stackWrapper = mount(
                                        <Stack vertical={false} theme={theme}>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.prop('vertical')).toBe(false);
            });
            it('should have 2 children', () => {
                const stackWrapper = mount(
                                        <Stack vertical={false} theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.children()).toHaveLength(2);
            });
        });

        describe('when not set', () => {
            it('basic stack should have rendered 5 div clss element', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div')).toHaveLength(5);
            });
            it('basic stack should have default Stack css clss on div', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('Stack')).toBe(true);
            });
            it('should verify vertical property is not defined', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.prop('vertical')).toBeUndefined();
            });
            it('should not have vertical property', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('vertical')).toHaveLength(0);
            });
            it('should have 2 children', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                     );
                expect(stackWrapper.children()).toHaveLength(2);
            });
        });
    });

    describe('spacing property', () => {
        describe('when set', () => {
            it('basic stack should have rendered 5 div clss element', () => {
                const stackWrapper = mount(
                                        <Stack spacing="tight" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div')).toHaveLength(5);
            });
            it('basic stack should have default spacingTight css clss on div when spacing as tight', () => {
                const stackWrapper = mount(
                                        <Stack spacing="tight" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('spacingTight')).toBe(true);
            });
            it('should verify spacing property when set as tight', () => {
                const stackWrapper = mount(
                                        <Stack spacing="tight" theme={theme}>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.prop('spacing')).toBe('tight');
            });
            it('basic stack should have default spacingLoose css clss on div when spacing as loose', () => {
                const stackWrapper = mount(
                                        <Stack spacing="loose" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('spacingLoose')).toBe(true);
            });
            it('should verify spacing property when set as loose', () => {
                const stackWrapper = mount(
                                        <Stack spacing="loose" theme={theme}>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.prop('spacing')).toBe('loose');
            });
            it('basic stack should have default Stack css clss on div when spacing as none', () => {
                const stackWrapper = mount(
                                        <Stack spacing="none" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('Stack')).toBe(true);
            });
            it('should verify spacing property when set as none', () => {
                const stackWrapper = mount(
                                        <Stack spacing="none" theme={theme}>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.prop('spacing')).toBe('none');
            });
            it('should have 2 children', () => {
                const stackWrapper = mount(
                                        <Stack spacing="tight" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.children()).toHaveLength(2);
            });
        });

        describe('when not set', () => {
            it('basic stack should have rendered 5 div clss element', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div')).toHaveLength(5);
            });
            it('basic stack should have default Stack css clss on div', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('Stack')).toBe(true);
            });
            it('should verify spacing property is not defined', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.prop('spacing')).toBeUndefined();
            });
            it('should not have spacing property', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('spacing')).toHaveLength(0);
            });
            it('should have 2 children', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.children()).toHaveLength(2);
            });
        });
    });

    describe('alignment property', () => {
        describe('when set', () => {
            it('basic stack should have rendered 5 div clss element', () => {
                const stackWrapper = mount(
                                        <Stack alignment="leading"theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div')).toHaveLength(5);
            });
            it('basic stack should have default Stack css clss on div', () => {
                const stackWrapper = mount(
                                        <Stack alignment="leading" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('Stack')).toBe(true);
            });
            it('should verify alignment property when set as leading', () => {
                const stackWrapper = mount(
                                        <Stack alignment="leading" theme={theme}>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.prop('alignment')).toBe('leading');
            });

            it('should verify alignment property when set as trailing', () => {
                const stackWrapper = mount(
                                            <Stack alignment="trailing" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                            </Stack>,
                                    );
                expect(stackWrapper.prop('alignment')).toBe('trailing');
            });
            it('should verify alignment property when set as center', () => {
                const stackWrapper = mount(
                                            <Stack alignment="center" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                            </Stack>,
                                    );
                expect(stackWrapper.prop('alignment')).toBe('center');
            });
            it('should verify alignment property when set as fill', () => {
                const stackWrapper = mount(
                                            <Stack alignment="fill" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                            </Stack>,
                                    );
                expect(stackWrapper.prop('alignment')).toBe('fill');
            });
            it('should verify alignment property when set as baseline', () => {
                const stackWrapper = mount(
                                            <Stack alignment="baseline" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                            </Stack>,
                                    );
                expect(stackWrapper.prop('alignment')).toBe('baseline');
            });
            it('should have 2 children', () => {
                const stackWrapper = mount(
                                            <Stack alignment="center" theme={theme}>
                                                <Badge>Paid</Badge>
                                                <Badge>Fulfilled</Badge>
                                            </Stack>,
                                        );
                expect(stackWrapper.children()).toHaveLength(2);
            });
        });

        describe('when not set', () => {
            it('basic stack should have rendered 5 div clss element', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div')).toHaveLength(5);
            });
            it('basic stack should have default Stack css clss on div', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('Stack')).toBe(true);
            });
            it('should verify alignment property is not defined', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.prop('alignment')).toBeUndefined();
            });
            it('should not have alignment property', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('alignment')).toHaveLength(0);
            });
            it('should have 2 children', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.children()).toHaveLength(2);
            });
        });
    });

    describe('distribution property', () => {
        describe('when set', () => {
            it('basic stack should have rendered 5 div clss element', () => {
                const stackWrapper = mount(
                                        <Stack distribution="leading" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div')).toHaveLength(5);
            });
            it('basic stack should have default distributionLeading css clss on div when distribution set as distributionLeading', () => {
                const stackWrapper = mount(
                                        <Stack distribution="leading" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('distributionLeading')).toBe(true);
            });
            it('should verify distribution property when set as leading', () => {
                const stackWrapper = mount(
                                            <Stack distribution="leading" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                            </Stack>,
                                    );
                expect(stackWrapper.prop('distribution')).toBe('leading');
            });
            it('basic stack should have default distributionTrailing css clss on div when distribution set as distributionTrailing', () => {
                const stackWrapper = mount(
                                        <Stack distribution="trailing" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('distributionTrailing')).toBe(true);
            });
            it('should verify distribution property when set as trailing', () => {
                const stackWrapper = mount(
                                            <Stack distribution="trailing" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                            </Stack>,
                                    );
                expect(stackWrapper.prop('distribution')).toBe('trailing');
            });
            it('basic stack should have default distributionCenter css clss on div when distribution set as distributionCenter', () => {
                const stackWrapper = mount(
                                        <Stack distribution="center" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('distributionCenter')).toBe(true);
            });
            it('should verify distribution property when set as center', () => {
                const stackWrapper = mount(
                                            <Stack distribution="center" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                            </Stack>,
                                    );
                expect(stackWrapper.prop('distribution')).toBe('center');
            });
            it('basic stack should have default distributionFill css clss on div when distribution set as distributionFill', () => {
                const stackWrapper = mount(
                                        <Stack distribution="fill" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('distributionFill')).toBe(true);
            });
            it('should verify distribution property when set as fill', () => {
                const stackWrapper = mount(
                                            <Stack distribution="fill" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                            </Stack>,
                                    );
                expect(stackWrapper.prop('distribution')).toBe('fill');
            });
             it('basic stack should have default distributionEqualSpacing css clss on div when distribution set as distributionEqualSpacing', () => {
                const stackWrapper = mount(
                                        <Stack distribution="equalSpacing" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('distributionEqualSpacing')).toBe(true);
            });
            it('should verify distribution property when set as equalSpacing', () => {
                const stackWrapper = mount(
                                            <Stack distribution="equalSpacing" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                            </Stack>,
                                    );
                expect(stackWrapper.prop('distribution')).toBe('equalSpacing');
            });
             it('basic stack should have default distributionFillEvenly css clss on div when distribution set as distributionFillEvenly', () => {
                const stackWrapper = mount(
                                        <Stack distribution="fillEvenly" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('distributionFillEvenly')).toBe(true);
            });
            it('should verify distribution property when set as fillEvenly', () => {
                const stackWrapper = mount(
                                            <Stack distribution="fillEvenly" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                            </Stack>,
                                    );
                expect(stackWrapper.prop('distribution')).toBe('fillEvenly');
            });
            it('should have 2 children', () => {
            const stackWrapper = mount(
                                        <Stack alignment="center" theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
            expect(stackWrapper.children()).toHaveLength(2);
            });
        });

        describe('when not set', () => {
            it('basic stack should have rendered 5 div clss element', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div')).toHaveLength(5);
            });
            it('basic stack should have default Stack css class on div', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('div').at(0).hasClass('Stack')).toBe(true);
            });
            it('should verify distribution property is not defined', () => {
                const stackWrapper = mount(
                                            <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                            </Stack>,
                                    );
                expect(stackWrapper.prop('distribution')).toBeUndefined();
            });
            it('should not have distribution property', () => {
                const stackWrapper = mount(
                                        <Stack theme={theme}>
                                          <Badge>Paid</Badge>
                                          <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
                expect(stackWrapper.find('distribution')).toHaveLength(0);
            });
            it('should have 2 children', () => {
            const stackWrapper = mount(
                                        <Stack theme={theme}>
                                            <Badge>Paid</Badge>
                                            <Badge>Fulfilled</Badge>
                                        </Stack>,
                                    );
            expect(stackWrapper.children()).toHaveLength(2);
            });
        });
    });

    describe('stack with item', () => {
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
