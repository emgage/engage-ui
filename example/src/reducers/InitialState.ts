import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import SelectState from './componentState/SelectState';
const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    SelectState,
  ],
};

export default intialState;
