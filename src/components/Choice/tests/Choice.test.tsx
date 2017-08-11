import * as React from 'react';
import { mount } from 'enzyme';
import Choice from '../Choice';

const theme = {
  Choice: 'Choice',
  labelHidden: 'labelHidden',
  Control: 'Control',
  Label: 'Label',
  Descriptions: 'Descriptions',
  HelpText: 'HelpText',
  Error: 'Error',
  ErrorIcon: 'ErrorIcon',
};

describe('<Choice />', () => {

  describe('when default props are provided', () => {
    it('basic choice should be rendered with default props', () => {
      const choiceWrapper = mount(
                                  <Choice id="MyChoice" label="Label" theme={theme} />,
                            );
      expect(choiceWrapper.find('label')).toHaveLength(1);
      expect(choiceWrapper.find('label').hasClass('Choice'));
      expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
      expect(choiceWrapper.find('div')).toHaveLength(2);
      expect(choiceWrapper.find('div').at(0).hasClass('Control'));
      expect(choiceWrapper.find('div').at(1).hasClass('Label'));
      expect(choiceWrapper.find('div').at(1).text()).toBe('Label');
    });
  });

  describe('clickability for choice', () => {
    // We want the entire choice to be clickable, including the space
    // between the choice and the visual appearance of the label.
    it('should render the content as a child of the label', () => {
      const MYCOMPONENT = () => {
        return (
        <div />
        ); 
      };
      const choiceWrapper = mount(
                                  <Choice id="MyChoice" label="Label" theme={theme}>
                                    <MYCOMPONENT />
                                  </Choice>,
                            );
      const label = choiceWrapper.find('label');
      expect(label.containsMatchingElement(<MYCOMPONENT />)).toBe(true);
    });
  });

  describe('id property', () => {
    describe('when set', () => {
      it('should verify choice when id is set', () => {
        const choiceWrapper = mount(
                                    <Choice id="MyChoice" label="Label" theme={theme} />,
                              );
        expect(choiceWrapper.find('label')).toHaveLength(1);
        expect(choiceWrapper.find('label').hasClass('Choice'));
        expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
        expect(choiceWrapper.find('div')).toHaveLength(2);
        expect(choiceWrapper.find('div').at(0).hasClass('Control'));
        expect(choiceWrapper.find('div').at(1).hasClass('Label'));
        expect(choiceWrapper.find('div').at(1).text()).toBe('Label');
        expect(choiceWrapper.prop('id')).toBe('MyChoice');
      });
    });
  });

  describe('label property', () => {
    describe('when set', () => {
      it('should verify choice when label is set', () => {
        const choiceWrapper = mount(
                                    <Choice id="MyChoice" label="Label" theme={theme} />,
                              );
        expect(choiceWrapper.find('label')).toHaveLength(1);
        expect(choiceWrapper.find('label').hasClass('Choice'));
        expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
        expect(choiceWrapper.find('div')).toHaveLength(2);
        expect(choiceWrapper.find('div').at(0).hasClass('Control'));
        expect(choiceWrapper.find('div').at(1).hasClass('Label'));
        expect(choiceWrapper.find('div').at(1).text()).toBe('Label');
        expect(choiceWrapper.prop('label')).toBe('Label');
      });
    });
  });

  describe('error property', () => {
    describe('when set as string', () => {
      it('should verify choice when error set as string', () => {
        const choiceWrapper = mount(
                                    <Choice id="MyChoice" label="Label" error="Error" theme={theme} />,
                              );
        expect(choiceWrapper.find('div')).toHaveLength(6);
        expect(choiceWrapper.find('label')).toHaveLength(1);
        expect(choiceWrapper.find('label').hasClass('Choice'));
        expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
        expect(choiceWrapper.find('div').at(0).hasClass('Control'));
        expect(choiceWrapper.find('div').at(1).hasClass('Label'));
        expect(choiceWrapper.find('label').text()).toBe('Label');
        expect(choiceWrapper.find('div').at(2).hasClass('Descriptions'));
        expect(choiceWrapper.find('div').at(3).hasClass('Error'));
        expect(choiceWrapper.find('div').find('#MyChoiceError').exists()).toBe(true);
        expect(choiceWrapper.find('div').at(4).hasClass('ErrorIcon'));
        expect(choiceWrapper.find('span')).toHaveLength(1);
        expect(choiceWrapper.find('span').hasClass(''));
        expect(choiceWrapper.find('div').at(0).text()).toBe('LabelError');
        expect(choiceWrapper.prop('error')).toBe('Error');
      });
    });

    describe('when set as boolean', () => {
      describe('when set to true', () => {
        it('should verify choice when error set as true', () => {
          const choiceWrapper = mount(
                                      <Choice id="MyChoice" label="Label" error theme={theme} />,
                                );
          expect(choiceWrapper.find('label')).toHaveLength(1);
          expect(choiceWrapper.find('label').hasClass('Choice'));
          expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
          expect(choiceWrapper.find('div')).toHaveLength(2);
          expect(choiceWrapper.find('div').at(0).hasClass('Control'));
          expect(choiceWrapper.find('div').at(1).hasClass('Label'));
          expect(choiceWrapper.find('div').at(1).text()).toBe('Label');
          expect(choiceWrapper.prop('label')).toBe('Label');
          expect(choiceWrapper.prop('error')).toBe(true);
        });
      });

      describe('when set to false', () => {
        it('should verify choice when error set as false', () => {
          const choiceWrapper = mount(
                                      <Choice id="MyChoice" label="Label" error={false} theme={theme} />,
                                );
          expect(choiceWrapper.find('label')).toHaveLength(1);
          expect(choiceWrapper.find('label').hasClass('Choice'));
          expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
          expect(choiceWrapper.find('div')).toHaveLength(2);
          expect(choiceWrapper.find('div').at(0).hasClass('Control'));
          expect(choiceWrapper.find('div').at(1).hasClass('Label'));
          expect(choiceWrapper.find('div').at(1).text()).toBe('Label');
          expect(choiceWrapper.prop('label')).toBe('Label');
          expect(choiceWrapper.prop('error')).toBe(false);
        });
      });
    });

    describe('when not set', () => {
      it('should verify choice when error is not set', () => {
        const choiceWrapper = mount(
                                    <Choice id="MyChoice" label="Label" theme={theme} />,
                              );
        expect(choiceWrapper.find('label')).toHaveLength(1);
        expect(choiceWrapper.find('label').hasClass('Choice'));
        expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
        expect(choiceWrapper.find('div')).toHaveLength(2);
        expect(choiceWrapper.find('div').at(0).hasClass('Control'));
        expect(choiceWrapper.find('div').at(1).hasClass('Label'));
        expect(choiceWrapper.find('div').at(1).text()).toBe('Label');
        expect(choiceWrapper.prop('error')).toBeUndefined();
        expect(choiceWrapper.find('error')).toHaveLength(0);
      });
    });
  });

  describe('labelHidden property', () => {
    describe('when set to true', () => {
      it('should verify choice when labelHidden set as true', () => {
        const choiceWrapper = mount(
                                    <Choice id="MyChoice" label="Label" labelHidden theme={theme} />,
                              );
        expect(choiceWrapper.find('label')).toHaveLength(1);
        expect(choiceWrapper.find('label').hasClass('labelHidden'));
        expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
        expect(choiceWrapper.find('div')).toHaveLength(2);
        expect(choiceWrapper.find('div').at(0).hasClass('Control'));
        expect(choiceWrapper.find('div').at(1).hasClass('Label'));
        expect(choiceWrapper.find('div').at(1).text()).toBe('Label');
        expect(choiceWrapper.prop('labelHidden')).toBe(true);
      });
    });

    describe('when set to false', () => {
      it('should verify choice when labelHidden set as false', () => {
        const choiceWrapper = mount(
                                    <Choice id="MyChoice" label="Label" labelHidden={false} theme={theme} />,
                              );
        expect(choiceWrapper.find('label')).toHaveLength(1);
        expect(choiceWrapper.find('label').hasClass('Choice'));
        expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
        expect(choiceWrapper.find('div')).toHaveLength(2);
        expect(choiceWrapper.find('div').at(0).hasClass('Control'));
        expect(choiceWrapper.find('div').at(1).hasClass('Label'));
        expect(choiceWrapper.find('div').at(1).text()).toBe('Label');
        expect(choiceWrapper.prop('labelHidden')).toBe(false);
      });
    });

    describe('when not set', () => {
      it('should verify choice when labelHidden is not set', () => {
        const choiceWrapper = mount(
                                    <Choice id="MyChoice" label="Label" theme={theme} />,
                              );
        expect(choiceWrapper.find('label')).toHaveLength(1);
        expect(choiceWrapper.find('label').hasClass('Choice'));
        expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
        expect(choiceWrapper.find('div')).toHaveLength(2);
        expect(choiceWrapper.find('div').at(0).hasClass('Control'));
        expect(choiceWrapper.find('div').at(1).hasClass('Label'));
        expect(choiceWrapper.find('div').at(1).text()).toBe('Label');
        expect(choiceWrapper.prop('labelHidden')).toBeUndefined();
        expect(choiceWrapper.find('labelHidden')).toHaveLength(0);
      });
    });
  });

  describe('children property', () => {
    describe('when set', () => {
      it('should verify choice when children is set', () => {
        const choiceWrapper = mount(
                                    <Choice id="MyChoice" label="Label" children="child" theme={theme} />,
                              );
        expect(choiceWrapper.find('label')).toHaveLength(1);
        expect(choiceWrapper.find('label').hasClass('Choice'));
        expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
        expect(choiceWrapper.find('div')).toHaveLength(2);
        expect(choiceWrapper.find('div').at(0).hasClass('Control'));
        expect(choiceWrapper.find('div').at(1).hasClass('Label'));
        expect(choiceWrapper.find('label').text()).toBe('childLabel');
        expect(choiceWrapper.find('div').at(0).text()).toBe('child');
        expect(choiceWrapper.find('div').at(1).text()).toBe('Label');
        expect(choiceWrapper.prop('children')).toBe('child');
      });
    });

    describe('when not set', () => {
      it('should verify choice when children is not set', () => {
        const choiceWrapper = mount(
                                    <Choice id="MyChoice" label="Label" theme={theme} />,
                              );
        expect(choiceWrapper.find('label')).toHaveLength(1);
        expect(choiceWrapper.find('label').hasClass('Choice'));
        expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
        expect(choiceWrapper.find('div')).toHaveLength(2);
        expect(choiceWrapper.find('div').at(0).hasClass('Control'));
        expect(choiceWrapper.find('div').at(1).hasClass('Label'));
        expect(choiceWrapper.find('div').at(1).text()).toBe('Label');
        expect(choiceWrapper.prop('children')).toBeUndefined();
        expect(choiceWrapper.find('children')).toHaveLength(0);
      });
    });
  });

  describe('helpText property', () => {
    describe('when set', () => {
      it('should verify choice when helpText is set', () => {
        const choiceWrapper = mount(
                                    <Choice id="MyChoice" label="Label" helpText="help" theme={theme} />,
                              );
        expect(choiceWrapper.find('label')).toHaveLength(1);
        expect(choiceWrapper.find('label').hasClass('Choice'));
        expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
        expect(choiceWrapper.find('div')).toHaveLength(5);
        expect(choiceWrapper.find('div').at(0).hasClass('Control'));
        expect(choiceWrapper.find('div').at(1).hasClass('Label'));
        expect(choiceWrapper.find('label').text()).toBe('Label');
        expect(choiceWrapper.find('div').at(2).hasClass('Descriptions'));
        expect(choiceWrapper.find('div').at(3).hasClass('HelpText'));
        expect(choiceWrapper.find('div').find('#MyChoiceHelpText').exists()).toBe(true);
        expect(choiceWrapper.find('div').at(0).text()).toBe('Labelhelp');
        expect(choiceWrapper.prop('helpText')).toBe('help');
      });
    });

    describe('when not set', () => {
      it('should verify choice when helpText is not set', () => {
        const choiceWrapper = mount(
                                    <Choice id="MyChoice" label="Label" theme={theme} />,
                              );
        expect(choiceWrapper.find('label')).toHaveLength(1);
        expect(choiceWrapper.find('label').hasClass('Choice'));
        expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
        expect(choiceWrapper.find('div')).toHaveLength(2);
        expect(choiceWrapper.find('div').at(0).hasClass('Control'));
        expect(choiceWrapper.find('div').at(1).hasClass('Label'));
        expect(choiceWrapper.find('div').at(1).text()).toBe('Label');
        expect(choiceWrapper.prop('helpText')).toBeUndefined();
        expect(choiceWrapper.find('helpText')).toHaveLength(0);
      });
    });
  });

  describe('all property', () => {
    describe('when set', () => {
      it('should verify choice when all props are set', () => {
        const choiceWrapper = mount(
                                    <Choice id="MyChoice" label="Label" error labelHidden children="child" helpText="help" theme={theme} />,
                              );
        expect(choiceWrapper.find('label')).toHaveLength(1);
        expect(choiceWrapper.find('label').hasClass('Choice'));
        expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
        expect(choiceWrapper.find('div')).toHaveLength(5);
        expect(choiceWrapper.find('div').at(0).hasClass('Control'));
        expect(choiceWrapper.find('div').at(1).hasClass('Label'));
        expect(choiceWrapper.find('label').text()).toBe('childLabel');
        expect(choiceWrapper.find('div').at(2).hasClass('Descriptions'));
        expect(choiceWrapper.find('div').at(3).hasClass('HelpText'));
        expect(choiceWrapper.find('div').find('#MyChoiceHelpText').exists()).toBe(true);
        expect(choiceWrapper.find('div').at(0).text()).toBe('childLabelhelp');
        expect(choiceWrapper.prop('helpText')).toBe('help');
      });
    });
  });

  describe('theme property', () => {
    describe('when not set', () => {
      it('should verify choice when theme is not set', () => {
        const choiceWrapper = mount(
                                    <Choice id="MyChoice" label="Label" />,
                              );
        expect(choiceWrapper.find('label')).toHaveLength(1);
        expect(choiceWrapper.find('label').hasClass(''));
        expect(choiceWrapper.find('div')).toHaveLength(2);
        expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
        expect(choiceWrapper.find('div').at(0).text()).toBe('');
        expect(choiceWrapper.find('div').at(1).text()).toBe('Label');
      });
    });

    describe('when set', () => {
      it('should verify choice when theme is set', () => {
        const choiceWrapper = mount(
                                  <Choice id="MyChoice" label="Label" theme={theme} />,
                            );
        expect(choiceWrapper.find('label')).toHaveLength(1);
        expect(choiceWrapper.find('label').hasClass('Choice'));
        expect(choiceWrapper.find('div')).toHaveLength(2);
        expect(choiceWrapper.find('div').at(0).hasClass('Control'));
        expect(choiceWrapper.find('div').at(1).hasClass('Label'));
        expect(choiceWrapper.find('label').prop('htmlFor')).toBe('MyChoice');
        expect(choiceWrapper.find('div').at(1).text()).toBe('Label');
      });
    });
  });
});
