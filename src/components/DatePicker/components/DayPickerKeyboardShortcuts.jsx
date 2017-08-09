import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';

import { forbidExtraProps } from 'airbnb-prop-types';
import cx from 'classnames';

import { DayPickerKeyboardShortcutsPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CloseButton from '../svg/close.svg';

import { DATEPICKER } from './../../ThemeIdentifiers';
import * as baseTheme from './../style/style.scss';
 
export const TOP_LEFT = 'top-left';
export const TOP_RIGHT = 'top-right';
export const BOTTOM_RIGHT = 'bottom-right';


const propTypes = forbidExtraProps({
  block: PropTypes.bool,
  buttonLocation: PropTypes.oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_RIGHT]),
  showKeyboardShortcutsPanel: PropTypes.bool,
  openKeyboardShortcutsPanel: PropTypes.func,
  closeKeyboardShortcutsPanel: PropTypes.func,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerKeyboardShortcutsPhrases)),
  theme: PropTypes.any,
  testingThis: PropTypes.object,
});

const defaultProps = {
  block: false,
  buttonLocation: BOTTOM_RIGHT,
  showKeyboardShortcutsPanel: false,
  openKeyboardShortcutsPanel() {},
  closeKeyboardShortcutsPanel() {},
  phrases: DayPickerKeyboardShortcutsPhrases,
};

export function KeyboardShortcutRow({ unicode, label, action, theme }) {
  return (
    <li className={theme["KeyboardShortcutRow"]}>
      <div
        className={theme["KeyboardShortcutRow__key-container"]}
      >
        <span
          className={theme["KeyboardShortcutRow__key"]}
          role="img"
          aria-label={label}
        >
          {unicode}
        </span>
      </div>

      <div className={theme["KeyboardShortcutRow__action"]}>
        {action}
      </div>
    </li>
  );
}

KeyboardShortcutRow.propTypes = {
  unicode: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

function DayPickerKeyboardShortcuts(
  {
  block,
  buttonLocation,
  showKeyboardShortcutsPanel,
  openKeyboardShortcutsPanel,
  closeKeyboardShortcutsPanel,
  phrases,
  theme,
  testingThis,
}) {
  const fakeThis = testingThis;
  // console.log('test TESTINGTHIS:', testingThis);
  // this = testingThis;
  // console.log('theme!!!:', theme)
  // console.log('this daypickerkeyboardshorcut', this);
  const keyboardShortcuts = [{
    unicode: '↵',
    label: phrases.enterKey,
    action: phrases.selectFocusedDate,
    theme: theme,
  },
  {
    unicode: '←/→',
    label: phrases.leftArrowRightArrow,
    action: phrases.moveFocusByOneDay,
    theme: theme,
  },
  {
    unicode: '↑/↓',
    label: phrases.upArrowDownArrow,
    action: phrases.moveFocusByOneWeek,
    theme: theme,
  },
  {
    unicode: 'PgUp/PgDn',
    label: phrases.pageUpPageDown,
    action: phrases.moveFocusByOneMonth,
    theme: theme,
  },
  {
    unicode: 'Home/End',
    label: phrases.homeEnd,
    action: phrases.moveFocustoStartAndEndOfWeek,
    theme: theme,
  },
  {
    unicode: 'Esc',
    label: phrases.escape,
    action: phrases.returnFocusToInput,
    theme: theme,
  },
  {
    unicode: '?',
    label: phrases.questionMark,
    action: phrases.openThisPanel,
    theme: theme,
  },
  ];

  const toggleButtonText =
    showKeyboardShortcutsPanel
    ? phrases.hideKeyboardShortcutsPanel
    : phrases.showKeyboardShortcutsPanel;

  // let showKeyboardShortcutsButton;

  return (
    <div>
      <button
        ref={(ref) => { 

          {/* console.log('ref at daypickerkeyboardshorcut', ref) */}
          fakeThis.showKeyboardShortcutsButton = ref; 
          }
        }
        className={cx(theme['DayPickerKeyboardShortcuts__show'], {
          [theme['DayPickerKeyboardShortcuts__show--bottom-right']]: buttonLocation === BOTTOM_RIGHT,
          [theme['DayPickerKeyboardShortcuts__show--top-right']]: buttonLocation === TOP_RIGHT,
          [theme['DayPickerKeyboardShortcuts__show--top-left']]: buttonLocation === TOP_LEFT,
        })}
        type="button"
        aria-label={toggleButtonText}
        onClick={() => {
          // we want to return focus to testingThis button after closing the keyboard shortcuts panel
          openKeyboardShortcutsPanel(() => { fakeThis.showKeyboardShortcutsButton.focus(); });
        }}
        onMouseUp={(e) => {
          e.currentTarget.blur();
        }}
      >
        <span className={theme["DayPickerKeyboardShortcuts__show_span"]}>?</span>
      </button>

      {showKeyboardShortcutsPanel &&
        <div
          className={cx(theme['DayPickerKeyboardShortcuts__panel'], {
            [theme['DayPickerKeyboardShortcuts__panel--block']]: block,
          })}
          role="dialog"
          aria-labelledby="DayPickerKeyboardShortcuts__title"
        >
          <div
            id="DayPickerKeyboardShortcuts__title"
            className={theme["DayPickerKeyboardShortcuts__title"]}
          >
            {phrases.keyboardShortcuts}
          </div>

          <button
            className={theme["DayPickerKeyboardShortcuts__close"]}
            type="button"
            aria-label={phrases.hideKeyboardShortcutsPanel}
            onClick={closeKeyboardShortcutsPanel}
            onKeyDown={(e) => {
              // Because the close button is the only focusable element inside of the panel, this
              // amount to a very basic focus trap. The user can exit the panel by "pressing" the
              // close button or hitting escape
              if (e.key === 'Tab') {
                e.preventDefault();
              }
            }}
          >
            <CloseButton />
          </button>

          <ul className={theme["DayPickerKeyboardShortcuts__list"]}>
            {keyboardShortcuts.map(({ unicode, label, action }) => (
              <KeyboardShortcutRow key={label} unicode={unicode} label={label} action={action} theme={theme}/>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default themr(DATEPICKER, baseTheme)(DayPickerKeyboardShortcuts);

DayPickerKeyboardShortcuts.propTypes = propTypes;
DayPickerKeyboardShortcuts.defaultProps = defaultProps;
