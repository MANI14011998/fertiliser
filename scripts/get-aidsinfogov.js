$(document).ready(function(){

  var transferMed = readCookie('myMed').toString();
  var thisMed = '';
  var listMakers = [];

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

  // iife to populate page w/aidsinfo.gov data
  (function(){
    $.getJSON('../assets/reducedData.json', function(json){
      populateData(json);
    });

    function populateData(json){
      var myData = json;
      var myMaker = '';
      var allMakers = [];

      //iife to get all manufacturers
      (function(){
        for(var i = 0; i < myData.length; i++){
          var curMaker = myData[i].Companies[0].Name;
          var found = $.inArray(curMaker, allMakers);
          if (found < 0) {
            allMakers.push(myData[i].Companies[0].Name);
          }
        };
        for (var i = 0; i < allMakers.length; i++) {
        }
      })();

      // iife to match makers to help sites
      (function(){
        for(var i = 0; i < 10; i++){
          listMakers.push({});
        }
        listMakers[0].name = allMakers[0];
        listMakers[0].url = 'https://www.viivhealthcareforyou.com/index.html';
        listMakers[1].name = allMakers[1];
        listMakers[1].url = 'http://www.bmspaf.org/Pages/Home.aspx';
        listMakers[2].name = allMakers[2];
        listMakers[2].url = 'http://www.gilead.com/responsibility/us-patient-access';
        listMakers[3].name = allMakers[3];
        listMakers[3].url = 'http://www.janssenpharmaceuticalsinc.com/our-company/patient-assistance';
        listMakers[4].name = allMakers[4];
        listMakers[4].url = 'http://us.boehringer-ingelheim.com/our_responsibility/patients-families.html';
        listMakers[5].name = allMakers[5];
        listMakers[5].url = 'http://www.merckhelps.com/';
        listMakers[6].name = allMakers[6];
        listMakers[6].url = 'http://www.pfizerrxpathways.com/';
        listMakers[7].name = allMakers[7];
        listMakers[7].url = 'http://www.abbviepaf.org/';
        listMakers[8].name = allMakers[8];
        listMakers[8].url = 'http://www.gene.com/patients/patient-access';
        listMakers[9].name = allMakers[9];
        listMakers[9].url = 'http://www.gene.com/patients/patient-access';
      })();

      // iife to populate blurb
      (function(){
        for(var i = 0; i < myData.length; i++){
          for(var j = 0; j < myData[i].Names.length; j++){
            if(thisMed === myData[i].Names[j].Title){
              myData[i].myName = myData[i].Names[j].Title;
              myMaker = myData[i].Companies[0].Name;
              $('#blurb').html(myData[i].PatientVersions[0].Template[1].Answer);
              $('.medication-picture').html('<img src="' + myData[i].Images[0].URL + '" width="200px" height="200px"/>');
            }
          }
        }
      })();

      // iife to set manufacturer to button
      (function(){
        for(var i = 0; i < listMakers.length; i++){
          if(listMakers[i].name === myMaker){
            $('#asst-button').attr('href', listMakers[i].url);
          }
        }
        $('#assistance-button').text(myMaker + ' patient assistance program');
      })();

    }

  })();

});
