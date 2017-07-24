import * as React from 'react';
import { mount } from 'enzyme';
import Modal from '..';
import Button from '../../Button';
import Heading from '../../Heading';

describe('<Modal />', () => {

    const trigger = {
        body: 'Open',
        animate: {
            in: jest.fn(),
            out: jest.fn(),
        },
    };


    const footerNode = <Button > Save </Button>;
    const headerNode = <Heading>This is a Modal Header!!</Heading>;
    const childBody = <span><h1>Hello, world</h1> <p> test L</p></span>;


    describe('when default props are provided', () => {
        it('basic Modal should have rendered 5 div elements with default props', () => {
            const subject = mount(<Modal show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();

        });
    });

    describe('Close Prop', () => {
        it('When not set', () => {
            const subject = mount(<Modal show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When set to false', () => {
            const subject = mount(<Modal close={false} show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('close')).toBe(false);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When set to true', () => {
            const subject = mount(<Modal close={true} show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('close')).toBe(true);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });
    });

    describe('closeOnBackgroud Prop', () => {
        it('When not set', () => {
            const subject = mount(<Modal show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When set to false', () => {
            const subject = mount(<Modal closeOnBackgroud={false} show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('closeOnBackgroud')).toBe(false);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When set to true', () => {
            const subject = mount(<Modal closeOnBackgroud={true} show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('closeOnBackgroud')).toBe(true);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });
    });

    describe('closeOnEsc Prop', () => {
        it('When not set', () => {
            const subject = mount(<Modal show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When set to false', () => {
            const subject = mount(<Modal closeOnEsc={false} show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('closeOnEsc')).toBe(false);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When set to true', () => {
            const subject = mount(<Modal closeOnEsc={true} show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('closeOnEsc')).toBe(true);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });
    });

    describe('modalOverflow Prop', () => {
        it('When not set', () => {
            const subject = mount(<Modal show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When set to false', () => {
            const subject = mount(<Modal modalOverflow={false} show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('modalOverflow')).toBe(false);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When set to true', () => {
            const subject = mount(<Modal modalOverflow={true} show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('modalOverflow')).toBe(true);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });
    });

    describe('backdropEnabled Prop', () => {
        it('When not set', () => {
            const subject = mount(<Modal show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When set to false', () => {
            const subject = mount(<Modal backdropEnabled={false} show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('backdropEnabled')).toBe(false);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When set to true', () => {
            const subject = mount(<Modal backdropEnabled={true} show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('backdropEnabled')).toBe(true);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });
    });

    describe('Size Prop', () => {
        it('When Size type is string with undefined', () => {
            const subject = mount(<Modal show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When Size type is string with Small', () => {
            const subject = mount(<Modal size="Small" show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('size')).toBe('Small');
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When Size type is string with Medium', () => {
            const subject = mount(<Modal size="Medium" show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('size')).toBe('Medium');
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When Size type is string with Large', () => {
            const subject = mount(<Modal size="Large" show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('size')).toBe('Large');
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When Size type is Number', () => {
            const subject = mount(<Modal size={500} show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('size')).toBe(500);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

    });

    describe('header Prop', () => {
        it('When header type is string with undefined', () => {
            const subject = mount(<Modal header="" show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('header')).toBe('');
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When header type is string with any value', () => {
            const subject = mount(<Modal header="This is my header!!" show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('header')).toBe('This is my header!!');
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

        it('When header type is any React Node', () => {
            const subject = mount(<Modal header={headerNode} show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('header')).toMatchObject(headerNode);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            subject.find('button').simulate('click');
            expect(trigger.animate.in).toHaveBeenCalledTimes(1);
            expect(trigger.animate.out).toHaveBeenCalledTimes(0);
            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

    });

    describe('footer Prop', () => {
        it('When footer type is React Node', () => {
            const subject = mount(<Modal footer={footerNode} show={false} trigger={trigger}>{childBody}</Modal>);
            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('footer')).toMatchObject(footerNode);
            expect(subject.find('div')).toHaveLength(6);
            expect(subject.find('button').exists()).toBe(true);

            trigger.animate.in.mockClear();
            trigger.animate.out.mockClear();
        });

    });

});

