import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { ReactComponent } from '@shopify/react-utilities/types';
import { noop, createUniqueIDFactory } from '@shopify/javascript-utilities/other';

import Checkbox from '../Checkbox';
import RadioButton from '../RadioButton';
import { CHOICE_LIST } from '../ThemeIdentifiers';

import * as baseTheme from './ChoiceList.scss';

export interface ChoiceDescriptor {
  value: string;
  label: string;
}

export type Choice = ChoiceDescriptor;

export interface Props {
  // Title of choice list.
  customTitle?: string;
  // Display title or not
  titleHidden?: boolean;
  // Array of choices to be displayed. Choice is object of { value: string, label: string }.
  choices: Choice[];
  // Selected values
  selected: string[];
  // Name of the chicelist
  customName?: string;
  // Allow multiple selection
  allowMultiple?: boolean;
  // Theme to be injected via css-themr
  theme?: any;
  // Function to handle on change of choice list.
  onChange?(selected: string[]): void;
}

type ChooseableComponent = ReactComponent<{
  label: string,
  name?: string,
  value?: string,
  checked?: boolean,
  onChange?(checked: boolean): void,
}>;

const getUniqueID = createUniqueIDFactory('ChoiceList');

const choiceList = ({
  customTitle,
  titleHidden,
  allowMultiple,
  choices,
  selected,
  onChange = noop,
  theme,
  customName = getUniqueID(),
}: Props) => {
  const CONTROLCOMPONENT: ChooseableComponent = allowMultiple ? Checkbox : RadioButton;
  const finalName = allowMultiple ? `${customName}[]` : customName;
  const className = classNames(theme.choiceList, titleHidden && theme.titleHidden);
  const titleMarkup = customTitle
    ? <legend className={theme.title}>{customTitle}</legend>
    : null;

  const choicesMarkup = choices.map((choice) => {
    const key = choice.value;
    const value = choice.value;
    const label = choice.label;

    function handleChange(checked: boolean) {
      onChange(updateSelectedChoices(choice, checked, selected, allowMultiple));
    }

    return (
      <li key={key}>
        <CONTROLCOMPONENT
          name={finalName}
          value={value}
          label={label}
          checked={choiceIsSelected(choice, selected)}
          onChange={handleChange}
        />
      </li>
    );
  });

  return (
    <fieldset className={className}>
      {titleMarkup}
      <ul className={theme.choices}>
        {choicesMarkup}
      </ul>
    </fieldset>
  );
};

function choiceIsSelected({ value }: Choice, selected: string[]) {
  return selected.indexOf(value) >= 0;
}

function updateSelectedChoices({ value }: Choice, checked: boolean, selected: string[], allowMultiple = false) {
  if (checked) {
    return allowMultiple ? [...selected, value] : [value];
  }

  return selected.filter(selectedChoice => selectedChoice !== value);
}

export default themr(CHOICE_LIST, baseTheme)(choiceList) as ThemedComponentClass<Props, {}>;
