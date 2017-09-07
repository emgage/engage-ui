import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import UnstyledLinkState from './componentState/UnstyledLinkState';
import PositionedOverlayState  from './componentState/PositionedOverlayState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    UnstyledLinkState,
    PositionedOverlayState,
  ],
};

export default intialState;
