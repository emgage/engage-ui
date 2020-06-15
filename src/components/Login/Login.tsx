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
    {
      content: props.userName,
      divider: true,
      active: false,
      disabled: false,
      header: false,
      closeOnClickOption: false,
    },
    {
      content: 'User Properties',
      divider: true,
      active: false,
      disabled: false,
      header: false,
      closeOnClickOption: false,
    },
    {
      content: <a className={baseTheme.signOut} href={props.logoutUrl}>Sign Out</a>,
      divider: false,
      active: false,
      disabled: false,
      header: false,
      closeOnClickOption: false,
    },
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
      {
        content: props.userName,
        divider: true,
        active: false,
        disabled: false,
        header: false,
        closeOnClickOption: false,
      },
      {
        content: 'User Properties',
        divider: true,
        active: false,
        disabled: false,
        header: false,
        closeOnClickOption: false,
      },
      {
        content: <a className={baseTheme.signOut} href={props.logoutUrl}>Sign Out</a>,
        divider: false,
        active: false,
        disabled: false,
        header: false,
        closeOnClickOption: false,
      }
    ]);
  },              [props.userName, props.logoutUrl]);

  React.useEffect(() => {
    if (props.additionalLIst) {
      setDropdownList([
        {
          content: props.userName,
          divider: true,
          active: false,
          disabled: false,
          header: false,
          closeOnClickOption: false,
        },
        {
          content: 'User Properties',
          divider: true,
          active: false,
          disabled: false,
          header: false,
          closeOnClickOption: false,
        },
        ...props.additionalLIst,
        {
          content: <a className={baseTheme.signOut} href={props.logoutUrl}>Sign Out</a>,
          divider: false,
          active: false,
          disabled: false,
          header: false,
          closeOnClickOption: false,
        }]);
    }
  },              [props.additionalLIst]);

  return (
      props.isLoggedIn ?
      <div className={baseTheme.loginContainer}>
        {!props.profilePic ?
          <Button
            icon="user"
            componentClass={baseTheme.loginUser}
            onClick={e => toggle(e)}
            fullWidth={false}
            primary={false}
            outline={false}
            destructive={false}
            disabled={false}
            external={false}
            submit={false}
            plain={false}
            disclosure={false}
          />
        : <Image onClick={e => toggle(e)} className={baseTheme.profilePic} alt="User profile pic" source={props.profilePic} />}
        <Dropdown
          dropdownItems={dropDownList}
          anchorEl={anchorEl}
          preferredAlignment="right"
          disabled={false}
          closeOnClickOption={false}
        />
      </div> :
      <Button
        url={props.loginUrl}
        componentClass={baseTheme.loginButton}
        plain
        fullWidth={false}
        primary={false}
        outline={false}
        destructive={false}
        disabled={false}
        external={false}
        disclosure={false}
        submit={false}
      >
        Login
      </Button>
  );

};
