import * as React from 'react';
import { mount } from 'enzyme';
import TextField from '../TextField';

describe('<TextField />', () => {
  it('sets all pass through properties on the input', () => {
    const pattern = '\\d\\d';
    const input = mount(
      <TextField
        label="TextField"
        disabled
        readOnly={false}
        autoFocus
        name="TextField"
        placeholder="A placeholder"
        value="Some value"
        maxLength={2}
        minLength={2}
        spellCheck={false}
        pattern={pattern}
      />
    ).find('input');
    expect(input.prop('disabled')).toBe(true);
    expect(input.prop('readOnly')).toBe(false);
    expect(input.prop('autoFocus')).toBe(true);
    expect(input.prop('name')).toBe('TextField');
    expect(input.prop('placeholder')).toBe('A placeholder');
    expect(input.prop('value')).toBe('Some value');
    expect(input.prop('minLength')).toBe(2);
    expect(input.prop('spellCheck')).toBe(false);
    expect(input.prop('pattern')).toBe(pattern);
  });

  describe('onChange()', () => {
    it('is called with the new value', () => {
      const spy = jest.fn();
      const element = mount(<TextField label="TextField" onChange={spy} />);
      (element.find('input') as any).instance().value = 'two';
      element.find('input').simulate('change');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onFocus()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      mount(<TextField label="TextField" onFocus={spy} />).find('input').simulate('focus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the input is blurred', () => {
      const spy = jest.fn();
      const element = mount(<TextField label="TextField" onBlur={spy} />);
      element.find('input').simulate('focus').simulate('blur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const id = mount(<TextField label="TextField" componentId="MyField" />).find('input').prop('id');
      expect(id).toBe('MyField');
    });

    it('sets a random id on the input when none is passed', () => {
      const id = mount(<TextField label="TextField" />).find('input').prop('id');
      expect(typeof id).toBe('string');
      expect(id).toBeTruthy();
    });
  });

  describe('autoComplete', () => {
    it('defaults to no autoComplete attribute', () => {
      const textField = mount(<TextField label="TextField" />);
      expect(textField.find('input').prop('autoComplete')).toBeUndefined();
    });

    it('sets autoComplete to "off" when false', () => {
      const textField = mount(<TextField label="TextField" autoComplete={false} />);
      expect(textField.find('input').prop('autoComplete')).toBe('off');
    });

    it('sets autoComplete to "on" when false', () => {
      const textField = mount(<TextField label="TextField" autoComplete />);
      expect(textField.find('input').prop('autoComplete')).toBe('on');
    });
  });

  describe('helpText', () => {
    it('connects the input to the help text', () => {
      const textField = mount(<TextField label="TextField" helpText="Some help" />);
      const helpTextID = textField.find('input').prop<string>('aria-describedby');
      expect(typeof helpTextID).toBe('string');
      expect(textField.find(`#${helpTextID}`).text()).toBe('Some help');
    });
  });

  describe('enableTextCounter', () => {
    it('defaults to no enableTextCounter attribute', () => {
      const textField = mount(<TextField label="TextField" />);
      expect(textField.prop('enableTextCounter')).toBeUndefined();
    });
    it('sets enableTextCounter to "off" when false', () => {
      const textField = mount(<TextField label="TextField" enableTextCounter={false} />);
      expect(textField.prop('enableTextCounter')).toBe(false);
    });
    it('sets enableTextCounter to "on" when true', () => {
      const textField = mount(<TextField label="TextField" enableTextCounter={true} />);
      expect(textField.prop('enableTextCounter')).toBe(true);
    });
  });

  describe('mexLenght', () => {
    it('defaults to no maxLength attribute', () => {
      const textField = mount(<TextField label="TextField"/>);
      expect(textField.prop('maxLength')).toBeUndefined();
    });
    it('connects the input to the max length', () => {
      const textField = mount(<TextField label="TextField" maxLength={100} />);
      expect(textField.prop('maxLength')).toBe(100);
    });
  });

  describe('counterTextMarkup', () => {
    it('display counter text while no maxLength', () => {
      const counterTextMarkup = mount(<div>{9}</div>);
      const textField = mount(<TextField label="TextField" value="Some Text" />);
      expect(counterTextMarkup.text()).toBe(textField.prop('value').length.toString());
    });
    it('display counter text and maxLength', () => {
      const counterTextMarkup = mount(<div>{9}/{100}</div>);
      const textField = mount(<TextField label="TextField" maxLength={100} value="Some Text" />);
      expect(counterTextMarkup.text()).toBe(textField.prop('value').length.toString() + '/' + textField.prop('maxLength').toString());
    });
  });

  describe('error', () => {
    it('marks the input as invalid', () => {
      const textField = mount(<TextField errors={['error']} label="TextField" />);
      expect(textField.find('input').prop<string>('aria-invalid')).toBe(true);

      textField.setProps({ error: 'Some error' });
      expect(textField.find('input').prop<string>('aria-invalid')).toBe(true);
    });

    it('connects the input to the error', () => {
      const textField = mount(<TextField label="TextField" errors={['Some error']} />);
      const errorID = textField.find('input').prop<string>('aria-describedby');

      expect(typeof errorID).toBe('string');
      expect(textField.find(`#${errorID}`).at(0).text()).toBe('Some error');
    });

    it('connects the input to both an error and help text', () => {
      const textField = mount(<TextField label="TextField" errors={['Some error']} helpText="Some help" />);
      const descriptions = textField.find('input').prop<string>('aria-describedby').split(' ');
      expect(descriptions.length).toBe(2);
      expect(textField.find(`#${descriptions[0]}`).at(0).text()).toBe('Some error');
      expect(textField.find(`#${descriptions[1]}`).at(0).text()).toBe('Some help');
    });
  });

  describe('prefix', () => {
    it('connects the input to the prefix and label', () => {
      const textField = mount(<TextField label="TextField" prefix="$" />);
      const labels = textField.find('input').prop<string>('aria-labelledby').split(' ');
      expect(labels.length).toBe(2);
      expect(textField.find(`#${labels[0]}`).text()).toBe('TextField');
      expect(textField.find('div').at(4).text()).toBe('$');
    });

    it('connects the input to the prefix, suffix, and label', () => {
      const textField = mount(<TextField label="TextField" value="test" prefix="$" suffix=".00" />);
      const labels = textField.find('input').prop<string>('aria-labelledby').split(' ');
      expect(labels.length).toBe(3);
      expect(textField.find(`#${labels[0]}`).text()).toBe('TextField');
      expect(textField.find('div').at(4).text()).toBe('$');
      expect(textField.find('div').at(5).text()).toBe('.00');
    });
  });

  describe('suffix', () => {
    it('connects the input to the suffix and label', () => {
      const textField = mount(<TextField label="TextField" value="test" suffix="kg" />);
      const labels = textField.find('input').prop<string>('aria-labelledby').split(' ');
      expect(labels.length).toBe(2);
      expect(textField.find('label').at(0).text());
      expect(textField.find('label').at(1).text());
      expect(textField.find(`#${labels[0]}`).text()).toBe('TextField');
      expect(textField.find('div').at(4).text()).toBe('kg');
    });
  });

  describe('type', () => {
    it('sets the type on the input', () => {
      const type = mount(<TextField label="TextField" type="email" />).find('input').prop('type');
      expect(type).toBe('email');
    });

    it('sets the enableTextCounter on the input', () => {
      const enableTextCounter = mount(<TextField label="TextField" enableTextCounter={true} />).prop('enableTextCounter');
      expect(typeof enableTextCounter).toBe('boolean');
    });

    it('sets the maxLength on the input', () => {
      const maxLength = mount(<TextField label="TextField" maxLength={100} />).prop('maxLength');
      expect(typeof maxLength).toBe('number');
    });

    describe('number', () => {
      it('adds an increment button that increases the value', () => {
        const spy = jest.fn();
        const element = mount(<TextField label="TextField" type="number" value="3" onChange={spy} />);
        element.find('[role="button"]').first().simulate('click');
        expect(spy).toHaveBeenCalledWith('4');
      });

      it('adds a decrement button that increases the value', () => {
        const spy = jest.fn();
        const element = mount(<TextField label="TextField" type="number" value="3" onChange={spy} />);
        element.find('[role="button"]').last().simulate('click');
        expect(spy).toHaveBeenCalledWith('2');
      });

      it('handles incrementing from no value', () => {
        const spy = jest.fn();
        const element = mount(<TextField label="TextField" type="number" onChange={spy} />);
        element.find('[role="button"]').first().simulate('click');
        expect(spy).toHaveBeenCalledWith('1');
      });

      it('uses the step prop when incrementing', () => {
        const spy = jest.fn();
        const element = mount(<TextField label="TextField" type="number" step={0.5} value="1.25" onChange={spy} />);
        element.find('[role="button"]').first().simulate('click');
        expect(spy).toHaveBeenCalledWith('1.75');
      });

      it('respects a min value', () => {
        const spy = jest.fn();
        const element = mount(<TextField label="TextField" type="number" min={2} value="2" onChange={spy} />);

        element.find('[role="button"]').last().simulate('click');
        expect(spy).toHaveBeenLastCalledWith('2');

        element.find('[role="button"]').first().simulate('click');
        expect(spy).toHaveBeenLastCalledWith('3');
      });

      it('respects a max value', () => {
        const spy = jest.fn();
        const element = mount(<TextField label="TextField" type="number" max={2} value="2" onChange={spy} />);

        element.find('[role="button"]').first().simulate('click');
        expect(spy).toHaveBeenLastCalledWith('2');

        element.find('[role="button"]').last().simulate('click');
        expect(spy).toHaveBeenLastCalledWith('1');
      });

      it('brings an invalid value up to the min', () => {
        const spy = jest.fn();
        const element = mount(<TextField label="TextField" type="number" min={2} value="-1" onChange={spy} />);

        element.find('[role="button"]').first().simulate('click');
        expect(spy).toHaveBeenLastCalledWith('2');

        element.find('[role="button"]').last().simulate('click');
        expect(spy).toHaveBeenLastCalledWith('2');
      });

      it('brings an invalid value down to the max', () => {
        const spy = jest.fn();
        const element = mount(<TextField label="TextField" type="number" max={2} value="12" onChange={spy} />);

        element.find('[role="button"]').first().simulate('click');
        expect(spy).toHaveBeenLastCalledWith('2');

        element.find('[role="button"]').last().simulate('click');
        expect(spy).toHaveBeenLastCalledWith('2');
      });

      describe('resizable', () => {
        it('defaults to no resizable attribute', () => {
          const textField = mount(<TextField label="TextField" />);
          expect(textField.prop('resizable')).toBeUndefined();
        });
        it('sets resizable to "off" when false', () => {
          const textField = mount(<TextField label="TextField" resizable={false} />);
          expect(textField.prop('resizable')).toBe(false);
        });
        it('sets resizable to "on" when true', () => {
          const textField = mount(<TextField label="TextField" resizable={true} />);
          expect(textField.prop('resizable')).toBe(true);
        });
      });

      it('sets the resizable on the input', () => {
        const resizable = mount(<TextField label="TextField" resizable={true} />).prop('resizable');
        expect(typeof resizable).toBe('boolean');
      });
    });
  });
});
