import * as React from 'react';
import { mount } from 'enzyme';
import RadioButton from '../RadioButton';

const theme = {
  radioButton: 'radioButton',
  input: 'input',
  backdrop: 'backdrop',
  icon: 'icon',
};

describe('<RadioButton />', () => {

  describe('when default props are provided', () => {
    it('basic radiobutton should be rendered with default props', () => {
      const radiobuttonWrapper = mount(
                                      <RadioButton label="RadioButton" theme={theme} />
                                  );
      expect(radiobuttonWrapper.find('label')).toHaveLength(1);
      expect(radiobuttonWrapper.find('div')).toHaveLength(4);
      expect(radiobuttonWrapper.find('input')).toHaveLength(1);
      expect(radiobuttonWrapper.find('label').hasClass(''));
      expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
      expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
      expect(radiobuttonWrapper.find('input').hasClass('input'));
      expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
      expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
    });
  });

  describe('onChange() property', () => {
    describe('when set', () => {
      it('should verify radiobutton when onchange() is set', () => {
        const spy = jest.fn();
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" onChange={spy} theme={theme} />
                                    );
        (radiobuttonWrapper.find('input') as any).instance().checked = true;
        radiobuttonWrapper.find('input').simulate('change');
        expect(spy).toHaveBeenCalledWith(true);
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
      });
    });

    describe('when not set', () => {
      it('should verify radiobutton when onchange() is not set', () => {

        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" theme={theme} />
                                  );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
      });
    });
  });

  describe('onFocus() property', () => {
    describe('when set', () => {
      it('should verify radiobutton when onFocus() is set', () => {
        const spy = jest.fn();
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" onFocus={spy} theme={theme} />
                                  );
        radiobuttonWrapper.find('input').simulate('focus');
        expect(spy).toHaveBeenCalled();
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
      });
    });

    describe('when not set', () => {
      it('should verify radiobutton when onFocus() is not set', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" theme={theme} />
                                  );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
      });
    });
  });

  describe('onBlur() property', () => {
    describe('when set', () => {
      it('should verify radiobutton when onBlur() is set', () => {
        const spy = jest.fn();
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" onBlur={spy} theme={theme} />
                                  );
        radiobuttonWrapper.find('input').simulate('blur');
        expect(spy).toHaveBeenCalled();
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
      });
    });

    describe('when not set', () => {
      it('should verify radiobutton when onBlur() is not set', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" theme={theme} />
                                    );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
      });
    });
  });

  describe('id property', () => {
    describe('when set', () => {
      it('should verify radiobutton when id is set', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" componentId="MyRadioButton" theme={theme} />
                                    );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.find('input').prop('id')).toBe('MyRadioButton');
        expect(radiobuttonWrapper.find('label').prop('htmlFor')).toBe('MyRadioButton');
        expect(radiobuttonWrapper.find('input').prop('name')).toBe('MyRadioButton');
      });
    });

    describe('when not set', () => {
      it('should verify radiobutton when id is not set', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" theme={theme} />
                                    );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.prop('id')).toBeUndefined();
        expect(radiobuttonWrapper.find('id')).toHaveLength(0);
      });
    });
  });

  describe('label property', () => {
    describe('when set', () => {
      it('should verify radiobutton when label is set', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" theme={theme} />
                                    );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
      });
    });
  });

  describe('labelHidden property', () => {
    describe('when set to true', () => {
      it('should verify radiobutton when labelHidden is set to true', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" labelHidden theme={theme} />
                                    );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.prop('labelHidden')).toBe(true);
      });
    });

    describe('when set to false', () => {
      it('should verify radiobutton when labelHidden is set to false', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" labelHidden={false} theme={theme} />
                                    );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.prop('labelHidden')).toBe(false);
      });
    });

    describe('when not set', () => {
      it('should verify radiobutton when labelHidden is not set', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" theme={theme} />
                                    );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.prop('labelHidden')).toBeUndefined();
        expect(radiobuttonWrapper.find('labelHidden')).toHaveLength(0);
      });
    });
  });

  describe('helpText property', () => {
    describe('when set', () => {
      it('should verify radiobutton when helpText is set', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" helpText="Some help" theme={theme} />
                                     );
        const helpTextID = radiobuttonWrapper.find('input').prop<string>('aria-describedby');
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(7);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(4).hasClass('icon'));
        expect(radiobuttonWrapper.find(`#${helpTextID}`).text()).toBe('Some help');
      });
    });

    describe('when not set', () => {
      it('should verify radiobutton when helpText is not set', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" theme={theme} />
                                     );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.prop('helpText')).toBeUndefined();
        expect(radiobuttonWrapper.find('helpText')).toHaveLength(0);
      });
    });
  });

  describe('disabled property', () => {
    describe('when set to true', () => {
      it('should verify radiobutton when disabled is set to true', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" disabled theme={theme} />
                                     );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.prop('disabled')).toBe(true);
      });
    });

    describe('when set to false', () => {
      it('should verify radiobutton when disabled is set to false', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" disabled={false} theme={theme} />
                                     );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.prop('disabled')).toBe(false);
      });
    });

    describe('when not set', () => {
      it('should verify radiobutton when disabled is not set', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" theme={theme} />
                                     );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.prop('disabled')).toBeUndefined();
        expect(radiobuttonWrapper.find('disabled')).toHaveLength(0);
      });
    });
  });

  describe('name property', () => {
    describe('when set', () => {
      it('should verify radiobutton when name is set', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" name="MyRadioButton" theme={theme} />
                                    );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.find('input').prop('name')).toBe('MyRadioButton');
      });
    });

    describe('when not set', () => {
      it('should verify radiobutton when name is not set', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" theme={theme} />
                                    );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.prop('name')).toBeUndefined();
        expect(radiobuttonWrapper.find('name')).toHaveLength(0);
      });
    });
  });

  describe('value property', () => {
    describe('when set', () => {
      it('should verify radiobutton when value is set', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" value="MyRadioButton" theme={theme} />
                                    );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.find('input').prop('value')).toBe('MyRadioButton');
      });
    });

    describe('when not set', () => {
      it('should verify radiobutton when value is not set', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" theme={theme} />
                                    );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.prop('value')).toBeUndefined();
        expect(radiobuttonWrapper.find('value')).toHaveLength(0);
      });
    });
  });

  describe('checked property', () => {
    describe('when set to true', () => {
      it('should verify radiobutton when checked is set to true', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" checked theme={theme} />
                                     );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.prop('checked')).toBe(true);
      });
    });

    describe('when set to false', () => {
      it('should verify radiobutton when checked is set to false', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" checked={false} theme={theme} />
                                     );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.prop('checked')).toBe(false);
      });
    });

    describe('when not set', () => {
      it('should verify radiobutton when checked is not set', () => {
        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" theme={theme} />
                                     );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
        expect(radiobuttonWrapper.prop('checked')).toBeUndefined();
        expect(radiobuttonWrapper.find('checked')).toHaveLength(0);
      });
    });
  });

  describe('all property', () => {
    describe('when set', () => {
      it('should verify radiobutton when all props are set', () => {
        const spy = jest.fn();

        const radiobuttonWrapper = mount(
                                        <RadioButton label="RadioButton" componentId="Radioid" name="Radioname" value="Radiovalue" labelHidden helpText="Some Help" checked disabled onFocus={spy} onChange={spy} onBlur={spy} theme={theme} />
                                     );
        const helpTextID = radiobuttonWrapper.find('input').prop<string>('aria-describedby');
        (radiobuttonWrapper.find('input') as any).instance().checked = true;
        radiobuttonWrapper.find('input').simulate('change');
        radiobuttonWrapper.find('input').simulate('focus');
        radiobuttonWrapper.find('input').simulate('blur');
        expect(spy).toHaveBeenCalledWith(true);
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(7);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(4).hasClass('icon'));
        expect(radiobuttonWrapper.find(`#${helpTextID}`).text()).toBe('Some Help');
        expect(radiobuttonWrapper.prop('checked')).toBe(true);
        expect(radiobuttonWrapper.find('input').prop('value')).toBe('Radiovalue');
        expect(radiobuttonWrapper.find('input').prop('name')).toBe('Radioname');
        expect(radiobuttonWrapper.prop('disabled')).toBe(true);
        expect(radiobuttonWrapper.prop('labelHidden')).toBe(true);
        expect(radiobuttonWrapper.find('input').prop('id')).toBe('Radioid');
      });
    });
  });

  describe('theme property', () => {
    describe('when set', () => {
      it('should verify radiobutton when theme is set', () => {
        const radiobuttonWrapper = mount(
                                      <RadioButton label="RadioButton" theme={theme} />
                                  );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('div').at(1).hasClass('radioButton'));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
        expect(radiobuttonWrapper.find('input').hasClass('input'));
        expect(radiobuttonWrapper.find('div').at(2).hasClass('backdrop'));
        expect(radiobuttonWrapper.find('div').at(3).hasClass('icon'));
      });
    });

    describe('when not set', () => {
      it('should verify radiobutton when theme is not set', () => {
        const radiobuttonWrapper = mount(
                                      <RadioButton label="RadioButton" />
                                  );
        expect(radiobuttonWrapper.find('label')).toHaveLength(1);
        expect(radiobuttonWrapper.find('div')).toHaveLength(4);
        expect(radiobuttonWrapper.find('input')).toHaveLength(1);
        expect(radiobuttonWrapper.find('label').hasClass(''));
        expect(radiobuttonWrapper.find('input').prop('type')).toBe('radio');
      });
    });
  });
});
