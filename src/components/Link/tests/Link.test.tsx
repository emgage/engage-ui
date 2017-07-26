import * as React from 'react';
import {mount , shallow} from 'enzyme';
import Link from '../Link';

describe('onClick()', () => {
  it('is called when the Link is clicked', () => {
      const spy = jest.fn();
      shallow(<Link onClick={spy}>Test</Link>).simulate('click');
      expect(spy).toHaveBeenCalled();
  });
});

describe('external', () => {
  it('sets external is false', () => {
      const linkWrapper = mount(<Link external={false} />);
      expect(linkWrapper.prop('external')).toBe(false);
  });

  it('sets external is true', () => {
      const linkWrapper = mount(<Link external={true} />);
      expect(linkWrapper.prop('external')).toBe(true);
  });

  it('sets the external type on the Link', () => {
      const linkWrapper = mount(<Link external={true}/>).prop('external');
      expect(typeof linkWrapper).toBe('boolean');
  });
});

describe('url', () => {
  it('sets the url type of the Link', () => {
      const linkWrapper = mount(<Link url={'string'}/>).prop('url');
      expect(typeof linkWrapper).toBe('string');
  });

  it('Text of the url', () => {
      const linkWrapper = mount(<Link url="https://www.google.co.in"/>);
      expect(linkWrapper.prop('url')).toBe('https://www.google.co.in');
  });

  it('Value of the url', () => {
      const linkWrapper = mount(<Link>Please click here.</Link>);
      expect(linkWrapper.text()).toBe('Please click here.');
  });
});
