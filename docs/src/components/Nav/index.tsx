import * as React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from '../../styles/nav.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <h1>Components</h1>
      <ul>
        <li><NavLink to="/" activeClassName={styles.active}>Home</NavLink></li>
        <li><NavLink to="/component/accordion" activeClassName={styles.active} >Accordion</NavLink></li>
        <li><NavLink to="/component/alert" activeClassName={styles.active} >Alert</NavLink></li>
        <li><NavLink to="/component/avatar" activeClassName={styles.active} >Avatar</NavLink></li>
        <li><NavLink to="/component/badge" activeClassName={styles.active}>Badge</NavLink></li>
        <li><NavLink to="/component/banner" activeClassName={styles.active}>Banner</NavLink></li>
        <li><NavLink to="/component/Breadcrumb" activeClassName={styles.active}>Breadcrumb</NavLink></li>
        <li><NavLink to="/component/Button" activeClassName={styles.active}>Button</NavLink></li>
        <li><NavLink to="/component/ButtonGroup" activeClassName={styles.active}>ButtonGroup</NavLink></li>
        <li><NavLink to="/component/caption" activeClassName={styles.active}>Caption</NavLink></li>
        <li><NavLink to="/component/card" activeClassName={styles.active}>Card</NavLink></li>
        <li><NavLink to="/component/checkbox" activeClassName={styles.active}>Checkbox</NavLink></li>
        <li><NavLink to="/component/chip" activeClassName={styles.active}>Chip</NavLink></li>
        <li><NavLink to="/component/choice" activeClassName={styles.active}>Choice</NavLink></li>
        <li><NavLink to="/component/choicelist" activeClassName={styles.active}>Choice List</NavLink></li>
        <li><NavLink to="/component/clickablechip" activeClassName={styles.active}>ClickableChip</NavLink></li>
        <li><NavLink to="/component/column" activeClassName={styles.active}>Column</NavLink></li>
        <li><NavLink to="/component/combobox" activeClassName={styles.active}>ComboBox</NavLink></li>
        <li><NavLink to="/component/connected" activeClassName={styles.active}>Connected</NavLink></li>
        <li><NavLink to="/component/displaytext" activeClassName={styles.active}>DisplayText</NavLink></li>
        <li><NavLink to="/component/Drawer" activeClassName={styles.active}>Drawer</NavLink></li>
        <li><NavLink to="/component/dropdown" activeClassName={styles.active}>Dropdown</NavLink></li>
        <li><NavLink to="/component/descriptionlist" activeClassName={styles.active}>Description List</NavLink></li>
        <li><NavLink to="/component/FlexBox" activeClassName={styles.active}>FlexBox</NavLink></li>
        <li><NavLink to="/component/FormLayout" activeClassName={styles.active}>FormLayout</NavLink></li>
        <li><NavLink to="/component/heading" activeClassName={styles.active}>Heading</NavLink></li>
        <li><NavLink to="/component/icon" activeClassName={styles.active}>Icon</NavLink></li>
        <li><NavLink to="/component/Image" activeClassName={styles.active}>Image</NavLink></li>
        <li><NavLink to="/component/label" activeClassName={styles.active}>Label</NavLink></li>
        <li><NavLink to="/component/labelled" activeClassName={styles.active}>Labelled</NavLink></li>
        <li><NavLink to="/component/NavLink" activeClassName={styles.active}>NavLink</NavLink></li>
        <li><NavLink to="/component/list" activeClassName={styles.active}>List</NavLink></li>
        <li><NavLink to="/component/loading" activeClassName={styles.active}>Loading</NavLink></li>
        <li><NavLink to="/component/message" activeClassName={styles.active}>Message</NavLink></li>
        <li><NavLink to="/component/modal" activeClassName={styles.active}>Modal</NavLink></li>
        {/*<li><NavLink to="/component/panel" activeClassName={styles.active}>Panel</NavLink></li>*/}
        <li><NavLink to="/component/popover" activeClassName={styles.active}>Popover</NavLink></li>
        <li><NavLink to="/component/positionedoverlay" activeClassName={styles.active}>Positioned Overlay</NavLink></li>
        <li><NavLink to="/component/radiobutton" activeClassName={styles.active}>RadioButton</NavLink></li>
        <li><NavLink to="/component/Scrollable" activeClassName={styles.active}>Scrollable</NavLink></li>
        <li><NavLink to="/component/select" activeClassName={styles.active}>Select</NavLink></li>
        <li><NavLink to="/component/sidenavigation" activeClassName={styles.active}>Side Navigation</NavLink></li>
        <li><NavLink to="/component/spinner" activeClassName={styles.active}>Spinner</NavLink></li>
        <li><NavLink to="/component/stack" activeClassName={styles.active}>Stack</NavLink></li>
        <li><NavLink to="/component/sticky" activeClassName={styles.active}>Sticky</NavLink></li>
        <li><NavLink to="/component/subheading" activeClassName={styles.active}>SubHeading</NavLink></li>
        <li><NavLink to="/component/Table" activeClassName={styles.active}>Table</NavLink></li>
        <li><NavLink to="/component/Tab" activeClassName={styles.active}>Tab</NavLink></li>
        <li><NavLink to="/component/tag" activeClassName={styles.active}>Tag</NavLink></li>
        <li><NavLink to="/component/TextField" activeClassName={styles.active}>TextField</NavLink></li>
        <li><NavLink to="/component/tooltip" activeClassName={styles.active}>Tooltip</NavLink></li>
        <li><NavLink to="/component/UnstyledNavLink" activeClassName={styles.active}>UnstyledNavLink</NavLink></li>
        <li><NavLink to="/component/validatedform" activeClassName={styles.active}>ValidatedForm</NavLink></li>
        <li><NavLink to="/component/validatedtextfield" activeClassName={styles.active}>Validated TextField</NavLink></li>
        <li><NavLink to="/component/video" activeClassName={styles.active}>Video</NavLink></li>
        <li><NavLink to="/component/visuallyhidden" activeClassName={styles.active}>VisuallyHidden</NavLink></li>
      </ul>
    </nav>
  );
};

export default Nav;
