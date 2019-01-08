$(document).ready(function(){

  var transferMed = readCookie('myMed').toString();

  if(transferMed === '' || transferMed === null){
    thisMed = 'Truvada';
  }
  else {
    thisMed = transferMed;
  }

  var mykey = config.MY_KEY;
  var secretkey = config.SECRET_KEY;
  var medData2 = {};

  $('#med-name-here').text(thisMed);

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

  function getGoodRx(){
    var querystring = 'name=' + thisMed + '&api_key=' + mykey;
    var hash = CryptoJS.HmacSHA256(querystring, secretkey);
    var base63 = hash.toString(CryptoJS.enc.Base64);
    var base64 = base63.replace(/[/]/g, '_');
    base64 = base64.replace(/[+]/g, '_');
    var urlToGet = 'https://floating-island-78277.herokuapp.com/compare-price?' + querystring + '&sig=' + base64;

    $.ajax({
      url: urlToGet,
      type: 'GET',
      crossDomain: true,
      dataType: 'json',
      success: function(data){
        getMedPriceInfo(data);
      },
      error: function(xhr, status){
        console.log('error ', xhr, status);
      }
    });
  }

  function getMedPriceInfo(data){
    var medData = $.map(data, function(el) { return el; });
    medData2 = medData[0];

    for(var i = 0; i < 3; i++){
      var thisId = '#price' + i;
      $(thisId).text('$' + medData2.prices[i]);
      thisId = '#pharm' + i;
      $(thisId).text(medData2.price_detail.pharmacy[i]);
      thisId = '#coupon' + i;
      $(thisId).html('<a href="' + medData2.price_detail.url[i] + '">get coupon</a>');
    }

    $('#goodrx-img').attr('href', medData2.url);
  }

  getGoodRx();
});
