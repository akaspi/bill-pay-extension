import { fetchCompanyInfo } from "./dataFetcher";

alert(chrome.webRequest);
console.log('adffsdfds');
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.backgroundActionId === 'trackCompanyInfo') {
          fetchCompanyInfo().then(companyInfo => chrome.runtime.sendMessage({popupActionId: '', payload: companyInfo}))
      }

    });

export {}