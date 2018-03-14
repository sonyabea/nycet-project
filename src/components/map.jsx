import { select } from 'd3-selection'
const d3 = require('d3');
const React = require('react');
const assemblyLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/nyad_geo.json'
const dataLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/ad_closeness.tsv'
 
export default class MainMap extends React.Component {
  constructor(props){
    super(props)
    this.drawChart = this.drawChart.bind(this)
    this.state = {assembly: null}
    // this.state = {congress: locationData}
  }
  componentWillMount(){
  }

  componentDidMount() {
    d3.queue()
      .defer(d3.json, assemblyLoc) 
      .defer(d3.tsv, dataLoc) 
      .await((error, assemblyFile, closeFile) => {
        const closeness = d3.map()
        closeFile.forEach((d) => {closeness.set(
          d.ad, d.close_prop)})
        this.setState({closeness: closeness})
        this.setState({assembly: assemblyFile})
        console.log(this.state)
        this.drawChart();
    })
  }
  
  shouldComponentUpdate() {
    return false;
  }
  
  componentWillUnmount() {
    // ReactDOM.unmountComponentAtNode(this.tooltipTarget);
  }
  
  drawChart() {
    const node = this.node
    const width = node.width.baseVal.value
    const height = node.height.baseVal.value
     
    // //defs and setup
    const assembly = this.state.assembly
    const closeness = this.state.closeness

    const projection =d3.geoIdentity()
            .reflectY(true)
            .fitSize([width,height],assembly)

    var path = d3.geoPath()
      .projection(projection)

    var color = d3.scaleLinear()
              .domain(d3.extent(closeness.values()))
              .range(['white', 'blue'])
    assembly.features.forEach(function (d){
      console.log(d.properties.ID)
      console.log(color(closeness.get(d.properties.ID)))})


    console.log(closeness.get(1))
    console.log(color(0.33))
    // //drawing
    var g = select(node)
              .append("g");
    var mapLayer = g.append('g')
      .classed('map-layer', true)

      var features = assembly.features;
      mapLayer.append('g')
        .selectAll('path')
        .data(features)
        .enter()
        .append('path')
        .attr('fill', function(d) {return color(closeness.get(d.properties.AssemDist));})
        .attr("d", path)
        .attr('class', 'ed')
  }
  
  render() {
    return (
        <svg ref={node => this.node = node } width={800} height={600}>
        </svg>
    );
  }
  
  // renderTooltip(coordinates, tooltipData) {
  //   const tooltipComponent = (
  //     <MyTooltipComponent
  //       coordinates={coordinates}
  //       data={tooltipData} />
  //   );
     
  //   ReactDOM.render(tooltipComponent, this.tooltipTarget);
  // }
}
