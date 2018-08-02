import * as React from 'react';
import { mount } from 'enzyme';
import TextField from '../../TextField/TextField';
import FormLayout from '../FormLayout';
import Group from '../Group';

describe('<FormLayout />', () => {
    const theme = {
                        formLayout: 'FormLayout',
                        condensed: 'condensed',
                        title: 'Title',
                        items: 'Items',
                        helpText: 'HelpText',
                        item: 'Item',
                    };
    describe('Default FormLayout', () => {
        it('should verify formlayout without children has 1 div tag', () => {
        const formlayoutWrapper = mount(
                                        <FormLayout>
                                        </FormLayout>
                                    );
        expect(formlayoutWrapper.find('div').length).toBe(1);
        });
        it('should verify number of components and keys respect to the position', () => {
        const formlayoutWrapper = mount(
                                        <FormLayout>
                                            <TextField label="Store name" />
                                            <TextField label="Account email"/>
                                        </FormLayout>
                                    );

        expect(formlayoutWrapper.find('input').length).toBe(2);
        expect(formlayoutWrapper.childAt(0).childAt(0).childAt(0).key()).toBe('0/.0');
        expect(formlayoutWrapper.childAt(0).childAt(0).childAt(1).key()).toBe('1/.1');
        });
        it('should verify that it has 2 Textfields as children', () => {
        const formlayoutWrapper = mount(
                                        <FormLayout>
                                            <TextField label="Store name" />
                                            <TextField label="Account email"/>
                                        </FormLayout>
                                    );
        expect(formlayoutWrapper.find('TextField').length).toBe(2);
        });
    });
    describe('Formlayout with Field Groups', () => {
        it('should verify formlayout with Group and do not have any children has 3 div tag', () => {
        const formlayoutWrapper = mount(
                                        <FormLayout>
                                            <Group condensed>
                                            </Group>
                                        </FormLayout>
                                    );
        expect(formlayoutWrapper.find('div').length).toBe(3);
        });
        it('should verify formlayout Group when Group is defined', () => {
        const formlayoutWrapper = mount(
                                            <FormLayout>
                                            <Group>
                                            <TextField
                                                type="number"
                                                label="Minimum order"
                                            />
                                            <TextField
                                                type="number"
                                                label="Maximum order"
                                            />
                                            </Group>
                                            </FormLayout>
                                    );
        expect(formlayoutWrapper.find(Group).length).toBe(1);
        });
        it('should verify the formlayout with Groups and keys respect to the position', () => {
        const formlayoutWrapper = mount(
                                            <FormLayout>
                                            <Group>
                                            <TextField
                                                type="number"
                                                label="Minimum order"
                                            />
                                            <TextField
                                                type="number"
                                                label="Maximum order"
                                            />
                                            </Group>
                                            </FormLayout>
                                    );

        expect(formlayoutWrapper.childAt(0).children().childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).key()).toBe('.0');
        expect(formlayoutWrapper.childAt(0).children().childAt(0).childAt(0).childAt(0).childAt(0).childAt(1).key()).toBe('.1');
        });
    });
    describe('Formlayout with condensed option', () => {
        it('should verify the formlayout with condensed format', () => {
        const formlayoutWrapper = mount(
                                        <FormLayout>
                                            <Group condensed>
                                            <TextField label="Length" />
                                            <TextField label="Width" />
                                            <TextField label="Height" />
                                            <TextField label="Unit" />
                                            </Group>
                                        </FormLayout>
                                    );

        expect(formlayoutWrapper.childAt(0).childAt(0).childAt(0).prop('condensed')).toBe(true);
        expect(formlayoutWrapper.childAt(0).children().childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).key()).toBe('.0');
        expect(formlayoutWrapper.childAt(0).children().childAt(0).childAt(0).childAt(0).childAt(0).childAt(1).key()).toBe('.1');
        expect(formlayoutWrapper.childAt(0).children().childAt(0).childAt(0).childAt(0).childAt(0).childAt(2).key()).toBe('.2');
        expect(formlayoutWrapper.childAt(0).children().childAt(0).childAt(0).childAt(0).childAt(0).childAt(3).key()).toBe('.3');
        });
        it('should verify form layout when condensed is undefined', () => {
        const formlayoutWrapper = mount(
                                        <FormLayout>
                                            <Group componentTitle="groupTitle">
                                            <TextField label="Length" />
                                            <TextField label="Width" />
                                            <TextField label="Height" />
                                            <TextField label="Unit" />
                                            </Group>
                                        </FormLayout>
                                    );
        expect(formlayoutWrapper.childAt(0).childAt(0).childAt(0).prop('condensed')).toBeFalsy();
        });
        it('should verify form layout when condensed is false', () => {
        const formlayoutWrapper = mount(<FormLayout>
                                    <Group componentTitle="groupTitle" condensed={false}>
                                        <TextField label="Length" />
                                        <TextField label="Width" />
                                        <TextField label="Height" />
                                        <TextField label="Unit" />
                                        </Group>
                                    </FormLayout>
                                    );

        expect(formlayoutWrapper.childAt(0).childAt(0).childAt(0).prop('condensed')).toBe(false);
        });
    });
    describe('Formlayout with Theme applied', () => {
        it('should verify formlayout class for first div tag', () => {
            const formlayoutWrapper = mount(
                                            <FormLayout theme={theme}>
                                                <Group theme={theme} condensed>
                                                    <TextField label="Length" />
                                                    <TextField label="Height" />
                                                </Group>
                                            </FormLayout>
                                        );
            expect(formlayoutWrapper.find('div').at(0).hasClass('FormLayout')).toBe(true);
        });
        it('should verify condensed class when condensed set', () => {
            const formlayoutWrapper = mount(
                                            <FormLayout theme={theme}>
                                                <Group theme={theme} condensed>
                                                    <TextField label="Length" />
                                                    <TextField label="Height" />
                                                </Group>
                                            </FormLayout>
                                        );
            expect(formlayoutWrapper.find('div').at(1).hasClass('condensed')).toBe(true);
        });
        it('should verify condensed class when condensed set', () => {
            const formlayoutWrapper = mount(
                                            <FormLayout theme={theme}>
                                                <Group theme={theme} condensed>
                                                    <TextField label="Length" />
                                                    <TextField label="Height" />
                                                </Group>
                                            </FormLayout>
                                        );
            expect(formlayoutWrapper.find('div').at(2).hasClass('Items')).toBe(true);
        });
    });
});
