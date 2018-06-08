import * as React from 'react';
import { mount } from 'enzyme';
import ValidatedCheckboxField from '../ValidatedCheckboxField';
import ValidatedForm from '../../ValidatedForm/ValidatedForm';

describe('<ValidatedCheckboxField / >', () => {

  describe('when default props are provided', () => {
  it('basic validatedCheckboxField should be rendered with default props', () => {
    const validatedCheckboxFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedCheckboxField
                                                    id="appTerms"
                                                    label="I agree to terms and conditions"
                                                    name="I agree to terms and conditions" value=""/>
                                            </ValidatedForm>);
  expect(validatedCheckboxFieldWrapper.find('form')).toHaveLength(1);
  expect(validatedCheckboxFieldWrapper.find('div')).toHaveLength(6);
  expect(validatedCheckboxFieldWrapper.find('input')).toHaveLength(1);
  expect(validatedCheckboxFieldWrapper.find('label')).toHaveLength(1);
  expect(validatedCheckboxFieldWrapper.find('input').prop('id')).toBe('appTerms');
  expect(validatedCheckboxFieldWrapper.find('input').prop('name')).toBe('I agree to terms and conditions');
  expect(validatedCheckboxFieldWrapper.find('input').prop('value')).toBe('');
    });
  });

  describe('id property', () => {
    describe('when set', () => {
      it('should verify validatedCheckboxField when id prop is set', () => {
        const validatedCheckboxFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedCheckboxField
                                                    id="appTerms"
                                                    label="I agree to terms and conditions"
                                                    name="I agree to terms and conditions"
                                                    value=""/>
                                            </ValidatedForm>);
        expect(validatedCheckboxFieldWrapper.find('form')).toHaveLength(1);
          expect(validatedCheckboxFieldWrapper.find('div')).toHaveLength(6);
          expect(validatedCheckboxFieldWrapper.find('input')).toHaveLength(1);
          expect(validatedCheckboxFieldWrapper.find('label')).toHaveLength(1);
          expect(validatedCheckboxFieldWrapper.find('input').prop('id')).toBe('appTerms');
          expect(validatedCheckboxFieldWrapper.find('input').prop('name')).toBe('I agree to terms and conditions');
          expect(validatedCheckboxFieldWrapper.find('input').prop('value')).toBe('');
      });
    });
  });

  describe('name property', () => {
    describe('when set', () => {
      it('should verify validatedCheckboxField when name prop is set', () => {
        const validatedCheckboxFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedCheckboxField
                                                    id="appTerms"
                                                    label="I agree to terms and conditions"
                                                    name="I agree to terms and conditions" value=""/>
                                            </ValidatedForm>);
        expect(validatedCheckboxFieldWrapper.find('form')).toHaveLength(1);
          expect(validatedCheckboxFieldWrapper.find('div')).toHaveLength(6);
          expect(validatedCheckboxFieldWrapper.find('input')).toHaveLength(1);
          expect(validatedCheckboxFieldWrapper.find('label')).toHaveLength(1);
          expect(validatedCheckboxFieldWrapper.find('input').prop('id')).toBe('appTerms');
          expect(validatedCheckboxFieldWrapper.find('input').prop('name')).toBe('I agree to terms and conditions');
          expect(validatedCheckboxFieldWrapper.find('input').prop('value')).toBe('');
      });
    });
  });

  describe('validateTrigger property', () => {
    describe('when set with onBlur with value given', () => {
      it('should verify validatedCheckboxField when onBlur prop is set', () => {
        const spy = jest.fn();
        const validatedCheckboxFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedCheckboxField
                                                    id="appTerms"
                                                    label="I agree to terms and conditions"
                                                    name="I agree to terms and conditions"
                                                    value="true"
                                                    required={true}
                                                    onBlur={ () => spy()}
                                                    validateTrigger={['onBlur']}
                                                    validateRules={[{ required: true, message: 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedCheckboxFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedCheckboxFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('label')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('input').prop('id')).toBe('appTerms');
        expect(validatedCheckboxFieldWrapper.find('input').prop('name')).toBe('I agree to terms and conditions');
        expect(validatedCheckboxFieldWrapper.find('input').prop('value')).toBe('true');
        validatedCheckboxFieldWrapper.find('input').slice().simulate('blur');
        expect(validatedCheckboxFieldWrapper.find('span')).toHaveLength(1);
      });
    });

    describe('when set with onBlur without value given', () => {
      it('should verify validatedCheckboxField when onBlur prop is set', () => {
        const spy = jest.fn();
        const validatedCheckboxFieldWrapper = mount(
                                            <ValidatedForm>
                                              <ValidatedCheckboxField
                                                    id="appTerms"
                                                    label="I agree to terms and conditions"
                                                    name="I agree to terms and conditions"                                                    value=""
                                                    required={true}
                                                    onBlur={ () => spy()}
                                                    validateTrigger={['onBlur']}
                                                    validateRules={[{ required: true, message: 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedCheckboxFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedCheckboxFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('label')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('input').prop('id')).toBe('appTerms');
        expect(validatedCheckboxFieldWrapper.find('input').prop('name')).toBe('I agree to terms and conditions');
        expect(validatedCheckboxFieldWrapper.find('input').prop('value')).toBe('');
        validatedCheckboxFieldWrapper.find('input').slice().simulate('blur');
        expect(validatedCheckboxFieldWrapper.find('span').text()).toBe('');
      });
    });

    describe('when not set', () => {
      it('should verify validatedCheckboxField when onBlur prop is not set', () => {
        const validatedCheckboxFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedCheckboxField
                                                    id="appTerms"
                                                    label="I agree to terms and conditions"
                                                    name="I agree to terms and conditions"
                                                    value="true"
                                                    required={true}
                                                    validateRules={[{ required: true, message: 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedCheckboxFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedCheckboxFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('label')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('input').prop('id')).toBe('appTerms');
        expect(validatedCheckboxFieldWrapper.find('input').prop('name')).toBe('I agree to terms and conditions');
        expect(validatedCheckboxFieldWrapper.find('input').prop('value')).toBe('true');
      });
    });
  });

  describe('validateRules property', () => {
    describe('when set', () => {
      it('should verify validatedCheckboxField when validateRules props are set', () => {
        const spy = jest.fn();
        const validatedCheckboxFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedCheckboxField
                                                    id="appTerms"
                                                    label="I agree to terms and conditions"
                                                    name="I agree to terms and conditions"
                                                    value=""
                                                    required={true}
                                                    onBlur={ () => spy()}
                                                    validateTrigger={['onBlur']}
                                                    validateRules={[{ required: true, message: 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedCheckboxFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedCheckboxFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('label')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('input').prop('id')).toBe('appTerms');
        expect(validatedCheckboxFieldWrapper.find('input').prop('name')).toBe('I agree to terms and conditions');
        expect(validatedCheckboxFieldWrapper.find('input').prop('value')).toBe('');
        validatedCheckboxFieldWrapper.find('input').slice().simulate('blur');
        expect(validatedCheckboxFieldWrapper.find('span').text()).toBe('');
      });
    });

    describe('when not set', () => {
      it('should verify validatedCheckboxField when validateRules props are not set', () => {
        const spy = jest.fn();
        const validatedCheckboxFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedCheckboxField
                                                    id="appTerms"
                                                    label="I agree to terms and conditions"
                                                    name="I agree to terms and conditions"
                                                    value=""
                                                    required={true}
                                                    onBlur={ () => spy()}
                                                validateTrigger={['onBlur']} />
                                            </ValidatedForm>);
        expect(validatedCheckboxFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedCheckboxFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('label')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('input').prop('id')).toBe('appTerms');
        expect(validatedCheckboxFieldWrapper.find('input').prop('name')).toBe('I agree to terms and conditions');
        expect(validatedCheckboxFieldWrapper.find('input').prop('value')).toBe('');
        validatedCheckboxFieldWrapper.find('input').slice().simulate('blur');
      });
    });
  });

  describe('all property', () => {
    describe('when set', () => {
      it('should verify validatedCheckboxField when all props are set', () => {
        const spy = jest.fn();
        const validatedCheckboxFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedCheckboxField
                                                    id="appTerms"
                                                    label="I agree to terms and conditions"
                                                    name="I agree to terms and conditions"
                                                    value="true"
                                                    required={true}
                                                    onChange={() => spy()}
                                                    validateTrigger={['onBlur']}
                                                    validateRules={[{ required: true, message: 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedCheckboxFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedCheckboxFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('label')).toHaveLength(1);
        expect(validatedCheckboxFieldWrapper.find('input').prop('id')).toBe('appTerms');
        expect(validatedCheckboxFieldWrapper.find('input').prop('name')).toBe('I agree to terms and conditions');
        expect(validatedCheckboxFieldWrapper.find('input').prop('value')).toBe('true');
      });
    });
  });
});
