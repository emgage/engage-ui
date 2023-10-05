import * as React from 'react';
import * as baseTheme from './AppBar.scss';
import Login from '../Login';
import { DropdownItemProps } from '../Dropdown';
import Image from '../Image';
import TextField from '../TextField';
import FlexBox from '../FlexBox';
import Icon from '../Icon';

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
   * Callback when search input is Key.
   */
  searchOnKeyDown?(e: React.FormEvent<HTMLElement> | KeyboardEvent): void;
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
  onHeightChange?: (height: number) => void;
  logoElement?: React.ReactNode;
}

const AppBar: React.FC<Props> = (props) => {
  const headerRef = React.useRef(null);
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
    enableGlobalElement,
    searchOnKeyDown,
    onHeightChange,
    logoElement
  } = props;
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    const element: any = headerRef.current;
    const listener = () => {
      element && onHeightChange && onHeightChange(element.offsetHeight);
    };
    listener();
    if (element) {
      window.addEventListener('resize', listener);
    }
    return () => {
      element && window.removeEventListener('resize', listener);
    };
  },              []);

  /**
   * Render Right side children
   */
  const renderRightChildren = () => {
    if (rightChildren) {
      return rightChildren.map((child: React.ReactNode) => child);
    }
  };

  return <header ref={headerRef} className={baseTheme.appHeader}>
    <FlexBox>
      { enableGlobalGo && enableGlobalElement }
      { logoElement }
      { logo && <Image alt="Logo" source={logo} /> }
      { enableSearch &&
        <div className={baseTheme.searchBar}>
          <TextField
            type="text"
            componentHeight="slim"
            prefix={<Icon source="search" componentColor="inkLighter"/>}
            suffix={searchText && <Icon source="cancelSmall" onClick={() => setSearchText('')} componentColor="inkLighter" />}
            value={searchText}
            labelHidden
            placeholder="Search"
            placeholderAlign="left"
            onKeyDown={(event: any) => {
              searchOnKeyDown && searchOnKeyDown(event);
              setSearchText(event.target.value);
            }
          }
          />
        </div>
      }
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
