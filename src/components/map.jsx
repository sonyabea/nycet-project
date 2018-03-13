import { select } from 'd3-selection'
const d3 = require('d3');
const React = require('react');
const assemblyLoc = 'http://localhost:5555/locational/ny_state_assembly_geo.json'
const dataLoc = 'http://localhost:5555/ad_closeness.tsv'
 
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
          d.ad, d.closeness_prop)})
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
    
    const projection = d3.geoAlbers()
      .scale(1)
      .translate([0,0])

    var path = d3.geoPath()
      .projection(projection)
    
    // Compute the bounds of a feature of interest, then derive scale & translate.
    var b = path.bounds(assembly),
        s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
        t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

    // Update the projection to use computed scale & translate.
    projection
        .scale(s)
        .translate(t);

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
        .attr('fill', function(d) {return color(closeness.get(d.properties.ID));})
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
