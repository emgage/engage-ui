import * as React from 'react';
import { mount } from 'enzyme';
import Modal from '..';
import Button from '../../Button';
import Heading from '../../Heading';

describe('<Modal />', () => {

    const trigger = {
        body: 'Open',
        animate: {
            in: (modal: any, dialog: any) => this.animateIn(modal, dialog),
            out: (modal: any, dialog: any) => this.animateOut(modal, dialog)
        }
    };

    const footerNode = <Button > Save </Button>;
    const headerNode = <Heading>This is a Modal Header!!</Heading>


    describe('when default props are provided', () => {
        it('Modal should be rendered with default props', () => {
            const subject = mount(
                <Modal
                    show={false}
                    trigger={trigger}
                >
                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('trigger')).toMatchObject(trigger);
            expect(subject.prop('show')).toBe(false);
        });
    });

    describe('Close Props', () => {
        it('Default value = true, for close props', () => {
            const subject = mount(
                <Modal
                    close={true}
                    show={false}
                    trigger={trigger}
                >

                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('close')).toBe(true);
        });

        it('Default value = false, for close props', () => {
            const subject = mount(
                <Modal
                    close={false}
                    show={false}
                    trigger={trigger}
                >

                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('close')).toBe(false);
        });
    });

    describe('closeOnBackgroud props', () => {
        it('Default value = true, for closeOnBackgroud props', () => {
            const subject = mount(
                <Modal
                    closeOnBackgroud={true}
                    show={false}
                    trigger={trigger}
                >

                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('closeOnBackgroud')).toBe(true);
        });

        it('Default value = false, for closeOnBackgroud props', () => {
            const subject = mount(
                <Modal
                    closeOnBackgroud={false}
                    show={false}
                    trigger={trigger}
                >

                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('closeOnBackgroud')).toBe(false);
        });
    });

    describe('closeOnEsc props', () => {
        it('Default value = true, for closeOnEsc props', () => {
            const subject = mount(
                <Modal
                    closeOnEsc={true}
                    show={false}
                    trigger={trigger}
                >

                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('closeOnEsc')).toBe(true);
        });

        it('Default value = false, for closeOnEsc props', () => {
            const subject = mount(
                <Modal
                    closeOnEsc={false}
                    show={false}
                    trigger={trigger}
                >

                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('closeOnEsc')).toBe(false);
        });
    });

    describe('modalOverflow props', () => {
        it('Default value = true, for modalOverflow props', () => {
            const subject = mount(
                <Modal
                    modalOverflow={true}
                    show={false}
                    trigger={trigger}
                >

                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('modalOverflow')).toBe(true);
        });

        it('Default value = false, for modalOverflow props', () => {
            const subject = mount(
                <Modal
                    modalOverflow={false}
                    show={false}
                    trigger={trigger}
                >

                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('modalOverflow')).toBe(false);
        });
    });

    describe('when default props are provided', () => {
        it('Default type for size = string, for size props', () => {
            const subject = mount(
                <Modal
                    size='Medium'
                    show={false}
                    trigger={trigger}
                >

                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('size')).toBe('Medium');
        });

        it('Default type for size = Number, for size props', () => {
            const subject = mount(
                <Modal
                    size={300}
                    show={false}
                    trigger={trigger}
                >

                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('size')).toBe(300);
        });
    });

    describe('when default props are provided', () => {
        it('Default, footer as React Node for footer props', () => {
            const subject = mount(
                <Modal
                    show={false}
                    trigger={trigger}
                    footer={footerNode}
                >

                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('footer')).toMatchObject(footerNode);
        });

    });

    describe('when default props are provided', () => {
        it('Default, header as React Node for header props', () => {
            const subject = mount(
                <Modal
                    show={false}
                    trigger={trigger}
                    header={headerNode}
                >

                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('header')).toMatchObject(headerNode);
        });

    });

    describe('when default props are provided', () => {
        it('Default, header as React Node for header props', () => {
            const subject = mount(
                <Modal
                    show={false}
                    trigger={trigger}
                    header={"This is my React Header!!"}
                >

                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('header')).toBe('This is my React Header!!');
        });

    });

    describe('when All props are provided', () => {
        it('All Props for Modal component', () => {
            const subject = mount(
                <Modal
                    close={true}
                    closeOnBackgroud={true}
                    closeOnEsc={true}
                    modalOverflow={true}
                    header='This is my React Header!!'
                    footer={footerNode}
                    size='Medium'
                    show={false}
                    trigger={trigger}
                >

                    <h2>Headline test</h2>
                    <p>
                        test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    </p>

                </Modal>
            );

            expect(subject.prop('close')).toBe(true);
            expect(subject.prop('show')).toBe(false);
            expect(subject.prop('closeOnBackgroud')).toBe(true);
            expect(subject.prop('closeOnEsc')).toBe(true);
            expect(subject.prop('modalOverflow')).toBe(true);
            expect(subject.prop('header')).toBe('This is my React Header!!');
            expect(subject.prop('footer')).toMatchObject(footerNode);
            expect(subject.prop('size')).toBe('Medium');
            expect(subject.prop('trigger')).toMatchObject(trigger);
        });

    });

});


