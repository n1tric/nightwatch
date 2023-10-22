////////////////////////////////////////
// https://jsfiddle.net/jnwrc5ay/592/ //
////////////////////////////////////////////////////////////////////////////////////
//
//
  $('.allowlist_add').on('click', allowlist_add);
  $('.allowlist_remove').on('click', allowlist_remove);
  $('.blocklist_add').on('click', blocklist_add);
  $('.blocklist_remove').on('click', blocklist_remove);

const allowedURLsInputs = document.querySelectorAll("#allowed_url_input");
const blockedURLsInputs = document.querySelectorAll("#blocked_url_input");

//
//// Store the currently selected settings using browser.storage.local.
//function storeSettings() {
//  let blockedURLs = blockedURLsTextArea.value.split("\n");
//  browser.storage.local.set({
//    blockedURLs
//  });
//}
//
//// Update the options UI with the settings values retrieved from storage,
//// or the default settings if the stored settings are empty.
//function updateUI(restoredSettings) {
//  blockedURLsTextArea.value = restoredSettings.blockedURLs.join("\n");
//}
//
//function onError(e) {
//  console.error(e);
//}
//
//// On opening the options page, fetch stored settings and update the UI with them.
//browser.storage.local.get().then(updateUI, onError);
//
//// Whenever the contents of the textarea changes, save the new values
//blockedURLsTextArea.addEventListener("change", storeSettings);
//
//
function allowlist_add() {
  let new_allowed_url_no = parseInt($('#total_allowed_urls').val()) + 1;
  let new_allowed_url_input = "<div class='url_input' id='allow_url_input_" + new_allowed_url_no + "'><select id='protocol' name='protocol'><option value='*:' selected='selected'>http/https</option><option value='https:'>https</option><option value='http:'>http</option><option value='file:'>file</option></select><label for='protocol'> :// </label><input type='text' id='host' name='host'><label for='host'> / </label><input type='text' id='path' name='path'></div>";
  
  $('#allow_url_input_1').append(new_allowed_url_input);
  $('#total_allowed_urls').val(new_allowed_url_no);
}

function allowlist_remove() {
  let last_allowed_url_no = $('#total_allowed_urls').val();
  
  if (last_allowed_url_no > 1) {
    $('#allow_url_input_' + last_allowed_url_no).remove();
	$('#total_allowed_urls').val(last_allowed_url_no - 1);
  }
}

function blocklist_add() {
  let new_blocked_url_no = parseInt($('#total_blocked_urls').val()) + 1;
  let new_blocked_url_input = "<div class='url_input' id='block_url_input_" + new_blocked_url_no + "'><select id='protocol' name='protocol'><option value='*:' selected='selected'>http/https</option><option value='https:'>https</option><option value='http:'>http</option><option value='file:'>file</option></select><label for='protocol'> :// </label><input type='text' id='host' name='host'><label for='host'> / </label><input type='text' id='path' name='path'></div>";
  
  $('#block_url_input_1').append(new_blocked_url_input);
  $('#total_blocked_urls').val(new_blocked_url_no);
}

function blocklist_remove() {
  let last_blocked_url_no = $('#total_blocked_urls').val();
  
  if (last_blocked_url_no > 1) {
    $('#block_url_input_' + last_blocked_url_no).remove();
	$('#total_blocked_urls').val(last_blocked_url_no - 1);
  }
}