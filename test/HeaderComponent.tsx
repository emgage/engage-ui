import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import {
  Button,
  FlexBox,
  Badge
} from '../src/components';
import LoginComponent from './LoginComponent';
import Header from './Header';
const baseTheme = require('./styles/MainLayout.scss');

const HeaderComponent = (props:  any) => {
  console.log("Header Component Props = ", props);
  const isLoggedIn: boolean = true;
  const notificationCount: number = 1;
  return (
    <Header>
      <FlexBox>
        <LoginComponent isLoggedIn={isLoggedIn} />
        {
          isLoggedIn &&
          (
            <div className={(props as any).theme.notificationContainer}>
              <Button
                componentId="appBtnAvatar"
                componentSize="slim"
                icon="bell"
                componentClass={(props as any).theme.notificationButton}
                // onClick={() => this.toggleNotificationDrawer()}
              >
                {notificationCount > 0 && <Badge componentClass={(props as any).theme.notificationCount}>{notificationCount}</Badge>}
              </Button>
            </div>
          )
        }
      </FlexBox>
    </Header>
  )
}

export default themr("HEADER_COMPONENT", baseTheme)(HeaderComponent) as ThemedComponentClass<any, {}>;
// export default HeaderComponent;