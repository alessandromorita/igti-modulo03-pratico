import React from 'react';
import ReadOnlyInput from './components/ReadOnlyInput';
import ReadOnlyInputPercent from './components/ReadOnlyInputPercent';
import { calculateSalaryFrom } from './helpers/salary';
import Bar from './components/Bar';
import { formatNumber } from './helpers/formatHelpers';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      number: ' ',
      calculations: {
        percentINSS: 0,
        percentIRPF: 0,
        percentSalary: 0,
        baseINSS: 0,
        discountINSS: 0,
        baseIRPF: 0,
        discountIRPF: 0,
        netSalary: 0,
        INSSPercent: 0,
      },
      bar1: 0,
      bar2: 0,
      bar3: 0,
    };
  }

  componentDidUpdate(_, previousState) {
    const { number: oldNumber } = previousState;
    const { number: newNumber } = this.state;

    if (oldNumber !== newNumber) {
      const calculations = calculateSalaryFrom(this.state.number);
      const { percentINSS, percentIRPF, percentSalary } = calculations;
      const bar1 = percentINSS;
      const bar2 = percentIRPF;
      const bar3 = percentSalary;

      this.setState({
        calculations,
        bar1,
        bar2,
        bar3,
      });
    }
  }

  handleInputChange = (event) => {
    if (event.target.value) {
      const newNumber = Number(event.target.value);
      this.setState({ number: newNumber });
    }
  };

  render() {
    const { number, calculations } = this.state;
    const {
      percentINSS,
      percentIRPF,
      percentSalary,
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculations;
    let { bar1, bar2, bar3 } = this.state;

    return (
      <div className="container">
        <h1>React Salário</h1>
        <div className="containerInput">
          <label className="salarioBruto">
            <span>Salário bruto: </span>
            <input
              type="number"
              value={number}
              onChange={this.handleInputChange}
            />
          </label>

          <br />
          <div className="descontosDiv">
            <ReadOnlyInput
              description="Base INSS: "
              value={formatNumber(baseINSS)}
            />

            <ReadOnlyInputPercent
              description="Desconto INSS: "
              value={discountINSS}
              percent={percentINSS}
              color="#e67e22"
            />

            <ReadOnlyInput
              description="Base IRPF: "
              value={formatNumber(baseIRPF)}
            />
            <ReadOnlyInputPercent
              description="Desconto IRPF: "
              value={discountIRPF}
              percent={percentIRPF}
              color="#c0392b"
            />
          </div>
          <br />
          <ReadOnlyInputPercent
            description="Salário líquido: "
            value={netSalary}
            percent={percentSalary}
            color="#16a085"
          />
        </div>
        <br />
        <div className="divBar">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0px 100px',
            }}
          >
            <Bar value={bar1} color="#e67e22" />
            <Bar value={bar2} color="#c0392b" />
            <Bar value={bar3} color="#16a085" />
          </div>
        </div>
      </div>
    );
  }
}
