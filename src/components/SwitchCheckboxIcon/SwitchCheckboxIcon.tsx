import * as React from 'react';
import { ThemedComponentClass, themr } from '@friendsofreactjs/react-css-themr';
import { SWITCHCHECKBOX } from '../ThemeIdentifiers';
import * as baseTheme from './SwitchCheckboxIcon.scss';
// import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
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
  switchType?:ISwitchType;
  allowNull?:boolean;
}

// const getUniqueID = createUniqueIDFactory('SwitchCheckboxIcon');

const SwitchCheckboxIcon = (props: Props) => {
  const { theme, componentClass, componentStyle, /*componentId = getUniqueID(),*/isOpen, allowNull } = props;
  const { /*children, isOpen, disabled, */handleToggle, switchType= 'normal' } = props;
  let switchTypeClass = theme.switchNormal;
  switch (switchType) {
    case 'normal':
      switchTypeClass = theme.switchNormal;
      break;
    case 'trueFalse':
      switchTypeClass = theme.switchTrueFalse;
      break;
    case 'yesNo' :
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
        typeof isOpen !== 'boolean' && !isOpen && theme.nullSelect ,
        allowNull && theme.disableSwitch
    );
  console.log(isOpen);
  return (<div style={componentStyle}  className={className} aria-label="Switch">
      <div className={theme.outeWrap}>

      <label htmlFor="falseRadio" className={theme.falseRadio}>
            <input type="radio" name="switch" id="falseRadio" onClick={() => handleToggle(false)}/>
            <span className={theme.switchRadio}>false</span>
            <Icon source="cancel" componentColor="inkLighter" componentClass={theme.Cancel}></Icon>
        </label>

        <label htmlFor="nullRadio" className={theme.nullRadio}>
          <input type="radio" name="switch" id="nullRadio" /*disabled={!allowNull}*/ onClick={() => allowNull && handleToggle()}/>
          <span className={theme.switchRadio}>null</span>
        </label>

        <label htmlFor="trueRadio" className={theme.trueRadio}>
            <input type="radio" name="switch" id="trueRadio" onClick={() => handleToggle(true)}/>
            <span className={theme.switchRadio}>True</span>
            <Icon source="check" componentColor="blue" componentClass={theme.Accept}></Icon>
        </label>
      </div>

        </div>);
};

export default themr(SWITCHCHECKBOX, baseTheme)(SwitchCheckboxIcon) as ThemedComponentClass<Props, {}>;
