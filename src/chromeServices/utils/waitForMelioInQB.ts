export function waitForMelioInQB(callback: () => void) {
    // Options for the observer (which mutations to observe)
    const config = { childList: true };

    // Callback function to execute when mutations are observed
    const onMutate = function(mutationsList: any, observer: { disconnect: () => void; }) {
        console.log('callback', mutationsList);
        // Use traditional 'for loops' for IE 11
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('callback childList', mutation.addedNodes);
                for(const node of mutation.addedNodes) {
                    if (node.classList.contains('melio-overlay')) {
                        observer.disconnect();
                        callback();
                    }
                }
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(onMutate);

    // Start observing the target node for configured mutations
    observer.observe(document.body, config);
}