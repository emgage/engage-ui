import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import FlexBoxState from './componentState/FlexBoxState';
import PositionedOverlayState  from './componentState/PositionedOverlayState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    FlexBoxState,
    PositionedOverlayState,
  ],
};

export default intialState;
