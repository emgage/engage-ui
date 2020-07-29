import * as React from 'react';
import * as baseTheme from './AppBar.scss';
import Login from '../Login';
import { DropdownItemProps } from '../Dropdown';
import Image from '../Image';
import TextField from '../TextField';
import FlexBox from '../FlexBox';

export interface Props {
  /**
   * Enable go button
   */
  enableGlobalGo: boolean;
  /**
   * Enable global elements
   */
  enableGlobalElement?: React.ReactNode;
  /**
   * Logo url
   */
  logo?: string;
  /**
   * Enable search
   */
  enableSearch?: boolean;
  /**
   * Right side children
   */
  rightChildren?: React.ReactNode[];
  /**
   * Check login status for user
   */
  isLoggedIn: boolean;
  /**
   * LogIn user name or email
   */
  userName: string;
  /**
   * Logout url for redirection
   */
  logoutUrl: string;
  /**
   * Additional items for dropdown
   */
  additionalLIst?: DropdownItemProps[];
  /**
   * Login url
   */
  loginUrl: string;
  /**
   * Login User profile pic
   */
  profilePic?: string;
}

const AppBar: React.FC<Props> = (props) => {
  /**
   * Destructure props here
   */
  const {
    additionalLIst,
    enableGlobalGo,
    enableSearch = false,
    isLoggedIn,
    loginUrl,
    logoutUrl,
    profilePic,
    userName,
    logo,
    rightChildren,
    enableGlobalElement
  } = props;

  /**
   * Render Right side children
   */
  const renderRightChildren = () => {
    if (rightChildren) {
      return rightChildren.map((child: React.ReactNode) => child);
    }
  };

  return <header className={baseTheme.appHeader}>
    <FlexBox>
      { enableGlobalGo && enableGlobalElement }
      { logo && <Image alt="Logo" source={logo} /> }
      { enableSearch && <TextField /> }
      <div className={baseTheme.rChild}>
      { rightChildren && <div>{renderRightChildren()}</div> }
      <Login
        isLoggedIn={isLoggedIn}
        loginUrl={loginUrl}
        logoutUrl={logoutUrl}
        userName={userName}
        additionalLIst={additionalLIst}
        profilePic={profilePic}
      />
      </div>
    </FlexBox>
  </header>;
};

export default AppBar;
