import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import LabelledState from './componentState/LabelledState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    LabelledState,
  ],
};

export default intialState;
