import * as React from 'react';
import Image from '..';
import { mount } from 'enzyme';

describe('source', () => {
    it('should verify the source type of the string', () => {
        const imageWrapper = mount(<Image source="string" title ="" alt=""/>);
        expect(typeof imageWrapper.prop('source')).toBe('string');
    });

    it('should verify the source of the Image url', () => {
        const imageWrapper = mount(<Image source="https://www.w3schools.com/css/trolltunga.jpg" title ="" alt=""/>);
        expect(imageWrapper.prop('source')).toBe('https://www.w3schools.com/css/trolltunga.jpg');
    });
});

describe('alt', () => {
    it('should verify the alt type of the string', () => {
        const imageWrapper = mount(<Image source="" alt="string" title=""/>);
        expect(typeof imageWrapper.prop('alt')).toBe('string');
    });

    it('should verify the text of alt is empty', () => {
        const imageWrapper = mount(<Image source="" title="" alt="" />);
        expect(imageWrapper.prop('alt')).toBeUndefined;
    });

    it('should verify the text of alt is', () => {
        const imageWrapper = mount(<Image source="" alt="No Image.. Thanks!!" title=""/>);
        expect(imageWrapper.prop('alt')).toBe('No Image.. Thanks!!');
    });
});

describe('title', () => {
    it('should verify the title type of the string', () => {
        const imageWrapper = mount(<Image source="" title="string" alt=""/>);
        expect(typeof imageWrapper.prop('title')).toBe('string');
    });

    it('should verify the title', () => {
        const imageWrapper = mount(<Image source="" title ="Text tooltip" alt=""/>);
        expect(imageWrapper.prop('title')).toBe('Text tooltip');
    });
});

