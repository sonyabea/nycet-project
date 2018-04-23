import React from 'react';
import DemoTab from './DemoTab';
import { Tab, Card } from 'semantic-ui-react'

// eventually, inherit height, width
// from parent sidebar comp
const DemoDetails = ({tabs}) => {

    let formattedPanes = tabs.map((t, i) => (
      { menuItem: t.title,
        render: () => <DemoTab 
          key={`demotab-${i}`} 
          tab={t}
          height={ 250 }
          width={ 300 }
        /> }
  ))

    return (
      <Card>
        <Tab panes={formattedPanes}/>
      </Card>
    )
}

export default DemoDetails;
