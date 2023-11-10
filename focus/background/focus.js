// Initialize the list of blocked hosts
let blockedURLs = ["https://www.reddit.com/","https://www.example.com:654/example","http://www.example.org:9876/examples/index.html"];
let allowedURLs = ["http://www.example.gov/ex/index.htm","https://www.example.com/x/12345"]
//let blockedURLs = ["www.reddit.com/r/news/","www.reddit.com/r/worldnews/","www.reddit.com/"]//, "www.mozilla.org/en-US/"]//, "http://www.mozilla.org/en-US/"]//, "https://www.mozilla.org/en-US/"];

// Set the default list on installation.
browser.runtime.onInstalled.addListener(details => {
  browser.storage.local.set({
    blockedURLs: blockedURLs
  });
});

browser.runtime.onInstalled.addListener(details => {
  browser.storage.local.set({
	allowedURLs: allowedURLs
  });
});
// Get the stored lists
browser.storage.local.get(data => {
  if (data.blockedURLs) {
    blockedURLs = data.blockedURLs;
 }
});

browser.storage.local.get(data => {
  if (data.allowedURLs) {
    allowedURLs = data.allowedURLs;
  }
});

// Listen for changes in the blocked list
browser.storage.onChanged.addListener(changeData => {
  blockedURLs = changeData.blockedURLs.newValue
});

browser.storage.onChanged.addListener(changeData => {
  allowedURLs = changeData.allowedURLs.newValue
});

// Managed the proxy

// Listen for a request to open a webpage
browser.proxy.onRequest.addListener(handleProxyRequest, {urls: ["<all_urls>"]});

// On the request to open a webpage
function handleProxyRequest(requestInfo) {
  // Read the web address of the page to be visited 
  const url = new URL(requestInfo.url);
  let escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  let allow = false;
  let block = false;

  // Determine whether the domain in the web address is on the allowed list
  allowedURLs.forEach(function(aURL) {
    allowedURL = new RegExp("^" + aURL.split("*").map(escapeRegex).join(".*") + "$");
	if (allowedURL.test(url.protocol + "//" + url.host + url.pathname)) {
	  console.log(`Allowing: ${url.protocol + "//" + url.host + url.pathname}`);
	  allow = true;
	}
  })
  
  // Determine whether the domain in the web address is on the blocked list
  blockedURLs.forEach(function(bURL) {
    blockedURL = new RegExp("^" + bURL.split("*").map(escapeRegex).join(".*") + "$");
	if (blockedURL.test(url.protocol + "//" + url.host + url.pathname)) {
	  console.log(`Blocking: ${url.protocol + "//" + url.host + url.pathname}`);
	  block = true;
	}
  })
  //console.log(`After block`);
//  if (blockedURLs.indexOf(url.protocol + "//" + url.host + url.pathname) != -1) {
//  // Write details of the proxied host to the console and return the proxy address
//    console.log(`Proxying: ${url.protocol + "//" + url.host + url.pathname}`);
//    return {type: "http", host: "127.0.0.1", port: 65535};
//  }

  // Return instructions to open the requested webpage
  if (allow) {
    return {type: "direct"};
  }
  else if (block) {
    return {type: "http", host: "127.0.0.1", port: 65535};
  }
  else {
    return {type: "direct"};
  }
}

// Log any errors from the proxy script
browser.proxy.onError.addListener(error => {
  console.error(`Proxy error: ${error.message}`);
});