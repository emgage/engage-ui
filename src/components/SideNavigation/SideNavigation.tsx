
import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
//import { classNames } from '@shopify/react-utilities/styles';
//import Icon from '../Icon';
import { SIDENAVIGATION } from '../ThemeIdentifiers';
import { Drawer, DrawerContent } from '../Drawer';
import Button from '../Button';
import * as baseTheme from './SideNavigation.scss';
//import data from './sideNavData.json';
import axios from 'axios';

export interface Props {}

export interface State {
  drawer: boolean;
  activeDrawerId: string;
  navData: Array<string>;
}

class SideNavigation extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
  
      this.state = {
        drawer: false,
        activeDrawerId: 'content1',
        navData: [],
      };
    }
    toggleDrawer = () => {
        this.setState({ drawer: !this.state.drawer });
    }
    
    componentDidMount() {
          axios.get('./src/components/SideNavigation/sideNavData.json').then((response:any) => {
                this.setState({
                    navData: response.data
              });
            })
    };

    render() {
        const navDataMarkup = this.state.navData.map(function(d:any){
            return <li key={d.label}>{d.label}</li>;
        });
        return (
        <div>
        <Button onClick={() => this.setState({ drawer: true })}>Side Navigation</Button>
        <Drawer
          active={ this.state.drawer }
          activeContentId={this.state.activeDrawerId}
          toggleDrawer={this.toggleDrawer}
          mode="slide"
          width="large"
          overlay
          closeButton
          >
            <DrawerContent
                id="content1"
                mode="slide">
                <ul>
                {navDataMarkup}
                </ul>
            </DrawerContent>
        </Drawer>
        </div>
        );
    }

};    
export default themr(SIDENAVIGATION, baseTheme)(SideNavigation) as ThemedComponentClass<Props, {}>;        