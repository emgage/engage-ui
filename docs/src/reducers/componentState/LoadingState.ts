import { IDocument } from '../../Types';
import LoadingExampleFirst from '../../examples/LoadingExample/LoadingExampleFirst';

const LoadingExampleFirstCode = require('!raw-loader!../../examples/LoadingExample/LoadingExampleFirst') as string;

const LoadingState: IDocument = {
  id: 'loading',
  heading: 'Loading Component',
  subheading: `Loading component can be used to display loading icon.`,

  exampleCode: LoadingExampleFirstCode,
  exampleComponent: LoadingExampleFirst,
};

export default LoadingState;
