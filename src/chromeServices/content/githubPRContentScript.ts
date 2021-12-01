console.log('melioGithubContentScript loaded');
const last = require('lodash/last');
const takeRight = require('lodash/takeRight');
const head = require('lodash/head');


function getBranchName() {
    const branchesLinksContainer = document.querySelector('.rgh-conversation-activity-filter');

    if (!branchesLinksContainer) {
        return;
    }
    const branchWrappers = branchesLinksContainer.querySelectorAll('.commit-ref');
    const sourceBranchLinkWrapper = branchWrappers.item(1);
    const sourceBranchLinkElement = sourceBranchLinkWrapper.querySelector('a');

    if (!sourceBranchLinkElement) {
        return;
    }

    const sourceBranchLink = sourceBranchLinkElement.getAttribute('href')?.split('/');
    if (!sourceBranchLink) {
        return;
    }

    return sourceBranchLink[sourceBranchLink.length - 1];
}

function getRepoName() {
    return window.location.href.split('/').slice(-3, -2)[0];
}

function duplicateActionButton() {
    const actionButtons = document.querySelector('.gh-header-actions');
    if (!actionButtons) {
        return;
    }

    const actionButton = actionButtons.querySelector('button');
    if (!actionButton) {
        return;
    }

    const clonedButton = actionButton.cloneNode() as HTMLElement;
    actionButtons.prepend(clonedButton);

    return clonedButton;
}

function createPRButton(button: HTMLElement, repoName: string, branchName: string) {
    button.innerText = 'CircleCI';
    button.addEventListener('click', () => {
        window.open(`https://app.circleci.com/pipelines/github/melio/${repoName}?branch=${branchName}`)
    });
}

function addPRButton() {
    const branchName = getBranchName();
    const repoName = getRepoName();
    const duplicatedActionButton = duplicateActionButton();

    if (repoName && branchName && duplicatedActionButton) {
        createPRButton(duplicatedActionButton, repoName, branchName);
    }
}

addPRButton();

export {}