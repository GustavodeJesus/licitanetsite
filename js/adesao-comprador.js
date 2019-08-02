
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
    $.getJSON("https://api-site.licitanet.com.br/token/gerar", function (json) {
      var tokenReceived = json;

      if (tokenReceived != "") {
        $.ajax({
          url: Utils.urlInicialAPI+ 'contato/enviar',
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