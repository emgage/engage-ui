import * as React from 'react';
import { mount } from 'enzyme';
import Loading from '../Loading';

const theme = {
  loader: 'loader',
  srOnly: 'srOnly',
};

describe('<Loading />', () => {
  it('when default props are provided', () => {
    const subject = mount(<Loading theme={theme} />);
    expect(subject.find('i')).toHaveLength(1);
    expect(subject.find('span')).toHaveLength(2);
    expect(subject.find('i').hasClass('loader')).toBe(true);
    expect(subject.find('span.srOnly')).toHaveLength(1);
    expect(subject.find('span.srOnly').text()).toBe('Loading...');
  });
});

