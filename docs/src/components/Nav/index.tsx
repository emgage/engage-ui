import * as React from 'react';
import { Link, IndexLink } from 'react-router';
import * as styles from '../../styles/nav.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <h1>Components</h1>
      <ul>
        <li><IndexLink to="/">Home</IndexLink></li>
        <li><Link to="/component/choicelist" className={styles.active}>Choice List Component</Link></li>
        <li><Link to="/component/panel">Panel Component</Link></li>
        <li><Link to="/component/chip">Chip Component</Link></li>
        <li><Link to="/component/validatedform">ValidatedForm Component</Link></li>
        <li><Link to="/component/validatedtextfield">Validated TextField Component</Link></li>
        <li><Link to="/component/choice">Choice Component</Link></li>
        <li><Link to="/component/icon">Icon Component</Link></li>
        <li><Link to="/component/ButtonGroup">ButtonGroup Component</Link></li>
        <li><Link to="/component/heading">Heading Component</Link></li>
        <li><Link to="/component/subheading">SubHeading Component</Link></li>
        <li><Link to="/component/stack">Stack Component</Link></li>
        <li><Link to="/component/tooltip">Tooltip Component</Link></li>
        <li><Link to="/component/clickablechip">ClickableChip Component</Link></li>
        <li><Link to="/component/video">Video Component</Link></li>
        <li><Link to="/component/visuallyhidden">VisuallyHidden Component</Link></li>
        <li><Link to="/component/popover">Popover Component</Link></li>
        <li><Link to="/component/Image">Image Component</Link></li>
        <li><Link to="/component/Scrollable">Scrollable Component</Link></li>
        <li><Link to="/component/Link">Link Component</Link></li>
        <li><Link to="/component/TextField">TextField Component</Link></li>
        <li><Link to="/component/FlexBox">FlexBox Component</Link></li>
        <li><Link to="/component/FormLayout">FormLayout Component</Link></li>
        <li><Link to="/component/ButtonGroup">ButtonGroup Component</Link></li>
        <li><Link to="/component/tag">Tag Component</Link></li>
        <li><Link to="/component/Button">Button Component</Link></li>
        <li><Link to="/component/UnstyledLink">UnstyledLink Component</Link></li>
        <li><Link to="/component/avatar">Avatar Component</Link></li>
        <li><Link to="/component/checkbox">Checkbox Component</Link></li>
        <li><Link to="/component/displaytext">DisplayText Component</Link></li>
        <li><Link to="/component/list">List Component</Link></li>
        <li><Link to="/component/message">Message Component</Link></li>
        <li><Link to="/component/column">Column Component</Link></li>
        <li><Link to="/component/badge">Badge Component</Link></li>
        <li><Link to="/component/loading">Loading Component</Link></li>
        <li><Link to="/component/select">Select Component</Link></li>
        <li><Link to="/component/connected">Connected Component</Link></li>
        <li><Link to="/component/card">Card Component</Link></li>
        <li><Link to="/component/banner">Banner Component</Link></li>
        <li><Link to="/component/labelled">Labelled Component</Link></li>
        <li><Link to="/component/label">Label Component</Link></li>
        <li><Link to="/component/positionedoverlay">Positioned Overlay Component</Link></li>
        <li><Link to="/component/modal">Modal Component</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
