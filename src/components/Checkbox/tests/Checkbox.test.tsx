import * as React from 'react';
import { mount } from 'enzyme';
import Checkbox from '../Checkbox';

const theme = {
  checkbox: 'checkbox',
  error: 'error',
  input: 'input',
  backdrop: 'backdrop',
  icon: 'icon',
};

describe('<Checkbox />', () => {
  describe('when default props are provided', () => {
    it('basic checkbox should have rendere label, div, input,span element and class on it', () => {
      const checkboxWrapper = mount(
                                    <Checkbox label="Checkbox" theme={theme} />
                                   );
      expect(checkboxWrapper.find('label')).toHaveLength(1);
      expect(checkboxWrapper.find('div')).toHaveLength(1);
      expect(checkboxWrapper.find('input')).toHaveLength(1);
    });
  });

  describe('onChange()', () => {
    it('is called with the new checked value of the input on change', () => {
      const spy = jest.fn();
      const checkboxWrapper = mount(<Checkbox label="Checkbox" onChange={spy} theme={theme} />);

      (checkboxWrapper.find('input') as any).instance().checked = true;
      checkboxWrapper.find('div').at(0).simulate('click');
    });
  });

  describe('checked property', () => {
    describe('when not set', () => {
      it('should verify checkbox when checked is not set', () => {
        const checkboxWrapper = mount(<Checkbox label="Checkbox" theme={theme} />);

        expect(checkboxWrapper.prop('checked')).toBeUndefined();
      });
    });
    describe('when set as true', () => {
      it('should verify checkbox when checked is set as true', () => {
        const checkboxWrapper = mount(<Checkbox label="Checkbox" checked theme={theme} />);

        expect(checkboxWrapper.prop('checked')).toBe(true);
      });
    });
    describe('when set as false', () => {
      it('should verify checkbox when checked is set as false', () => {
        const checkboxWrapper = mount(<Checkbox label="Checkbox" checked={false} theme={theme} />);

        expect(checkboxWrapper.prop('checked')).toBe(false);
      });
    });
  });

  describe('name property', () => {
    describe('when set', () => {
      it('should verify checkbox when name is set', () => {
        const checkboxWrapper = mount(<Checkbox label="Checkbox" name="Soccer" theme={theme} />);

        expect(checkboxWrapper.prop('name')).toBe('Soccer');
      });
    });
  });

  describe('id property', () => {
    describe('when not set', () => {
      it('should verify render a random id for the checkbox when id is not set', () => {
        const checkboxWrapper = mount(<Checkbox label="Checkbox" theme={theme}/>);

        expect(checkboxWrapper.find('input').prop('id')).toBeTruthy();
      });
    });
    describe('when set', () => {
      it('should verify checkbox when id is set', () => {
        const checkboxWrapper = mount(<Checkbox label="Checkbox" componentId="MyCheckbox" theme={theme} />);

        expect(checkboxWrapper.find('input').prop('id')).toBe('MyCheckbox');
      });
    });
  });

  describe('disabled property', () => {
    describe('when set as true', () => {
      it('should verify checkbox when disbaled is set as true', () => {
        const checkboxWrapper = mount(<Checkbox label="Checkbox" disabled theme={theme} />);

        expect(checkboxWrapper.find('input').prop('disabled')).toBe(true);
      });
    });
    describe('when set as false', () => {
      it('should verify checkbox when disbaled is set as false', () => {
        const checkboxWrapper = mount(<Checkbox label="Checkbox" disabled={false} theme={theme} />);

        expect(checkboxWrapper.find('input').prop('disabled')).toBe(false);
      });
    });
  });

  describe('helpText property', () => {
    describe('when not set', () => {
      it('should verify checkbox when helpText is not set', () => {
        const checkboxWrapper = mount(<Checkbox label="Checkbox" theme={theme} />);

        expect(checkboxWrapper.prop('helpText')).toBeUndefined();
      });
    });
    describe('when set', () => {
      it('should verify checkbox when helpText is set', () => {
        const checkboxWrapper = mount(<Checkbox label="Checkbox" helpText="Some help" theme={theme} />);

        expect(checkboxWrapper.prop('helpText')).toBe('Some help');
      });
    });
  });

  /*
  describe('error property', () => {
    describe('when set as string', () => {
      describe('when not set', () => {
        it('should verify checkbox when error is not set', () => {
          const checkboxWrapper = mount(<Checkbox label="Checkbox" theme={theme} />);

          expect(checkboxWrapper.find('label')).toHaveLength(1);
          expect(checkboxWrapper.find('div')).toHaveLength(5);
          expect(checkboxWrapper.find('input')).toHaveLength(1);
          expect(checkboxWrapper.find('span')).toHaveLength(1);
          expect(checkboxWrapper.find('input').at(0).hasClass('input')).toBe(true);
          expect(checkboxWrapper.find('div').at(1).hasClass('checkbox')).toBe(true);
          expect(checkboxWrapper.find('div').at(2).hasClass('backdrop')).toBe(true);
          expect(checkboxWrapper.find('div').at(3).hasClass('icon')).toBe(true);
          expect(checkboxWrapper.prop('label')).toBe('Checkbox');
          expect(checkboxWrapper.prop('helpText')).toBeUndefined();
        });
      });
      describe('when set', () => {
        it('should verify checkbox when error is set', () => {
          const checkboxWrapper = mount(<Checkbox label="Checkbox" error="Some error" theme={theme} />);
          const errorID = checkboxWrapper.find('input').prop<string>('aria-describedby');

          expect(checkboxWrapper.find('label')).toHaveLength(1);
          expect(checkboxWrapper.find('div')).toHaveLength(9);
          expect(checkboxWrapper.find('input')).toHaveLength(1);
          expect(checkboxWrapper.find('span')).toHaveLength(2);
          expect(checkboxWrapper.find('input').at(0).hasClass('input')).toBe(true);
          expect(checkboxWrapper.find('div').at(2).hasClass('checkbox')).toBe(true);
          expect(checkboxWrapper.find('div').at(3).hasClass('backdrop')).toBe(true);
          expect(checkboxWrapper.find('div').at(4).hasClass('icon')).toBe(true);
          expect(checkboxWrapper.prop('label')).toBe('Checkbox');
          expect(checkboxWrapper.find(`#${errorID}`).text()).toBe('Some error');
        });

        it('should verify checkbox when error and helpText both are set', () => {
          const checkboxWrapper = mount(<Checkbox label="Checkbox" error="Some error" helpText="Some help" theme={theme}/>);
          const descriptions = checkboxWrapper.find('input').prop<string>('aria-describedby').split(' ');

          expect(checkboxWrapper.find('label')).toHaveLength(1);
          expect(checkboxWrapper.find('div')).toHaveLength(10);
          expect(checkboxWrapper.find('input')).toHaveLength(1);
          expect(checkboxWrapper.find('span')).toHaveLength(2);
          expect(checkboxWrapper.find('input').at(0).hasClass('input')).toBe(true);
          expect(checkboxWrapper.find('div').at(2).hasClass('checkbox')).toBe(true);
          expect(checkboxWrapper.find('div').at(3).hasClass('backdrop')).toBe(true);
          expect(checkboxWrapper.find('div').at(4).hasClass('icon')).toBe(true);
          expect(checkboxWrapper.prop('label')).toBe('Checkbox');
          expect(descriptions.length).toBe(2);
          expect(checkboxWrapper.find(`#${descriptions[0]}`).text()).toBe('Some error');
          expect(checkboxWrapper.find(`#${descriptions[1]}`).text()).toBe('Some help');
        });
      });
    });

    describe('when set as boolean', () => {
      describe('when not set', () => {
        it('should verify checkbox when error is not set', () => {
          const checkboxWrapper = mount(<Checkbox label="Checkbox" theme={theme} />);

          expect(checkboxWrapper.find('label')).toHaveLength(1);
          expect(checkboxWrapper.find('div')).toHaveLength(5);
          expect(checkboxWrapper.find('input')).toHaveLength(1);
          expect(checkboxWrapper.find('span')).toHaveLength(1);
          expect(checkboxWrapper.find('input').at(0).hasClass('input')).toBe(true);
          expect(checkboxWrapper.find('div').at(1).hasClass('checkbox')).toBe(true);
          expect(checkboxWrapper.find('div').at(2).hasClass('backdrop')).toBe(true);
          expect(checkboxWrapper.find('div').at(3).hasClass('icon')).toBe(true);
          expect(checkboxWrapper.prop('label')).toBe('Checkbox');
          expect(checkboxWrapper.prop('error')).toBeUndefined();
        });
      });
      describe('when set as true', () => {
        it('should verify checkbox when error is set as true', () => {
          const checkboxWrapper = mount(<Checkbox error label="Checkbox" theme={theme} />);

          expect(checkboxWrapper.find('label')).toHaveLength(1);
          expect(checkboxWrapper.find('div')).toHaveLength(5);
          expect(checkboxWrapper.find('input')).toHaveLength(1);
          expect(checkboxWrapper.find('span')).toHaveLength(1);
          expect(checkboxWrapper.find('input').at(0).hasClass('input')).toBe(true);
          expect(checkboxWrapper.find('div').at(1).hasClass('checkbox')).toBe(true);
          expect(checkboxWrapper.find('div').at(2).hasClass('backdrop')).toBe(true);
          expect(checkboxWrapper.find('div').at(3).hasClass('icon')).toBe(true);
          expect(checkboxWrapper.prop('label')).toBe('Checkbox');
          expect(checkboxWrapper.prop('error')).toBe(true);
        });
      });
      describe('when set as false', () => {
        it('should verify checkbox when error is set as false', () => {
          const checkboxWrapper = mount(<Checkbox error={false} label="Checkbox" theme={theme} />);

          expect(checkboxWrapper.find('label')).toHaveLength(1);
          expect(checkboxWrapper.find('div')).toHaveLength(5);
          expect(checkboxWrapper.find('input')).toHaveLength(1);
          expect(checkboxWrapper.find('span')).toHaveLength(1);
          expect(checkboxWrapper.find('input').at(0).hasClass('input')).toBe(true);
          expect(checkboxWrapper.find('div').at(1).hasClass('checkbox')).toBe(true);
          expect(checkboxWrapper.find('div').at(2).hasClass('backdrop')).toBe(true);
          expect(checkboxWrapper.find('div').at(3).hasClass('icon')).toBe(true);
          expect(checkboxWrapper.prop('label')).toBe('Checkbox');
          expect(checkboxWrapper.prop('error')).toBe(false);
        });
      });
    });
  });

  describe('verify all property together', () => {
    it('should verify checkbox when all properties are set', () => {
      const checkboxWrapper = mount(
                                    <Checkbox label="Checkbox" labelHidden checked helpText="Some help" componentId="MyCheckbox"
                                    name="Checkbox" value="Some value" error="Some error" disabled theme={theme} />
                                   );
      expect(checkboxWrapper.find('label')).toHaveLength(1);
      expect(checkboxWrapper.find('div')).toHaveLength(10);
      expect(checkboxWrapper.find('input')).toHaveLength(1);
      expect(checkboxWrapper.find('span')).toHaveLength(2);
      expect(checkboxWrapper.find('input').at(0).hasClass('input')).toBe(true);
      expect(checkboxWrapper.find('div').at(2).hasClass('checkbox')).toBe(true);
      expect(checkboxWrapper.find('div').at(2).hasClass('error')).toBe(true);
      expect(checkboxWrapper.find('div').at(3).hasClass('backdrop')).toBe(true);
      expect(checkboxWrapper.find('div').at(4).hasClass('icon')).toBe(true);
      expect(checkboxWrapper.prop('label')).toBe('Checkbox');
      expect(checkboxWrapper.prop('labelHidden')).toBe(true);
      expect(checkboxWrapper.prop('checked')).toBe(true);
      expect(checkboxWrapper.prop('helpText')).toBe('Some help');
      expect(checkboxWrapper.prop('componentId')).toBe('MyCheckbox');
      expect(checkboxWrapper.prop('name')).toBe('Checkbox');
      expect(checkboxWrapper.prop('value')).toBe('Some value');
      expect(checkboxWrapper.prop('error')).toBe('Some error');
      expect(checkboxWrapper.prop('disabled')).toBe(true);
    });
  });
  */
});
