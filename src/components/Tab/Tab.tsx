import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { TAB } from '../ThemeIdentifiers';
import * as baseTheme from './Tab.scss';

// All prototypes type
export interface Props {
  // Description of tab (like title only, title with icon, or any other react component)
  tabDescription?: React.ReactNode;
  // Unique identity for tab
  tabId: string;
  // Identity of selected/currently active tab
  activeTabId?: string;
  // Callback function to be called when tab is clicked/selected
  onClick?(): void;
  onFocus?(): void;
  // User can Set style for Tab component
  componentStyle?: React.CSSProperties;
  // Set theme for tab
  theme?: any;
  tabIndex?:number;
  Role?:string;
  // Descriptive text to be read to screenreaders.
  accessibilityLabel?: string;
}

// return a Single tab component to be render into tabpanel
const tab = ({ tabId, tabDescription, activeTabId, onClick, theme, componentStyle, tabIndex, Role, onFocus, accessibilityLabel}: Props) => {
  const tabClassName = classNames(
    theme.tab,
    tabId === activeTabId ? theme.active : ''
  );
  return (
    <div className={tabClassName} style={componentStyle} onClick={onClick} onFocus={onFocus} tabIndex={tabIndex} role={Role} aria-label={accessibilityLabel}>
      {tabDescription}
    </div>
  );
};

export default themr(TAB, baseTheme)(tab) as ThemedComponentClass<Props, {}>;
