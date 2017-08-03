import * as React from 'react';
import { mount } from 'enzyme';
import Image from '../Image';
  const url = 'https://www.w3schools.com/css/trolltunga.jpg';
    const alt = 'No Image.. Thanks!!';
    const title = 'Text tooltip';

describe('<Image />', () => {

    describe('when default props are provided', () => {
        it('basic image should have rendered 1 div elements', () => {
            const imageWrapper = mount(
                                    <Image source={url} alt={alt} />,
                                 );
            expect(imageWrapper.find('Image')).toHaveLength(1);
        });
        it('should verify defult source property', () => {
            const imageWrapper = mount(
                                    <Image source={url} alt={alt} />,
                                 );
            expect(imageWrapper.find('source')).toBeTruthy();
        });
        it('should verify default alt property', () => {
            const imageWrapper = mount(
                                    <Image  source={url} alt={alt} />,
                                 );
            expect(imageWrapper.find('alt')).toBeTruthy();
        });
    });

    describe('source prop', () => {

        describe('when set', () => {
            it('basic image should have rendered 1 div elements', () => {
                const imageWrapper = mount(
                                        <Image source={url} alt={alt} />,
                                     );
                expect(imageWrapper.find('Image')).toHaveLength(1);
            });
            it('should verify defult source property', () => {
                const imageWrapper = mount(
                                        <Image source={url} alt={alt} />,
                                     );
                expect(imageWrapper.find('source')).toBeTruthy();
            });
            it('should verify default alt property', () => {
                const imageWrapper = mount(
                                        <Image  source={url} alt={alt} />,
                                    );
                expect(imageWrapper.find('alt')).toBeTruthy();
            });
            it('should verify the source of the url', () => {
                const imageWrapper = mount(
                                        <Image source={url} alt={alt} />,
                                     );
                expect(imageWrapper.prop('source')).toBe(url);
            });
        });
    });

    describe('alt prop', () => {

        describe('when set', () => {
            it('basic image should have rendered 1 div elements', () => {
            const imageWrapper = mount(
                                    <Image source={url} alt={alt} />,
                                 );
            expect(imageWrapper.find('Image')).toHaveLength(1);
            });
            it('should verify defult source property', () => {
            const imageWrapper = mount(
                                    <Image source={url} alt={alt} />,
                                 );
            expect(imageWrapper.find('source')).toBeTruthy();
            });
            it('should verify default alt property', () => {
            const imageWrapper = mount(
                                    <Image  source={url} alt={alt} />,
                                 );
            expect(imageWrapper.find('alt')).toBeTruthy();
            });
            it('should verify the alt of the text', () => {
                const imageWrapper = mount(
                                        <Image source={url} alt={alt} />,
                                     );
                expect(imageWrapper.prop('alt')).toBe(alt);
            });
        });
    });

    describe('title prop', () => {

        describe('when set', () => {
            it('basic image should have rendered 1 div elements', () => {
                const imageWrapper = mount(
                                        <Image source={url} alt={alt} title={title} />,
                                     );
                expect(imageWrapper.find('Image')).toHaveLength(1);
            });

            it('should verify defult source property', () => {
                const imageWrapper = mount(
                                        <Image source={url} alt={alt} title={title} />,
                                     );
                expect(imageWrapper.find('source')).toBeTruthy();
            });
            it('should verify default alt property', () => {
                const imageWrapper = mount(
                                        <Image  source={url} alt={alt} title={title} />,
                                     );
                expect(imageWrapper.find('alt')).toBeTruthy();
            });
            it('should verify title property', () => {
                const imageWrapper = mount(
                                        <Image source={url} alt={alt} title={title} />,
                                     );
                expect(imageWrapper.find('title')).toBeTruthy();
            });
            it('should verify set the text of title is', () => {
                const imageWrapper = mount(
                                        <Image source={url} alt={alt} title={title} />,
                                     );
                expect(imageWrapper.prop('title')).toBe(title);
            });
        });

        describe('when not set', () => {
            it('basic title should have rendered 1 div elements', () => {
                const imageWrapper = mount(
                                        <Image source={url} alt={alt} />,
                                     );
                expect(imageWrapper.find('Image')).toHaveLength(1);
            });
            it('should verify defult source property', () => {
                const imageWrapper = mount(
                                        <Image source={url} alt={alt} />,
                                     );
                expect(imageWrapper.find('source')).toBeTruthy();
            });
            it('should verify default alt property', () => {
                const imageWrapper = mount(
                                        <Image source={url} alt={alt} />,
                                     );
                expect(imageWrapper.find('title')).toBeTruthy();
            });
            it('should verify title property', () => {
                const imageWrapper = mount(
                                        <Image source={url} alt={alt} />,
                                     );
                expect(imageWrapper.prop('title')).toBeUndefined();
            });
            it('should not have title element', () => {
                const imageWrapper = mount(
                                        <Image source={url} alt={alt} />,
                                     );
                expect(imageWrapper.find('title')).toHaveLength(0);
            });
        });
    });
});
