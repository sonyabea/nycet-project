import React from 'react';
import { Item, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default () => (
  <div className='App'>
    <Container>
      <Header dividing style={{padding: 20}}>
        <h1>
          <Link to={{pathname: '/'}}>New York City Competitiveness</Link> - About
        </h1> 
      </Header>
      <Item.Group style={{paddingTop: "5%"}} relaxed>
        <Item style={{paddingBottom: "2%"}}>
          <Item.Content>
            <Item.Header>Methodology</Item.Header>
            <Item.Meta>About this index</Item.Meta>
            <Item.Description style={{textAlign: 'left'}}>The NYCET competitiveness index approximates voting patterns at the ED level across different political races. Using BOE election data, it calculates the narrowness of the margin of a region's most recent political race.
              <br /><br />
            Additionally, it unites census data, ACS data, and VAN data for an informed view of election districts.
            </Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header>About us</Item.Header>
            <Item.Meta>CKM</Item.Meta>
            <Item.Meta>NYCET</Item.Meta>
            <Item.Description />
          </Item.Content>
        </Item>
      </Item.Group>
    </Container>
  </div>
  )
        

