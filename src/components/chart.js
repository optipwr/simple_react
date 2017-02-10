import React from 'react';
import { findDOMNode } from 'react-dom';
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import funnel from 'highcharts/modules/funnel';
import draggablePoints from 'highcharts-draggable-points/draggable-points'

const Chart = React.createClass({
  componentDidMount() {
    // load modules
    funnel(Highcharts);
    highchartsMore(Highcharts);
    draggablePoints(Highcharts);
    this.chart = new Highcharts['Chart'](
      findDOMNode(this),
      this.props.options
    );
  },

  componentWillUnmount: function () {
    this.chart.destroy();
  },

  render() {
    return (
      <div className="in-highchart"></div>
    )
  }
});

export default Chart;
