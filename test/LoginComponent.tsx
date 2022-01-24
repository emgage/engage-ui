import * as React from 'react';
// import AuthenticationService from '../../Services/AuthenticationService';
import { Button, Dropdown } from '../src/components';
const baseTheme = require('./styles/Login.scss');

interface IProps {
  isLoggedIn: boolean;
}

export default (props: IProps) => {
  // handle state for anchorEl
  // const { isLoggedIn } = props;
  const [anchorEl, setanchorEl] = React.useState(null);
  const [displayName, ] = React.useState('');
  const [isAnonymous, ] = React.useState(false);

  // dropdown items list
  const dropDownItems = [
    { content: displayName, divider: true },
    // { content: 'User Properties', divider: true },
    { content: <a className={baseTheme.signOut}>Sign Out</a> }
  ];

  /**
   * it is toggle dropdown
   * @param e
   */
  const toggle = (e: any) => {
    setanchorEl((e as any).currentTarget)
  }

  if (!isAnonymous) {
    return (
      <div className={baseTheme.loginContainer}>
        <Button componentId="appBtnAvatar" icon="user" componentSize='slim' componentClass={baseTheme.loginUser} onClick={e => toggle(e)} />
        <Dropdown
          dropdownItems={dropDownItems}
          anchorEl={anchorEl}
          preferredAlignment="right"
          preferredPosition="below"
        />
      </div>
    );
  }

  return (
    <Button
      // url={AuthenticationService.getLoginUrl()}
      componentClass={baseTheme.loginButton}
      componentSize="slim"
      plain>
      
    </Button>
  );

}