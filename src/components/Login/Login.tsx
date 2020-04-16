import * as React from 'react';
import Button from '../Button';
import Dropdown from '../Dropdown';
import Image from '../Image';
import * as baseTheme from './Login.scss';
import { Props as DropdownItemProps } from '../Dropdown/DropdownItem';

export interface Props {
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

export default (props: Props) => {
  /**
   * Handle anchor state
   */
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | undefined>(undefined);

  /**
   * Handle dropdown list state
  */
  const [dropDownList, setDropdownList] = React.useState<DropdownItemProps[]>([
    { content: props.userName, divider: true },
    { content: 'User Properties', divider: true },
    { content: <a className={baseTheme.signOut} href={props.logoutUrl}>Sign Out</a> },
  ]);

  /**
   * it is toggle dropdown
   * @param e
   */
  const toggle = (e: any) => {
    setAnchorEl(e.target as HTMLElement);
  };

  React.useEffect(() => {
    setDropdownList([
      { content: props.userName, divider: true },
      { content: 'User Properties', divider: true },
      { content: <a className={baseTheme.signOut} href={props.logoutUrl}>Sign Out</a> }
    ]);
  },              [props.userName, props.logoutUrl]);

  React.useEffect(() => {
    if (props.additionalLIst) {
      setDropdownList([
        { content: props.userName, divider: true },
        { content: 'User Properties', divider: true },
        ...props.additionalLIst,
        { content: <a className={baseTheme.signOut} href={props.logoutUrl}>Sign Out</a> }]);
    }
  },              [props.additionalLIst]);

  return (
      props.isLoggedIn ?  <div className={baseTheme.loginContainer}>
        {!props.profilePic ? <Button icon="user" componentClass={baseTheme.loginUser} onClick={e => toggle(e)} />
        : <Image onClick={e => toggle(e)} className={baseTheme.profilePic} alt="User profile pic" source={props.profilePic} />}
        <Dropdown
          dropdownItems={dropDownList}
          anchorEl={anchorEl}
          preferredAlignment="right"
        />
      </div> : <Button url={props.loginUrl} componentClass={baseTheme.loginButton} plain >Login</Button>
  );

};
