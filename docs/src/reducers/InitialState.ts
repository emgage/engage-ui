import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ValidatedFormState from './componentState/ValidatedFormState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ValidatedFormState,
  ],
};

export default intialState;
