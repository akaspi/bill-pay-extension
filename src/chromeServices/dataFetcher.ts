export function fetchCompanyInfo(): Promise<string> {
    return new Promise(resolve => {
        const onCompanyInfoReceived = (details :chrome.webRequest.WebResponseCacheDetails) => {
            chrome.webRequest.onCompleted.removeListener(onCompanyInfoReceived);
            resolve('details111');
        }
        chrome.webRequest.onCompleted.addListener(onCompanyInfoReceived, {
            urls: ['https://*meliopayments.com*/company-info*']
        });
    })
}