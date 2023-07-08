
const lag_keys = ["Enter", " "];  // keys which induce lag()
const data_low    = Array(2**17).fill("0");
const data_medium = Array(2**19).fill("0");  // 2^20 is approximately 1 MB
const data_high   = Array(2**21).fill("0");
var t_start, t_end;


function lag() {
  /*/
  - queries radio buttons for lag amount
  - posts message to example API
  - times exectuion to compute bandwidth, writes result to document
  /*/

  // query radio buttons for lag amount
  var lag_amount = document.querySelector('input[name=amount]:checked').value;
  switch (lag_amount) {
    case 'amount_1':
      var data = data_low;
      break;
    case 'amount_2':
      var data = data_medium;
      break;
    case 'amount_3':
      var data = data_high;
      break;
  }
  var data_length = data.length;


  var http = new XMLHttpRequest();
  var url = "https://reqres.in/api/users";

  http.open("POST", url);

  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.setRequestHeader("Content-length", data_length);
  http.setRequestHeader("Connection", "close");

  http.onreadystatechange = function() {
    if (http.readyState === XMLHttpRequest.DONE) {
      const status = http.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        // request completed successfully
        t_end = (new Date()).getTime();  // milliseconds
        var t_elapsed = (t_end - t_start)/1000;  // seconds
        var rate_Mbps = (data_length*8)/(1e6*t_elapsed);
        document.getElementById("bw").innerHTML = String(rate_Mbps.toFixed(2));
      }
    }
  }

  t_start = (new Date()).getTime();  // milliseconds
  http.send(data);
}


// react to keypresses
document.addEventListener("keypress", function(event) {
  if (lag_keys.includes(event.key)) {
    lag();
  }
});
