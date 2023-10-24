function page_changeSwitchery(element, checked) {
  if ((element.is(':checked') && checked == false) || (!element.is(':checked') && checked == true)) {
    element.parent().find('.switchery').trigger('click');
  }
}

function bool2int(val) {
  if (val == false)
    return 0;
  else
    return 1;
}

function oth2bool(val) {
  if (val == 0)
    return false;
  else
    return true;
}

function C_setCBResuleParseDisp(json) {
  var Result;
  if (json == "urlerr") {
    sessionStorage.setItem('Notification', 'err');
  }
  else {
    $.each(json, function (index, item) {
      Result = json[index][0].result;
    });

    if (Result == "ok") {
      sessionStorage.setItem('Notification', 'ok');
    }
    else {
      sessionStorage.setItem('Notification', 'err');
    }
  }
}

function C_Notification() {
  if (sessionStorage.getItem('Notification') == "ok") {
    $.NotificationApp.send("info", "save ok .", 'top-center', '#1ea69a', 'info', 2000, 1, 'slide');
  }
  else if (sessionStorage.getItem('Notification') == "err") {
    $.NotificationApp.send("info", "save err.", 'top-center', '#1ea69a', 'error', 2000, 1, 'slide');
  }

  sessionStorage.removeItem('Notification');
  //sessionStorage.clear();       // modify by wenyi
}

function page_http_req_get(uUrl, lType) {
  $.ajax({
    url: '' + uUrl + '',
    type: 'GET',
    dataType: 'text',
    timeout: 5000,
    cache: false,
    beforeSend: LoadFunction,
    error: erryFunction,
    success: succFunction
  })

  function LoadFunction() {
    //$(".list").html('load.......');
  }

  function erryFunction() {
    alert("page get error");
  }

  function succFunction(uStr) {
    var response = JSON.parse(uStr);
    var json = response["response"][0];

    if (lType == 'usb')
      C_getCBResuleParseUSBDisp(json);
    else if (lType == 'sdcard')
      C_getCBResuleParseSDCardDisp(json);
    else if(lType == 'other')
      C_getCBResuleParseOtherDisp(json);
    else if(lType == 'power')
      C_getCBResuleParsePowerDisp(json);
    else if(lType == 'nodeinfo')
      C_getCBResuleParseNodeInfoDisp(json);
  }
}

function page_http_req_set(uUrl, lType) {
  $.ajax({
    url: '' + uUrl + '',
    type: 'POST',
    dataType: 'text',
    timeout: 5000,
    cache: false,
    async: false,
    beforeSend: LoadFunction,
    error: erryFunction,
    success: succFunction
  })

  function LoadFunction() {
    //$(".list").html('load.......');
  }

  function erryFunction() {
    // alert('page set error1');    //modify by wenyi
    console.log("ajax post error");
    C_setCBResuleParseDisp("urlerr");
  }

  function succFunction(uStr) {
    var json = JSON.parse(uStr);
    C_setCBResuleParseDisp(json);
  }
}
