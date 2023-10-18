const blockedURLsTextArea = document.querySelector("#blocked-urls");

// Store the currently selected settings using browser.storage.local.
function storeSettings() {
  let blockedURLs = blockedURLsTextArea.value.split("\n");
  browser.storage.local.set({
    blockedURLs
  });
}

// Update the options UI with the settings values retrieved from storage,
// or the default settings if the stored settings are empty.
function updateUI(restoredSettings) {
  blockedURLsTextArea.value = restoredSettings.blockedURLs.join("\n");
}

function onError(e) {
  console.error(e);
}

// On opening the options page, fetch stored settings and update the UI with them.
browser.storage.local.get().then(updateUI, onError);

// Whenever the contents of the textarea changes, save the new values
blockedURLsTextArea.addEventListener("change", storeSettings);

////////////////////////////////////////
// https://jsfiddle.net/jnwrc5ay/592/ //
////////////////////////////////////////////////////////////////////////////////////
//
//
//    $('.add').on('click', add);
//  $('.remove').on('click', remove);

//function add() {
//	
//}