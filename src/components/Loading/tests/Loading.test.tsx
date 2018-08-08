import * as React from 'react';
import { mount } from 'enzyme';
import Loading from '../Loading';

const theme = {
  loading: 'loading',
  srOnly: 'srOnly',
};

describe('<Loading />', () => {
  it('when default props are provided', () => {
    const subject = mount(<Loading theme={theme} />);
    expect(subject.find('span')).toHaveLength(3);
    expect(subject.find('span').at(0).hasClass('loading')).toBe(true);
  });
});
