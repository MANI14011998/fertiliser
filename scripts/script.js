$(document).ready(function(){

  var isToggled = false;
  var isExpanded = false;
  var myMed = '';

  var NRTImedications = {       //keetnashak pesticide
    medClass : 'NRTIs',
    'CHEMGOR-30' : 'Dimethoate 30% EC',
    'DGOLDMIT-50' : 'Ethion 50% EC',
    'GOLDBAN GR' : 'eChlorpyriphos 10% GR',
    'DNADIR' : 'Deltamethrin 11% w/w EC',
    'FOLI GOLD-DP' : 'Methyl Parathion 2% DP',
    'PHENTOM 2%' : 'Phenthoate 2% DP',
    'TEMPAR' : '  Temphos 50% EC'
  }

  var NNRTImedications = {                           //herbicides and weedicides
    medClass : 'NNRTIs',
    ' CHEMCHLOR' : 'Butachlor 50% EC',
    'SENATE' : 'Metribuzin 70% WP',
    'GRAMEX' : 'Paraquate Dichloride 24% SL',
    'FIGHTER SS' : '2,4-D Sodium Salt 80% WP',
    'EQUICKMIX' : 'Butachlor 50% EW'
  }

  var PImedications = {                       // fertiliser
    medClass : 'PIs',
    'Calcium Ammonium Nitrate' : '25% N)',
    'Urea Ammonium Nitrate ' : '(32%) (Liquid)',
    'Calcium Ammonium Nitrate ' : '(26% N)',
        ' Potassium Chloride ' : '(Muriate of Potash) (Granular) ' ,
     'Viracept' : 'nelfinavir, nelfinavir mesylate, NFV',

  }

  var FImedications = {
    medClass : 'FIs',
    'Fuzeon' : 'enfuviritide (T-20)'
  }

  var EImedications = {
    medClass : 'EIs',
    'Selzentry' : 'maraviroc (MVC)'
  }

  var IImedications = {
    medClass : 'IIs',
    'Tivicay' : 'dolutegravir (DTG)',
    'Vitekta' : 'elvitegravir (EVG)',
    'Isentress' : 'raltegravir (raltegravir potassium, RAL)'
  }

  var PEmedications = {
    medClass : 'PEs',
    'Tybost' : 'cobicistat (COBI)'
  }

  var Combomedications = {
    medClass : 'combos',
    'Epzicom' : 'abacavir and lamivudine',
    'Triumeq' : 'abacavir, dolutegravir and lamivudine',
    'Trizivir' : 'abacavir, lamivudine and zidovudine',
    'Evotaz' : 'atazanavir and cobicistat',
    'Prezcobix' : 'darunavir and cobicistat',
    'Atripla' : 'efavirenz, emtricitabine, and tenofovir disoproxil fumarate',
    'Genvoya' : 'elvitegravir, cobicistat, emtricitabine and tenofovir alafenamide fumarate',
    'Stribild' : 'elvitegravir, cobicistat, emtricitabine and tenofovir disoproxil fumarate',
    'Complera' : 'emtricitabine, rilpivirine and tenofovir disoproxil fumarate',
    'Truvada' : 'emtricitabine and tenofovir disoproxil fumarate',
    'Combivir' : 'lamivudine and zidovudine',
    'Kaletra' : 'lopinavir and ritonavir'
  }

  var allMedGroups = [
    NRTImedications, NNRTImedications, PImedications, FImedications, EImedications, IImedications, PEmedications, Combomedications
  ]

  var allMeds = [];

  function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
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

  function eraseCookie(name) {
    createCookie(name,"",-1);
  }

  for (var i = 0; i < allMedGroups.length; i++){
    var temp = Object.keys(allMedGroups[i]);
    temp.shift();
    $.merge(allMeds, temp);
  }

  $(function(){
    $('#search-box').autocomplete({
      source: allMeds
    });
  });

  $('.medCats').click(function(){
    var curParent = $(event.target).parent().attr('id');
    var curDiv = '#' + curParent;
    isToggled = !isToggled;

    $('.medCat').not(curDiv).fadeToggle(100);
    $('.filler').fadeToggle(100);
    $('.heading').fadeToggle(100);
    $('.search').fadeToggle(100);
    $('#click-for-full').toggle();

    if(isToggled){
      for(var i = 0; i < allMedGroups.length; i++){
        if (allMedGroups[i].medClass === curParent){
          $.each(allMedGroups[i], function(key, value){
            if(key != 'medClass'){
              $('.meds-list').append('<p class="med" id="' + key + '">'+ key + '<br>' + '(' + value +')</p>');
            }
          });
        }
      }
    }
    else {
      $('.meds-list').empty();
    }
  });

  function listAll(fromButton){
    $('.search').fadeToggle(100);
    $('.filler').fadeToggle(100);
    $('.medCat').fadeToggle(100);
    $('.heading').fadeToggle(100);

    if(fromButton && isExpanded){
      $('#click-for-full').text('click here to go back');
      for(var i = 0; i < allMedGroups.length; i++){
        $.each(allMedGroups[i], function(key, value){
          if(key != 'medClass'){
            $('.meds-list').append('<p class = "med" id = "' + key + '">'+ key + '<br>' + '(' + value +')</p>');
          }
        });
      }
    }
    else if (fromButton) {
      $('#click-for-full').text('click here to view a full list of medications');
      $('.meds-list').empty();
    }

  }

  $('#click-for-full').click(function(){
    isExpanded = !isExpanded;
    listAll(true, isExpanded);
  });

  $('#search-box').autocomplete({
    select: function(event, ui){
      var uiObj = ui.item;
      myMed = uiObj.value;
      createCookie('myMed', myMed, 2);
      window.location.href='views/medication.html';
    }
  });

  $(document).on('click', '.med', function(){
    var myMed = $(this).attr('id');
    createCookie('myMed', myMed, 2);
    window.location.href='views/medication.html';
  });

});
