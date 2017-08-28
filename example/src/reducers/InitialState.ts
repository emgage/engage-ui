import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import VisuallyHiddenState from './componentState/VisuallyHiddenState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    VisuallyHiddenState,
  ],
};

export default intialState;
