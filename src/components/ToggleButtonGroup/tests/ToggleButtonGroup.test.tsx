import * as React from 'react';
import { mount } from 'enzyme';
import ToggleButtonGroup from '../ToggleButtonGroup';

const theme = {
  ToggleButtonGroup: 'ToggleButtonGroup',
  segmented: 'segmented',
};

describe('<ToggleButtonGroup />', () => {

  describe('when default props are provided', () => {
    it('ToggleButtonGroup should be rendered with default props', () => {
      const buttonWrapper = mount(<ToggleButtonGroup theme={theme} />);
      expect(buttonWrapper.find('div')).toHaveLength(2);
      expect(buttonWrapper.find('div').at(1).hasClass('ToggleButtonGroup'));
    });
  });

  describe('segmented property', () => {
    describe('when set', () => {
      describe('when set to true', () => {
        it('ToggleButtonGroup should have segmented property', () => {
          const buttonWrapper = mount(
                                       <ToggleButtonGroup segmented theme={theme}>
                                          <button>Button 1</button>
                                          <button>Button 2</button>
                                        </ToggleButtonGroup>
                                      );
          expect(buttonWrapper.find('div')).toHaveLength(4);
          expect(buttonWrapper.find('div').at(0).hasClass('segmented'));
          expect(buttonWrapper.find('div').at(1).hasClass(''));
          expect(buttonWrapper.find('div').at(2).hasClass(''));
          expect(buttonWrapper.find('button')).toHaveLength(2);
          expect(buttonWrapper.find('button').at(0).text()).toBe('Button 1');
          expect(buttonWrapper.find('button').at(1).text()).toBe('Button 2');
          expect(buttonWrapper.prop('segmented')).toBe(true);
        });
      });

      describe('when set to false', () => {
        it('ToggleButtonGroup should have segmented property', () => {
          const buttonWrapper = mount(
                                       <ToggleButtonGroup segmented={false} theme={theme}>
                                          <button>Button 1</button>
                                          <button>Button 2</button>
                                        </ToggleButtonGroup>
                                      );
          expect(buttonWrapper.find('div')).toHaveLength(4);
          expect(buttonWrapper.find('div').at(0).hasClass('segmented'));
          expect(buttonWrapper.find('div').at(1).hasClass(''));
          expect(buttonWrapper.find('div').at(2).hasClass(''));
          expect(buttonWrapper.find('button')).toHaveLength(2);
          expect(buttonWrapper.find('button').at(0).text()).toBe('Button 1');
          expect(buttonWrapper.find('button').at(1).text()).toBe('Button 2');
          expect(buttonWrapper.prop('segmented')).toBe(false);
        });
      });
    });

    describe('when not set', () => {
      it('ToggleButtonGroup should not have segmented property', () => {
        const buttonWrapper = mount(<ToggleButtonGroup theme={theme} />);
        expect(buttonWrapper.find('div')).toHaveLength(2);
        expect(buttonWrapper.find('div').at(0).hasClass('ToggleButtonGroup'));
        expect(buttonWrapper.find('segmented')).toHaveLength(0);
        expect(buttonWrapper.prop('segmented')).toBeUndefined();
      });
    });
  });

  describe('children property', () => {
    describe('when set', () => {
      it('ToggleButtonGroup should have children property', () => {
        const buttonWrapper = mount(
                                       <ToggleButtonGroup theme={theme}>
                                          <button>Button 1</button>
                                          <button>Button 2</button>
                                        </ToggleButtonGroup>
                                      );
        expect(buttonWrapper.find('div')).toHaveLength(4);
        expect(buttonWrapper.find('div').at(0).hasClass('ToggleButtonGroup'));
        expect(buttonWrapper.find('div').at(1).hasClass(''));
        expect(buttonWrapper.find('div').at(2).hasClass(''));
        expect(buttonWrapper.find('button')).toHaveLength(2);
        expect(buttonWrapper.find('button').at(0).text()).toBe('Button 1');
        expect(buttonWrapper.find('button').at(1).text()).toBe('Button 2');
        expect(buttonWrapper.find('button').at(0).prop('children')).toBe('Button 1');
        expect(buttonWrapper.find('button').at(1).prop('children')).toBe('Button 2');
      });
    });

    describe('when not set', () => {
      it('ToggleButtonGroup should have children property', () => {

        const buttonWrapper = mount(<ToggleButtonGroup theme={theme} />);
        expect(buttonWrapper.find('div')).toHaveLength(2);
        expect(buttonWrapper.find('div').at(1).hasClass('ToggleButtonGroup'));
        expect(buttonWrapper.find('children')).toHaveLength(0);
        expect(buttonWrapper.prop('children')).toBeUndefined();
      });
    });
  });
});
