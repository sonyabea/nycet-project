const React = require('react');

const TopTen = (props) => {
  let filteredDists = props.mapData.entries().filter((a) => (a.value !== 0));
  let sortedDists = filteredDists.sort((a, b) => (
    Math.abs(a.value) - Math.abs(b.value)))
  
  let topTen = sortedDists.slice(0,10)
  topTen.forEach((dist) => (dist.party = (dist.value > 0) ? 'Democrat' : 'Republican'))
  let liDists = topTen.map((dist, i) => (
    <li key={`top-ten-${i}`}>{`District ${dist.key}: ${Math.abs(dist.value)} Winning party: ${dist.party}`}</li>))

  return (
    <div>
      <ul>
        {liDists}
      </ul>
    </div>
  )
}

export default TopTen;
