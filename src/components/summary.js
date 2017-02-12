import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchData} from '../actions/test'
import Chart from './chart';

class Summary extends Component {

  constructor(props) {
    super(props)

    this.state={
      count: 36 //static value here
    }
  }

  componentWillMount() {
    //pulling in sample data
    this.props.fetchData();
    // My attempt to have initialState not just set to a static number, but to the default switch "Eligible"
    // However due to asynch nature of JS, my console log of this.props.data returns an empty array.
    // It seems that fetchData() has not completed by the time I attempt to use this.props.data directly below.
    
    // let initCount = 0;
    // console.log(this.props.data);
    // this.props.data.map((element, index)=>{
    //   if(element.eligible.flag === 'y'){
    //     initCount++
    //   }
    // })

    // this.setState({
    //   count: initCount
    // })
  }

  buildChart() {
    // 1) update this static view to pull from the live data source
    // console.log(this.props.data); //Checking to make sure fetchData has returned with data before this function is called. Success!
    let payer = 0;
    let visit = 0;
    let drug = 0;

    this.props.data.map((element, index)=>{
      // console.log(element); // using for visual on what element returned so that I can target below
      if(element.eligible.flag === "n"){ //Sorting by flags of "n" first because the chart only exists because of reasons for ineligibility.
        // console.log(element); //identify what 'element' returns so that I know what to target
        if(element.eligible.reason === 'payer'){
          payer++;
        }
        else if(element.eligible.reason === 'visit'){
          visit++;
        }
        else{
          drug++;
        }
      }
    })
    return {
            chart: {
              type: 'column'
            },
            title: {
              text: 'Ineligible Reason Codes'
            },
            yAxis: {
              visible: false
            },
            xAxis: {
              categories: ['payer', 'visit', 'drug']
            },
            legend: {
              enabled: false
            },
            credits: {enabled: false},
            series: [{
                name: 'count',
                data: [payer, visit, drug], //replaced static data with variables generated from .map()
                lineWidth: 5,
                dataLabels: {enabled: true}
            }
          ]
        }
  }


  handleChange(e) {
    let counter = 0;
    // 2) select switch should update component state.count based on data source (eligible flag)
    console.log(e.target.value)  //Thank you for providing this!
      if(e.target.value === 'Eligible'){
        // console.log(this.props.data) //Testing to see if data logs on value change
        this.props.data.map((element, index)=>{
          // console.log(element.eligible.flag); //Narrowing in on flag property
          if(element.eligible.flag === "y"){
            counter++ //Increment counter outside of state change, then set count: to counter variable. This will reset every time handleChange() is run.
            this.setState({
              count: counter,
            })
          }
        })
      }
      else{
        this.props.data.map((element, index)=>{
          if(element.eligible.flag === "n"){
            counter++
            this.setState({
              count: counter,
            })
          }
        })
      }
    }


  render() {
    if(!this.props.data[0]) {return <div>Loading...</div>}

    //sample data
    // console.log(this.props.data)

    return (
      <div className="card mt-1">
        <div className="card-block">
          <h3 className="card-title">Hospital Patients</h3>
          <hr/>
          <div className="row">
            <div className="col-md-4">
              <select className="form-control" onChange={this.handleChange.bind(this)}>
                <option>Eligible</option>
                <option>Inelgible</option>
              </select>
              <p className="pt-2">{`Count: ${this.state.count}`}</p>
            </div>
            <div className="col-md-8">
              <Chart key="test" options={this.buildChart()} />
            </div>
          </div>
	      </div>
	    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.test.all
})

export default connect(mapStateToProps, {fetchData})(Summary);
