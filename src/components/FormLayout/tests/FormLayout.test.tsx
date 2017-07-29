import * as React from 'react';
import { mount } from 'enzyme';
import TextField from '../../TextField/TextField';
import FormLayout from '../FormLayout';
import Group from '../Group';

describe('FormLayout Component Suit', () => {

  describe('Default FormLayout', () => {
    it('should verify the formlayout for number of components and keys respect to the position', () => {
      const formlayoutWrapper = mount(
                                      <FormLayout>
                                          <TextField label="Store name" />
                                          <TextField label="Account email"/>
                                      </FormLayout>,
                                );
      expect(formlayoutWrapper.find('input').length).toBe(2);
      expect(formlayoutWrapper.children().at(0).key()).toBe('0/.0');
      expect(formlayoutWrapper.children().at(1).key()).toBe('1/.1');
    });
  });
  describe('Formlayout with Field Groups', () => {
    it('should verify the formlayout with field Groups and keys respect to the position', () => {
      const formlayoutWrapper = mount(<FormLayout>
                                          <Group>
                                          <TextField
                                              type="number"
                                              label="Minimum order"
                                          />
                                          <TextField
                                              type="number"
                                              label="Maximum order"
                                          />
                                          </Group>
                                        </FormLayout>,
                                );
      expect(formlayoutWrapper.children().childAt(0).childAt(0).key()).toBe('.0');
      expect(formlayoutWrapper.children().childAt(0).childAt(1).key()).toBe('.1');
    });
  });
  describe('Formlayout with condensed option', () => {
    it('should verify the formlayout with condensed format', () => {
      const formlayoutWrapper = mount(<FormLayout>
                                  <Group condensed>
                                    <TextField label="Length" />
                                    <TextField label="Width" />
                                    <TextField label="Height" />
                                    <TextField label="Unit" />
                                    </Group>
                                  </FormLayout>,
                                );
      expect(formlayoutWrapper.childAt(0).prop('condensed')).toBe(true);
      expect(formlayoutWrapper.children().childAt(0).childAt(0).key()).toBe('.0');
      expect(formlayoutWrapper.children().childAt(0).childAt(1).key()).toBe('.1');
      expect(formlayoutWrapper.children().childAt(0).childAt(2).key()).toBe('.2');
      expect(formlayoutWrapper.children().childAt(0).childAt(3).key()).toBe('.3');
    });
    it('should verify form layout when condensed is undefined', () => {
      const formlayoutWrapper = mount(<FormLayout>
                                  <Group title="groupTitle">
                                    <TextField label="Length" />
                                    <TextField label="Width" />
                                    <TextField label="Height" />
                                    <TextField label="Unit" />
                                    </Group>
                                  </FormLayout>,
                                );
      expect(formlayoutWrapper.childAt(0).prop('condensed')).toBeFalsy();
    });
    it('should verify form layout when condensed is false', () => {
      const formlayoutWrapper = mount(<FormLayout>
                                  <Group title="groupTitle" condensed={false}>
                                    <TextField label="Length" />
                                    <TextField label="Width" />
                                    <TextField label="Height" />
                                    <TextField label="Unit" />
                                    </Group>
                                  </FormLayout>,
                                );
      expect(formlayoutWrapper.childAt(0).prop('condensed')).toBe(false);
    });
  });
});

