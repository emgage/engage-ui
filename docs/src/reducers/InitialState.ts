import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import IconState from './componentState/IconState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    IconState,
  ],
};

export default intialState;
