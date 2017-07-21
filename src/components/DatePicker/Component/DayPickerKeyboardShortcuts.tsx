import * as React from 'react';
// import PropTypes from 'prop-types';

// import { forbidExtraProps } from 'airbnb-prop-types';
import * as cx from 'classnames';
import { themr, ThemedComponentClass } from 'react-css-themr';

// import { DayPickerKeyboardShortcutsPhrases } from './defaultPhrases';
// import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CloseButton from '../svg/close.svg';

import { DATEPICKER } from '../../ThemeIdentifiers';
import * as baseTheme from './../style/style.scss';

export const TOP_LEFT = 'top-left';
export const TOP_RIGHT = 'top-right';
export const BOTTOM_RIGHT = 'bottom-right';

// const propTypes = ({
//   block: PropTypes.bool,
//   buttonLocation: PropTypes.oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_RIGHT]),
//   showKeyboardShortcutsPanel: PropTypes.bool,
//   openKeyboardShortcutsPanel: PropTypes.func,
//   closeKeyboardShortcutsPanel: PropTypes.func,
//   phrases: PropTypes.shape(getPhrasePropTypes(DayPickerKeyboardShortcutsPhrases)),
// });

// const defaultProps = {
//   block: false,
//   buttonLocation: BOTTOM_RIGHT,
//   showKeyboardShortcutsPanel: false,
//   openKeyboardShortcutsPanel() {},
//   closeKeyboardShortcutsPanel() {},
//   phrases: DayPickerKeyboardShortcutsPhrases,
// };

export function KeyboardShortcutRow({ unicode, label, action }: any) {
  return (
    <li className={this.props.theme["KeyboardShortcutRow"]}>
      <div
        className={this.props.theme["KeyboardShortcutRow__key-container"]}
      >
        <span
          className={this.props.theme["KeyboardShortcutRow__key"]}
          role="img"
          aria-label={label}
        >
          {unicode}
        </span>
      </div>

      <div className={this.props.theme["KeyboardShortcutRow__action"]}>
        {action}
      </div>
    </li>
  );
}

// KeyboardShortcutRow.propTypes = {
//   unicode: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   action: PropTypes.string.isRequired,
// };

function DayPickerKeyboardShortcuts({
  block,
  buttonLocation,
  showKeyboardShortcutsPanel,
  openKeyboardShortcutsPanel,
  closeKeyboardShortcutsPanel,
  phrases,
  theme,
}: any) {
  const keyboardShortcuts = [{
    unicode: '↵',
    label: phrases.enterKey,
    action: phrases.selectFocusedDate,
  },
  {
    unicode: '←/→',
    label: phrases.leftArrowRightArrow,
    action: phrases.moveFocusByOneDay,
  },
  {
    unicode: '↑/↓',
    label: phrases.upArrowDownArrow,
    action: phrases.moveFocusByOneWeek,
  },
  {
    unicode: 'PgUp/PgDn',
    label: phrases.pageUpPageDown,
    action: phrases.moveFocusByOneMonth,
  },
  {
    unicode: 'Home/End',
    label: phrases.homeEnd,
    action: phrases.moveFocustoStartAndEndOfWeek,
  },
  {
    unicode: 'Esc',
    label: phrases.escape,
    action: phrases.returnFocusToInput,
  },
  {
    unicode: '?',
    label: phrases.questionMark,
    action: phrases.openThisPanel,
  },
  ];

  const toggleButtonText =
    showKeyboardShortcutsPanel
    ? phrases.hideKeyboardShortcutsPanel
    : phrases.showKeyboardShortcutsPanel;

  let buttonRef: HTMLButtonElement;

  return (
    <div>
      <button
      // some kind of error with showKeyboardShortcutsButton
        ref={(ref) => { buttonRef = ref; }}
        className={cx(theme['DayPickerKeyboardShortcuts__show'], {
          [theme['DayPickerKeyboardShortcuts__show--bottom-right']]: buttonLocation === BOTTOM_RIGHT,
          [theme['DayPickerKeyboardShortcuts__show--top-right']]: buttonLocation === TOP_RIGHT,
          [theme['DayPickerKeyboardShortcuts__show--top-left']]: buttonLocation === TOP_LEFT,
        })}
        type="button"
        aria-label={toggleButtonText}
        onClick={() => {
          // we want to return focus to this button after closing the keyboard shortcuts panel
          openKeyboardShortcutsPanel(() => { buttonRef.focus(); });
        }}
        onMouseUp={(e) => {
          e.currentTarget.blur();
        }}
      >
        <span className="DayPickerKeyboardShortcuts__show_span">?</span>
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
            className="DayPickerKeyboardShortcuts__title"
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
              <KeyboardShortcutRow key={label} unicode={unicode} label={label} action={action} />
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default themr(DATEPICKER, baseTheme)(DayPickerKeyboardShortcuts) as ThemedComponentClass<{}, {}>;


// DayPickerKeyboardShortcuts.propTypes = propTypes;
// DayPickerKeyboardShortcuts.defaultProps = defaultProps;
