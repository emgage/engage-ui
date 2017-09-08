import { IDocument } from '../../Types';
import PanelExampleFirst from '../../examples/PanelExample/PanelExampleFirst';

const PanelExampleCodeFirst = require('!raw-loader!../../examples/PanelExample/PanelExampleFirst') as string;

const PanelState: IDocument = {
  id: 'panel',
  heading: 'Panel Component',
  subheading: `Panel component is used to display video in panel with heading and children.`,
  property: [
    {
      name: 'heading',
      type: 'string',
      desc: 'The content to display inside the panel',
    }, {
      name: 'video',
      type: 'React.ReactNode',
      desc: 'Set the video  file for the panel',
    }, {
      name: 'children',
      type: 'React.ReactNode',
      desc: 'Set the children to display inside the panel',
    }, {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'Set the style via css-theme',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr',
    },
  ],
  exampleCode: PanelExampleCodeFirst,
  exampleComponent: PanelExampleFirst,
};

export default PanelState;
