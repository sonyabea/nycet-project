import React from 'react';
import { Item, Container, Header, List, Message} from 'semantic-ui-react';
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
            <Item.Header>Methodology</Item.Header>
            <Item.Meta><h4>Competitiveness Score</h4></Item.Meta>
            <Item.Description style={{textAlign: 'left'}}>
              <p>A simple competitive score was developed to indicate the closeness of a given set of races. The races of interest (President, Governor, US Senator, US Congressman, State Senator, State Assembly Member) were defined in collaboration with the NYCET.</p><br/>
              <p>All parties were assigned a political leaning (Left, Right, or Other) also in collaboration with the NYCET, and the margin of victory calculated (gap between 1st and 2nd place). This was determined at two levels:</p>
              <List.List>
                <List.Item><strong>- Race level</strong> - across an entire race (Congressional, Senate, or Assembly Districts)</List.Item>
                <List.Item><strong>- Electoral District (ED) level</strong> - for a particular ED for each race it participated in</List.Item>
              </List.List>
            <br/> 
            <p>In addition to the margin of victory, additional electoral information was also determined at both levels:</p>
              <List.List>
                <List.Item><strong>-</strong> Winning candidate</List.Item>
                <List.Item><strong>-</strong> Winning party</List.Item>
                <List.Item><strong>-</strong> Down ballot drop off (with President and Governor being the top of the ticket)</List.Item>
              </List.List>
            </Item.Description>
            <Item.Meta style={{paddingTop: "2%"}}><h4>Demographics</h4></Item.Meta>
            <Item.Description style={{textAlign: 'left'}}>
              <p><strong>Geoid Mapping (ACS, Census Data)</strong> - Using the Geo IDs provided by NYCET, electoral districts were mapped at the tract (ACS citizenship data), block group (ACS non-citizenship data), and block level (Census). To determine the mapping between EDs and ACS/Census information, a distributed proportional aggregate approach was used. In other words, if an ED overlapped across multiple Geo IDs at the tract or block group level, the ACS/census aggregates proportionally.
              </p><br/>
              <p><strong>Voter Turnout</strong> - Using voter file data, sourced since 2012, the following demographics were identified for every voter in the file. These include sex, political party, race, age, and whether a voter was under 35 years old. The data was then grouped on the Electoral District level, and turnout percentages for each demographic were calculated. Finally, turnout was calculated by merging in the voter file by ED and dividing the total voters of a district by the total population of the district.</p>
          </Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header>About us</Item.Header>
            <Item.Meta><h4>NYCET</h4></Item.Meta>
            <Item.Description style={{textAlign: 'left'}}><p>The New York Civic Engagement Table (NYCET) is a collaborative effort of 501(c)(3) organizations across New York State that does non-partisan voter registration and get-out-the-vote work.</p>
              <Message style={{textAlign: 'center'}}>
                <p>“We’re a strategic driver of social change and a laboratory for innovative collaborative work.  We support a diverse group of socially responsible organizations committed to creating a better, more just, and democratic world through year-round civic engagement.”</p>
              </Message>
            </Item.Description>
            <Item.Meta style={{paddingTop: "2%"}}><h4>CKM Advisors</h4></Item.Meta>
            <Item.Description>
              <p>CKM Advisors is a New York-based data science firm focused on providing technology solutions to clients globally. Its mission is to help clients leverage their data to mitigate risks, improve productivity, increase revenue, and reduce costs.</p>

            </Item.Description>
            <Item.Meta style={{paddingTop: "2%"}}><h4>CKM Advisors Pro Bono Committee</h4></Item.Meta>
            <Item.Description>
              <p>The goal of CKM Advisors’ Pro Bono Committee is to support social justice organizations by providing CKM’s technical skills and expertise.</p>
               
              <p>Active CKM team members for the project: Leonardo Araneta, Diane Cai, Lorena De La Parra Landa, Carolina Gonzalez, Christian Holmes, Liz Kalina, Inayat Khosla, Maanit Mehra, and Angela Orthmeyer.</p>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Container>
  </div>
  )
        

