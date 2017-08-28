import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import UnstyledLinkState from './componentState/UnstyledLinkState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    UnstyledLinkState,
  ],
};

export default intialState;
