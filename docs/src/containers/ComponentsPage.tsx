import * as React from 'react';
import * as Redux from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/ComponentActions';
import { IDocumentAppState, IDocument } from '../Types';

import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import Properties from '../components/Properties';
import Example from '../components/Example';

import '../styles/components-page.scss';
import * as styles from '../styles/global-styles.scss';

export interface IProps {
  state: IDocument[];
  actions: typeof actions.requestComponents;
  routeParams: any;
}

class ComponentsPage extends React.Component<IProps, any> {
  render() {
    const currentComponentId = this.props.routeParams.component;
    const currentState = this.props.state.find((document) => { return document.id === currentComponentId; });
    if (!currentState)
      return (null);

    return (
      <div className={styles.component_container}>
        <Heading value={currentState.heading} />
        {currentState.subheading && <Subheading value={currentState.subheading} />}
        {currentState.property && <Properties tableValues={currentState.property} />}
        <Example exampleHeader={currentState.exampleCodeHeader} exampleDescription ={currentState.exampleCodeDescription} exampleCode={currentState.exampleCode} exampleComponent={currentState.exampleComponent} />
        <Example exampleHeader={currentState.exampleCodeHeader1} exampleDescription ={currentState.exampleCodeDescription1} exampleCode={currentState.exampleCode1} exampleComponent={currentState.exampleComponent1} />
        <Example exampleHeader={currentState.exampleCodeHeader2} exampleDescription ={currentState.exampleCodeDescription2} exampleCode={currentState.exampleCode2} exampleComponent={currentState.exampleComponent2} />
        <Example exampleHeader={currentState.exampleCodeHeader3} exampleDescription ={currentState.exampleCodeDescription3} exampleCode={currentState.exampleCode3} exampleComponent={currentState.exampleComponent3} />
        <Example exampleHeader={currentState.exampleCodeHeader4} exampleDescription ={currentState.exampleCodeDescription4} exampleCode={currentState.exampleCode4} exampleComponent={currentState.exampleComponent4} />
        <Example exampleHeader={currentState.exampleCodeHeader5} exampleDescription ={currentState.exampleCodeDescription5} exampleCode={currentState.exampleCode5} exampleComponent={currentState.exampleComponent5} />
        <Example exampleHeader={currentState.exampleCodeHeader6} exampleDescription ={currentState.exampleCodeDescription6} exampleCode={currentState.exampleCode6} exampleComponent={currentState.exampleComponent6} />
        <Example exampleHeader={currentState.exampleCodeHeader7} exampleDescription ={currentState.exampleCodeDescription7} exampleCode={currentState.exampleCode7} exampleComponent={currentState.exampleComponent7} />
        <Example exampleHeader={currentState.exampleCodeHeader8} exampleDescription ={currentState.exampleCodeDescription8} exampleCode={currentState.exampleCode8} exampleComponent={currentState.exampleComponent8} />
        <Example exampleHeader={currentState.exampleCodeHeader9} exampleDescription ={currentState.exampleCodeDescription9} exampleCode={currentState.exampleCode9} exampleComponent={currentState.exampleComponent9} />
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
  mapDispatchToProps
)(ComponentsPage);
