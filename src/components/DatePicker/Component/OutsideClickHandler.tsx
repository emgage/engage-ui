import * as React from 'react';
//import PropTypes from 'prop-types';

// import { forbidExtraProps } from 'airbnb-prop-types'; // TODO: add to propTypes; semver-major
import { addEventListener, removeEventListener } from 'consolidated-events';



export interface State {
 }

export interface Props {
 onOutsideClick?: any
 children?: any,
}

// export interface pptypes{
//   propTypes?: any;
// }



export default class OutsideClickHandler extends React.Component<Props, State> {

//  static propTypes = {
//   children: PropTypes.any,
//   onOutsideClick: PropTypes.any,
// };

  childNode: any;
  clickHandle: any;
  constructor(props: any) {
    super(props);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

 

static defaultProps = {
  children: <span />,
  onOutsideClick() {},
};

  componentDidMount() {
    // `capture` flag is set to true so that a `stopPropagation` in the children
    // will not prevent all outside click handlers from firing - maja
    this.clickHandle = addEventListener(
      document,
      'click',
      this.onOutsideClick,
      { capture: true },
    );
  }

  componentWillUnmount() {
    if (this.clickHandle) removeEventListener(this.clickHandle);
  }

  onOutsideClick(e: any) {
    const isDescendantOfRoot = false/////this.childNode.contains(e.target);
    if (!isDescendantOfRoot) {
      this.props.onOutsideClick(e);
    }
  }

  render() {
    return (
      <div ref={(ref) => { this.childNode = ref; }}>
        {this.props.children}
      </div>
    );
  }
}

//  OutsideClickHandler.propTypes = propTypes;
// OutsideClickHandler.defaultProps = defaultProps;
