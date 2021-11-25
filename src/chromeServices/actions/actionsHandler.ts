import { switchEnvironment } from "./environmentHandler";
import { reloadMelioIframe } from "./reloadMelioIframeHandler";

export function register() {
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