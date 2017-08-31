import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import FormLayoutState from './componentState/FormLayoutState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    FormLayoutState,
  ],
};

export default intialState;
