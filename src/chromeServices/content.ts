import { waitForMelio } from './quickbooks/waitForMelio';
import { registerReceive } from './messages/receiveMessages';

waitForMelio(() => registerReceive());