$(document).ready(function(){

  var medsByCUI = {
    'Truvada':'495430',
    'Ziagen':'495430',
    'Videx':'495430',
    'Emtriva':'495430',
    'Epivir':'495430',
    'Zerit':'495430',
    'Viread':'495430',
    'Viramune':'495430',
    'Viracept':'495430',
    'Retrovir':'495430',
    'Rescriptor':'495430',
    'Sustiva':'495430',
    'Intelence':'495430',
    'Edurant':'495430',
    'Reyataz':'495430',
    'Prezista':'495430',
    'Prezcobix':'495430',
    'Lexiva':'495430',
    'Crixivan':'495430',
    'Norvir':'495430',
    'Invirase':'495430',
    'Aptivus':'495430',
    'Fuzeon':'495430',
    'Selzentry':'495430',
    'Tivicay':'495430',
    'Vitekta':'495430',
    'Isentress':'495430',
    'Tybost':'495430',
    'Epzicom':'495430',
    'Triumeq':'495430',
    'Trizivir':'495430',
    'Evotaz':'495430',
    'Atripla':'495430',
    'Genvoya':'495430',
    'Stribild':'495430',
    'Complera':'495430',
    'Combivir':'495430',
    'Kaletra':'495430'
  };

  var transferMed = readCookie('myMed').toString();
  var thisMed = '';

  if(transferMed === '' || transferMed === null){
    thisMed = 'Truvada';
  }
  else {
    thisMed = transferMed;
  }

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

  // interactions iife
  (function() {
    $.ajax({
      url: 'https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=' + medsByCUI[thisMed],
      type: 'GET',
      crossOrigin: true,
      dataType: 'json',
      success: function(data) {
        interactionsData(data);
      }
    });

    function interactionsData(data) {
      var interactArray = data.interactionTypeGroup[0].interactionType[0].interactionPair;

      for (var i = 0; i < interactArray.length; i++) {
        $('.med-adverse-events').append('<div class="adverse-div"><p>' + interactArray[i].description + '</p></div>');
      }
    }
  })();

});
