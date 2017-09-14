import * as React from 'react';
import { mount } from 'enzyme';
import Tag from '../Tag';
const theme = {
  tag: 'Wholesale',
  button: 'Button',
};

describe('<Tag />', () => {

  describe('onRemove property', () => {
    it('should verify the remove', () => {
      const onRemoveClick = jest.fn();
      const tagWrapper = mount(
                        <Tag onRemove={onRemoveClick} />
                       );
      tagWrapper.find('button').simulate('click');
      expect(onRemoveClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('when default props are provided', () => {
    it('basic tag should have rendered 3 span elements', () => {
      const tagWrapper = mount(
                        <Tag theme={theme} />
                      );
      expect(tagWrapper.find('span')).toHaveLength(3);
    });
    it('should have default Tag css class on span', () => {
      const tagWrapper = mount(
                          <Tag theme={theme} />
                        );
      expect(tagWrapper.find('span').at(0).hasClass('Wholesale')).toBe(true);
    });
    it('should have default Icon-Button css class on span', () => {
      const tagWrapper = mount(
                            <Tag theme={theme} />
                           );
      expect(tagWrapper.find('button').hasClass('Button')).toBe(true);
    });
  });

  describe('children property ', () => {
    it('should verify the children text', () => {
      const tagWrapper = mount(
                        <Tag>
                          Wholesale
                        </Tag>
                       );
      expect(tagWrapper.prop('children')).toBe('Wholesale');
    });
    it('should verify the children', () => {
      const tagWrapper = mount(
                        <Tag children = "Wholesale" />
                       );
      expect(tagWrapper.prop('children')).toBe('Wholesale');
    });
  });
});
