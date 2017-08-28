import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import BadgeState from './componentState/BadgeState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    BadgeState,
  ],
};

export default intialState;
