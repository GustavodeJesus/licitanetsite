let campoTexto = document.getElementById('campo-texto');
let campoData = document.getElementById('campo-data');
var dataInicial;
var dataFinal;
var listProcessos = [];
var currentPage = 1;

campoTexto.style.display = 'none';

/**
 * Função para trocar o campo de filtro utilizado. 
 */
function trocaCampoBusca(value) {

    if (value == 4 || value == 5) {
        campoTexto.style.display = 'none';
        campoData.style.display = 'block';
    }
    else {
        campoTexto.style.display = 'block';
        campoData.style.display = 'none';
    }
}

/**
 * Função que inicializa a data dos ultimos 30 dias e chama os publicados inicialmente.
 */
$(function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    dataFinal = dd + '/' + mm + '/' + yyyy;
    window.localStorage.setItem('dataFinal', dataFinal);

    today = yyyy + '-' + mm + '-' + dd;
    $('#dataFim').val(today);
    $('#dataFimDisputa').val(today);
    var lastMonth = new Date();
    lastMonth.setDate(dd);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    var ddf = String(lastMonth.getDate()).padStart(2, '0');
    var mmf = String(lastMonth.getMonth() + 1).padStart(2, '0');
    var yyyyf = lastMonth.getFullYear();
    dataInicial = ddf + '/' + mmf + '/' + yyyyf;
    window.localStorage.setItem('dataInicial', dataInicial);
    todayf = yyyyf + '-' + mmf + '-' + ddf;
    $('#dataInicio').val(todayf);
    getPublicados(getParamsBusca(currentPage));
});

/**
 * Carregamento entre as Tabs
 */

$("a[href='#pills-processos']").on('shown.bs.tab', function (e) {
    getPublicados(getParamsBusca(currentPage));
});

$("a[href='#publicados']").on('shown.bs.tab', function (e) {
    getPublicados(getParamsBusca(currentPage));
});

$("a[href='#homologacao']").on('shown.bs.tab', function (e) {
    getAguardandoHomologacao(getParamsBusca(currentPage));
});

$("a[href='#revogados']").on('shown.bs.tab', function (e) {
    getRevogados(getParamsBusca(currentPage));
});

$("a[href='#homologados']").on('shown.bs.tab', function (e) {
    getHomologados(getParamsBusca(currentPage));
});

/**
 * Função para Busca mediante filtro passado.
 */

$('#buttonBusca').click(function () {

    if ($('#publicados').is(":visible")) {
        getPublicados(getParamsBusca(currentPage));
    }

    if ($('#homologacao').is(":visible")) {
        getAguardandoHomologacao(getParamsBusca(currentPage));
    }

    if ($('#revogados').is(":visible")) {
        getRevogados(getParamsBusca(currentPage));
    }

    if ($('#homologados').is(":visible")) {
        getHomologados(getParamsBusca(currentPage));
    }
});

function montaPaginacao(tab, totalPaginas) {
    currentPage = $pagination.twbsPagination('getCurrentPage');
    $pagination.twbsPagination('destroy');

    $pagination.twbsPagination($.extend({}, defaultOptionsPag, {
        startPage: currentPage,
        totalPages: totalPaginas,
        onPageClick: function (event, page) {
            $('#page-content').text('Page ' + page);

            switch (tab) {
                case 'publicados':
                    getPublicados(getParamsBusca(page));
                    break;
                case 'aguardando-homologacao':
                    getAguardandoHomologacao(getParamsBusca(page));
                    break;
                case 'desertos-revogados':
                    getRevogados(getParamsBusca(page));
                    break;
                case 'homologados':
                    getHomologados(getParamsBusca(page));
                    break;
            }
        }
    }));
}

/**
 * Função responsável por trazer os Processos Publicados mediante busca e paginação.
 */
function getPublicados(params) {
    $.ajax({
        url: Utils.urlInicialAPI + 'processos/publicados',
        type: 'POST',
        data: jQuery.param(params),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            totalPages = response.paginacao.ultima == 0 ? 1 : response.paginacao.ultima;

            montaPaginacao('publicados', totalPages);

            listProcessos = [];
            if (response.data.length == 0) {
                $('#layout-vazio').show();
                $('#processo-publicado').empty();
            } else {
                $('#layout-vazio-aguardando-homologacao').show();
                $('#processo-aguardando-homologacao').empty();
                $('#layout-vazio-revogado').show();
                $('#processo-revogado').empty();
                $('#layout-vazio-homologado').show();
                $('#processo-homologados').empty();

                $('#layout-vazio').hide();
                $('#paginacao1').show();
                var processos = $();

                $.each(response.data, function (index, item) {
                    listProcessos[index] = item;
                    processos = processos.add(createProcessoTemplate(item));
                });

                $('#processo-publicado').empty().append(processos)
                    .find('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});

                $('.readMore').click(function () {
                    var index = $('.readMore').index(this);
                    var modal = $();

                    modal = modal.add(createModal(listProcessos[index]));
                    $('#modal-avisos').empty().append(modal);
                    $('#myModal').modal('show');
                });
            }
        }
    });
}

/**
 * Função responsável por trazer os Processos Aguardando Homologação mediante busca e paginação.
 */
function getAguardandoHomologacao(params) {
    $.ajax({
        url: Utils.urlInicialAPI + 'processos/aguardando-homologacao',
        type: 'POST',
        data: jQuery.param(params),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            totalPages = response.paginacao.ultima == 0 ? 1 : response.paginacao.ultima;

            montaPaginacao('aguardando-homologacao', totalPages);

            listProcessos = [];
            if (response.data.length == 0) {
                $('#layout-vazio-aguardando-homologacao').show();
                $('#processo-aguardando-homologacao').empty();
            } else {
                $('#layout-vazio').show();
                $('#processo-publicado').empty();
                $('#layout-vazio-homologado').show();
                $('#processo-homologados').empty();

                $('#layout-vazio-aguardando-homologacao').hide();
                $('#paginacao2').show();
                var processos = $();

                $.each(response.data, function (index, item) {
                    listProcessos[index] = item;
                    processos = processos.add(createProcessoTemplate(item));
                });

                $('#processo-aguardando-homologacao').empty().append(processos)
                    .find('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});

                $('.readMore').click(function () {
                    var index = $('.readMore').index(this);
                    var modal = $();

                    modal = modal.add(createModal(listProcessos[index]));
                    $('#modal-avisos').empty().append(modal);
                    $('#myModal').modal('show');
                });
            }
        }
    });
}

/**
 * Função responsável por trazer os Processos Revogados mediante busca e paginação.
 */
function getRevogados(params) {
    $.ajax({
        url:  Utils.urlInicialAPI + 'processos/desertos-revogados',
        type: 'POST',
        data: jQuery.param(params),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            totalPages = response.paginacao.ultima == 0 ? 1 : response.paginacao.ultima;

            montaPaginacao('desertos-revogados', totalPages);

            listProcessos = [];
            if (response.data.length == 0) {
                $('#layout-vazio-revogado').show();
                $('#processo-revogado').empty();
            } else {
                $('#layout-vazio').show();
                $('#processo-publicado').empty();
                $('#layout-vazio-aguardando-homologacao').show();
                $('#processo-aguardando-homologacao').empty();
                $('#layout-vazio-homologado').show();
                $('#processo-homologados').empty();
                $('#layout-vazio-revogado').hide();
                $('#paginacao3').show();
                var processos = $();

                $.each(response.data, function (index, item) {
                    listProcessos[index] = item;
                    processos = processos.add(createProcessoTemplate(item));
                });

                $('#processo-revogado').empty().append(processos)
                    .find('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});

                $('.readMore').click(function () {
                    var index = $('.readMore').index(this);
                    var modal = $();

                    modal = modal.add(createModal(listProcessos[index]));
                    $('#modal-avisos').empty().append(modal);
                    $('#myModal').modal('show');
                });
            }
        }
    });
}

/**
 * Função responsável por trazer os Processos Homologados mediante busca e paginação.
 */
function getHomologados(params) {
    $.ajax({
        url: Utils.urlInicialAPI + 'processos/homologados',
        type: 'POST',
        data: jQuery.param(params),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            totalPages = response.paginacao.ultima == 0 ? 1 : response.paginacao.ultima;

            montaPaginacao('homologados', totalPages);

            listProcessos = [];
            if (response.data.length == 0) {
                $('#layout-vazio-homologado').show();
                $('#processo-homologados').empty();
            } else {
                $('#layout-vazio-revogado').show();
                $('#processo-revogado').empty();
                $('#layout-vazio').show();
                $('#processo-publicado').empty();
                $('#layout-vazio-aguardando-homologacao').show();
                $('#processo-aguardando-homologacao').empty();
                $('#layout-vazio-homologado').hide();
                $('#paginacao4').show();
                var processos = $();

                $.each(response.data, function (index, item) {
                    listProcessos[index] = item;
                    processos = processos.add(createProcessoTemplate(item));
                });

                $('#processo-homologados').empty().append(processos)
                    .find('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});

                $('.readMore').click(function () {
                    var index = $('.readMore').index(this);
                    var modal = $();

                    modal = modal.add(createModal(listProcessos[index]));
                    $('#modal-avisos').empty().append(modal);
                    $('#myModal').modal('show');
                });
            }
        }
    });
}

/**
 * Função para Capitalizar o texto das descrições.
 */

function capitalize(txt) {
    if (txt == null || txt.length == 0) return "";
    txt = txt.toLowerCase();
    return txt.replace(/(^|\s)([a-z])/g, function (m, p1, p2) { return p1 + p2.toUpperCase(); });
};

/**
 * Função de Criação de listagem de Processos Publicados.
 */

function createProcessoTemplate(processo) {
    processoTemplate = [
        '<div class="my-3 p-4 box">',
        '<div class="row">',
        '<div class="col-md-2 text-center border-right-3" data-toggle="tooltip" id="tooltip-datas" data-html="true" data-placement="top"',
        'title="', "<p>Fim Recebimento: " + processo.fim_recprop + "</p>"
        + "<p>Início Análise Proposta: " + processo.ini_aberprop + "</p>"
        + "<p>Fim Análise Proposta: " + processo.fim_aberprop + "</p>"
        + "<p>Início da Disputa: " + processo.disputa, '</p>">',
        '<img src = "./img/União 1.svg" width = "55">',
        '<p>Início da disputa</p>',
        '<p>', processo.disputa.substring(0, 10), '</p>',
        '<p>', processo.disputa.substring(11, 16), '</p>',
         processo.cancelado == 1 ? '<p class="text-warning"> Cancelado</p>' : '',
        processo.suspenso == 1 ? '<p class="text-danger"> Suspenso</p>' : '',
        '</div>',
        '<div class="col-md-1">',
        '<p>Pregão</p>',
        '<p>', processo.numero, '</p>',
        '</div>',
        '<div class="col-md-2">',
        '<p>Orgão público</p>',
        '<p>', capitalize(processo.orgao), '</p>',
        '</div>',
        '<div class="col-md-3">',
        '<p>Descrição</p>',
        '<p>', capitalize(processo.descricao.substring(0, 92)) + "...", '</p>',
        '<div class="d-flex justify-content-end">',
        '<button class="btn btn-link readMore">Ver mais</button>',
        '</div>',
        '</div>',
        '<div class="col-md-2 text-center">',
        '<p>Qtd. Lotes</p>',
        '<p>', processo.qtdlote, '</p>',
        '</div>',
        '<div class="col-md-2">',
        '<p>Relatórios</p>',
        '<select name="relatorios" onchange="if (this.value) openUrl(this.value);" id="relatorios" class="form-control selectRelatorios">',
        '<option value="" selected disabled>Selecione</option>',
        '<option value="', getFiles(processo.arquivos), '">Arquivos</option>',
        montarOptionRelatorios(processo.classificacao, processo.url_classificacao, 'Classificação'),
        montarOptionRelatorios(processo.vencedores, processo.url_vencedores, 'Vencedores'),
        montarOptionRelatorios(processo.cancelados, processo.url_cancelados, 'Cancelados'),
        montarOptionRelatorios(processo.encerrado, processo.url_cancelados, 'Cancelados'),
        montarOptionRelatorios(processo.vencedores, processo.url_proposta_inicial, 'Proposta inicial'),
        montarAtas(processo.atas),
        '</select>',
        '</div>',
        '</div>',
        '</div>'];

    return $(processoTemplate.join(''));
}

function montarOptionRelatorios(quantidade, url, caption) {
    return quantidade > 0 ? '<option value="' + url + '">' + caption + '</option>' : '';
}

function montarAtas(atas) {
    var html = "";
    $.each(atas, function (i, e) {
        html += '<option value="' + e.URL + '">' + e.caption + '</option>';
    });
    return html;
}

function getFiles(arquivos) {

    var stringFiles = "";
    var stringNames = ""
    arquivos.forEach(function (arquivo) {
        if (arquivo.diretorio != "") {
            stringFiles = stringFiles + "|diretorio|" + arquivo.diretorio;
            stringNames = stringNames + "|nomeFile|" + arquivo.nome;
        }
    });

    return "arquivos:" + stringFiles + "|||" + stringNames;
}

/**
 * Função para obter parametros de buscas do filtro
 */
function getParamsBusca(pagina) {

    let dataInicial = $('#dataInicio').val().split('-').reverse().join('/');
    let dataFinal = $('#dataFim').val().split('-').reverse().join('/');
    let searchInput = $('.searchInput').val();
    window.localStorage.setItem('dataInicial', dataInicial);
    window.localStorage.setItem('dataFim', dataFinal);
    var token = window.localStorage.getItem('access_token');

    p_data_pub_periodo = {
        data_ini: dataInicial,
        data_fim: dataFinal
    }

    switch ($("#tipoBusca").val()) {
        case '1':
            var obj = {
                token: token,
                pagina: pagina,
                p_numero: searchInput
            }
            return obj;


        case '2':
            var obj = {
                token: token,
                pagina: pagina,
                p_objeto: searchInput
            }
            return obj;

        case '3':
            var obj = {
                token: token,
                pagina: pagina,
                p_orgao: searchInput
            }
            return obj;

        case '4':
            var obj = {
                token: token,
                pagina: pagina,
                p_data_ini_disp: p_data_pub_periodo
            }
            return obj;

        case '5':
            var obj = {
                token: token,
                pagina: pagina,
                p_data_pub: p_data_pub_periodo
            }
            return obj;
    }
}

/**
 * Função para criar o modal de informação da disputa.
 */

function createModal(processo) {
    modalTemplate = [
        '<div class="modal fade" id="myModal" tabindex="-1" role="dialog"',
        'aria-labelledby="exampleModalCenterTitle" aria-hidden="true">',
        '<div class="modal-dialog modal-dialog-centered modal-lg" role="document">',
        '<div class="modal-content">',
        '<div class="modal-body p-4">',
        '<div class="my-3 p-4">',
        '<div class="row">',
        '<div class="<div class="col-md-3" data-toggle="tooltip" data-placement="top" id="tooltip-datas" data-html="true"',
        'title="', "<p>Fim Recebimento: " + processo.fim_recprop + "</p>"
        + "<p>Início Análise Proposta: " + processo.ini_aberprop + "</p>"
        + "<p>Fim Análise Proposta: " + processo.fim_aberprop + "</p>"
        + "<p>Início da Disputa: " + processo.disputa, '</p>">',
        '<div class="d-flex flex-column justify-content-center align-items-center">',
        '<img src = "./img/União 1.svg" width = "55" height="55" class="ml-2">',
        '<p class="font-weight-bold">', 'Início da disputa', '</p>',
        '<p>', processo.disputa.substring(0, 10), '</p>',
        '<p>', processo.disputa.substring(11, 16), '</p>',
        '</div>',
        '</div>',
        '<div class="col-md-3">',
        '<p class="font-weight-bold">Pregão</p>',
        '<p>', processo.numero, '</p>',
        '</div>',
        '<div class="col-md-3">',
        '<p class="font-weight-bold">Orgão público</p>',
        '<p>', capitalize(processo.orgao), '</p>',
        '</div>',
        '<div class="col-md-3 text-center">',
        '<p class="font-weight-bold">Qtd. Lotes</p>',
        '<p>', processo.qtdlote, '</p>',
        '</div>',
        '<div class="col-12 mt-4">',
        '<p class="font-weight-bold">Descrição</p>',
        '<p>', capitalize(processo.descricao), '</p>',
        '</div>',
        '</div>',
        '</div>',
        '<div class="d-flex justify-content-end">',
        '<button data-dismiss="modal" class="btn btn-primary text-uppercase font-weight-bold" style="border-radius: 20px; padding: 5px 30px !important; width: 130px;font-family: Poppins;">OK</button>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '</div>'
    ]

    return $(modalTemplate.join(''));
}

/**
 * Função auxiliar para abrir as url do select da disputa.
 */
function openUrl(url) {
    if (url.includes("arquivos:")) {

        var files = url.substring(9, url.length);
        var tipos = files.split("|||");
        var diretorios = tipos[0].split("|diretorio|");
        var nomes = tipos[1].split("|nomeFile|");
        var links = "";
        diretorios.forEach(function (url, i) {
            if (url != "") {
                var nameFile = nomes[i];
                links = links + '<div class="mt-2 d-flex"><img src="./img/arquivos.svg" height="30" class="mr-2"><p class="poppins"><a href="' + url + '" download="">' + nameFile + '</a></p></div>' + "\n";
            }

        });

        var modal = $();
        modal = modal.add(createModalDonwload(links));
        $('#modal-download').empty().append(modal);
        $('#myModalDownload').modal('show');

    } else
        window.open(url, '_blank');
}

function createModalDonwload(trechoHtml) {
    modalTemplate = [
        '<div class="modal fade" id="myModalDownload" tabindex="-1" role="dialog"',
        'aria-labelledby="exampleModalCenterTitle" aria-hidden="true">',
        '<div class="modal-dialog modal-dialog-centered" role="document">',
        '<div class="modal-content">',
        '<div class="modal-body p-4">',
        '<p class="font-weight-bold text-center text-uppercase montserrat mb-4" style="font-size: 24px;">Arquivos</p>',
        '<div class="d-flex flex-column">',
        trechoHtml,
        '</div>',
        '<div class="d-flex justify-content-end mt-4">',
        '<button data-dismiss="modal" class="btn btn-primary text-uppercase font-weight-bold" style="border-radius: 20px; padding: 5px 30px !important; width: 130px;font-family: Poppins;">OK</button>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '</div>'
    ]
    return $(modalTemplate.join(''));
}