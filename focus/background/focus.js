// Initialize the list of blocked hosts
//let blockedURLs = ["example.com/example", "example.org/examples/example"];
let blockedURLs = ["www.reddit.com/r/news/","www.reddit.com/r/worldnews/","www.reddit.com/"]//, "www.mozilla.org/en-US/"]//, "http://www.mozilla.org/en-US/"]//, "https://www.mozilla.org/en-US/"];

// Set the default list on installation.
browser.runtime.onInstalled.addListener(details => {
  browser.storage.local.set({
    blockedURLs: blockedURLs
  });
});

// Get the stored list
browser.storage.local.get(data => {
  if (data.blockedURLs) {
    blockedURLs = data.blockedURLs;
  }
});

// Listen for changes in the blocked list
browser.storage.onChanged.addListener(changeData => {
  blockedURLs = changeData.blockedURLs.newValue;
});

// Managed the proxy

// Listen for a request to open a webpage
browser.proxy.onRequest.addListener(handleProxyRequest, {urls: ["<all_urls>"]});

// On the request to open a webpage
function handleProxyRequest(requestInfo) {
// Read the web address of the page to be visited 
  const url = new URL(requestInfo.url);
  console.log(`${url.host} + ${url.pathname}`);
  console.log(`${url.host}`);
// Determine whether the domain in the web address is on the blocked hosts list
  if (blockedURLs.indexOf(url.host + url.pathname) != -1) {
// Write details of the proxied host to the console and return the proxy address
    console.log(`Proxying: ${url.host + url.pathname}`);
    return {type: "http", host: "127.0.0.1", port: 65535};
  }
// Return instructions to open the requested webpage
  return {type: "direct"};
}

// Log any errors from the proxy script
browser.proxy.onError.addListener(error => {
  console.error(`Proxy error: ${error.message}`);
});