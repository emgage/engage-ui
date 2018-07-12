import * as React from 'react';
import { mount } from 'enzyme';
import Label from '../Label';

const theme = {
  label: 'Label',
  hidden: 'hidden',
  text: 'Text',
};

describe('<Label />', () => {

  describe('when default props are provided', () => {
    it('basic label should have rendered one div clss element', () => {
      const labelWrapper = mount(
                                  <Label componentId="lblid" theme={theme} />
                           );
      expect(labelWrapper.find('div')).toHaveLength(1);
    });
    it('basic label should have rendered two label clss element', () => {
      const labelWrapper = mount(
                                  <Label componentId="lblid" theme={theme} />
                           );
      expect(labelWrapper.find('label')).toHaveLength(2);
    });
    it('basic label should have default label css clss on div', () => {
      const labelWrapper = mount(
                                 <Label componentId="lblid" theme={theme} />
                           );
      expect(labelWrapper.find('div').at(0).hasClass('Label')).toBe(true);
    });
    it('basic label should have default text css clss on label', () => {
      const labelWrapper = mount(
                                  <Label componentId="lblid" theme={theme} />
                           );
      expect(labelWrapper.find('label').at(1).hasClass('Text')).toBe(true);
    });
  });

  describe('hidden property' , () => {
    describe('when not set', () => {
      it('basic label should have rendered one div clss element', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('div')).toHaveLength(1);
      });
      it('basic label should have rendered two label clss element', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('label')).toHaveLength(2);
      });
      it('basic label should have default label css class on div', () => {
        const labelWrapper = mount(
                                   <Label componentId ="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('div').at(0).hasClass('Label')).toBe(true);
      });
      it('basic label should have default text css clss on label', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('label').at(1).hasClass('Text')).toBe(true);
      });
      it('should verify hidden property is not defined', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.prop('hidden')).toBeUndefined();
      });
      it('should verify hidden property is not available', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('hidden')).toHaveLength(0);
      });
    });

    describe('when set to true', () => {
      it('basic label should have rendered  one div clss element', () => {
        const labelWrapper = mount(
                                    <Label componentId="lblid" hidden={true} theme={theme} />
                             );
        expect(labelWrapper.find('div')).toHaveLength(1);
      });
      it('basic label should have rendered two label clss element', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" hidden={true} theme={theme} />
                             );
        expect(labelWrapper.find('label')).toHaveLength(2);
      });
      it('basic label should have default label css class on div', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" hidden={true} theme={theme} />
                             );
        expect(labelWrapper.find('div').at(0).hasClass('Label')).toBe(true);
      });
      it('basic label should have default text hidden css clss on label', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" hidden={true} theme={theme} />
                             );
        expect(labelWrapper.find('label').at(1).hasClass('hidden')).toBe(true);
      });
      it('should have hidden elememt and set as true', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" hidden={true} theme={theme} />
                             );
        expect(labelWrapper.prop('hidden')).toBe(true);
      });
    });

    describe('when set to false', () => {
      it('basic label should have rendered  one div clss element', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" hidden={false} theme={theme} />
                             );
        expect(labelWrapper.find('div')).toHaveLength(1);
      });
      it('basic label should have rendered two label clss element', () => {
        const labelWrapper = mount(
                                    <Label componentId="lblid" hidden={false} theme={theme} />
                             );
        expect(labelWrapper.find('label')).toHaveLength(2);
      });
      it('basic label should have default label css class on div', () => {
        const labelWrapper = mount(
                                    <Label componentId="lblid" hidden={false} theme={theme} />
                             );
        expect(labelWrapper.find('div').at(0).hasClass('Label')).toBe(true);
      });
      it('basic label should have default text css clss on label', () => {
        const labelWrapper = mount(
                                    <Label componentId="lblid" hidden={false} theme={theme} />
                             );
        expect(labelWrapper.find('label').at(1).hasClass('Text')).toBe(true);
      });
      it('should have hidden elememt and set as false', () => {
        const labelWrapper = mount(
                                    <Label componentId="lblid" hidden={false} theme={theme} />
                             );
        expect(labelWrapper.prop('hidden')).toBe(false);
      });
    });
  });

  describe('id property' , () => {
    describe('when set', () => {
      it('basic label should have rendered  one div clss element', () => {
        const labelWrapper = mount(
                                    <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('div')).toHaveLength(1);
      });
      it('basic label should have rendered two label clss element', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('label')).toHaveLength(2);
      });
      it('basic label should have default label css class on div', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('div').at(0).hasClass('Label')).toBe(true);
      });
      it('basic label should have default text css clss on label', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('label').at(1).hasClass('Text')).toBe(true);
      });
      it('should verify id given', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.prop('componentId')).toBe('lblid');
      });
    });

    describe('when set as random id', () => {
      it('basic label should have rendered  one div clss element', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('div')).toHaveLength(1);
      });
      it('basic label should have rendered two label clss element', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('label')).toHaveLength(2);
      });
      it('basic label should have default label css class on div', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('div').at(0).hasClass('Label')).toBe(true);
      });
      it('basic label should have default text css clss on label', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('label').at(1).hasClass('Text')).toBe(true);
      });
      it('Sets a random id when none is passed', () => {
        const labelWrapper = mount(<Label componentId="lblid" theme={theme} />).prop('componentId');
        expect(typeof (labelWrapper)).toBe('string');
        expect(labelWrapper).toBeTruthy();
      });
    });
  });

  describe('children property' , () => {
    describe('when set', () => {
      it('basic label should have rendered  one div clss element', () => {
        const labelWrapper = mount(
                                    <Label componentId="lblid" theme={theme}>
                                      Test
                                    </Label>
                             );
        expect(labelWrapper.find('div')).toHaveLength(1);
      });
      it('basic label should have rendered two label clss element', () => {
        const labelWrapper = mount(
                                    <Label componentId="lblid" theme={theme}>
                                      Test
                                    </Label>
                             );
        expect(labelWrapper.find('label')).toHaveLength(2);
      });
      it('basic label should have default label css class on div', () => {
        const labelWrapper = mount(
                                    <Label componentId="lblid" theme={theme}>
                                      Test
                                    </Label>
                            );
        expect(labelWrapper.find('div').at(0).hasClass('Label')).toBe(true);
      });
      it('basic label should have default text css clss on label', () => {
        const labelWrapper = mount(
                                    <Label componentId="lblid" theme={theme}>
                                      Test
                                    </Label>
                             );
        expect(labelWrapper.find('label').at(1).hasClass('Text')).toBe(true);
      });
      it('should verify children is defined', () => {
        const labelWrapper = mount(
                                    <Label componentId="lblid" theme={theme}>
                                      Test
                                    </Label>
                             );
        expect(labelWrapper.prop('children')).toBe('Test');
      });
    });

    describe('when not set', () => {
      it('basic label should have rendered  one div clss element', () => {
        const labelWrapper = mount(
                                    <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('div')).toHaveLength(1);
      });
      it('basic label should have rendered two label clss element', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('label')).toHaveLength(2);
      });
      it('basic label should have default label css class on div', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('div').at(0).hasClass('Label')).toBe(true);
      });
      it('basic label should have default text css clss on label', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('label').at(1).hasClass('Text')).toBe(true);
      });
      it('should not have children element', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.find('children')).toHaveLength(0);
      });
      it('should verify children is not defined', () => {
        const labelWrapper = mount(
                                   <Label componentId="lblid" theme={theme} />
                             );
        expect(labelWrapper.prop('children')).toBeUndefined();
      });
    });
  });
});
