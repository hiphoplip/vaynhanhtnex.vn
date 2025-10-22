/**
 * TNEX Finance - Viewport Configuration
 * Handles responsive viewport settings for mobile and desktop
 */

window.ladi_viewport = function (b) {
  var a = document;
  b = b ? b : 'innerWidth';
  var c = window[b];
  var d = true;
  
  if (
    typeof window.ladi_is_desktop == 'undefined' ||
    window.ladi_is_desktop == undefined
  ) {
    window.ladi_is_desktop = !d;
  }
  
  var e = 960; // desktop width
  var f = 420; // mobile width
  var g = '';
  
  if (!d) {
    g = 'width=' + e + ',user-scalable=no,initial-scale=1.0';
  } else {
    var h = 1;
    var i = f;
    if (i != c) {
      h = c / i;
    }
    g =
      'width=' +
      i +
      ',user-scalable=no,initial-scale=' +
      h +
      ',minimum-scale=' +
      h +
      ',maximum-scale=' +
      h;
  }
  
  var j = a.getElementById('viewport');
  if (!j) {
    j = a.createElement('meta');
    j.id = 'viewport';
    j.name = 'viewport';
    a.head.appendChild(j);
  }
  j.setAttribute('content', g);
};

// Initialize viewport
window.ladi_viewport();

// Initialize tracking data arrays
window.ladi_fbq_data = [];
window.ladi_fbq = function () {
  window.ladi_fbq_data.push(arguments);
};

window.ladi_ttq_data = [];
window.ladi_ttq = function () {
  window.ladi_ttq_data.push(arguments);
};
