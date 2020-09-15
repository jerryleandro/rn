

var Gplan = Gplan || {};

Gplan.CarregarMapa = (function() {

	class CarregarMapa {
		constructor() {
			this.HaghchartsUri = 'https://raw.githubusercontent.com/jerryleandro/rn/570f5e161297826fcf90681dc5d0784bea74a4f6/geo_rn_tr.json';
			this.divMapa = $('#containerMapa');
			this.form = $('#formMapa');
            this.url = this.form.attr('action');
			this.tabela = $('#tabelaMunicipios');
			this.data = [
				[1,456],
				[2,999],
				[3, 963],
				[4, 541],
				[5, 622],
				[6, 866],
				[7, 398],
				[8, 785],
				[9, 223],
				[10, 605]

			];



		}
		iniciar() {

			Highcharts.getJSON(this.HaghchartsUri, onRenderiseMapa.bind(this));
			
		}
	}
	//função que eu to passando o objeto pra tratar e dividir ele consigo pegar dentro dela o id e os municipoios(o objeto e um territorio do rn, ai dele tem id e municipios que compoem)
	//to conseguinto separar, minha duvida e da nomeclatura pra chama ele fora da função com os dados separados 
	function onMunicipiosRecuperados(territorios){
		territorios.forEach(function(territorio) {
			this.tabela.append(territorio.id);
			this.tabela.append(territorio.municipios);
			
			//console.log(territorio.id);
			//console.log(territorio.municipios);
		}.bind(this));
		
	}
	
	
	// essa e a consulta ajax to recuperando o objeto do BD e passando por uma função pra tratar o objeto e separar ele 
	function onRenderiseMapa(geojson) {
		// Initiate the chart

		var retorno = $.ajax({
			url: this.url + 'territorios/novo/territoriosmunicipios',
			method: 'GET',
			contentType: 'application/json'
		});
		//essa e a função que eu estou passando o objeto 
		retorno.done(onMunicipiosRecuperados.bind(this));
		console.log(retorno);
		
	
		Highcharts.mapChart('containerMapa', {
			chart: {
				map: geojson
			},

			title: {
				text: 'Rio Grande do Norte'
			},
			subtitle: {
				text: 'Territórios da Cidadania'
			},

			mapNavigation: {
				enabled: true,
				buttonOptions: {
					verticalAlign: 'bottom'
				}
			},

			/*legend: {
			 title: {
			 text: 'Quantidade de Politicas por Região',
			 style: {
			 color: ( // theme
				   Highcharts.defaultOptions &&
				   Highcharts.defaultOptions.legend &&
				   Highcharts.defaultOptions.legend.title &&
				   Highcharts.defaultOptions.legend.title.style &&
				   Highcharts.defaultOptions.legend.title.style.color
							) || 'black'
						}
					},
					align: 'left',
					verticalAlign: 'bottom',
					floating: true,
					layout: 'vertical',
					valueDecimals: 0,
					backgroundColor: ( // theme
						Highcharts.defaultOptions &&
						Highcharts.defaultOptions.legend &&
						Highcharts.defaultOptions.legend.backgroundColor
					) || 'rgba(255, 255, 255, 0.85)',
					symbolRadius: 0,
					symbolHeight: 14
				},
	
				colorAxis: {
					dataClasses: [{
						to: 3
					}, {
						from: 3,
						to: 10
					}, {
						from: 10,
						to: 30
					}, {
						from: 30,
						to: 100
					}, {
						from: 100,
						to: 300
					}, {
						from: 300,
						to: 1000
					}, {
						from: 1000
					}]
				}, */

			colorAxis: {
				tickPixelInterval: 1000
			},

			series: [{
				data: this.data,
				keys: ['id', 'value'],
				joinBy: 'id',
				name: 'Territorios',
				states: {
					hover: {
						color: '#a4edba'
					}
				},
				dataLabels: {
					enabled: true,
					format: '{point.properties.postal}'
				}
			}]
		});
	}




	

	return CarregarMapa;

}());

$(function() {
	var carregarMapa = new Gplan.CarregarMapa();
	carregarMapa.iniciar();

});

