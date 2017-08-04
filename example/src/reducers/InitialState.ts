import { IDocumentAppState } from '../Types';

import LinkState from './componentState/LinkState';
import ListState from './componentState/ListState';

const intialState : IDocumentAppState = {
  Components: [
    LinkState,
    ListState,
  ],
};

export default intialState;
