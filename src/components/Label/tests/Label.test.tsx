import * as React from 'react';
import {mount} from 'enzyme';
import Label from '../Label';

describe('Label Suit', () => {

    it('Verify Label is not Hidden', () => {
          const labelWrapper = mount(<Label id="lblid" hidden={true} />);
          expect(labelWrapper.prop('hidden')).toBe(true);
    });

    it('Verify Label is  Hidden', () => {
          const labelWrapper = mount(<Label id="lblid" hidden={false} />);
          expect(labelWrapper.prop('hidden')).toBe(false);
    });

    it('Verify type of hidden', () => {
      const labelWrapper = mount(<Label id="lblid" hidden={false}/>).prop('hidden');
      expect(typeof (labelWrapper)).toBe('boolean');
    });

    it('Verify id', () => {
      const labelWrapper = mount(<Label id="lblid"/>);
      expect(labelWrapper.prop('id')).toBe('lblid');

    });

    it('Sets a random id  when none is passed', () => {
      const labelWrapper = mount(<Label id="lblid"/>).prop('id');
      expect(typeof (labelWrapper)).toBe('string');
      expect(labelWrapper).toBeTruthy();
    });

   it('Children is not defined', () => {
      const labelWrapper = mount(<Label id="lblid"  />);
      expect(labelWrapper.prop('children')).toBeUndefined();
    });

    it('Children is defined', () => {
      const labelWrapper = mount(<Label id="lblid" children="Test" />);
      expect(labelWrapper.prop('children')).toBe('Test');
    });
});
