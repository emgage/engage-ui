import * as React from 'react';
import { mount } from 'enzyme';
import ButtonGroup from '../ButtonGroup';

const theme = {
  buttonGroup: 'ButtonGroup',
  segmented: 'segmented',
};

describe('<ButtonGroup />', () => {

  describe('when default props are provided', () => {
    it('buttongroup should be rendered with default props', () => {
      const buttonWrapper = mount(<ButtonGroup theme={theme} />);
      expect(buttonWrapper.find('div')).toHaveLength(1);
      expect(buttonWrapper.find('div').hasClass('ButtonGroup'));
    });
  });

  describe('segmented property', () => {
    describe('when set', () => {
      describe('when set to true', () => {
        it('buttongroup should have segmented property', () => {
          const buttonWrapper = mount(
                                       <ButtonGroup segmented theme={theme}>
                                          <button>Button 1</button>
                                          <button>Button 2</button>
                                        </ButtonGroup>
                                      );
          expect(buttonWrapper.find('div')).toHaveLength(3);
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
        it('buttongroup should have segmented property', () => {
          const buttonWrapper = mount(
                                       <ButtonGroup segmented={false} theme={theme}>
                                          <button>Button 1</button>
                                          <button>Button 2</button>
                                        </ButtonGroup>
                                      );
          expect(buttonWrapper.find('div')).toHaveLength(3);
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
      it('buttongroup should not have segmented property', () => {
        const buttonWrapper = mount(<ButtonGroup theme={theme} />);
        expect(buttonWrapper.find('div')).toHaveLength(1);
        expect(buttonWrapper.find('div').hasClass('ButtonGroup'));
        expect(buttonWrapper.find('segmented')).toHaveLength(0);
        expect(buttonWrapper.prop('segmented')).toBeUndefined();
      });
    });
  });

  describe('children property', () => {
    describe('when set', () => {
      it('buttongroup should have children property', () => {
        const buttonWrapper = mount(
                                       <ButtonGroup theme={theme}>
                                          <button>Button 1</button>
                                          <button>Button 2</button>
                                        </ButtonGroup>
                                      );
        expect(buttonWrapper.find('div')).toHaveLength(3);
        expect(buttonWrapper.find('div').at(0).hasClass('ButtonGroup'));
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
      it('buttongroup should have children property', () => {

        const buttonWrapper = mount(<ButtonGroup theme={theme} />);
        expect(buttonWrapper.find('div')).toHaveLength(1);
        expect(buttonWrapper.find('div').hasClass('ButtonGroup'));
        expect(buttonWrapper.find('children')).toHaveLength(0);
        expect(buttonWrapper.prop('children')).toBeUndefined();
      });
    });
  });
});
