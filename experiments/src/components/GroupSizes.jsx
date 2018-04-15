import React from 'react'

const GroupSizes = ({ control_pop, treatment_pop }) => 
	<div className='flex-container'>
		<div><h3>Treatment Size: {treatment_pop}</h3></div>
		<div><h3>Control Size: {control_pop}</h3></div>
	</div>

export default GroupSizes
