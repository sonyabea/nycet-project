import React from 'react';
import { Item, Container, Header, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default () => (
  <div className='App'>
    <Container>
      <Header dividing style={{padding: 20}}>
        <h1>
          <Link to={{pathname: '/'}}>New York City Competitiveness</Link> - About
        </h1> 
      </Header>
      <Item.Group style={{paddingTop: "2%"}} relaxed>
        <Item style={{paddingBottom: "2%"}}>
          <Item.Content>
            <Item.Description style={{textAlign: 'left'}}>
              <p>This application is designed to help organizations deploy resources more effectively against key objectives, be it flipping a race, building a presence, or mobilizing communities. Historical margins of victory, demographic data (ACS/Census), and voter file aggregations are overlaid on to Election Districts (EDs), making it easy for organizers to allocate resources for voter registration or get-out-the-vote initiatives. Detailed methodology can be found <a href='https://s3.amazonaws.com/nycet-docs/Competitive+Districts+Analysis+-+Methodology.pdf'>here</a>.</p>
          </Item.Description>
        </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header>New York Civic Engagement Table</Item.Header>
            <Item.Description style={{textAlign: 'left'}}><p>The New York Civic Engagement Table (NYCET) is a collaborative effort of 501(c)(3) organizations across New York State that does non-partisan voter registration and get-out-the-vote work.</p>
              <br />
              <Divider section />
              <br /> 
              <p style={{fontSize: 12, textAlign: 'center'}}>Developed by Leonardo Araneta, Diane Cai, Lorena De La Parra Landa, Carolina Gonzalez, Christian Holmes, Liz Kalina, Inayat Khosla, Maanit Mehra, and Angela Orthmeyer as part of the CKM Pro Bono Committee.</p>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Container>
  </div>
  )
