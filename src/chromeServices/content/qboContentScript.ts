import {waitForMelioInQB} from "../utils/waitForMelioInQB";

import { switchEnvironment } from "../actions/environmentHandler";
import { reloadMelioIframe } from "../actions/reloadMelioIframeHandler";

function registerReceive() {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
            const { actionId } = request;

            switch (actionId) {
                case 'qbo_reload':
                    return reloadMelioIframe();
                case 'switch_environment':
                    return switchEnvironment(request.env);
                default:
                    console.log(`could not find content action ${actionId}`)
            }
        }
    );
}

function fetchInitialData() {
    // console.log('sending message to background');
    // chrome.runtime.sendMessage({ backgroundActionId: 'trackCompanyInfo' }, console.log);
}

waitForMelioInQB(() => {
    fetchInitialData();
    registerReceive();
});