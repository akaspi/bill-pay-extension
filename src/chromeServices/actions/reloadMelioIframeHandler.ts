export function reloadMelioIframe() {
    const iframe = document.querySelector('.melio-iframe');
    if (!iframe) {
       console.log('no iframe')
       return;
    }
    const iframeSrc = iframe.getAttribute('src');
    if (!iframeSrc) {
        console.log('no src')
        return;
    }
    const url = new URL(iframeSrc);
    url.searchParams.set('ts', Date.now().toString());
    iframe.setAttribute('src', url.toString());
}