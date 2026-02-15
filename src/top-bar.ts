import {$} from "jsquery_node"

function getBranchFromUrl(): string {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);

    if (segments[0] === 'dev') {
        return 'dev';
    }
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if(isLocalhost) {
        return "localhost"
    }

    return 'main';
}


function toggleBranchUrl(): string {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const currentBranch = getBranchFromUrl();

    if (currentBranch === 'main') {
        pathSegments.unshift('dev');
    } else if(currentBranch === "dev") {
        pathSegments.shift();
    } else {
        return window.location.href;
    }
    const newPath = '/' + pathSegments.join('/');
    const newUrl = `${window.location.origin}${newPath}${window.location.search}${window.location.hash}`;
    return newUrl;
}

const branch = getBranchFromUrl();
$("#change-branch-tooltip")!.props({content: branch})
$("#change-branch")!.props({href: toggleBranchUrl()});

$("#version")!.click(() => {
    ($("#whats-new")!.elt as any).show();
})

if($("#version")!.text() !== localStorage.getItem("shown-" + branch)) {
    (async () => {
        await customElements.whenDefined('sl-button'); 
        ($("#whats-new")!.elt as any).show();
    })()
    localStorage.setItem("shown-" + branch, $("#version")!.text());
}
