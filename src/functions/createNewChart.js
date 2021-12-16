import Chart from 'chart.js/auto';

const createNewChart = (chartId, chartData, chartLabel) => {
    const ctx = document.createElement("canvas");
    ctx.id = JSON.stringify(Math.floor(Math.random() * 200))
  
    new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            label: 'used',
            percent: 30,
            backgroundColor: ['#5283ff']
          }]
        },
        plugins: [{
            beforeInit: (chart) => {
              const dataset = chart.data.datasets[0];
              chart.data.labels = [dataset.label];
              dataset.data = [dataset.percent, 100 - dataset.percent];
            }
          },
          {
            beforeDraw: (chart) => {

                console.log(chart)

              var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
              ctx.restore();
              var fontSize = (height / 100).toFixed(2);
              ctx.font = fontSize + "em sans-serif";
              ctx.fillStyle = "#9b9b9b";
              ctx.textBaseline = "middle";
              var text = chart.data.datasets[0].percent + "%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
              ctx.fillText(text, textX, textY);
              ctx.save();
            }
          }
        ],
        options: {
          maintainAspectRatio: false,
          cutoutPercentage: 75,
          rotation: Math.PI / 2,
          legend: {
            display: false,
          },
          tooltips: {
            filter: tooltipItem => tooltipItem.index == 0
          }
        }
      });

    return ctx;
}

export default createNewChart;