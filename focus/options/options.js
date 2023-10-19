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
  $('.add').on('click', add);
  $('.remove').on('click', remove);

function add() {
  var new_chq_no = parseInt($('#total_chq').val()) + 1;
  
  var new_url_input = "<div class='url_input' id='allow_url_input_1'><select id='protocol' name='protocol'><option value='https:'>https</option><option value='http:'>http</option><option value='file:'>file</option><option value='*:'>*</option></select><label for='protocol'>://</label><input type='text' id='host' name='host' value='www.example.com'><label for='host'>/</label><input type='text' id='path' name='path' value='example/index.html'></div>"
  
  
}