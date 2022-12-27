import * as React from 'react';
import { ThemedComponentClass, themr } from '@friendsofreactjs/react-css-themr';
import { SWITCHCHECKBOX } from '../ThemeIdentifiers';
import * as baseTheme from './SwitchCheckbox.scss';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { classNames } from '@shopify/react-utilities/styles';
import VisuallyHidden from '../VisuallyHidden';
import { Spinner,FlexBox,Icon } from '../../../src/components/';



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
  loading?: boolean
  markIfRequired?: boolean
  errors?: [string] | null;
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
const [onHover, SetOnHover] = React.useState(false)

  const { theme, componentClass, componentStyle, isOpen:propIsOpen, allowNull = true, disabled, loading = false, markIfRequired, errors } = props;
  const { children, handleToggle, switchType = 'normal' } = props;
  const [isOpen, SetIsToggle] = React.useState(loading ? !propIsOpen : propIsOpen);
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
    disabled && theme.disableSwitch,
    loading === true && theme.loadingSelect

  );
  const isToggle = () => {
    if (disabled) return;
    SetIsToggle(!isOpen)
  }
  return (<div onClick={isToggle} style={{...componentStyle,position:'relative'}} className={className}>
    <div className={theme.outerWrap}>

      <label htmlFor={names.falseRadio} className={theme.falseRadio}>
        <VisuallyHidden>{switchType === 'trueFalse' ? 'False' : 'No' }</VisuallyHidden>

        <input
          type="radio"
          id={names.falseRadio}
          name={names.fieldName}
          value={names.falseRadio}
          checked={isOpen === false}
          disabled={disabled}
          onChange={() => handleToggle(false)}
        />
        <span className={theme.switchRadio}>
        {loading? <Spinner componentColor="reverse" componentStyle={{ fill: '#757575' }} componentSize="small" accessibilityLabel="Loading" />:<Icon source="cancel" componentColor="inkLighter" componentClass={theme.Cancel} />}
        </span>
      </label>

      <label htmlFor={names.nullRadio} className={theme.nullRadio}>
      <VisuallyHidden>Null</VisuallyHidden>
        <input
          type="radio"
          id={names.nullRadio}
          name={names.fieldName}
          value={names.nullRadio}
          checked={typeof isOpen !== 'boolean' && !isOpen}
          disabled={!allowNull || disabled}
          onChange={() => allowNull && handleToggle()} />
        <span className={theme.switchRadio}>Null</span>
      </label>
      {switchType === 'normal' &&
        <div className={theme.nullSwitchBox} />}

      <label htmlFor={names.trueRadio} className={theme.trueRadio}>
      <VisuallyHidden>{switchType === 'trueFalse' ? 'True' : 'Yes' }</VisuallyHidden>
        <input
          type="radio"
          id={names.trueRadio}
          name={names.fieldName}
          value={names.trueRadio}
          checked={isOpen === true}
          disabled={disabled}
          onChange={() => handleToggle(true)}
        />
        <span className={theme.switchRadio}>
          {loading? <Spinner componentColor="reverse" componentStyle={{ fill: '#757575' }} componentSize="small" accessibilityLabel="Loading" />:<Icon source="check" componentColor="blue" componentClass={theme.Accept} />}
        </span>
      </label>

    </div>
    {
    children && 
      <FlexBox componentStyle={{width:'100%', position:'relative'}}  justify='SpaceBetween'>
        <FlexBox> <label className={theme.switchLabel}>{children}</label>{markIfRequired && <span className={theme.markWrapper}><Icon componentClass={theme.mark} source="requiredMark"></Icon></span>}</FlexBox>
       
          {onHover && <div className={theme.tooltip}>
            {errors instanceof Array ? errors.join(', ') : (typeof errors === 'string' ? errors : 'An error occurred.')}
            <div className={theme.tip}></div>
          </div>}
        {errors && <div style={{display:'inline-block',height:'16px'}} onMouseEnter={() => SetOnHover(true)} onMouseLeave={() => SetOnHover(false)}> <Icon componentClass={theme.errorIconStyle} source='errorIcon'></Icon></div>}
      </FlexBox>
      }
  </div>);
};

export default themr(SWITCHCHECKBOX, baseTheme)(SwitchCheckbox) as ThemedComponentClass<Props, {}>;
