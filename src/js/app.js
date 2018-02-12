App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    // Load pets.
    $.getJSON('../pets.json', function (data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function () {
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    web3 = new Web3(App.web3Provider);
    var coinbase = web3.eth.coinbase;
    var balance = web3.eth.getBalance(coinbase);
    console.log(coinbase);
    console.log(balance);
    console.log(web3);

    return App.initContract();
  },

  initContract: function () {
    //Get necessary contract artifact file
    $.getJson('Adoption.json'), function (data) {
     var AdoptionArtifact = data;
     //Instantia
     App.contracts.Adoption = TruffleContractA(AdoptionArtifact);
     App.contracts.Adoption.setProvider(App.web3Provider);
     return ApplicationCache.markAdopted();
    }

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function (adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
