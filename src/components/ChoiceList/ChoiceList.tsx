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
  title?: string;
  titleHidden?: boolean;
  choices: Choice[];
  selected: string[];
  name?: string;
  allowMultiple?: boolean;
  theme?: any;
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
  title,
  titleHidden,
  allowMultiple,
  choices,
  selected,
  onChange = noop,
  theme,
  name = getUniqueID(),
}: Props) => {
  const CONTROLCOMPONENT: ChooseableComponent = allowMultiple ? Checkbox : RadioButton;
  const finalName = allowMultiple ? `${name}[]` : name;
  const className = classNames(theme.choiceList, titleHidden && theme.titleHidden);
  const titleMarkup = title
    ? <legend className={theme.title}>{title}</legend>
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
