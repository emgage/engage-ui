import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ValidatedTextFieldState from './componentState/ValidatedTextFieldState';

import LoadingState from './componentState/LoadingState';
import SelectState from './componentState/SelectState';
import CardState from './componentState/CardState';
import LabelledState from './componentState/LabelledState';
import LabelState from './componentState/LabelState';
import PositionedOverlayState  from './componentState/PositionedOverlayState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ValidatedTextFieldState,
    LoadingState,
    SelectState,
    CardState,
    LabelledState,
    LabelState,
    PositionedOverlayState,
  ],
};

export default intialState;
