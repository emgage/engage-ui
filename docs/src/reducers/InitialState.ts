import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import IconState from './componentState/IconState';
import PositionedOverlayState  from './componentState/PositionedOverlayState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    IconState,
    PositionedOverlayState,
  ],
};

export default intialState;
