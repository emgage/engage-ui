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

export interface IProps {
  state: IDocument[];
  actions: typeof actions.requestComponents;
  routeParams: any;
}

class ComponentsPage extends React.Component<IProps, any> {
  render() {
    const currentComponent = this.props.routeParams.component;
    const currentState = this.props.state[currentComponent];
    return (
      <div className="component-container">
        <Heading value={currentState.heading} />
        <Subheading value={currentState.subheading} />
        <Properties tableValues={currentState.property} />
        <CodeExample codeString={currentState.code} />
        <div style={{ marginTop: 100 }}>{'<Best Practices Component />'}</div>
        <div>{'<GuideLines Component />'}</div>
      </div>
    );
  }
}

function mapStateToProps(state: IDocumentAppState) {
  return {
    state: state.Components,
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
