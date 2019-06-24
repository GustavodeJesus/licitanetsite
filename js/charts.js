var meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
var labelsNames = [];
var labelsValorOrcado = [];
var labelsSomaLances = [];

$.getJSON("https://licitanet.com.br/licitanet_api_site/web/token/gerar", function (json) {
    var tokenReceived = json;

    $.ajax({
        url: 'https://licitanet.com.br/licitanet_api_site/web/relatorios/economia',
        type: 'GET',
        data: jQuery.param({
            token: tokenReceived
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
            var ctx = document.getElementById('myChart').getContext('2d');

            response.data.forEach(function (item, i) {
                    labelsNames[i] = meses[Number(item.mes) - 1];
                    labelsValorOrcado.push(Number(item.valor_orcado));
                    labelsSomaLances.push(Number(item.soma_lances));
            })

           var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labelsNames,
                    datasets: [
                        {
                            label: 'Coluna 1',
                            backgroundColor: 'rgba(254, 197, 43, 0.85)',
                            borderColor: 'rgba(254, 197, 43, 0.85)',
                            borderWidth: 1,
                            data: labelsValorOrcado
                        },
                        {
                            label: 'Coluna 2',
                            backgroundColor: 'rgba(249, 249, 249, 0.85)',
                            borderColor: 'rgba(249, 249, 249, 0.85)',
                            borderWidth: 1,
                            data: labelsSomaLances
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                fontColor: 'white'
                            },
                            gridLines: {
                                display: true,
                                color: "#E2E2E2",
                                drawBorder: false
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: 'white'
                            },
                            gridLines: {
                                display: false,
                                color: "#FFFFFF"
                            }
                        }],
                    },
                    legend: {
                        labels: {
                            fontColor: 'white'
                        }
                    }
                }
            });

        },
        error: function () {
        }
    });

});



