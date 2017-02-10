import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchData} from '../actions/test'
import Chart from './chart';

class Summary extends Component {

  constructor(props) {
    super(props)

    this.state={count: 10}
  }

  componentWillMount() {
    //pulling in sample data
    this.props.fetchData();
  }

  buildChart() {
    // 1) update this static view to pull from the live data source
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
                data: [33, 40, 38],
                lineWidth: 5,
                dataLabels: {enabled: true}
            }
          ]
        }
  }


  handleChange(e) {
    // 2) select switch should update component state.count based on data source (eligible flag)
    console.log(e.target.value)
  }


  render() {
    if(!this.props.data[0]) {return <div>Loading...</div>}

    //sample data
    console.log(this.props.data)

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
