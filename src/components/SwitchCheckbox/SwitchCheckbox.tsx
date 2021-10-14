import * as React from 'react';
import { ThemedComponentClass, themr } from '@friendsofreactjs/react-css-themr';
import { SWITCHCHECKBOX } from '../ThemeIdentifiers';
import * as baseTheme from './SwitchCheckbox.scss';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { classNames } from '@shopify/react-utilities/styles';
import Icon from '../Icon/Icon';

export type ISwitchType = 'normal' | 'trueFalse' | 'yesNo';
export interface Props {
  // Set theme for SwitchCheckbox
  theme?: any;
  // To apply custom styling.
  componentStyle?: React.CSSProperties;
  // Set a custom class
  componentClass?: string;
  componentId?: string;
  children?: React.ReactNode;
  // component props to handle toggle
  disabled?: boolean;
  isOpen?: boolean;
  handleToggle: (value?: boolean) => void;
  switchType?: ISwitchType;
  allowNull?: boolean;
  name?: string;
}

const getUniqueName = createUniqueIDFactory('SwitchCheckbox');
const getFalseRadioName = createUniqueIDFactory('falseRadio');
const getNullRadioName = createUniqueIDFactory('nullRadio');
const getTrueRadioName = createUniqueIDFactory('trueRadio');

const SwitchCheckbox = (props: Props) => {
  const [names] = React.useState(() => {
    const fieldName = getUniqueName();
    const falseRadio = getFalseRadioName();
    const nullRadio = getNullRadioName();
    const trueRadio = getTrueRadioName();
    return {
      fieldName,
      falseRadio,
      nullRadio,
      trueRadio,
    };
  });
  const { theme, componentClass, componentStyle, isOpen, allowNull = true } = props;
  const { children, handleToggle, switchType = 'normal' } = props;
  let switchTypeClass = theme.switchNormal;
  switch (switchType) {
    case 'normal':
      switchTypeClass = theme.switchNormal;
      break;
    case 'trueFalse':
      switchTypeClass = theme.switchTrueFalse;
      break;
    case 'yesNo':
      switchTypeClass = theme.switchYesNo;
      break;
    default:
      switchTypeClass = theme.switchNormal;
      break;
  }

  const className = classNames(
    componentClass,
    theme.switchCheckbox,
    switchTypeClass,
    isOpen === false && theme.falseSelect,
    isOpen === true && theme.trueSelect,
    typeof isOpen !== 'boolean' && !isOpen && theme.nullSelect,
    allowNull && theme.disableSwitch
  );
  return (<div style={componentStyle} className={className}>
    <div className={theme.outerWrap}>

      <label htmlFor={names.falseRadio} className={theme.falseRadio}>
        <input
          type="radio"
          id={names.falseRadio}
          name={names.fieldName}
          value={names.falseRadio}
          checked={isOpen === false}
          onChange={() => handleToggle(false)}
        />
        <span className={theme.switchRadio}>
          <Icon source="cancel" componentColor="inkLighter" componentClass={theme.Cancel} />
        </span>
      </label>

      <label htmlFor={names.nullRadio} className={theme.nullRadio}>
        <input
          type="radio"
          id={names.nullRadio}
          name={names.fieldName}
          value={names.nullRadio}
          checked={typeof isOpen !== 'boolean' && !isOpen}
          disabled={!allowNull}
          onChange={() => allowNull && handleToggle()} />
        <span className={theme.switchRadio}>Null</span>
      </label>

      <label htmlFor={names.trueRadio} className={theme.trueRadio}>
        <input
          type="radio"
          id={names.trueRadio}
          name={names.fieldName}
          value={names.trueRadio}
          checked={isOpen === true}
          onChange={() => handleToggle(true)}
        />
        <span className={theme.switchRadio}>
          <Icon source="check" componentColor="blue" componentClass={theme.Accept} />
        </span>
      </label>

    </div>
    {children && <label className={theme.switchLabel}>{children}</label>}
  </div>);
};

export default themr(SWITCHCHECKBOX, baseTheme)(SwitchCheckbox) as ThemedComponentClass<Props, {}>;
