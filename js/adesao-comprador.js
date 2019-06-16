
$('.cssload-container').hide();
/***
 * Passagem de mascaras dos campos.
 */
$(document).ready(function ($) {
  $('.cnpj').mask('00.000.000/0000-00', { reverse: true });
  $('.telefone').mask('(00) 0000-0000');
})




/**
 * Cadastro e conclusão do Comprador
 * 
 */

$("#btnConcluir").click(function () {

  var nome = $("#nome").val();
  var telefone = $("#telefone").val();
  var email = $("#email").val();
  var orgaoPublico = $("#orgaoPublico").val();
  var cnpj = $("#cnpj").val();

  $('#nome').val().length < 1 ? $('#nome').addClass('is-invalid') : $('#nome').removeClass('is-invalid');
  $('#cnpj').val().length != 18 ? $('#cnpj').addClass('is-invalid') : $('#cnpj').removeClass('is-invalid');
  $('#telefone').val().length != 14 ? $('#telefone').addClass('is-invalid') : $('#telefone').removeClass('is-invalid');
  $('#email').val().length < 1 ? $('#email').addClass('is-invalid') : $('#email').removeClass('is-invalid');
  $('#orgaoPublico').val().length <= 1 ? $('#orgaoPublico').addClass('is-invalid') : $('#orgaoPublico').removeClass('is-invalid');

  if (document.getElementsByClassName("is-invalid").length == 0) {
    $.getJSON("https://licitanet.com.br/licitanet_api_site/token/gerar", function (json) {
      var tokenReceived = json;

      if (tokenReceived != "") {
        $.ajax({
          url: 'https://licitanet.com.br/licitanet_api_site/contato/enviar',
          type: 'POST',
          data: jQuery.param({
            token: tokenReceived,
            nome: nome,
            cnpj: cnpj,
            orgao: orgaoPublico,
            email: email,
            telefone: telefone
          }),
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          beforeSend: function () {
            startSpinner();
          },
          success: function (response) {
            if (response.tip_msg == "success") {
              $("#nome").val('');
              $("#telefone").val('');
              $("#email").val('');
              $("#orgaoPublico").val('');
              $("#cnpj").val('');
              stopSpinner();
              alert("Contato Registrado com sucesso!")
            }
          },
          error: function () {
          }
        });
      }
    });

  } 


});

function startSpinner() {
  $('.cssload-container').show();
  $('.form-dados').hide();
}

function stopSpinner() {
  $('.form-dados').show();
  $('.cssload-container').hide();
}

$("#open-whatsapp").click(function () {
  var go_to_url = "https://wa.me/5503430146633?text=Ola%20"
  window.open(go_to_url, '_blank');
});

$("#open-skype").click(function () {
  var go_to_url = "https://join.skype.com/bot/b403b127-3296-4e01-8523-fddee87d2b09"
  window.open(go_to_url, '_blank');
});

$("#open-instagram").click(function () {
  var go_to_url = "https://www.instagram.com/licitanet/"
  window.open(go_to_url, '_blank');
});

$("#open-facebook").click(function () {
  var go_to_url = "https://www.facebook.com/licitanet"
  window.open(go_to_url, '_blank');
});


