import * as React from 'react';
import * as Redux from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/ComponentActions';
import { IDocumentAppState, IDocument } from '../Types';

import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import Properties from '../components/Properties';
import CodeExample from '../components/CodeExample';

import '../styles/components-page.scss';
import * as styles from '../styles/global-styles.scss';

export interface IProps {
  state: IDocument[];
  actions: typeof actions.requestComponents;
  routeParams: any;
}

class ComponentsPage extends React.Component<IProps, any> {
  render() {
    const currentComponent = this.props.routeParams.component;
    const currentState = this.props.state.find((c) => { return c.id === currentComponent; });
    if (!currentState)
      return (null);
   
    return (
      <div className={styles.component_container}>
        <Heading value={currentState.heading} />
        {currentState.subheading && <Subheading value={currentState.subheading} />}
        {currentState.property && <Properties tableValues={currentState.property} />}
        {currentState.code && <CodeExample codeString={currentState.code} />}
        <div style={{ marginTop: 50 }}>{'<Best Practices Component />'}</div>
        <div>{'<GuideLines Component />'}</div>
      </div>
    );
  }
}

function mapStateToProps(state: IDocumentAppState) {
  return {
    state: state.components,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<{}>) {
  return {
    actions: bindActionCreators(actions.requestComponents, dispatch),
  };
}

export default Redux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentsPage);
