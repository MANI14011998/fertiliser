$(document).ready(function(){

  var thisMed = readCookie('myMed').toString();

  var gilead = '<a href="https://www.gileadadvancingaccess.com/"><button id="asst-button">here.</button></a>'

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  $('#medication-name').text(thisMed);

});
