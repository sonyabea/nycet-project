import { select } from 'd3-selection'
const d3 = require('d3');
const React = require('react');
const assemblyLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/nyad_geo.json'
const dataLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/ad_margins.tsv'
 
export default class MainMap extends React.Component {
  constructor(props){
    super(props)
    this.drawChart = this.drawChart.bind(this)
    this.state = {assembly: null,
                  closeness: null}
  }
  componentWillMount(){
  }

  componentDidMount() {
    //eventually, move this to a higher level component
    //map and closeness should be props
    d3.queue()
      .defer(d3.json, assemblyLoc) 
      .defer(d3.tsv, dataLoc) 
      .await((error, assemblyFile, closeFile) => {
        console.log(closeFile)
        closeFile.forEach((d) => {
          d.margin = ((d.winning_party === 'Republican') ? -d.margin : +d.margin)})
        const closeness = d3.map()
        closeFile.forEach((d) => {closeness.set(
          d.districtnumber, d.margin)})
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
    //defs and setup
    const node = this.node
    const width = node.width.baseVal.value
    const height = node.height.baseVal.value
    const assembly = this.state.assembly
    const closeness = this.state.closeness

    //element attr defs
    const projection =d3.geoIdentity()
            .reflectY(true)
            .fitSize([width,height],assembly)

    var path = d3.geoPath()
      .projection(projection)

    var extent = d3.extent(closeness.values())

    var color = d3.scaleLinear()
              .domain([extent[0], 0, extent[1]])
              .range(['red', 'white', 'blue'])

    //append ad map layer
    var g = select(node)
              .append("g");
    var mapLayer = g.append('g')
      .classed('map-layer', true)

      //draw
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
     
}
