import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ValidatedTextFieldState from './componentState/ValidatedTextFieldState';


const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ValidatedTextFieldState,
  ],
};

export default intialState;
