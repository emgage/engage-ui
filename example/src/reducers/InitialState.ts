import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import LabelState from './componentState/LabelState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    LabelState,
  ],
};

export default intialState;
