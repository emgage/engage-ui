import * as React from 'react';
import {mount} from 'enzyme';
import Subheading from '../Subheading';

describe('Subheading Component Suit', () => {
    describe('Test children property', () => {
        it('should verify children property is defined', () => {
            const subheadingWrapper = mount(<Subheading>Online store dashboard</Subheading>);
            expect(subheadingWrapper.prop('children')).toBe('Online store dashboard');
        });

         it('should verify children property is not defined', () => {
            const subheadingWrapper = mount(<Subheading/>);
            expect(subheadingWrapper.prop('children')).toBeUndefined();
        });
    });

    describe('Test element property', () => {
        it('should verify element property when set as h1', () => {
            const subheadingWrapper = mount(<Subheading element="h1">Online store dashboard</Subheading>);
            expect(subheadingWrapper.prop('element')).toBe('h1');
        });

         it('should verify element property when set as h2', () => {
            const subheadingWrapper = mount(<Subheading element="h2">Online store dashboard</Subheading>);
            expect(subheadingWrapper.prop('element')).toBe('h2');
        });

         it('should verify element property when set as h3', () => {
            const subheadingWrapper = mount(<Subheading element="h3">Online store dashboard</Subheading>);
            expect(subheadingWrapper.prop('element')).toBe('h3');
        });

         it('should verify element property when set as h4', () => {
            const subheadingWrapper = mount(<Subheading element="h4">Online store dashboard</Subheading>);
            expect(subheadingWrapper.prop('element')).toBe('h4');
        });

         it('should verify element property when set as h5', () => {
            const subheadingWrapper = mount(<Subheading element="h5">Online store dashboard</Subheading>);
            expect(subheadingWrapper.prop('element')).toBe('h5');
        });

         it('should verify element property when set as h6', () => {
            const subheadingWrapper = mount(<Subheading element="h6">Online store dashboard</Subheading>);
            expect(subheadingWrapper.prop('element')).toBe('h6');
        });

         it('should verify element property when set as p', () => {
            const subheadingWrapper = mount(<Subheading element="p">Online store dashboard</Subheading>);
            expect(subheadingWrapper.prop('element')).toBe('p');
        });

        it('should verify element property is not defined', () => {
            const subheadingWrapper = mount(<Subheading>Online store dashboard</Subheading>);
            expect(subheadingWrapper.prop('element')).toBeUndefined();
        });
    });
});
