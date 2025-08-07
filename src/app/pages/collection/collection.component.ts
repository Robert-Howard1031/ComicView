import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  comics = [
    {
      id: 1,
      title: 'Amazing Spider-Man #300',
      purchasePrice: 200,
      currentValue: 400,
      priceHistory: [200, 240, 280, 310, 340, 370, 400]
    },
    {
      id: 2,
      title: 'Batman #1',
      purchasePrice: 500,
      currentValue: 450,
      priceHistory: [500, 490, 480, 470, 460, 455, 450]
    }
  ];

  chartData: ChartDataset<'line'>[] = [];
  chartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  chartOptions: ChartOptions<'line'> = {};

  averagePercentChange: number = 0;
  isUp: boolean = true;

  constructor() {}

  ngOnInit(): void {
    const totalPrices = this.calculateTotalPriceHistory();
    this.setChart(totalPrices);
  }

  calculateTotalPriceHistory(): number[] {
    const numPoints = this.comics[0].priceHistory.length;
    const totalPrices: number[] = [];

    for (let i = 0; i < numPoints; i++) {
      const sumAtPoint = this.comics.reduce((sum, comic) => sum + comic.priceHistory[i], 0);
      totalPrices.push(sumAtPoint);
    }

    return totalPrices;
  }

  setChart(prices: number[]) {
    const start = prices[0];
    const end = prices[prices.length - 1];
    this.averagePercentChange = Math.round(((end - start) / start) * 100);
    this.isUp = end >= start;

    const color = this.isUp ? 'green' : 'red';
    const minY = Math.floor(Math.min(...prices) * 0.95);
    const maxY = Math.ceil(Math.max(...prices) * 1.05);

    this.chartData = [
      {
        data: prices,
        label: 'Total Collection Value',
        fill: false,
        borderColor: color,
        pointBackgroundColor: color,
        tension: 0
      }
    ];

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: minY,
          max: maxY,
          ticks: {
            callback: function (value) {
              return '$' + value;
            },
            stepSize: Math.ceil((maxY - minY) / 5)
          }
        }
      },
      elements: {
        point: {
          radius: 5
        },
        line: {
          borderWidth: 3
        }
      }
    };
  }
}
