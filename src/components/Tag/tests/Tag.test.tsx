import * as React from 'react';
import { mount } from 'enzyme';
import Tag from '../Tag';

describe('<Tag /> - Test Suit', () => {
  describe('remove tag', () => {
    it('should verify the remove', () => {
      const onRemoveClick = jest.fn();
      const subject = mount(<Tag onRemove={onRemoveClick}/>);
      subject.find('button').simulate('click');
      expect(onRemoveClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('children', () => {
    it('should verify the children is define', () => {
      const tagWrapper = mount(<Tag>Wholesale</Tag>);
      expect(tagWrapper.prop('children')).toBe('Wholesale');
    });

    it('should verify the children is not define', () => {
      const tagWrapper = mount(<Tag/>);
      expect(tagWrapper.prop('children')).toBeUndefined();
    });

    it('should verify the children type', () => {
      const tagWrapper = mount(<Tag children={'string'}/>).prop('children');
      expect(typeof tagWrapper).toBe('string');
    });
  });
});
