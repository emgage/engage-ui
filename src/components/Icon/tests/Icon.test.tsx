import * as React from 'react';
import { mount } from 'enzyme';
import Icon from '..';

const theme = {
  Icon: 'Icon',
  hasBackdrop: 'hasBackdrop',
  colorWhite: 'colorWhite',
  Svg: 'Svg',
  Placeholder: 'Placeholder',
};

describe('<Icon />', () => {

  describe('when default props are provided', () => {
    it('basic icon should have rendered one span element', () => {
      const iconWrapper = mount(
                                <Icon source="notes" theme={theme} />,
                          );
      expect(iconWrapper.find('span')).toHaveLength(1);
    });
    it('basic icon should have rendered with one icon clss on span', () => {
      const iconWrapper = mount(
                                <Icon source="notes" theme={theme} />,
                          );
      expect(iconWrapper.find('span').hasClass('Icon'));
    });
  });

  describe('source property', () => {
    describe('when set as svg source', () => {
      it('basic icon should have rendered one span element', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.find('span')).toHaveLength(1);
      });
      it('basic icon should have rendered with one icon clss on span', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.find('span').hasClass('Icon'));
      });
      it('should verify given source', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.prop('source')).toBe('notes');
      });
    });

      describe('when set as placeholder', () => {
        it('basic icon should have rendered one span element', () => {
          const iconWrapper = mount(
                                    <Icon source="placeholder" theme={theme} />,
                              );
          expect(iconWrapper.find('span')).toHaveLength(1);
        });
        it('basic icon should have rendered with one icon clss on span', () => {
          const iconWrapper = mount(
                                    <Icon source="placeholder" theme={theme} />,
                              );
          expect(iconWrapper.find('span').hasClass('Icon'));
        });
        it('basic icon should have rendered one div element', () => {
          const iconWrapper = mount(
                                    <Icon source="placeholder" theme={theme} />,
                              );
          expect(iconWrapper.find('div')).toHaveLength(1);
        });
        it('basic icon should have rendered with one placeholder clss on div', () => {
          const iconWrapper = mount(
                                    <Icon source="placeholder" theme={theme} />,
                              );
          expect(iconWrapper.find('div').hasClass('Placeholder'));
        });
        it('should verify given source', () => {
          const iconWrapper = mount(
                                    <Icon source="placeholder" theme={theme} />,
                              );
          expect(iconWrapper.prop('source')).toBe('placeholder');
        });
      });
  });

  describe('color property', () => {
    describe('when set', () => {
      it('basic icon should have rendered one span element', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" color="white" theme={theme} />,
                            );
        expect(iconWrapper.find('span')).toHaveLength(1);
      });
      it('basic icon should have rendered with one colorWhite clss on span', () => {
        const iconWrapper = mount(
                                  <Icon source="placeholder" color="white" theme={theme} />,
                            );
        expect(iconWrapper.find('span').hasClass('colorWhite'));
      });
      it('should verify given color when source as svg ', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" color="white" theme={theme} />,
                            );
        expect(iconWrapper.prop('color')).toBe('white');
      });
      it('should verify given color when source as placeholder ', () => {
        const iconWrapper = mount(
                                  <Icon source="placeholder" color="white" theme={theme} />,
                            );
        expect(iconWrapper.prop('color')).toBe('white');
      });
    });

    describe('when not set', () => {
      it('basic icon should have rendered one span element', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.find('span')).toHaveLength(1);
      });
      it('basic icon should have rendered with one icon clss on span', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.find('span').hasClass('Icon'));
      });
      it('should not have color property', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.find('color')).toHaveLength(0);
      });
      it('should verify color property is not defined', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.prop('color')).toBeUndefined();
      });
    });
  });

  describe('backdrop property', () => {
    describe('when set to true', () => {
      it('basic icon should have rendered one span element', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" backdrop theme={theme} />,
                            );
        expect(iconWrapper.find('span')).toHaveLength(1);
      });
      it('basic icon should have rendered with one hasBackdrop clss on span', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" backdrop theme={theme} />,
                            );
        expect(iconWrapper.find('span').hasClass('hasBackdrop'));
      });
      it('should verify backdrop when source as svg ', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" backdrop theme={theme} />,
                            );
        expect(iconWrapper.prop('backdrop')).toBe(true);
      });
      it('should verify backdrop when source as placeholder ', () => {
        const iconWrapper = mount(
                                  <Icon source="placeholder" backdrop theme={theme} />,
                            );
        expect(iconWrapper.prop('backdrop')).toBe(true);
      });
    });

    describe('when set to false', () => {
      it('basic icon should have rendered one span element', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" backdrop={false} theme={theme} />,
                            );
        expect(iconWrapper.find('span')).toHaveLength(1);
      });
      it('basic icon should have rendered with one hasBackdrop clss on span', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" backdrop={false} theme={theme} />,
                            );
        expect(iconWrapper.find('span').hasClass('hasBackdrop'));
      });
      it('should verify backdrop when source as svg ', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" backdrop={false} theme={theme} />,
                            );
        expect(iconWrapper.prop('backdrop')).toBe(false);
      });
      it('should verify backdrop when source as placeholder ', () => {
        const iconWrapper = mount(
                                  <Icon source="placeholder" backdrop={false} theme={theme} />,
                            );
        expect(iconWrapper.prop('backdrop')).toBe(false);
      });
    });

    describe('when not set', () => {
      it('basic icon should have rendered one span element', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.find('span')).toHaveLength(1);
      });
      it('basic icon should have rendered with one icon clss on span', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.find('span').hasClass('Icon'));
      });
      it('should not have backdrop property', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.find('backdrop')).toHaveLength(0);
      });
      it('should verify backdrop property is not defined', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.prop('backdrop')).toBeUndefined();
      });
    });
  });

  describe('accessibilityLabel property', () => {
    describe('when set', () => {
      it('basic icon should have rendered one span element', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" accessibilityLabel="This is an icon" theme={theme} />,
                            );
        expect(iconWrapper.find('span')).toHaveLength(1);
      });
      it('basic icon should have rendered with one icon clss on span', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" accessibilityLabel="This is an icon" theme={theme} />,
                            );
        expect(iconWrapper.find('span').hasClass('Icon'));
      });
      it('should verify the label as the aria-label for the svg source', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" accessibilityLabel="This is an icon" theme={theme} />,
                            );
        expect(iconWrapper.prop('accessibilityLabel')).toBe('This is an icon');
      });
      it('should verify the label as the aria-label for the placeholder source', () => {
        const iconWrapper = mount(
                                  <Icon source="placeholder" accessibilityLabel="This is an icon" theme={theme} />,
                            );
        expect(iconWrapper.prop('accessibilityLabel')).toBe('This is an icon');
      });
    });

    describe('when not set', () => {
      it('basic icon should have rendered one span element', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.find('span')).toHaveLength(1);
      });
      it('basic icon should have rendered with one icon clss on span', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.find('span').hasClass('Icon'));
      });
      it('should not have accessibilityLabel property', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.find('accessibilityLabel')).toHaveLength(0);
      });
      it('should verify accessibilityLabel property is not defined', () => {
        const iconWrapper = mount(
                                  <Icon source="notes" theme={theme} />,
                            );
        expect(iconWrapper.prop('accessibilityLabel')).toBeUndefined();
      });
    });
  });
});
