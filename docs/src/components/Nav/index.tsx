import * as React from 'react';
import { Link, IndexLink } from 'react-router';
import * as styles from '../../styles/nav.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <h1>Components</h1>
      <ul>
        <li><IndexLink to="/">Home</IndexLink></li>
        <li><Link to="/component/avatar" className={styles.active} >Avatar</Link></li>
        <li><Link to="/component/badge">Badge</Link></li>
        <li><Link to="/component/banner">Banner</Link></li>
        <li><Link to="/component/Button">Button</Link></li>
        <li><Link to="/component/ButtonGroup">ButtonGroup</Link></li>
        <li><Link to="/component/caption">Caption</Link></li>
        <li><Link to="/component/card">Card</Link></li>
        <li><Link to="/component/checkbox">Checkbox</Link></li>
        <li><Link to="/component/chip">Chip</Link></li>
        <li><Link to="/component/choice">Choice</Link></li>
        <li><Link to="/component/choicelist" >Choice List</Link></li>
        <li><Link to="/component/clickablechip">ClickableChip</Link></li>
        <li><Link to="/component/column">Column</Link></li>
        <li><Link to="/component/connected">Connected</Link></li>
        <li><Link to="/component/displaytext">DisplayText</Link></li>
        <li><Link to="/component/FlexBox">FlexBox</Link></li>
        <li><Link to="/component/FormLayout">FormLayout</Link></li>
        <li><Link to="/component/heading">Heading</Link></li>
        <li><Link to="/component/icon">Icon</Link></li>
        <li><Link to="/component/Image">Image</Link></li>
        <li><Link to="/component/label">Label</Link></li>
        <li><Link to="/component/labelled">Labelled</Link></li>
        <li><Link to="/component/Link">Link</Link></li>
        <li><Link to="/component/list">List</Link></li>
        <li><Link to="/component/loading">Loading</Link></li>
        <li><Link to="/component/message">Message</Link></li>
        <li><Link to="/component/modal">Modal</Link></li>
        {/* <li><Link to="/component/panel">Panel</Link></li> */}
        <li><Link to="/component/popover">Popover</Link></li>
        <li><Link to="/component/positionedoverlay">Positioned Overlay</Link></li>
        <li><Link to="/component/radiobutton">RadioButton</Link></li>
        <li><Link to="/component/Scrollable">Scrollable</Link></li>
        <li><Link to="/component/select">Select</Link></li>
        <li><Link to="/component/stack">Stack</Link></li>
        <li><Link to="/component/subheading">SubHeading</Link></li>
        <li><Link to="/component/tag">Tag</Link></li>
        <li><Link to="/component/TextField">TextField</Link></li>
        <li><Link to="/component/tooltip">Tooltip</Link></li>
        <li><Link to="/component/UnstyledLink">UnstyledLink</Link></li>
        <li><Link to="/component/validatedform">ValidatedForm</Link></li>
        <li><Link to="/component/validatedtextfield">Validated TextField</Link></li>
        <li><Link to="/component/video">Video</Link></li>
        <li><Link to="/component/visuallyhidden">VisuallyHidden</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
