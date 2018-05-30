
import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import Icon from '../Icon';
import { SIDENAVIGATION } from '../ThemeIdentifiers';
import { Drawer, DrawerContent } from '../Drawer';
import Button from '../Button';
import Tooltip from '../Tooltip';
import Accordion from '../Accordion';
import {AccordionItemProps} from '../Accordion';
import * as baseTheme from './SideNavigation.scss';

export interface INavigationData {
    id?:number;
    label?: React.ReactNode;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    action?(): void;
}

export interface Props {
    theme?: any;
    accordian?: boolean,
    source: INavigationData[],
}

export interface State {
    drawer: boolean;
    activeDrawerId: string;
}

class SideNavigation extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        drawer: false,
        activeDrawerId: 'fullContent',
      };
    }

    toggleDrawer = () => {
        this.setState({ drawer: !this.state.drawer });
    }
    componentDidUpdate(){
        const bodyElement = document.body;
        if (bodyElement !== null) {
            bodyElement.className +=  this.state.drawer ? ' ' + this.props.theme.container : '';
        }
    }

    render() {
        const { source, theme, accordian } = this.props;
        let actDrawerId = this.state.activeDrawerId;
        const rootElement = document.getElementById('root');
        const iconClass = theme.icon;
        const iconCollClass = theme.collapseIcon;
        const divClass = theme.navDivider;
        const liClass = theme.li;
        const childLiClass = theme.childLi;
        let accState = accordian;
        if (rootElement !== null) {
            rootElement.className = this.state.drawer ? (theme.container) : '';
            rootElement.className = rootElement.className + ' ' + (actDrawerId == "collapsedContent" ? this.props.theme.rootCollapse : '')
        }

        const fullContentMarkup = source.map(function(full:any){
            
            const childrenMarkup = full.children !== undefined ? full.children.map(function(child:any){
                return <li key={child.id}><a className={childLiClass} onClick={child.action} aria-disabled={false}><Icon source={child.icon} color="white" />{child.label}</a></li>;
            }) : null;
            const items : AccordionItemProps[] = [{
                children: childrenMarkup,
                header: <li key={full.id} className={liClass} ><a className={liClass} onClick={full.action} aria-disabled={false}><Icon source={full.icon} color="white" />{full.label}</a></li>
              }
            ];
            const markup = accState ? ( 
                    childrenMarkup ==  null ? (
                        <div>
                            <li key={full.id} className={liClass} ><a className={liClass} onClick={full.action} aria-disabled={false}><Icon source={full.icon} color="white" />{full.label}</a></li>
                            {childrenMarkup}
                        </div>
                    ) : (
                    <Accordion style={{padding:"0px", height:"20px"}} mode="collapsible" items={items} />)
                    ) : (
                        <div>
                            <li key={full.id} className={liClass}><a className={liClass} onClick={full.action} aria-disabled={false}><Icon source={full.icon} color="white" />{full.label}</a></li>
                            {childrenMarkup}
                        </div>
                    );
            let p = childrenMarkup ==  null ? 30  : ((childrenMarkup.length + 1) * 30) + 20;
            const pstyle = {paddingBottom: p + 'px'};
            return (
                <div> 
                    <div className={iconClass}>
                        {markup}
                    </div>
                    <div className={divClass} style={pstyle} />
                </div>
            );
        });
        const collapsedContentMarkup = source.map(function(col:any){
            return (
                <p className={iconCollClass}>
                    <Tooltip content={col.label}>
                        <Icon source={col.icon} color="white" />
                    </Tooltip>
                </p>
            );
        });
        return (
            <div>
                <Button onClick={this.toggleDrawer}>Open Side Navigation</Button>
                <Drawer
                    active={this.state.drawer}
                    activeContentId={this.state.activeDrawerId}
                    mode="push"
                    width="small"
                    overlay style={actDrawerId == "collapsedContent" ? { width: "10px", padding: "15px", overflow:"visible"} : { width:"270px", overflow:"visible"}} >
                    <DrawerContent id="fullContent" mode="slide" style={{background: "black", color: "white", padding: "0px"}}>
                        <span className={this.props.theme.expand}>
                            <button type="button" className={this.props.theme.navButton} onClick={() => this.setState({ activeDrawerId: 'collapsedContent' })}><Icon source="chevronLeft" color="white" /></button>
                        </span>
                        <ul className={this.props.theme.list}>
                            {fullContentMarkup}
                        </ul>
                    </DrawerContent>
                    <DrawerContent id="collapsedContent" mode="slide" style={{width: "10px", padding: "15px", background: "black", color: "white"}}>
                        <span className={this.props.theme.collapse}>
                            <button type="button" className={this.props.theme.navButton} onClick={() => this.setState({ activeDrawerId: 'fullContent' })}><Icon source="chevronRight" color="white" /></button>
                        </span>
                        <ul className={this.props.theme.collapseList} >
                            {collapsedContentMarkup}
                        </ul>
                    </DrawerContent>
                </Drawer>
            </div>
        );
    }
};    
export default themr(SIDENAVIGATION, baseTheme)(SideNavigation) as ThemedComponentClass<Props, {}>;        