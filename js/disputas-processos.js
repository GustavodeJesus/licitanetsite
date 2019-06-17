let campoTexto = document.getElementById('campo-texto');
let campoData = document.getElementById('campo-data');
let campoTextoDisputa = document.getElementById('campo-texto-disputa');
let campoDataDisputa = document.getElementById('campo-data-disputa');
var dataInicial;
var dataFinal;
var totalPagesPublicados = 1;
var totalPagesAguardandoHomologacao = 1;
var totalPagesRevogados = 1;
var totalPagesHomologados = 1;
var totalPagesDisputa = 1;
var totalPagesAguardandoHomologacaoDisputa = 1;
var totalPagesRevogadosDisputa = 1;
var totalPagesHomologadosDisputa = 1;
var listProcessos = [];
var listDisputas = [];

$(function () {
    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
});

$(function () {
    $('#tooltip-datas').mouseleave(function () {
        $('[data-toggle="tooltip"]').tooltip('hide');
    });
});
campoTexto.style.display = 'none';
campoTextoDisputa.style.display = 'none';

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

function trocaCampoBuscaDisputa(value) {
    if (value == 4 || value == 5) {
        campoTextoDisputa.style.display = 'none';
        campoDataDisputa.style.display = 'block';
    }
    else {
        campoTextoDisputa.style.display = 'block';
        campoDataDisputa.style.display = 'none';
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
    $('#dataInicioDisputa').val(todayf);
    getPublicados();
})

/**
 * Carregamento entre as Tabs
 */

$("a[href='#pills-processos']").on('shown.bs.tab', function (e) {
    getPublicados();
});

$("a[href='#publicados']").on('shown.bs.tab', function (e) {
    getPublicados();
});

$("a[href='#homologacao']").on('shown.bs.tab', function (e) {
    getAguardandoHomologacao();
});

$("a[href='#revogados']").on('shown.bs.tab', function (e) {
    getRevogados();
});

$("a[href='#homologados']").on('shown.bs.tab', function (e) {
    getHomologados();
});

/**
 * Função para Busca mediante filtro passado.
 */

$('#buttonBusca').click(function () {

    if ($('#publicados').is(":visible")) {
        getPublicados();
    }

    if ($('#homologacao').is(":visible")) {
        getAguardandoHomologacao();
    }

    if ($('#revogados').is(":visible")) {
        getRevogados();
    }

    if ($('#homologados').is(":visible")) {
        getHomologados();
    }
})

/**
 * Função responsável por trazer os Processos Publicados mediante busca e paginação.
 */
function getPublicados() {
    $('#paginacao1').hide();
    if ($('.pagination').data("twbs-pagination")) {
        $('.pagination').twbsPagination('destroy');
    }

    $('#paginacao1').twbsPagination({
        totalPages: 35,
        visiblePages: 3,
        prev: '<img src="./img/Caminho 1054.svg" height="15">',
        nextClass: 'no-border',
        prevClass: 'no-border',
        next: '<img src="./img/Caminho 1053.svg" height="15">',
        last: '<img src="./img/Group First - 1.svg" height="15">',
        lastClass: 'no-border',
        first: '<img src="./img/Group First.svg" height="15">',
        firstClass: 'no-border',
        paginationClass: 'pagination mt-5 justify-content-center',
        changeTotalPages: function (totalPages) {
            this.options.totalPages = totalPages;
            var pages = this.getPages(currentPage);
            $('#page-content').text('Page ' + pages);
        },
        onPageClick: function (event, page) {
            $('#page-content').text('Page ' + page);
            postProcessosPublicados(getParams(page));
            // $("html, body").animate({
            //     scrollTop: $("#busca-box").offset().top
            // }, 200);
        },

    });

    setTimeout(function () {
        $('#paginacao1').twbsPagination("changeTotalPages", totalPagesPublicados, 1);
    }, 800);
}

/**
 * Função responsável por trazer os Processos Aguardando Homologação mediante busca e paginação.
 */
function getAguardandoHomologacao() {
    $('#paginacao2').hide();
    if ($('.pagination').data("twbs-pagination")) {
        $('.pagination').twbsPagination('destroy');
    }

    $('#paginacao2').twbsPagination({
        totalPages: 35,
        visiblePages: 5,
        prev: '<img src="./img/Caminho 1054.svg" height="15">',
        nextClass: 'no-border',
        prevClass: 'no-border',
        next: '<img src="./img/Caminho 1053.svg" height="15">',
        last: '<img src="./img/Group First - 1.svg" height="15">',
        lastClass: 'no-border',
        first: '<img src="./img/Group First.svg" height="15">',
        firstClass: 'no-border',
        paginationClass: 'pagination mt-5 justify-content-center',
        changeTotalPages: function (totalPages) {
            this.options.totalPages = totalPages;
            var pages = this.getPages(currentPage);
            $('#page-content').text('Page ' + pages);
        },
        onPageClick: function (event, page) {
            $('#page-content').text('Page ' + page);
            postProcessosAguardandoHomologacao(getParams(page));
            // $("html, body").animate({
            //     scrollTop: $("#busca-box").offset().top
            // }, 200);
        },

    });

    setTimeout(function () {
        $('#paginacao2').twbsPagination("changeTotalPages", totalPagesAguardandoHomologacao, 1);
    }, 800);
}

/**
 * Função responsável por trazer os Processos Revogados mediante busca e paginação.
 */
function getRevogados() {
    $('#paginacao3').hide();
    if ($('.pagination').data("twbs-pagination")) {
        $('.pagination').twbsPagination('destroy');
    }


    $('#paginacao3').twbsPagination({
        totalPages: 35,
        visiblePages: 5,
        prev: '<img src="./img/Caminho 1054.svg" height="15">',
        nextClass: 'no-border',
        prevClass: 'no-border',
        next: '<img src="./img/Caminho 1053.svg" height="15">',
        last: '<img src="./img/Group First - 1.svg" height="15">',
        lastClass: 'no-border',
        first: '<img src="./img/Group First.svg" height="15">',
        firstClass: 'no-border',
        paginationClass: 'pagination mt-5 justify-content-center',
        changeTotalPages: function (totalPages) {
            this.options.totalPages = totalPages;
            var pages = this.getPages(currentPage);
            $('#page-content').text('Page ' + pages);
        },
        onPageClick: function (event, page) {
            $('#page-content').text('Page ' + page);
            postProcessosRevogados(getParams(page));
            // $("html, body").animate({
            //     scrollTop: $("#busca-box").offset().top
            // }, 200);
        },

    });

    setTimeout(function () {
        $('#paginacao3').twbsPagination("changeTotalPages", totalPagesRevogados, 1);
    }, 800);
}

/**
 * Função responsável por trazer os Processos Homologados mediante busca e paginação.
 */
function getHomologados() {
    $('#paginacao4').hide();
    if ($('.pagination').data("twbs-pagination")) {
        $('.pagination').twbsPagination('destroy');
    }


    $('#paginacao4').twbsPagination({
        totalPages: 35,
        visiblePages: 5,
        prev: '<img src="./img/Caminho 1054.svg" height="15">',
        nextClass: 'no-border',
        prevClass: 'no-border',
        next: '<img src="./img/Caminho 1053.svg" height="15">',
        last: '<img src="./img/Group First - 1.svg" height="15">',
        lastClass: 'no-border',
        first: '<img src="./img/Group First.svg" height="15">',
        firstClass: 'no-border',
        paginationClass: 'pagination mt-5 justify-content-center',
        changeTotalPages: function (totalPages) {
            this.options.totalPages = totalPages;
            var pages = this.getPages(currentPage);
            $('#page-content').text('Page ' + pages);
        },
        onPageClick: function (event, page) {
            $('#page-content').text('Page ' + page);
            postProcessosHomologados(getParams(page));
            // $("html, body").animate({
            //     scrollTop: $("#busca-box").offset().top
            // }, 200);
        },

    });

    setTimeout(function () {
        $('#paginacao4').twbsPagination("changeTotalPages", totalPagesHomologados, 1);
    }, 800);
}



/**
 * Função para trazer processos que aguardam homologação vindos da API.
 */

function postProcessosAguardandoHomologacao(params) {
    $.ajax({
        url: 'https://licitanet.com.br/licitanet_api_site/processos/aguardando-homologacao',
        type: 'POST',
        data: jQuery.param(params),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {


            totalPagesAguardandoHomologacao = response.paginacao.ultima == 0 ? 1 : response.paginacao.ultima;

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
                response.data.forEach(function (item, i) {
                    listProcessos[i] = item;
                    processos = processos.add(createProcessoTemplate(item));
                });
                $('#processo-aguardando-homologacao').empty().append(processos);
                $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });

                $('.readMore').click(function () {
                    var index = $('.readMore').index(this);
                    var modal = $();

                    modal = modal.add(createModal(listProcessos[index]));
                    $('#modal-avisos').empty().append(modal);
                    $('#myModal').modal('show');
                    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });

                });
            }
        },
        error: function () {
        }
    });
}

/**
 * Função para trazer processos Publicados vindos da API.
 */

function postProcessosPublicados(params) {
    $.ajax({
        url: 'https://licitanet.com.br/licitanet_api_site/processos/publicados',
        type: 'POST',
        data: jQuery.param(params),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {

            totalPagesPublicados = response.paginacao.ultima == 0 ? 1 : response.paginacao.ultima;
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

                response.data.forEach(function (item, i) {
                    listProcessos[i] = item;
                    processos = processos.add(createProcessoTemplate(item));
                });

                $('#processo-publicado').empty().append(processos);
                $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });

                $('.readMore').click(function () {
                    var index = $('.readMore').index(this);
                    var modal = $();

                    modal = modal.add(createModal(listProcessos[index]));
                    $('#modal-avisos').empty().append(modal);
                    $('#myModal').modal('show');
                    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });

                });
            }
        },
        error: function (e) {
        }
    });
}


/**
 * Função de Carregamento de Processos Revogados vindos da API.
 */

function postProcessosRevogados(params) {

    $.ajax({
        url: 'https://licitanet.com.br/licitanet_api_site/processos/desertos-revogados',
        type: 'POST',
        data: jQuery.param(params),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {

            totalPagesRevogados = response.paginacao.ultima == 0 ? 1 : response.paginacao.ultima;
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
                response.data.forEach(function (item, i) {
                    listProcessos[i] = item;
                    processos = processos.add(createProcessoTemplate(item));
                });

                $('#processo-revogado').empty().append(processos);
                $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });


                $('.readMore').click(function () {
                    var index = $('.readMore').index(this);
                    var modal = $();

                    modal = modal.add(createModal(listProcessos[index]));
                    $('#modal-avisos').empty().append(modal);
                    $('#myModal').modal('show');
                    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });

                });
            }
        },
        error: function () {
        }
    });
}

/**
 * Função de Carregamento de Processos Homologados vindos da API.
 */

function postProcessosHomologados(params) {
    $.ajax({
        url: 'https://licitanet.com.br/licitanet_api_site/processos/homologados',
        type: 'POST',
        data: jQuery.param(params),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {

            totalPagesHomologados = response.paginacao.ultima == 0 ? 1 : response.paginacao.ultima;
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
                response.data.forEach(function (item, i) {
                    listProcessos[i] = item;
                    processos = processos.add(createProcessoTemplate(item));
                });

                $('#processo-homologados').empty().append(processos);
                $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });


                $('.readMore').click(function () {
                    var index = $('.readMore').index(this);
                    var modal = $();

                    modal = modal.add(createModal(listProcessos[index]));
                    $('#modal-avisos').empty().append(modal);
                    $('#myModal').modal('show');
                    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });

                });
            }
        },
        error: function () {
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
        '<option value="', processo.arquivos, '">Arquivos</option>',
        '<option value="', processo.url_classificacao, '">Classificação</option>',
        '<option value="', processo.url_proposta_inicial, '">Proposta inicial</option>',
        '<option value="">Ata</option>',
        '<option value="', processo.url_vencedores, '">Vencedor</option>',
        '</select>',
        '</div>',
        '</div>',
        '</div>']

    return $(processoTemplate.join(''));
}

/**
 * Função para obter parametros de buscas do filtro
 */
function getParams(pagina) {

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
        '<button data-dismiss="modal" class="btn btn-primary text-uppercase font-weight-bold" style="border-radius: 20px; padding: 5px 30px !important; width: 130px;font-family: Qanelas;">OK</button>',
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
    console.log(url);

    if (url[0] == "/" || url[0] == ".") {

        var urls = url.split(",");
        var links = "";
        urls.forEach(function(url){
            links = links + '<p><a href="' + url +'" target="_self">Click to Download</a></p>' + "\n";
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
        '<div class="modal-dialog modal-dialog-centered modal-lg" role="document">',
        '<div class="modal-content">',
        '<div class="modal-body p-4">',
        '<div class="my-3 p-4">',
        '<div class="row">',
        '<div class="<div class="col-md-3" data-toggle="tooltip" data-placement="top" id="tooltip-datas" data-html="true">',
        '<div class="d-flex flex-column justify-content-center align-items-center">',
        '<img src = "./img/União 1.svg" width = "55" height="55" class="ml-2">',
        trechoHtml,
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '<div class="d-flex justify-content-end">',
        '<button data-dismiss="modal" class="btn btn-primary text-uppercase font-weight-bold" style="border-radius: 20px; padding: 5px 30px !important; width: 130px;font-family: Qanelas;">OK</button>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '</div>'
    ]
    return $(modalTemplate.join(''));
}
// DISPUTAS
/**************************************************************************************** */

/**
 * Carregamento entre as Tabs da disputa
 */
$("a[href='#pills-disputas']").on('shown.bs.tab', function (e) {
    getDisputas();
});

$("a[href='#emDisputa']").on('shown.bs.tab', function (e) {
    getDisputas();
});

$("a[href='#homologacaoDisputa']").on('shown.bs.tab', function (e) {
    getAguardandoHomologacaoDisputa();
});

$("a[href='#revogadosDisputa']").on('shown.bs.tab', function (e) {
    getRevogadosDisputa();
});

$("a[href='#homologadosDisputa']").on('shown.bs.tab', function (e) {
    getHomologadosDisputa();
});

$('#buttonBuscaDisputa').click(function () {

    if ($('#emDisputa').is(":visible")) {
        getDisputas();
    }

    if ($('#homologacaoDisputa').is(":visible")) {
        getAguardandoHomologacaoDisputa();
    }

    if ($('#revogadosDisputa').is(":visible")) {
        getRevogadosDisputa();
    }

    if ($('#homologadosDisputa').is(":visible")) {
        getHomologadosDisputa();
    }
})

function createDisputaTemplate(disputa) {
    disputaTemplate = [
        '<div class="my-3 p-4 box">',
        '<div class="row">',
        '<div class="col-md-2 text-center border-right-2" data-toggle="tooltip" id="tooltip-datas" data-html="true" data-placement="top"',
        'title="', "<p>Fim Recebimento: " + disputa.disputa + "</p>"
        + "<p>Início Análise Proposta: " + disputa.fim_recprop + "</p>"
        + "<p>Fim Análise Proposta: " + disputa.ini_aberprop + "</p>"
        + "<p>Início da Disputa: " + disputa.fim_aberprop, '</p>">',
        '<img src="./img/União 1.svg" width="55">',
        '<p>Início da Disputa</p>',
        '<p>', disputa.data_publicacao.substring(0, 10), '</p>',
        '<p>', disputa.data_publicacao.substring(11, 16), '</p>',
        '</div>',
        '<div class="col-md-1">',
        '<p>Pregão</p>',
        '<p>', disputa.numero, '</p>',
        '</div>',
        '<div class="col-md-2">',
        '<p>Orgão público</p>',
        '<p>', disputa.orgao, '</p>',
        '</div>',
        '<div class="col-md-3">',
        '<p>Descrição</p>',
        '<p>', capitalize(disputa.descricao.substring(0, 92)), '</p>',
        '<div class="d-flex justify-content-end">',
        '<button class="btn btn-link readMoreDisputa">Ver mais</button>',
        '</div>',
        '</div>',
        '<div class="col-md-2 text-center">',
        '<p>Qtd. Lotes</p>',
        '<p>', disputa.qtdlote, '</p>',
        '</div>',
        '<div class="col-md-2">',
        '<p class="text-center">Disputa</p>',
        '<div class="text-center mt-1">',
        '<img class="imgUrlDisputa" src="./img/Componente 1 – 1.svg" width="60">',
        '</div>',
        '</div>',
        '</div>',
        '</div>'
    ]

    // $('[data-toggle="tooltip"]').tooltip({
    //     trigger: 'hover'
    // });

    return $(disputaTemplate.join(''));
}

function getDisputas() {
    $('#paginacao5').hide();
    if ($('.pagination').data("twbs-pagination")) {
        $('.pagination').twbsPagination('destroy');
    }


    $('#paginacao5').twbsPagination({
        totalPages: 35,
        visiblePages: 5,
        prev: '<img src="./img/Caminho 1054.svg" height="15">',
        nextClass: 'no-border',
        prevClass: 'no-border',
        next: '<img src="./img/Caminho 1053.svg" height="15">',
        last: '<img src="./img/Group First - 1.svg" height="15">',
        lastClass: 'no-border',
        first: '<img src="./img/Group First.svg" height="15">',
        firstClass: 'no-border',
        paginationClass: 'pagination mt-5 justify-content-center',
        changeTotalPages: function (totalPages) {
            this.options.totalPages = totalPages;
            var pages = this.getPages(currentPage);
            $('#page-content').text('Page ' + pages);
        },
        onPageClick: function (event, page) {
            $('#page-content').text('Page ' + page);
            postEmDisputa(getParamsDisputa(page));
            // $("html, body").animate({
            //     scrollTop: $("#busca-box-disputa").offset().top
            // }, 200);
        },

    });

    setTimeout(function () {
        $('#paginacao5').twbsPagination("changeTotalPages", totalPagesDisputa, 1);
    }, 800);
}

function getParamsDisputa(pagina) {

    let dataInicial = $('#dataInicioDisputa').val().split('-').reverse().join('/');
    let dataFinal = $('#dataFimDisputa').val().split('-').reverse().join('/');
    let searchInput = $('.searchInputDisputa').val();
    window.localStorage.setItem('dataInicial', dataInicial);
    window.localStorage.setItem('dataFim', dataFinal);
    var token = window.localStorage.getItem('access_token');

    p_data_pub_periodo = {
        data_ini: dataInicial,
        data_fim: dataFinal
    }

    switch ($("#tipoBuscaDisputa").val()) {
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

function postEmDisputa(params) {
    $.ajax({
        url: 'https://licitanet.com.br/licitanet_api_site/processos/em-disputa',
        type: 'POST',
        data: jQuery.param(params),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {

            totalPagesDisputa = response.paginacao.ultima == 0 ? 1 : response.paginacao.ultima;
            listDisputas = [];
            if (response.data.length == 0) {
                $('#layout-vazio-disputa').show();
                $('#em-disputa').empty();
            } else {
                $('#layout-aguardando-homologacao-disputa').show();
                $('#aguardando-homologacao-disputa').empty();
                $('#layout-vazio-revogado-disputa').show();
                $('#processo-revogado-disputa').empty();
                $('#layout-vazio-homologado-disputa').show();
                $('#processo-homologados-disputa').empty();

                $('#layout-vazio-disputa').hide();
                $('#paginacao5').show();
                var processos = $();

                response.data.forEach(function (item, i) {
                    listDisputas[i] = item;
                    processos = processos.add(createDisputaTemplate(item));
                });
                $('#em-disputa').empty().append(processos);
                $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
                $('.imgUrlDisputa').click(function () {
                    var index = $('.imgUrlDisputa').index(this);
                    window.open(listDisputas[index].url_sala_disputa, '_blank');
                });

                $('.readMoreDisputa').click(function () {
                    var index = $('.readMoreDisputa').index(this);
                    var modal = $();

                    modal = modal.add(createModalDisputa(listDisputas[index]));
                    $('#modal-avisos-disputa').empty().append(modal);
                    $('#myModalDisputa').modal('show');
                    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });

                });
            }
        },
        error: function (e) {
        }
    });
}


/**
 * Função para criar o modal de informação da disputa.
 */

function createModalDisputa(processo) {
    modalTemplate = [
        '<div class="modal fade" id="myModalDisputa" tabindex="-1" role="dialog"',
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
        '<button data-dismiss="modal" class="btn btn-primary text-uppercase font-weight-bold" style="border-radius: 20px; padding: 5px 30px !important; width: 130px;font-family: Qanelas;">OK</button>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '</div>'
    ]

    return $(modalTemplate.join(''));
}

/**
 * Função responsável por trazer os Processos Aguardando Homologação mediante busca e paginação.
 */
function getAguardandoHomologacaoDisputa() {
    $('#paginacao6').hide();
    if ($('.pagination').data("twbs-pagination")) {
        $('.pagination').twbsPagination('destroy');
    }

    $('#paginacao6').twbsPagination({
        totalPages: 35,
        visiblePages: 5,
        prev: '<img src="./img/Caminho 1054.svg" height="15">',
        nextClass: 'no-border',
        prevClass: 'no-border',
        next: '<img src="./img/Caminho 1053.svg" height="15">',
        last: '<img src="./img/Group First - 1.svg" height="15">',
        lastClass: 'no-border',
        first: '<img src="./img/Group First.svg" height="15">',
        firstClass: 'no-border',
        paginationClass: 'pagination mt-5 justify-content-center',
        changeTotalPages: function (totalPages) {
            this.options.totalPages = totalPages;
            var pages = this.getPages(currentPage);
            $('#page-content').text('Page ' + pages);
        },
        onPageClick: function (event, page) {
            $('#page-content').text('Page ' + page);
            postProcessosAguardandoHomologacaoDisputa(getParamsDisputa(page));
            $("html, body").animate({
                scrollTop: $("#busca-box-disputa").offset().top
            }, 200);
        },

    });

    setTimeout(function () {
        $('#paginacao6').twbsPagination("changeTotalPages", totalPagesAguardandoHomologacaoDisputa, 1);
    }, 800);
}

/**
 * Função para trazer processos que aguardam homologação vindos da API.
 */

function postProcessosAguardandoHomologacaoDisputa(params) {
    $.ajax({
        url: 'https://licitanet.com.br/licitanet_api_site/processos/aguardando-homologacao',
        type: 'POST',
        data: jQuery.param(params),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {


            totalPagesAguardandoHomologacaoDisputa = response.paginacao.ultima == 0 ? 1 : response.paginacao.ultima;

            listDisputas = [];
            if (response.data.length == 0) {
                $('#layout-aguardando-homologacao-disputa').show();
                $('#aguardando-homologacao-disputa').empty();
            } else {
                $('#layout-vazio-disputa').show();
                $('#em-disputa').empty();
                $('#layout-vazio-revogado-disputa').show();
                $('#processo-revogado-disputa').empty();
                $('#layout-vazio-homologado-disputa').show();
                $('#processo-homologados-disputa').empty();

                $('#layout-aguardando-homologacao-disputa').hide();
                $('#paginacao6').show();
                var processos = $();
                response.data.forEach(function (item, i) {
                    listDisputas[i] = item;
                    processos = processos.add(createDisputaTemplate(item));
                });

                $('#aguardando-homologacao-disputa').empty().append(processos);
                $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
                $('.readMoreDisputa').click(function () {
                    var index = $('.readMoreDisputa').index(this);
                    var modal = $();
                    modal = modal.add(createModalDisputa(listDisputas[index]));
                    $('#modal-avisos-disputa').empty().append(modal);
                    $('#myModalDisputa').modal('show');
                    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });

                });
            }
        },
        error: function () {
        }
    });
}


/**
 * Função de Carregamento de Processos Revogados vindos da API.
 */

function postProcessosRevogadosDisputa(params) {

    $.ajax({
        url: 'https://licitanet.com.br/licitanet_api_site/processos/desertos-revogados',
        type: 'POST',
        data: jQuery.param(params),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {

            totalPagesRevogadosDisputa = response.paginacao.ultima == 0 ? 1 : response.paginacao.ultima;
            listDisputas = [];
            if (response.data.length == 0) {
                $('#layout-vazio-revogado-disputa').show();
                $('#processo-revogado-disputa').empty();
            } else {
                $('#layout-vazio-disputa').show();
                $('#em-disputa').empty();
                $('#layout-aguardando-homologacao-disputa').show();
                $('#aguardando-homologacao-disputa').empty();
                $('#layout-vazio-homologado-disputa').show();
                $('#processo-homologados-disputa').empty();

                $('#layout-vazio-revogado-disputa').hide();
                $('#paginacao7').show();
                var processos = $();
                response.data.forEach(function (item, i) {
                    listDisputas[i] = item;
                    processos = processos.add(createDisputaTemplate(item));
                });
                $('#processo-revogado-disputa').empty().append(processos);
                $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
                $('.readMoreDisputa').click(function () {
                    var index = $('.readMoreDisputa').index(this);
                    var modal = $();
                    modal = modal.add(createModalDisputa(listDisputas[index]));
                    $('#modal-avisos-disputa').empty().append(modal);
                    $('#myModalDisputa').modal('show');
                    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });

                });
            }
        },
        error: function () {
        }
    });
}

/**
 * Função responsável por trazer os Processos Revogados mediante busca e paginação.
 */
function getRevogadosDisputa() {
    $('#paginacao7').hide();
    if ($('.pagination').data("twbs-pagination")) {
        $('.pagination').twbsPagination('destroy');
    }


    $('#paginacao7').twbsPagination({
        totalPages: 35,
        visiblePages: 5,
        prev: '<img src="./img/Caminho 1054.svg" height="15">',
        nextClass: 'no-border',
        prevClass: 'no-border',
        next: '<img src="./img/Caminho 1053.svg" height="15">',
        last: '<img src="./img/Group First - 1.svg" height="15">',
        lastClass: 'no-border',
        first: '<img src="./img/Group First.svg" height="15">',
        firstClass: 'no-border',
        paginationClass: 'pagination mt-5 justify-content-center',
        changeTotalPages: function (totalPages) {
            this.options.totalPages = totalPages;
            var pages = this.getPages(currentPage);
            $('#page-content').text('Page ' + pages);
        },
        onPageClick: function (event, page) {
            $('#page-content').text('Page ' + page);
            postProcessosRevogadosDisputa(getParamsDisputa(page));
            $("html, body").animate({
                scrollTop: $("#busca-box-disputa").offset().top
            }, 200);
        },

    });

    setTimeout(function () {
        $('#paginacao7').twbsPagination("changeTotalPages", totalPagesRevogadosDisputa, 1);
    }, 800);
}

/**
 * Função de Carregamento de Processos Homologados vindos da API.
 */

function postProcessosHomologadosDisputa(params) {
    $.ajax({
        url: 'https://licitanet.com.br/licitanet_api_site/processos/homologados',
        type: 'POST',
        data: jQuery.param(params),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {

            totalPagesHomologadosDisputa = response.paginacao.ultima == 0 ? 1 : response.paginacao.ultima;
            listDisputas = [];
            if (response.data.length == 0) {
                $('#layout-vazio-homologado-disputa').show();
                $('#processo-homologados-disputa').empty();
            } else {
                $('#layout-vazio-disputa').show();
                $('#em-disputa').empty();
                $('#layout-aguardando-homologacao-disputa').show();
                $('#aguardando-homologacao-disputa').empty();
                $('#layout-vazio-revogado-disputa').show();
                $('#processo-revogado-disputa').empty();
                $('#layout-vazio-homologado-disputa').hide();
                $('#paginacao8').show();
                var processos = $();
                response.data.forEach(function (item, i) {
                    listDisputas[i] = item;
                    processos = processos.add(createDisputaTemplate(item));
                });

                $('#processo-homologados-disputa').empty().append(processos);
                $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });

                $('.readMoreDisputa').click(function () {
                    var index = $('.readMoreDisputa').index(this);
                    var modal = $();
                    modal = modal.add(createModalDisputa(listDisputas[index]));
                    $('#modal-avisos-disputa').empty().append(modal);
                    $('#myModalDisputa').modal('show');
                    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });

                });
            }
        },
        error: function () {
        }
    });
}

/**
 * Função responsável por trazer os Processos Homologados mediante busca e paginação.
 */
function getHomologadosDisputa() {
    $('#paginacao8').hide();
    if ($('.pagination').data("twbs-pagination")) {
        $('.pagination').twbsPagination('destroy');
    }


    $('#paginacao8').twbsPagination({
        totalPages: 35,
        visiblePages: 5,
        prev: '<img src="./img/Caminho 1054.svg" height="15">',
        nextClass: 'no-border',
        prevClass: 'no-border',
        next: '<img src="./img/Caminho 1053.svg" height="15">',
        last: '<img src="./img/Group First - 1.svg" height="15">',
        lastClass: 'no-border',
        first: '<img src="./img/Group First.svg" height="15">',
        firstClass: 'no-border',
        paginationClass: 'pagination mt-5 justify-content-center',
        changeTotalPages: function (totalPages) {
            this.options.totalPages = totalPages;
            var pages = this.getPages(currentPage);
            $('#page-content').text('Page ' + pages);
        },
        onPageClick: function (event, page) {
            $('#page-content').text('Page ' + page);
            postProcessosHomologadosDisputa(getParamsDisputa(page));
            // $("html, body").animate({
            //     scrollTop: $("#busca-box-disputa").offset().top
            // }, 200);
        },

    });

    setTimeout(function () {
        $('#paginacao8').twbsPagination("changeTotalPages", totalPagesHomologadosDisputa, 1);
    }, 800);
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

