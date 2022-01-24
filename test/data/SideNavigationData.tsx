import * as React from "react";
import { INavigationData } from '../../src/components/SideNavigation/SideNavigation';
import { Button } from '../../src/components';

export const sideNavigationData: INavigationData[] = [
  {
    id: 0.1,
    label: 'Select App',
    icon: 'chevronLeft',
    parentDivider: true,
    action: () => null,
  }, {
    id: 0.2,
    label: 'Global',
    parentDivider: true,
    currentApp: true,
    icon: 'external'
  }, {
    id: 1,
    label: 'Application',
    header: <Button componentSize="slim" plain fullWidth >Application</Button>,
    // icon: 'database'
    icon: 'database'
  } , {
    id: 2,
    label: 'Content',
    header: <Button componentSize="slim" plain fullWidth >Content</Button>,
    icon: 'user'
  } , {
    id: 3,
    label: 'App Interfaces',
    header: <Button componentSize="slim" plain fullWidth >App Interfaces</Button>,
    icon: 'users'
  } , {
    id: 4,
    label: 'User Management',
    header: <Button componentSize="slim" plain fullWidth >User Management</Button>,
    icon: 'userMd'
  } , {
    id: 5,
    label: 'Messaging',
    header: <Button componentSize="slim" plain fullWidth >Messaging</Button>,
    icon: 'fileSolid'
  } , {
    id: 6,
    label: 'Workflow & Automation',
    header: <Button componentSize="slim" plain fullWidth >Workflow & Automation</Button>,
    icon: 'paintBrush'
  }
];
