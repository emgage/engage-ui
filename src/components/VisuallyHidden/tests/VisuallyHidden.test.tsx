import * as React from 'react';
import { mount } from 'enzyme';
import VisuallyHidden from '../VisuallyHidden';
import Heading from '../../Heading/Heading';

describe('<VisuallyHidden /> - Test Suit', () => {
  const theme = {
    VisuallyHidden: 'VisuallyHidden',
  };
  it('should verify that it should have one span tag.', () => {
    const visuallyHiddenWrapper = mount(<VisuallyHidden theme={theme}>
                                                <Heading>Title and description</Heading>
                                            </VisuallyHidden>
                                      );
    expect(visuallyHiddenWrapper.find('span').length).toBe(1);
  });
  it('should verify that VisuallyHidden class should be applied to span.', () => {
    const visuallyHiddenWrapper = mount(<VisuallyHidden theme={theme}>
                                                <Heading>Title and description</Heading>
                                            </VisuallyHidden>
                                      );
    expect(visuallyHiddenWrapper.find('span').hasClass('VisuallyHidden'));
  });
});
