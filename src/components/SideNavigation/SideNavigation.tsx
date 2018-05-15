
import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
//import { classNames } from '@shopify/react-utilities/styles';
import Icon from '../Icon';
import { SIDENAVIGATION } from '../ThemeIdentifiers';
import { Drawer, DrawerContent } from '../Drawer';
import Button from '../Button';
import Tooltip from '../Tooltip';
import * as baseTheme from './SideNavigation.scss';
//import data from './sideNavData.json';
import axios from 'axios';

export interface Props {
    theme?: any;
}

export interface State {
  drawer: boolean;
  activeDrawerId: string;
  navData: Array<string>;
}

class SideNavigation extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        drawer: true,
        activeDrawerId: 'fullContent',
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
        const fullContentMarkup = this.state.navData.map(function(full:any){
            return (
                <div>
                    <Icon source={full.icon} color="black" />
                    <li key={full.label}>{full.label}</li>
                </div>
            );
        });
        const collapsedContentMarkup = this.state.navData.map(function(col:any){
            return (
                <div>
                    <Tooltip content={col.label}>
                        <Icon source={col.icon} color="black" />
                    </Tooltip>
                </div>
            );
        });
        return (
            <Drawer
                active={this.state.drawer}
                activeContentId={this.state.activeDrawerId}
                mode="push"
                width="small"
                overlay
                bg-close
                >
                <DrawerContent id="fullContent" mode="slide">
                    <span className={this.props.theme.expand}>
                        <Button onClick={() => this.setState({ activeDrawerId: 'collapsedContent' })} icon="chevronLeft" plain />
                    </span>
                    <ul className={this.props.theme.list}>
                        {fullContentMarkup}
                    </ul>
                </DrawerContent>
                <DrawerContent id="collapsedContent" mode="slide">
                    <span className={this.props.theme.collapse}>
                        <Button onClick={() => this.setState({ activeDrawerId: 'fullContent' })} icon="chevronRight" plain />
                    </span>
                    <ul className={this.props.theme.list} >
                        {collapsedContentMarkup}
                    </ul>
                </DrawerContent>
            </Drawer>
        );
    }
};    
export default themr(SIDENAVIGATION, baseTheme)(SideNavigation) as ThemedComponentClass<Props, {}>;        