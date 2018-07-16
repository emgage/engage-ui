import * as React from 'react';
import { mount } from 'enzyme';
import DescriptionList from '../DescriptionList';
import Term from '../Term';
import Description from '../Description';

describe('<DescriptionList />', () => {
  let term: string; let description: string;

  beforeEach(() => {
    term = 'First term'; description = 'One description.';
  });

  it('sets the description list style to inline when type is default and style is inline', () => {
    const descriptionList = mount(<DescriptionList componentType="default" componentStyle="Inline"><Term>{term}</Term><Description>{description}</Description></DescriptionList>);
    expect(descriptionList.find('dl').hasClass('')).toEqual(true);
  });

  it('sets the description list style to stacked when type is default and style is stacked', () => {
    const descriptionList = mount(<DescriptionList componentType="default" componentStyle="Stacked"><Term>{term}</Term><Description>{description}</Description></DescriptionList>);
    expect(descriptionList.find('dl').hasClass('naked')).toEqual(true);
  });

  it('sets the description list type to divider when type is divider and style is stacked', () => {
    const descriptionList = mount(<DescriptionList componentType="divider" componentStyle="Stacked"><Term>{term}</Term><Description>{description}</Description></DescriptionList>);
    expect(descriptionList.find('dl').hasClass('description-list-divider')).toEqual(true);
  });
});
