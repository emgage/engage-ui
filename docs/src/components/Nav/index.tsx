import * as React from 'react';
import { Link, IndexLink } from 'react-router';
import * as styles from '../../styles/nav.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <h1>Components</h1>
      <ul>
        <li><IndexLink to="/" activeClassName={styles.active}>Home</IndexLink></li>
        <li><Link to="/component/accordion" activeClassName={styles.active} >Accordion</Link></li>
        <li><Link to="/component/alert" activeClassName={styles.active} >Alert</Link></li>
        <li><Link to="/component/avatar" activeClassName={styles.active} >Avatar</Link></li>
        <li><Link to="/component/badge" activeClassName={styles.active}>Badge</Link></li>
        <li><Link to="/component/banner" activeClassName={styles.active}>Banner</Link></li>
        <li><Link to="/component/Breadcrumb" activeClassName={styles.active}>Breadcrumb</Link></li>
        <li><Link to="/component/Button" activeClassName={styles.active}>Button</Link></li>
        <li><Link to="/component/ButtonGroup" activeClassName={styles.active}>ButtonGroup</Link></li>
        <li><Link to="/component/caption" activeClassName={styles.active}>Caption</Link></li>
        <li><Link to="/component/card" activeClassName={styles.active}>Card</Link></li>
        <li><Link to="/component/checkbox" activeClassName={styles.active}>Checkbox</Link></li>
        <li><Link to="/component/chip" activeClassName={styles.active}>Chip</Link></li>
        <li><Link to="/component/choice" activeClassName={styles.active}>Choice</Link></li>
        <li><Link to="/component/choicelist" activeClassName={styles.active}>Choice List</Link></li>
        <li><Link to="/component/clickablechip" activeClassName={styles.active}>ClickableChip</Link></li>
        <li><Link to="/component/column" activeClassName={styles.active}>Column</Link></li>
        <li><Link to="/component/combobox" activeClassName={styles.active}>ComboBox</Link></li>
        <li><Link to="/component/connected" activeClassName={styles.active}>Connected</Link></li>
        <li><Link to="/component/displaytext" activeClassName={styles.active}>DisplayText</Link></li>
        <li><Link to="/component/Drawer" activeClassName={styles.active}>Drawer</Link></li>
        <li><Link to="/component/dropdown" activeClassName={styles.active}>Dropdown</Link></li>
        <li><Link to="/component/descriptionlist" activeClassName={styles.active}>Description List</Link></li>
        <li><Link to="/component/FlexBox" activeClassName={styles.active}>FlexBox</Link></li>
        <li><Link to="/component/FormLayout" activeClassName={styles.active}>FormLayout</Link></li>
        <li><Link to="/component/heading" activeClassName={styles.active}>Heading</Link></li>
        <li><Link to="/component/icon" activeClassName={styles.active}>Icon</Link></li>
        <li><Link to="/component/Image" activeClassName={styles.active}>Image</Link></li>
        <li><Link to="/component/label" activeClassName={styles.active}>Label</Link></li>
        <li><Link to="/component/labelled" activeClassName={styles.active}>Labelled</Link></li>
        <li><Link to="/component/Link" activeClassName={styles.active}>Link</Link></li>
        <li><Link to="/component/list" activeClassName={styles.active}>List</Link></li>
        <li><Link to="/component/loading" activeClassName={styles.active}>Loading</Link></li>
        <li><Link to="/component/message" activeClassName={styles.active}>Message</Link></li>
        <li><Link to="/component/modal" activeClassName={styles.active}>Modal</Link></li>
        {/*<li><Link to="/component/panel" activeClassName={styles.active}>Panel</Link></li>*/}
        <li><Link to="/component/popover" activeClassName={styles.active}>Popover</Link></li>
        <li><Link to="/component/positionedoverlay" activeClassName={styles.active}>Positioned Overlay</Link></li>
        <li><Link to="/component/radiobutton" activeClassName={styles.active}>RadioButton</Link></li>
        <li><Link to="/component/Scrollable" activeClassName={styles.active}>Scrollable</Link></li>
        <li><Link to="/component/select" activeClassName={styles.active}>Select</Link></li>
        <li><Link to="/component/sidenavigation" activeClassName={styles.active}>Side Navigation</Link></li>
        <li><Link to="/component/spinner" activeClassName={styles.active}>Spinner</Link></li>
        <li><Link to="/component/stack" activeClassName={styles.active}>Stack</Link></li>
        <li><Link to="/component/sticky" activeClassName={styles.active}>Sticky</Link></li>
        <li><Link to="/component/subheading" activeClassName={styles.active}>SubHeading</Link></li>
        <li><Link to="/component/Table" activeClassName={styles.active}>Table</Link></li>
        <li><Link to="/component/Tab" activeClassName={styles.active}>Tab</Link></li>
        <li><Link to="/component/tag" activeClassName={styles.active}>Tag</Link></li>
        <li><Link to="/component/TextField" activeClassName={styles.active}>TextField</Link></li>
        <li><Link to="/component/tooltip" activeClassName={styles.active}>Tooltip</Link></li>
        <li><Link to="/component/UnstyledLink" activeClassName={styles.active}>UnstyledLink</Link></li>
        <li><Link to="/component/validatedform" activeClassName={styles.active}>ValidatedForm</Link></li>
        <li><Link to="/component/validatedtextfield" activeClassName={styles.active}>Validated TextField</Link></li>
        <li><Link to="/component/video" activeClassName={styles.active}>Video</Link></li>
        <li><Link to="/component/visuallyhidden" activeClassName={styles.active}>VisuallyHidden</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
