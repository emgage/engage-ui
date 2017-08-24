import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import CardState from './componentState/CardState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    CardState,
  ],
};

export default intialState;
