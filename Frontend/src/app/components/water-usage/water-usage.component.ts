import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

// import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-water-usage',
  templateUrl: './water-usage.component.html',
  styleUrls: ['./water-usage.component.css']
})
export class WaterUsageComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'B' },
    { data: [18, 80, 70, 90, 100, 17, 5], label: 'C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['Dec 2018', 'Jan 2019', 'Feb 2019', 'Mar 2019', 'Apr 2019', 'May 2019'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
//  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor() { }

  ngOnInit() {
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public hideAllDaily() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
    const isHidden2 = this.chart.isDatasetHidden(2);
    this.chart.hideDataset(2, !isHidden2);
    const isHiddden0 = this.chart.isDatasetHidden(0);
    this.chart.hideDataset(0, !isHiddden0);

    this.lineChartLabels = ['5/6/2019', '5/7/2019', '5/8/2019', '5/9/2019', '5/10/2019', '5/11/2019'];
    this.lineChartData = [];

    //   this.lineChartData = { data: [65, 59, 80, 81, 56, 55, 40], label: 'A' },
  //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'B' },
  //     { data: [18, 80, 70, 90, 100, 17, 5], label: 'C', yAxisID: 'y-axis-1' }
  // ];


  }

  public hideAllMonthly() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
    const isHidden2 = this.chart.isDatasetHidden(2);
    this.chart.hideDataset(2, !isHidden2);
    const isHiddden0 = this.chart.isDatasetHidden(0);
    this.chart.hideDataset(0, !isHiddden0);

    this.lineChartLabels = ['Dec 2018', 'Jan 2019', 'Feb 2019', 'Mar 2019', 'Apr 2019', 'May 2019'];
    this.lineChartData = [];
  }

  public hideAllSeasonally() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
    const isHidden2 = this.chart.isDatasetHidden(2);
    this.chart.hideDataset(2, !isHidden2);
    const isHiddden0 = this.chart.isDatasetHidden(0);
    this.chart.hideDataset(0, !isHiddden0);

    this.lineChartLabels = ['Spring 2018 ', 'Summer 2018', 'Fall 2018', 'Winter 2018', 'Spring 2019', 'Summer 2019'];
    this.lineChartData = [];
  }

  public hideAllAnnually() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
    const isHidden2 = this.chart.isDatasetHidden(2);
    this.chart.hideDataset(2, !isHidden2);
    const isHiddden0 = this.chart.isDatasetHidden(0);
    this.chart.hideDataset(0, !isHiddden0);

    this.lineChartLabels = ['2014', '2015', '2016', '2017', '2018', '2019'];
    this.lineChartData = [];
  }

  public pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }
}

