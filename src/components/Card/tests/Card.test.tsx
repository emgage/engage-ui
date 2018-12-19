import * as React from 'react';
import { mount } from 'enzyme';
import Card from '../Card';
import CardHeader from '../CardHeader';
import CardBody from '../CardBody';
import CardFooter from '../CardFooter';
import { Action } from '../../../types';

describe('<Card /> Test Suit', () => {
  it('should verify that Card has <div> tag for title', () => {
    const cardWrapper = mount(
                                <Card>
                                    <CardBody componentTitle="Online store dashboard - Card" sectioned>
                                        <p>View a summary of your online store’s performance.</p>
                                    </CardBody>
                                </Card>
                            );
    expect(cardWrapper.find('div').length).toBe(4);
  });

  it('should verify sectioned when it is not set', () => {
    const cardWrapper = mount(
        <Card>
            <CardBody componentTitle="Online store dashboard - Card">
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
  it('should verify that primaryFooterAction is called', () => {
    const spy = jest.fn();
    const action: Action = {
      content: 'Action Content',
      onAction: () => { spy(); },
    };
    const cardWrapper = mount(
        <Card>
            <CardFooter primaryFooterAction={action}>
            </CardFooter>
        </Card>
                            );
    cardWrapper.find('button').at(1).simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  it('should verify that secondaryFooterAction is called', () => {
    const spy = jest.fn();
    const action: Action = {
      content: 'Action Content',
      onAction: () => { spy(); },
    };
    const cardWrapper = mount(
        <Card>
            <CardFooter secondaryFooterAction={action}>
            </CardFooter>
        </Card>
                            );
    cardWrapper.find('button').at(1).simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
