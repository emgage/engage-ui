import * as React from 'react';
import { mount } from 'enzyme';
import Card from '../Card';
import CardHeader from '../CardHeader';
import CardBody from '../CardBody';
import { Action } from '../../../types';

describe('<Card /> Test Suit', () => {
  it('should verify that Card has <div> tag for title', () => {
    const cardWrapper = mount(
                                <Card>
                                    <CardHeader>Online store dashboard - Card</CardHeader>
                                    <CardBody sectioned>
                                        <p>View a summary of your online store’s performance.</p>
                                    </CardBody>
                                </Card>
                            );
    expect(cardWrapper.find('div').length).toBe(4);
  });

  it('should verify sectioned when it is not set', () => {
    const cardWrapper = mount(
        <Card>
            <CardHeader>Online store dashboard - Card</CardHeader>
            <CardBody>
                <p>View a summary of your online store’s performance.</p>
            </CardBody>
        </Card>
    );
    expect(cardWrapper.prop('sectioned')).toBeFalsy();
    cardWrapper.setProps({ sectioned: false });
    expect(cardWrapper.prop('sectioned')).toBe(false);
  });

  it('should verify when actions is called', () => {
    const spy = jest.fn();
    const action: Action = {
      content: 'Action Content',
      onAction: () => { spy(); },
    };
    const cardWrapper = mount(
                                <Card>
                                    <CardHeader actions={[action]}>
                                    </CardHeader>
                                </Card>
                            );
    cardWrapper.find('button').at(1).simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
