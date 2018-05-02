import React from 'react';

const TurnoutLine = ({label, line, color,
                      labelTranslate, dashed}) => (
    <g>
      <path 
        className='turnout-line'
        d={line}
        style={{stroke: color}}
        strokeDasharray={(dashed) ? [5, 5] : ''}
      />
      <text
        transform={`translate(${labelTranslate[0]}, ${labelTranslate[1]})`}
        x={3}
        dy="0.35em"
        style={{font: '10px sans-serif',
                fill: color}}>
        { label } 
      </text>
    </g>
)

export default TurnoutLine;
