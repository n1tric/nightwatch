////////////////////////////////////////
// https://jsfiddle.net/jnwrc5ay/592/ //
////////////////////////////////////////////////////////////////////////////////////
//
//
  $('.allowlist_add').on('click', allowlist_add);
  $('.allowlist_remove').on('click', allowlist_remove);
  $('.blocklist_add').on('click', blocklist_add);
  $('.blocklist_remove').on('click', blocklist_remove);

const allowedURLsInputs = document.querySelectorAll("div.allowed_url_input");
const blockedURLsInputs = document.querySelectorAll("div.blocked_url_input");


function allowlist_add() {
  let new_allowed_url_no = parseInt($('#total_allowed_urls').val()) + 1;
  let new_allowed_url_input = "<div class='url_input' id='allow_url_input_" + new_allowed_url_no + "'><select id='protocol' name='protocol'><option value='https:' selected='selected'>https</option><option value='http:'>http</option></select><label for='protocol'> :// </label><input type='text' id='host' name='host'><label for='host'> / </label><input type='text' id='path' name='path'></div>";
  
  $('#allow_url_input_0').append(new_allowed_url_input);
  $('#total_allowed_urls').val(new_allowed_url_no);
  
  let i = allowedURLsInputs[0].childNodes.length -1;
  allowedURLsInputs[0].childNodes[i].childNodes[0].addEventListener("change", storeAllowedSettings);
  allowedURLsInputs[0].childNodes[i].childNodes[2].addEventListener("change", storeAllowedSettings);
  allowedURLsInputs[0].childNodes[i].childNodes[4].addEventListener("change", storeAllowedSettings);
}

function allowlist_remove() {
  let last_allowed_url_no = $('#total_allowed_urls').val();
  
  if (last_allowed_url_no > 0) {
    $('#allow_url_input_' + last_allowed_url_no).remove();
	$('#total_allowed_urls').val(last_allowed_url_no - 1);
  }
}

function blocklist_add() {
  let new_blocked_url_no = parseInt($('#total_blocked_urls').val()) + 1;
  let new_blocked_url_input = "<div class='url_input' id='block_url_input_" + new_blocked_url_no + "'><select id='protocol' name='protocol'><option value='https:' selected='selected'>https</option><option value='http:'>http</option></select><label for='protocol'> :// </label><input type='text' id='host' name='host'><label for='host'> / </label><input type='text' id='path' name='path'></div>";
  
  $('#block_url_input_0').append(new_blocked_url_input);
  $('#total_blocked_urls').val(new_blocked_url_no);
  
  let i = blockedURLsInputs[0].childNodes.length -1;
  blockedURLsInputs[0].childNodes[i].childNodes[0].addEventListener("change", storeBlockedSettings);
  blockedURLsInputs[0].childNodes[i].childNodes[2].addEventListener("change", storeBlockedSettings);
  blockedURLsInputs[0].childNodes[i].childNodes[4].addEventListener("change", storeBlockedSettings);
}

function blocklist_remove() {
  let last_blocked_url_no = $('#total_blocked_urls').val();
  
  if (last_blocked_url_no > 0) {
    $('#block_url_input_' + last_blocked_url_no).remove();
	$('#total_blocked_urls').val(last_blocked_url_no - 1);
  }
}


// Store the currently selected settings using browser.storage.local.
function storeAllowedSettings() {
  let allowedURLs = [];
  
  for (let i = 0; i < allowedURLsInputs[0].childNodes.length; i++) {
	  allowedURLs.push(allowedURLsInputs[0].childNodes[i].childNodes[0].value + "//" + allowedURLsInputs[0].childNodes[i].childNodes[2].value + "/" + allowedURLsInputs[0].childNodes[i].childNodes[4].value);
  }
  
  browser.storage.local.set({
	allowedURLs
  });
}

function storeBlockedSettings() {
  let blockedURLs = [];
  
  for (let i = 0; i < blockedURLsInputs[0].childNodes.length; i++) {
	  blockedURLs.push(blockedURLsInputs[0].childNodes[i].childNodes[0].value + "//" + blockedURLsInputs[0].childNodes[i].childNodes[2].value + "/" + blockedURLsInputs[0].childNodes[i].childNodes[4].value);
  }
  
  browser.storage.local.set({
    blockedURLs
  });
}

// Update the options UI with the settings values retrieved from storage,
// or the default settings if the stored settings are empty.
function updateUI(restoredSettings) {
  restoredSettings.allowedURLs.forEach(function(aURL){
    allowlist_add();
    allowedURL = new URL(aURL);
    let i = allowedURLsInputs[0].childNodes.length - 1;
    allowedURLsInputs[0].childNodes[i].childNodes[0].value = allowedURL.protocol;
    allowedURLsInputs[0].childNodes[i].childNodes[2].value = allowedURL.host;
    allowedURLsInputs[0].childNodes[i].childNodes[4].value = allowedURL.pathname.slice(1);
  });
  restoredSettings.blockedURLs.forEach(function(bURL){
    blocklist_add();
	blockedURL = new URL(bURL);
	let i = blockedURLsInputs[0].childNodes.length - 1;
    blockedURLsInputs[0].childNodes[i].childNodes[0].value = blockedURL.protocol;
    blockedURLsInputs[0].childNodes[i].childNodes[2].value = blockedURL.host;
    blockedURLsInputs[0].childNodes[i].childNodes[4].value = blockedURL.pathname.slice(1);
  });
}

function onError(e) {
  console.error(e);
}

// On opening the options page, fetch stored settings and update the UI with them.
browser.storage.local.get().then(updateUI, onError);

// Whenever the contents of the textarea changes, save the new values
//allowedURLsInputs.addEventListener("change", storeAllowedSettings);
//blockedURLsInputs.addEventListener("change", storeBlockedSettings);