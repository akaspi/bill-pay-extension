import { waitForMelio } from './quickbooks/waitForMelio';
import { register } from "./actions/actionsHandler";

waitForMelio(() => register());