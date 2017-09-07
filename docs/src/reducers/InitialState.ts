import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ValidatedTextFieldState from './componentState/ValidatedTextFieldState';

import PositionedOverlayState  from './componentState/PositionedOverlayState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ValidatedTextFieldState,
    PositionedOverlayState,
  ],
};

export default intialState;
