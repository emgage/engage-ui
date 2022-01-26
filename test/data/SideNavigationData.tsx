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
    label: 'Main App',
    parentDivider: true,
    currentApp: true,
    icon: 'external'
  }, {
    id: 1,
    label: 'Applicantion',
    header: <Button componentSize="slim" plain fullWidth >Application</Button>,
    // icon: 'database'
    icon: 'database'
  } , {
    id: 2,
    label: 'Contents',
    header: <Button componentSize="slim" plain fullWidth >Content</Button>,
    icon: 'user'
  } , {
    id: 3,
    label: 'Interfaces',
    header: <Button componentSize="slim" plain fullWidth >App Interfaces</Button>,
    icon: 'users'
  } , {
    id: 4,
    label: 'User Mgmt',
    header: <Button componentSize="slim" plain fullWidth >User Management</Button>,
    icon: 'userMd'
  } , {
    id: 5,
    label: 'Messaging',
    header: <Button componentSize="slim" plain fullWidth >Messaging</Button>,
    icon: 'fileSolid'
  } , {
    id: 6,
    label: 'Workflows',
    header: <Button componentSize="slim" plain fullWidth >Workflow & Automation</Button>,
    icon: 'paintBrush'
  }
];
