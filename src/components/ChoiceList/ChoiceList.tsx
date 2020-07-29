import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { noop, createUniqueIDFactory } from '@shopify/javascript-utilities/other';

import Checkbox from '../Checkbox';
import RadioButton from '../RadioButton';
import { CHOICE_LIST } from '../ThemeIdentifiers';

import * as baseTheme from './ChoiceList.scss';

export interface ChoiceDescriptor {
  value: any;
  label: string;
}

export type Choice = ChoiceDescriptor;

export interface Props {
  // Title of choice list.
  componentTitle?: string;
  // Display title or not
  titleHidden?: boolean;
  // Array of choices to be displayed. Choice is object of { value: string, label: string }.
  choices: Choice[];
  // Selected values
  selected: any[];
  // Name of the chicelist
  componentName?: string;
  // Allow multiple selection
  allowMultiple?: boolean;
  // Theme to be injected via css-themr
  theme?: any;
  // Function to handle on change of choice list.
  onChange?(selected: string[]): void;
  // Set choice list position
  horizontal?: boolean;
  // set helper text
  helpText?: string;
}

const getUniqueID = createUniqueIDFactory('ChoiceList');

class ChoiceList extends React.PureComponent<Props, {}> {
  choiceIsSelected = ({ value }: Choice, selected: any[]) => {
    return selected.indexOf(value) >= 0;
  }

  updateSelectedChoices = ({ value }: Choice, checked: boolean, selected: any[], allowMultiple = false) => {
    if (checked) {
      return allowMultiple ? [...selected, value] : [value];
    }

    return selected.filter(selectedChoice => selectedChoice !== value);
  }

  handleChange = (choice: Choice, checked: boolean) => {
    const { allowMultiple, onChange = noop, selected } = this.props;
    onChange(this.updateSelectedChoices(choice, checked, selected, allowMultiple));
  }

  render() {
    const {
      componentTitle,
      titleHidden = false,
      allowMultiple = false,
      choices,
      selected,
      horizontal = false,
      theme,
      helpText,
      componentName = getUniqueID(),
    } = this.props;

    const CONTROLCOMPONENT: any = allowMultiple ? Checkbox : RadioButton;
    const finalName = allowMultiple ? `${componentName}[]` : componentName;
    const className = classNames(theme.choiceList, titleHidden && theme.titleHidden);
    const titleMarkup = componentTitle
      ? <div className={theme.title}>{componentTitle}</div>
      : null;

    const helpTextMarkup = helpText
        ? <div className={theme.helpText}>{helpText}</div>
        : null;

    const choicesMarkup = choices.map((choice) => {
      const key = choice.value;
      const value = choice.value;
      const label = choice.label;

      return (
        <li key={key}>
          <CONTROLCOMPONENT
            name={finalName}
            value={value}
            label={label}
            checked={selected && this.choiceIsSelected(choice, selected)}
            onChange={(checked: boolean) => this.handleChange(choice, checked)}
            theme={theme}
          />
        </li>
      );
    });

    return (
      <div className={className}>
        {titleMarkup}
        {helpTextMarkup}
        <ul className={ horizontal ? theme.choicesHorizontal : theme.choices}>
          {choicesMarkup}
        </ul>
      </div>
    );
  }
}

export default themr(CHOICE_LIST, baseTheme)(ChoiceList) as ThemedComponentClass<Props, {}>;
