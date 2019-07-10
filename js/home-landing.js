/**
 * Variáveis globais utilizadas no decorrer do formulário.
 */
var cardTemplate;
var avisosDescricoes = [];

/**
 * Função para Retornar o Token e chamar as noticias
 */
$.getJSON("https://api-site.licitanet.com.br/token/gerar", function (json) {
    var tokenReceived = json;
    window.localStorage.setItem('access_token', json);

    /**
 * Função responsável por trazer a listagem do notícias.
 */

    $.getJSON({
        url: 'https://api-site.licitanet.com.br/noticias/buscar-ativas',
        type: 'GET',
        data: jQuery.param({
            token: tokenReceived
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            

            var cards = $();
            response.data.forEach(function (item, i) {
                cards = cards.add(createCard(item));
                avisosDescricoes[i] = item;
            })
            $('#showAvisos').append(cards);

            $('.readMore').click(function () {
                var index = $('.readMore').index(this);
                var modal = $();
                
                var titulo = avisosDescricoes[index].titulo;
                var noticia = avisosDescricoes[index].noticia;
                modal = modal.add(createModal(titulo, noticia));
                $('#modal-avisos').empty().append(modal);
                $('#myModal').modal('show');
            });

        },
        error: function () {
            
        }
    });
});

/**
 * Função para criação dinamica dos cards de avisos. 
 */

function createCard(cardData) {
    cardTemplate = ['<div class="col-lg-6 mb-4">',
        '<div class="avisoBox p-4">',
        '<div class="row">',
        '<div class="col-2 text-center">',
        '<img src="./img/Grupo 16.svg" height="45"></div>',
        '<div class="col-10">',
        '<p class="avisoTitulo">', cardData.titulo || 'Aviso Importante', '</p>',
        '<p class="avisoDescricao">', cardData.noticia.substring(0, 219) + "..." || '', '</p>',
        '<div class="text-right"><button class="btn btn-primary readMore">Ler mais</button></div>',
        '</div>',
        '</div>',
        '</div>',
        '</div>']

    return $(cardTemplate.join(''));
}

function createModal(titulo, texto) {
    modalTemplate = [
        '<div class="modal fade" id="myModal" tabindex="-1" role="dialog"',
        'aria-labelledby="exampleModalCenterTitle" aria-hidden="true">',
        '<div class="modal-dialog modal-dialog-centered modal-lg" role="document">',
        '<div class="modal-content">',
        '<div class="modal-body p-4">',
        '<div class="row">',
        '<div class="col-2 text-center">',
        '<img src="./img/Grupo 16.svg" height="45"></div>',
        '<div class="col-10">',
        '<p class="avisoTitulo">', titulo || 'Aviso Importante', '</p>',
        '<p class="avisoDescricao">', texto || '', '</p>',
        '<div class="text-right"><button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button></div>',
        '</div>',
        '</div>',
        '</div>',
        '</div >'
    ]

    return $(modalTemplate.join(''));
}

$('.planosButton1').click(function (){
    window.location = './adesao-fornecedor.html?p=1';
});

$('.planosButton2').click(function (){
    window.location = './adesao-fornecedor.html?p=2';
});

$('.planosButton3').click(function (){
    window.location = './adesao-fornecedor.html?p=3';
});

$('.planosButton4').click(function (){
    window.location = './adesao-fornecedor.html?p=4';
});

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
