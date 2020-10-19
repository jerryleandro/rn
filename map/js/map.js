// Prepare random data
var data = [
    ['Mato Grande', 728],
    ['Alto Oeste', 7],
    ['Litoral Sul', 963],
    ['Potengi', 541],
    ['Terras Potiguaras', 622],
    ['Açu Mossoro', 866],
    ['Certão Do Apodi', 398],
    ['Trairi', 785],
    ['Sertão Central', 223],
    ['Serido', 605],
    ['DE.NW', 237],
    ['DE.BW', 157],
    ['DE.HE', 134],
    ['DE.NI', 136],
    ['DE.TH', 704],
    ['DE.', 361]
  ];
  
    Highcharts.getJSON('https://raw.githubusercontent.com/jerryleandro/rn/8df2819314062a2b81b7dbdd24b8cea72c889c65/geo_rn_tr.json', function (geojson) {
      
  
    // Initiate the chart
    Highcharts.mapChart('container', {
      chart: {
        map: geojson,
          borderWidth: 1
      },
  
      title: {
        text: 'Mapa RN'
      },
  
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },
  
      colorAxis: {
        tickPixelInterval: 100
      },
  
      series: [{
        data: data,
        keys: ['name', 'id'],
        joinBy: 'name',
        name: 'TerritoriosAL',
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
  });
