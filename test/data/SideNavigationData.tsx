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
  } , 
  // {
  //   id: 7,
  //   label: 'Data Sync',
  //   header: <Button componentSize="slim" plain fullWidth >Data Sync</Button>,
  //   // action: () => handleHeadingClick(7),
  //   children: [
  //     {
  //       id: 7.1,
  //       label: 'SQL Mapping',
  //       icon: 'database',
  //       notActionable: true,
  //       action: () => console.log('SQL Mapping Item is clicked!'),
  //     }
  //   ]
  // } , {
  //   id: 8,
  //   label: 'Media Management',
  //   header: <Button componentSize="slim" plain fullWidth >Media Management</Button>,
  //   // action: () => handleHeadingClick(8),
  //   children: [
  //     {
  //       id: 8.1,
  //       label: 'File Policies',
  //       icon: 'lock',
  //       notActionable: true,
  //       action: () => console.log('File Policies Item is clicked!'),
  //     }, {
  //       id: 8.2,
  //       label: 'File Definitions',
  //       icon: 'file',
  //       notActionable: true,
  //       action: () => console.log('File Definitions Item is clicked!'),
  //     }
  //   ]
  // } , {
  //   id: 9,
  //   label: 'Analytics',
  //   header: <Button componentSize="slim" plain fullWidth >Analytics</Button>,
  //   // action: () => handleHeadingClick(9),
  //   children: [
  //     {
  //       id: 9.1,
  //       label: "Dashboards",
  //       icon: "tachometer",
  //       notActionable: true,
  //       action: () => console.log("Dashboards is clicked!")
  //     }, {
  //       id: 9.2,
  //       label: "Reports",
  //       icon: "chartBar",
  //       notActionable: true,
  //       action: () => console.log("Reports is clicked!")
  //     }
  //   ]
  // } , {
  //   id: 10,
  //   label: 'Usage Analytics',
  //   header: <Button componentSize="slim" plain fullWidth >Usage Analytics</Button>,
  //   // action: () => handleHeadingClick(10), // Has no effect right now as no child elements
  //   children: []
  // } , {
  //   id: 11,
  //   label: 'Projects & Tasks',
  //   header: <Button componentSize="slim" plain fullWidth >Projects & Tasks</Button>,
  //   // action: () => handleHeadingClick(11), // Has no effect right now as no child elements
  //   children: []
  // } , {
  //   id: 12,
  //   label: 'Support Sherpa',
  //   header: <Button componentSize="slim" plain fullWidth >Support Sherpa</Button>,
  //   // action: () => handleHeadingClick(12), // Has no effect right now as no child elements
  //   children: []
  // }
];
