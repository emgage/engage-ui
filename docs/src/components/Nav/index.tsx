import * as React from 'react';
import { Link, IndexLink } from 'react-router';
import * as styles from '../../styles/nav.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <h1>Components</h1>
      <ul>
        <li><IndexLink to="/" activeClassName={styles.active}>Home</IndexLink></li>
        <li><Link to="/component/choicelist" activeClassName={styles.active}>Choice List Component</Link></li>
        <li><Link to="/component/panel" activeClassName={styles.active}>Panel Component</Link></li>
        <li><Link to="/component/chip" activeClassName={styles.active}>Chip Component</Link></li>
        <li><Link to="/component/validatedform" activeClassName={styles.active}>ValidatedForm</Link></li>
        <li><Link to="/component/validatedtextfield" activeClassName={styles.active}>Validated TextField</Link></li>
        <li><Link to="/component/choice" activeClassName={styles.active}>Choice Component</Link></li>
        <li><Link to="/component/icon" activeClassName={styles.active}>Icon Component</Link></li>
        <li><Link to="/component/ButtonGroup" activeClassName={styles.active}>ButtonGroup Component</Link></li>
        <li><Link to="/component/heading" activeClassName={styles.active}>Heading Component</Link></li>
        <li><Link to="/component/subheading" activeClassName={styles.active}>SubHeading</Link></li>
        <li><Link to="/component/stack" activeClassName={styles.active}>Stack</Link></li>
        <li><Link to="/component/tooltip" activeClassName={styles.active}>Tooltip</Link></li>
        <li><Link to="/component/clickablechip" activeClassName={styles.active}>ClickableChip Component</Link></li>
        <li><Link to="/component/video" activeClassName={styles.active}>Video</Link></li>
        <li><Link to="/component/visuallyhidden" activeClassName={styles.active}>VisuallyHidden</Link></li>
        <li><Link to="/component/popover" activeClassName={styles.active}>Popover Component</Link></li>
        <li><Link to="/component/Image" activeClassName={styles.active}>Image Component</Link></li>
        <li><Link to="/component/Scrollable" activeClassName={styles.active}>Scrollable Component</Link></li>
        <li><Link to="/component/Link" activeClassName={styles.active}>Link Component</Link></li>
        <li><Link to="/component/TextField" activeClassName={styles.active}>TextField</Link></li>
        <li><Link to="/component/FlexBox" activeClassName={styles.active}>FlexBox Component</Link></li>
        <li><Link to="/component/FormLayout" activeClassName={styles.active}>FormLayout Component</Link></li>
        <li><Link to="/component/ButtonGroup" activeClassName={styles.active}>ButtonGroup Component</Link></li>
        <li><Link to="/component/tag" activeClassName={styles.active}>Tag</Link></li>
        <li><Link to="/component/Button" activeClassName={styles.active}>Button Component</Link></li>
        <li><Link to="/component/UnstyledLink" activeClassName={styles.active}>UnstyledLink</Link></li>
        <li><Link to="/component/avatar" activeClassName={styles.active}>Avatar Component</Link></li>
        <li><Link to="/component/checkbox" activeClassName={styles.active}>Checkbox Component</Link></li>
        <li><Link to="/component/displaytext" activeClassName={styles.active}>DisplayText Component</Link></li>
        <li><Link to="/component/list" activeClassName={styles.active}>List Component</Link></li>
        <li><Link to="/component/message" activeClassName={styles.active}>Message Component</Link></li>
        <li><Link to="/component/column" activeClassName={styles.active}>Column Component</Link></li>
        <li><Link to="/component/badge" activeClassName={styles.active}>Badge Component</Link></li>
        <li><Link to="/component/loading" activeClassName={styles.active}>Loading Component</Link></li>
        <li><Link to="/component/select" activeClassName={styles.active}>Select</Link></li>
        <li><Link to="/component/connected" activeClassName={styles.active}>Connected Component</Link></li>
        <li><Link to="/component/card" activeClassName={styles.active}>Card Component</Link></li>
        <li><Link to="/component/banner" activeClassName={styles.active}>Banner Component</Link></li>
        <li><Link to="/component/labelled" activeClassName={styles.active}>Labelled Component</Link></li>
        <li><Link to="/component/label" activeClassName={styles.active}>Label Component</Link></li>
        <li><Link to="/component/positionedoverlay" activeClassName={styles.active}>Positioned Overlay Component</Link></li>
        <li><Link to="/component/modal" activeClassName={styles.active}>Modal Component</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
