let cpf = document.getElementById('cpf');
let cnpj = document.getElementById('cnpj');
let plano30dias = document.getElementById('plano30dias');
let plano90dias = document.getElementById('plano90dias');
let plano180dias = document.getElementById('plano180dias');
let plano365dias = document.getElementById('plano365dias');
let anexoCnpj = document.getElementById('anexoCnpj');
let contratoSocial = document.getElementById('contratoSocial');
let documentosSocio = document.getElementById('documentosSocio');
var segments = [];
var segmentosEscolhidos = $();
var escolhasSegmentos = [];
var tipoFornecedor = '';
var societarios = $();

var filesUploads = []

cpf.style.display = 'none';

function trocaTipoFornecedor(value) {

  if (value == 1) {
    cpf.style.display = 'none';
    cnpj.style.display = 'block';
  }
  else {
    cpf.style.display = 'block';
    cnpj.style.display = 'none';
  }
}

$('input[name=plano]').change(function () {
  plano30dias.className = plano30dias.className.replace(' planoSelecionado', '');
  plano90dias.className = plano90dias.className.replace(' planoSelecionado', '');
  plano180dias.className = plano180dias.className.replace(' planoSelecionado', '');
  plano365dias.className = plano365dias.className.replace(' planoSelecionado', '');

  if ($(this).val() == 1) {
    plano30dias.className += ' planoSelecionado';
  }
  else if ($(this).val() == 2) {
    plano90dias.className += ' planoSelecionado';
  }
  else if ($(this).val() == 3) {
    plano180dias.className += ' planoSelecionado';
  }
  else if ($(this).val() == 4) {
    plano365dias.className += ' planoSelecionado';
  }
});

$('#plano30dias').click(function () {
  plano30dias.className = plano30dias.className.replace(' planoSelecionado', '');
  plano90dias.className = plano90dias.className.replace(' planoSelecionado', '');
  plano180dias.className = plano180dias.className.replace(' planoSelecionado', '');
  plano365dias.className = plano365dias.className.replace(' planoSelecionado', '');

  $('#30dias').prop("checked", true);

  plano30dias.className += ' planoSelecionado';
});

$('#plano90dias').click(function () {
  plano30dias.className = plano30dias.className.replace(' planoSelecionado', '');
  plano90dias.className = plano90dias.className.replace(' planoSelecionado', '');
  plano180dias.className = plano180dias.className.replace(' planoSelecionado', '');
  plano365dias.className = plano365dias.className.replace(' planoSelecionado', '');

  $('#90dias').prop("checked", true);

  plano90dias.className += ' planoSelecionado';
});

$('#plano180dias').click(function () {
  plano30dias.className = plano30dias.className.replace(' planoSelecionado', '');
  plano90dias.className = plano90dias.className.replace(' planoSelecionado', '');
  plano180dias.className = plano180dias.className.replace(' planoSelecionado', '');
  plano365dias.className = plano365dias.className.replace(' planoSelecionado', '');

  $('#180dias').prop("checked", true);

  plano180dias.className += ' planoSelecionado';
});

$('#plano365dias').click(function () {
  plano30dias.className = plano30dias.className.replace(' planoSelecionado', '');
  plano90dias.className = plano90dias.className.replace(' planoSelecionado', '');
  plano180dias.className = plano180dias.className.replace(' planoSelecionado', '');
  plano365dias.className = plano365dias.className.replace(' planoSelecionado', '');

  $('#365dias').prop("checked", true);

  plano365dias.className += ' planoSelecionado';
});

$('#buttonCNPJ').click(
  function () {
    $('#inputCNPJ').click();
  }
)

$('#buttonDocumentosSocio').click(
  function () {
    $('#inputDocumentosSocio').click();
  }
)

$('#buttonContratoSocial').click(
  function () {
    $('#inputContratoSocial').click();
  }
)

$('#inputCNPJ').change(
  function () {
    var names = [];
    for (var i = 0; i < $(this).get(0).files.length; ++i) {
      filesUploads.push($(this).get(0).files[i]);
      if (i != $(this).get(0).files.length - 1) {
        names += $(this).get(0).files[i].name + ', ';
      }
      else {
        names += $(this).get(0).files[i].name;
      }
    }

    anexoCnpj.value = names;
  }
)

$('#inputContratoSocial').change(
  function () {
    var names = [];
    for (var i = 0; i < $(this).get(0).files.length; ++i) {
      filesUploads.push($(this).get(0).files[i]);
      if (i != $(this).get(0).files.length - 1) {
        names += $(this).get(0).files[i].name + ', ';
      }
      else {
        names += $(this).get(0).files[i].name;
      }
    }

    contratoSocial.value = names;
  }
)

$('#inputDocumentosSocio').change(
  function () {
    var names = [];
    for (var i = 0; i < $(this).get(0).files.length; ++i) {
      filesUploads.push($(this).get(0).files[i]);
      if (i != $(this).get(0).files.length - 1) {
        names += $(this).get(0).files[i].name + ', ';
      }
      else {
        names += $(this).get(0).files[i].name;
      }
    }

    documentosSocio.value = names;
  }
)

/**
 * Monta Select dos Estados
 */

$.getJSON({
  url: 'https://licitanet.com.br/licitanet_api_site/estados/buscar',
  type: 'GET',
  data: jQuery.param({
    token: window.localStorage.getItem('access_token')
  }),
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  success: function (response) {
    $('#estados').append('<select onchange="carregaCidadesEstado(this.value);" id="estado" class="form-control"></select>');
    carregaCidadesEstado('AC1');
    $.each(response.data, function (index) {
      $('#estado').append('<option value="' + response.data[index].uf + response.data[index].id + '">' + response.data[index].nome
        + '</option>');
    });

  },
  error: function () {
  }
});

/**
 * Monta Select das Cidades baseado no estado.
 */

function carregaCidadesEstado(idEstado) {
  $.getJSON({
    url: 'https://licitanet.com.br/licitanet_api_site/cidade/buscar',
    type: 'POST',
    data: jQuery.param({
      token: window.localStorage.getItem('access_token'),
      estado: (idEstado.length == 4) ? idEstado.toString().substring(2, 4) : idEstado.toString().substring(2, 3)
    }),
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function (response) {

      $('#cidades').empty().append('<select id="cidade" class="form-control"></select>');

      $.each(response.data, function (index) {
        $('#cidade').append('<option value="' + response.data[index].id + '">' + response.data[index].nome
          + '</option>');
      });

    },
    error: function () {
    }
  });
}

var map = { "â": "a", "Â": "A", "à": "a", "À": "A", "á": "a", "Á": "A", "ã": "a", "Ã": "A", "ê": "e", "Ê": "E", "è": "e", "È": "E", "é": "e", "É": "E", "î": "i", "Î": "I", "ì": "i", "Ì": "I", "í": "i", "Í": "I", "õ": "o", "Õ": "O", "ô": "o", "Ô": "O", "ò": "o", "Ò": "O", "ó": "o", "Ó": "O", "ü": "u", "Ü": "U", "û": "u", "Û": "U", "ú": "u", "Ú": "U", "ù": "u", "Ù": "U", "ç": "c", "Ç": "C" };

function removerAcentos(s) {
  return s.replace(/[\W\[\] ]/g,
    function (a) {
      return map[a] || a
    })
};

/**
 * Função responsável por buscar o cnpj e inserir os dados de cadastro no formulário.
 */
function buscaDadosCnpj(cnpj) {
  $.ajax({
    url: 'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    success: function (json) {


      $.map($('#estados option'), function (option) {
        if (option.value.includes(json.uf)) {
          $("#estados select").val(option.value);
          carregaCidadesEstado(option.value);

          setTimeout(function () {
            $.map($('#cidades option'), function (option1) {
              if (removerAcentos(option1.text).toString().toLowerCase() == removerAcentos(json.municipio).toString().toLowerCase()) {
                $("#cidades select").val(option1.value);
              }
            });
          }, 1000);
        }
      });

      switch (json.porte) {
        case "MICRO EMPRESA":
          $("#meRadio").attr('checked', 'checked');
          break;

        case "EMPRESA DE PEQUENO PORTE":
          $("#eppRadio").attr('checked', 'checked');
          break;

        case "COOPERATIVA":
          $("#eppRadio").attr('checked', 'checked');
          break;

        case "MICROEMPREENDEDOR INDIVIDUAL":
          $("#meiRadio").attr('checked', 'checked');
          break;

        default:
          $("#grandePorteRadio").attr('checked', 'checked');
          break;
      }

      $("#razaoSocial").val(json.nome);
      $("#nomeFantasia").val(json.fantasia);
      $("#cep").val(json.cep);
      $("#logradouro").val(json.logradouro);
      $("#numero").val(json.numero);
      $("#complemento").val(json.complemento);
      $("#naturezaJuridica").val(json.natureza_juridica)
      $("#bairro").val(json.bairro);
      $("#telefoneFixo").val(json.telefone);
      societarios = $();
      if (json.qsa.length === 0) {
        societarios = societarios.add(createdSocietario(null));
      } else
        json.qsa.forEach(function (item, i) {
          societarios = societarios.add(createdSocietario(item));
        });

      $('#quadroSocietario').empty().append(societarios);

      $('.cpf-socio').mask('000.000.000-00', { reverse: true });
    }, error: function (e) {
      console.error(e);
    },
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Accept", "application/json");
    }
  });

}


/**
 * Função de criação de formularios do Quadro Societário
 */
function createdSocietario(qsa) {
  societarioTemplate = [
    '<div class="col-12 mt-4">',
    '<label for="representanteLegal">Nome do representante legal</label>',
    '<input type="text" id="representanteLegal" class="form-control nomeRepresentanteLegal" value="', (qsa != null) ? qsa.nome : '' || '', '" placeholder="Informe"></div>',
    '<div class="col-md-3 mt-4">',
    '<label for="socioCpf">CPF *</label>',
    '<input type="text" id="socioCpf" class="form-control cpf-socio cpfRepresentanteLegal" placeholder="000.000.000-00"></div>',
    '<div class="col-md-9 mt-4">',
    '<label for="tipoSociedade">Tipo de Sociedade</label>',
    '<input type="text" id="tipoSociedade" class="form-control tipoSociedadeRepresentanteLegal" value="', (qsa != null) ? qsa.qual : '' || '', '" placeholder="Informe"></div>'
  ]
  return $(societarioTemplate.join(''));
}

/**
 * Monta Data-list dos segmentos
 */

$.ajax({
  url: 'https://licitanet.com.br/licitanet_api_site/segmentos/buscar',
  type: 'GET',
  data: jQuery.param({
    token: window.localStorage.getItem('access_token')
  }),
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  success: function (response) {

    segments = response.data;

    var namesSegments = [];
    var htmlMedium = '';
    segments.forEach(function (segment, i) {
      namesSegments[i] = segment.descricao;
      htmlMedium += ('<option data-value="' + segment.codigo + '" value="' + segment.descricao + '"></option>');
    })
    document.getElementById('segmentos').innerHTML = htmlMedium;

  },
  error: function () {
  }
});

/**
 * Apresentear nome dos segmentos
 */
function createSegment(segmento) {
  segmentoTemplate = [
    '<div class="d-flex align-items-center justify-content-between mt-2 px-5 py-2 segmento">',
    '<p class="m-0">', segmento.descricao, '</p>',
    '<img src="./img/Grupo 415.svg" height="20" class="handOver">',
    '</div>'
  ]
  return $(segmentoTemplate.join(''));
}

/**
 * texto modal sucesso Cadastro de Fornecedor
 */
function createModalEmail(email) {
  emailTemplate = [
    '<p class="mt-5 qanelas text-center">',
    'Verifique seu e-mail, foi enviado para <strong class="textoAzul">', email, '</strong> maiores informações',
    '<br>',
    'sobre o andamento do seu cadastro!',
    '</p>'
  ]
  return $(emailTemplate.join(''));
}


/**
 * Função de Adição de Segmentos.
 */

$("#adicionarSegmento").click(function () {
  segments.forEach(function (segment, i) {

    if (segment.descricao == $('#segmentoEscolhido').val() && escolhasSegmentos.indexOf(segment) != -1) {
      alert("Segmento já inserido!");
    } else
      if (segment.descricao == $('#segmentoEscolhido').val()) {
        segmentosEscolhidos = segmentosEscolhidos.add(createSegment(segment));
        escolhasSegmentos[i] = segment;
      }
  })

  $('#segmentosEscolhidos').empty().append(segmentosEscolhidos);
  $('#segmentoEscolhido').val('')

  $('.handOver').click(function () {

    var index = $('.handOver').index(this);
    escolhasSegmentos.splice(index, 1);

    var newEscolhas = escolhasSegmentos;
    escolhasSegmentos = [];
    segmentosEscolhidos = $();
    newEscolhas.forEach(function (segment, i) {
      segmentosEscolhidos = segmentosEscolhidos.add(createSegment(segment));
      escolhasSegmentos[i] = segment;
    });
    $('#segmentosEscolhidos').empty().append(segmentosEscolhidos);

  });

});

/***
 * Passagem de mascaras dos campos.
 */
$(document).ready(function ($) {
  $('.cnpj-fornecedor').mask('00.000.000/0000-00', { reverse: true });
  $('.telefone-fixo').mask('(00) 0000-0000');
  $('.cep-fornecedor').mask('00.000-000');
  $('.cpf-fornecedor').mask('000.000.000-00', { reverse: true });
  $('.telefone-celular').mask('(00) 9 0000-0000');
})

/***
 * Ação de busca do CNPJ
 */

$(function () {
  $('.cnpj-fornecedor').keyup(function () {
    var tamanho = $('.cnpj-fornecedor').val().length;
    if (tamanho == 18) {
      buscaDadosCnpj($('.cnpj-fornecedor').val().replace(/(\.|\/|\-)/g, ""));
    }
  });
});

/**
 * Cadastro e conclusão do fornecedor
 * 
 */

$("#btnConcluir").click(function () {
  var token = window.localStorage.getItem('access_token');
  var tipo = $('#tipoFornecedor').val() == 1 ? 'j' : 'f';
  var num_documento = $('#tipoFornecedor').val() == 1 ? $('.cnpj-fornecedor').val() : $('.cpf-fornecedor').val();
  var enquadramento = $("input[name='tipoEmpresa']:checked").val();
  var microempresa = $("input[name='tipoEmpresa']:checked").val() != "ME" ? 0 : 1;
  var razao_social = $("#razaoSocial").val();
  var fantasia = $("#nomeFantasia").val();
  var cep = $("#cep").val();
  var endereco = $("#logradouro").val();
  var numero = $("#numero").val();
  var complemento = $("#complemento").val();
  var bairro = $("#bairro").val();
  var cidade = $('#cidade').val();
  var estado = $('#estado').val();
  var site = $('#site').val();
  var telefone_fixo = $('#telefoneFixo').val();
  var email = $('#email').val();
  var usuario = $('#nomeUsuario').val();
  var senha = $('#senhaUsuario').val();
  var celular = $('#celular').val();
  var natureza_juridica = $('#naturezaJuridica').val();
  var nomeRepresentante = "DORIEDSON CARLOS BRITES DE FIGUEIREDO";
  var plano = $("input[name='plano']:checked").val() == '' ? "0" : $("input[name='plano']:checked").val();

  validaCampos();

  let divNomesRepresentantes = document.getElementsByClassName("nomeRepresentanteLegal");
  let divCpfRepresentantes = document.getElementsByClassName("cpfRepresentanteLegal");
  let divTipoSociedadeRepresentantes = document.getElementsByClassName("tipoSociedadeRepresentanteLegal");
  let divSegmentos = document.getElementsByClassName("segmentosEscolhidos");

  for (i = 0; i < divNomesRepresentantes.length; i++) {
    (!divNomesRepresentantes[i].value.length > 0) ?
      $(divNomesRepresentantes[i]).addClass('is-invalid') :
      $(divNomesRepresentantes[i]).removeClass('is-invalid');

  }

  for (i = 0; i < divCpfRepresentantes.length; i++) {
    !validaCpf(divCpfRepresentantes[i].value) ? $(divCpfRepresentantes[i]).addClass('is-invalid') : $(divCpfRepresentantes[i]).removeClass('is-invalid');
  }

  for (i = 0; i < divTipoSociedadeRepresentantes.length; i++) {
    (!divTipoSociedadeRepresentantes[i].value.length > 0) ?
      $(divTipoSociedadeRepresentantes[i]).addClass('is-invalid') :
      $(divTipoSociedadeRepresentantes[i]).removeClass('is-invalid');
  }

  var prazo_contrato = plano;
  var cpf_representante = "128.643.506-45"
  var formData = new FormData();

  if (plano == "0") {
    alert("Escolha um plano");
  } else

    if (document.getElementsByClassName("is-invalid").length == 0) {
      var listFornecedoresQsa = [];
      var qsa = {
        tipo: "",
        cpf: "",
        nome: ""
      };
      for (i = 0; i < divCpfRepresentantes.length; i++) {
        qsa.tipo = divTipoSociedadeRepresentantes[i].value;
        qsa.cpf = divCpfRepresentantes[i].value;
        qsa.nome = divNomesRepresentantes[i].value;
        listFornecedoresQsa[i] = qsa;
      }

      var segmentos = [];
      escolhasSegmentos.forEach(function (segmento, i) {
        segmentos.push(segmento);
      });



      formData.append('token', token);
      formData.append("tipo", tipo);
      formData.append("num_documento", num_documento);
      formData.append("enquadramento", enquadramento);
      formData.append("microempresa", microempresa);
      formData.append("razao_social", razao_social);
      formData.append("fantasia", fantasia);
      formData.append("cep", cep);
      formData.append("endereco", endereco);
      formData.append("numero", numero);
      formData.append("complemento", complemento);
      formData.append("bairro", bairro);
      formData.append("cidade", cidade);
      formData.append("estado", (estado.length == 4) ? estado.toString().substring(2, 4) : estado.toString().substring(2, 3));
      formData.append("site", site);
      formData.append("telefone_fixo", telefone_fixo);
      formData.append("nome_representante", nomeRepresentante);
      formData.append("cpf_representante", cpf_representante);
      formData.append("celular", celular);
      formData.append("email", email);
      formData.append("usuario", usuario);
      formData.append("senha", senha);
      formData.append("prazo_contrato", prazo_contrato);
      formData.append("natureza_juridica", natureza_juridica);
      // formData.append("fornecedor_qsa", listFornecedoresQsa);
      // formData.append("segmento", segmento);


      var allFornecedoresQsa = [];
      listFornecedoresQsa.forEach(function (fornecedor, i) {
        // formData.append('fornecedor_qsa[' + i + '][tipo]', fornecedor.tipo);
        // formData.append('fornecedor_qsa[' + i + '][cpf]', fornecedor.cpf);
        // formData.append('fornecedor_qsa[' + i + '][nome]', fornecedor.nome);
        allFornecedoresQsa.push(new FornecedorQsa(fornecedor.tipo, fornecedor.cpf, fornecedor.nome))
        // formData.append('fornecedor_qsa', fornecedor);
      })

      formData.append('fornecedor_qsa', allFornecedoresQsa);
      segmentos.forEach(function (segmento, i) {
        // formData.append('segmento[' + i + ']', segmento);     
        formData.append('segmento', segmento.codigo);
      })

      filesUploads.forEach(function (file, i) {
        // formData.append('arquivos[', i, ']', file);
        formData.append('arquivos', file);
      })

      var object = {};
      formData.forEach((value, key) => { object[key] = value });
      var json = JSON.stringify(object);
      console.log(json);
      

      $.ajax({
        url: 'https://licitanet.com.br/licitanet_api_site/fornecedor/salvar',
        type: "POST",
        processData: false,
        contentType: false,
        data: formData,
        beforeSend: function () {
          // $('#image').show();
        },
        complete: function (data) {
          console.log(data);

          chamaModalSucess(email);
          // $('#image').hide();
        }
      });
    } else {
      alert("Preencha Todos os campos obrigatórios");
    }

});

function validaCampos() {

  if ($('#tipoFornecedor').val() == 1) {
    !validaCnpj($('.cnpj-fornecedor').val()) ? $('.cnpj-fornecedor').addClass('is-invalid') : $('.cnpj-fornecedor').removeClass('is-invalid');
  } else {
    !validaCpf($('.cpf-fornecedor').val()) ? $('.cpf-fornecedor').addClass('is-invalid') : $('.cpf-fornecedor').removeClass('is-invalid');
  }

  $("#razaoSocial").val() == '' ? $('#razaoSocial').addClass('is-invalid') : $('#razaoSocial').removeClass('is-invalid');

  $("#nomeFantasia").val() == '' ? $('#nomeFantasia').addClass('is-invalid') : $('#nomeFantasia').removeClass('is-invalid');

  $("#naturezaJuridica").val() == '' ? $('#naturezaJuridica').addClass('is-invalid') : $('#naturezaJuridica').removeClass('is-invalid');

  var returnCep = $("#cep").val();
  (returnCep.toString().length != 10) ? $('#cep').addClass('is-invalid') : $('#cep').removeClass('is-invalid');

  $("#logradouro").val() == '' ? $('#logradouro').addClass('is-invalid') : $('#logradouro').removeClass('is-invalid');

  $("#numero").val() == '' ? $('#numero').addClass('is-invalid') : $('#numero').removeClass('is-invalid');

  $("#bairro").val() == '' ? $('#bairro').addClass('is-invalid') : $('#bairro').removeClass('is-invalid');

  var returnFixo = $("#telefoneFixo").val();
  (returnFixo.toString().length != 14) ? $('#telefoneFixo').addClass('is-invalid') : $('#telefoneFixo').removeClass('is-invalid');

  $("#email").val() == '' ? $('#email').addClass('is-invalid') : $('#email').removeClass('is-invalid');

  var returnCelular = $("#telefoneCelular").val();


  (returnCelular.toString().length < 16 || returnCelular.toString().charAt(5) != '9') ? $('#telefoneCelular').addClass('is-invalid') : $('#telefoneCelular').removeClass('is-invalid');

  $("#nomeUsuario").val() == '' ? $('#nomeUsuario').addClass('is-invalid') : $('#nomeUsuario').removeClass('is-invalid');

  $("#senhaUsuario").val() == '' ? $('#senhaUsuario').addClass('is-invalid') : $('#senhaUsuario').removeClass('is-invalid');
}

function calcDigitosPosicoes(digitos, posicoes = 10, soma_digitos = 0) {

  digitos = digitos.toString();


  for (var i = 0; i < digitos.length; i++) {
    soma_digitos = soma_digitos + (digitos[i] * posicoes);

    posicoes--;

    if (posicoes < 2) {
      posicoes = 9;
    }
  }

  soma_digitos = soma_digitos % 11;

  if (soma_digitos < 2) {
    soma_digitos = 0;
  } else {
    soma_digitos = 11 - soma_digitos;
  }

  var cpf = digitos + soma_digitos;

  return cpf;

}


/**
 * Valida CPF
 */
function validaCpf(valor) {

  valor = valor.toString();

  valor = valor.replace(/[^0-9]/g, '');


  var digitos = valor.substr(0, 9);

  var novo_cpf = calcDigitosPosicoes(digitos);

  var novo_cpf = calcDigitosPosicoes(novo_cpf, 11);

  if (novo_cpf === valor) {
    return true;
  } else {
    return false;
  }

}

/**
 * Valida Cnpj
 */
function validaCnpj(valor) {

  valor = valor.toString();

  valor = valor.replace(/[^0-9]/g, '');


  var cnpj_original = valor;

  var primeiros_numeros_cnpj = valor.substr(0, 12);

  var primeiro_calculo = calcDigitosPosicoes(primeiros_numeros_cnpj, 5);

  var segundo_calculo = calcDigitosPosicoes(primeiro_calculo, 6);

  var cnpj = segundo_calculo;

  if (cnpj === cnpj_original) {
    return true;
  }

  return false;

}

/**
 * Função para chamar o modal de Sucesso, mostrando o e-mail do fornecedor
 */
function chamaModalSucess(email) {
  var emailModal = $();
  emailModal = emailModal.add(createModalEmail(email));
  $('#text-email-modal').empty().append(emailModal);
  $('#btnConcluir').attr('data-toggle', 'modal');
  $('#btnConcluir').attr('data-target', '#modalConcluirAdesao');
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

class FornecedorQsa {
  constructor(tipo, cpf, nome) {
    this.tipo = tipo;
    this.cpf = cpf;
    this.nome = nome;
  }
}