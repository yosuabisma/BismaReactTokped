import React from 'react';
import ReactDOM from 'react-dom';
class InputNominal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      invalid:false,
      left:0,
      results:false,
      fractions : [
        {nominal:100000, amount:0},
        {nominal:50000, amount:0},
        {nominal:20000, amount:0},
        {nominal:10000, amount:0},
        {nominal:5000, amount:0},
        {nominal:1000, amount:0},
        {nominal:500, amount:0},
        {nominal:100, amount:0},
        {nominal:50, amount:0}
      ]
    };
    this.mySubmitHandler=this.mySubmitHandler.bind(this);
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    var nominalInput = parseInt(this.state.message);
    var tempFraction = 0;
    var tempAmount = 0;
    for(var i=0; i<this.state.fractions.length;i++){
      tempAmount = parseInt(nominalInput/this.state.fractions[i].nominal);
      if(tempAmount >= 1){
        this.state.fractions[i].amount= tempAmount;
        tempFraction = this.state.fractions[i].nominal*tempAmount;
        nominalInput = nominalInput - tempFraction;
      }else{
        this.state.fractions[i].amount= 0;
      }
    }
    if(nominalInput>0){
      this.state.left=nominalInput;
    }
    this.state.results=true;
    this.setState({
    });
  }

  myChangeHandler = (event) => {
    this.setState({
      message: event.target.value,
    });
  }

  renderTableData() {
        return this.state.fractions.map((fraction, index) => {
           const { nominal, amount } = fraction //destructuring
           return (
              <tr key={nominal}>
                 <td>{nominal}</td>
                 <td>{amount}</td>
              </tr>
           )
        })
   }

  render() {
      return (
        <div>
        <form onSubmit={this.mySubmitHandler}>
          <h1>Fraction Rupiah System</h1>
          <input
            type='text'
            onChange={this.myChangeHandler}
            placeholder="Ketikkan nominal uang..."
          />
          <input
            type='submit'
          />
        </form>
        <table>
          <tbody>
          {this.renderTableData()}
          </tbody>
        </table>
        <h5>Left: {this.state.left} (No available fraction)</h5>
        </div>
      );

  }
}

export default InputNominal;
