import * as React from 'react';
import { mount } from 'enzyme';
import Heading from '../../Heading';
import Process from '../../Process';

const steps = [
  { name: 'StepOne', component: <Heading>test0</Heading> },
  { name: 'StepTwo', component: <Heading>test1</Heading> },
  { name: 'StepThree', component: <Heading>test2</Heading> },
  { name: 'StepFour', component: <Heading>test3</Heading> }
];

describe('<Process />', () => {
  describe('when default props are provided', () => {
    it('should have default process elements', () => {
      const subject = mount(
      <Process steps={steps}></Process>);
      expect(subject.find('ol').exists()).toBeTruthy();
      expect(subject.find('li').exists()).toBeTruthy();
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('li').length).toBe(4);
    });
  });

  describe('when allowBackStepping props are provided', () => {
    it('should have allowBackStepping true process elements', () => {
      const subject = mount(
      <Process steps={steps} allowBackStepping></Process>);
      expect(subject.find('ol').exists()).toBeTruthy();
      expect(subject.find('li').exists()).toBeTruthy();
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('li').length).toBe(4);
    });
  });

  describe('when callback props are provided', () => {
    it('should have callbackfunction as props in process elements', () => {
      const spy = jest.fn();
      const subject = mount(
      <Process steps={steps} allowBackStepping onClick={spy}></Process>);
      expect(subject.find('ol').exists()).toBeTruthy();
      expect(subject.find('li').exists()).toBeTruthy();
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('li').length).toBe(4);
    });
  });
});
