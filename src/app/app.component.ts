import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mortgage-calculator';
  calculated:boolean = false
  plan = {
    amount: 100000,
    interestRate: 5,
    amyear: 25,
    amMonth: 0,
    paymentFreq: 12,
    term: 5,
  };
  cal = {
    termPayments: 0,
    amPayments: 0,
    termAmount: 0,
    amAmount: 0,
    termPrePayment: 0,
    amPrePayment: 0,
    termprinciple: 0,
    amPrinciple: 0,
    termInterest: 0,
    amInterest: 0,
    termCost: 0,
    amCost: 0,
  };
  paymentFreqOptions = [
    { label: 'Monthly', value: 12 },
    { label: 'Semi Monthly', value: 24 },
  ];
  amYearsOptions = [
    { label: '1 Year', value: 1 },
    { label: '2 Years', value: 2 },
    { label: '3 Years', value: 3 },
    { label: '4 Years', value: 4 },
    { label: '5 Years', value: 5 },
    { label: '6 Years', value: 6 },
    { label: '7 Years', value: 7 },
    { label: '8 Years', value: 8 },
    { label: '9 Years', value: 9 },
    { label: '10 Years', value: 10 },
    { label: '11 YearS', value: 11 },
    { label: '12 Years', value: 12 },
    { label: '13 Years', value: 13 },
    { label: '14 Years', value: 14 },
    { label: '15 Years', value: 15 },
    { label: '16 Years', value: 16 },
    { label: '17 Years', value: 17 },
    { label: '18 Years', value: 18 },
    { label: '19 Years', value: 19 },
    { label: '20 Years', value: 20 },
    { label: '21 YearS', value: 21 },
    { label: '22 Years', value: 22 },
    { label: '23 Years', value: 23 },
    { label: '24 Years', value: 24 },
    { label: '25 Years', value: 25 },
    { label: '26 Years', value: 26 },
    { label: '27 Years', value: 27 },
    { label: '28 Years', value: 28 },
    { label: '29 Years', value: 29 },
    { label: '30 Years', value: 30 },
  ];
  amMonthsOptions = [
    { label: '1 month', value: 1 },
    { label: '2 Months', value: 2 },
    { label: '3 Months', value: 3 },
    { label: '4 Months', value: 4 },
    { label: '5 Months', value: 5 },
    { label: '6 Months', value: 6 },
    { label: '7 Months', value: 7 },
    { label: '8 Months', value: 8 },
    { label: '9 Months', value: 9 },
    { label: '10 Months', value: 10 },
    { label: '11 YearS', value: 11 },
  ];
  termYearsOptions = [
    { label: '1 Year', value: 1 },
    { label: '2 Years', value: 2 },
    { label: '3 Years', value: 3 },
    { label: '4 Years', value: 4 },
    { label: '5 Years', value: 5 },
    { label: '6 Years', value: 6 },
    { label: '7 Years', value: 7 },
    { label: '8 Years', value: 8 },
    { label: '9 Years', value: 9 },
    { label: '10 Years', value: 10 },
  ];
  calculate() {
    let termPayments = this.plan.paymentFreq * this.plan.term;
    let amPayments = this.plan.paymentFreq * this.plan.amyear;
    let perMonthIntInc = this.calculatePayments(amPayments);
    let perMonthInt = this.plan.amount / amPayments;
    let termprinciple = perMonthInt * termPayments;
    let amPrinciple = perMonthInt * amPayments;
    let termCost = perMonthIntInc * termPayments;
    let amCost = perMonthIntInc * amPayments;
    let calculations = {
      termPayments: termPayments,
      amPayments: amPayments,
      termAmount: perMonthIntInc,
      amAmount: perMonthIntInc,
      termPrePayment: 0,
      amPrePayment: 0,
      termprinciple: termprinciple,
      amPrinciple: amPrinciple,
      termInterest: termCost - termprinciple,
      amInterest: amCost - amPrinciple,
      termCost: termCost,
      amCost: amCost,
    };
    this.cal = calculations;
    this.calculated = true;
  }

  calculatePayments(n: number) {
    //Monthly Payments = L[c(1 + c)^n]/[(1 + c)^n - 1],
    //where L stands for "loan," C stands for "per payment interest," and N is the "payment number."
    let l = this.plan.amount;
    let c = (this.plan.interestRate * 0.01) / this.plan.paymentFreq;
    let res = (l * (c * Math.pow(1 + c, n))) / (Math.pow(1 + c, n) - 1);
    return res;
  }
}
