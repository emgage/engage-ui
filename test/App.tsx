import * as React from "react";
import { sideNavigationData } from "./data/SideNavigationData";
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import {
  SideNavigation,
  Heading
} from "../src/components";
import TableComponent from './TableComponent';
const baseTheme = require('./styles/App.scss');

const TestSideNavigation = (props: any) => {
  console.log("TestSideNavigation props = ", props);
  return (
    <SideNavigation
      accordian={true}
      source={sideNavigationData}
      activeItem={1}
      drawerOpen
      hideCollapse={false}
      drawerExpand={false}
      drawerStyle={{ top: 50 }}
    />
  )
} 

const App = (props: any) => {
  console.log("App props = ", props);
  const { theme } = props;
  return (
    <div>
      <TestSideNavigation />
      <div className={theme.appContainer} style={{ top: 50, position: "relative", left: 40, width: "calc(100% - 40px)" }}>
        <Heading componentStyle={{ marginBottom: 8 }} headingSize="h2">Internal Projects</Heading>
        <Heading componentStyle={{ marginBottom: 20, color: "#616161", fontSize: 14 }} headingSize="h4">Project Portfolio</Heading>
        <TableComponent />
      </div>
    </div>
  )
}

export default themr("APP", baseTheme)(App) as ThemedComponentClass<any, {}>;
