import { reloadMelioIframe } from "./reloadMelioIframeHandler";
import { switchEnvironment } from "./environmentHandler";

/**
* Fired when a message is sent from either an extension process or a content script.
*/
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

export {}