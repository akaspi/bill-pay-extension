export type Environment = 'Alpha' | 'Local';

export function getEnvironment() : Environment | undefined {
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

    switch (url.hostname) {
        case 'alpha-intuit-app.meliopayments.com':
            return 'Alpha';
        case 'Local':
            return 'Local';
    }
}

export function switchEnvironment(environment: Environment) {
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

    switch (environment) {
        case 'Alpha':
            url.host = 'alpha-intuit-app.meliopayments.com';
            break;
        case 'Local':
            url.hostname = 'localhost';
            url.port = '3031';
            break;
        default:
            console.log('Cannot find environment');
            return;
    }

    iframe.setAttribute('src', url.toString());
}