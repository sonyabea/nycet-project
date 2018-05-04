import React from 'react'
import { Container, Header } from 'semantic-ui-react'

const About = () =>(
  <Container textAlign='left' style={{'padding': '2.5%'}}>
    <Header as='h3'>Project Goal</Header>
    <p>Our goal is to measure the impact of get-out-the-vote (GOTV) experiments run by New York Civic Engagement Table community groups, as well as to provide NYCET with insight that helps structure future voter engagement campaigns.</p>
    <Header as='h3'>Background</Header>
    <Header as='h5'>What is the NYCET?</Header>
    <p>The New York Civic Engagement Table is a collaborative effort of 501(c)(3) organizations across New York State that do non-partisan voter registration and GOTV work. They are a driver of social change and a laboratory for innovative collaborative work supporting a diverse group of more than 30 socially responsible organizations committed to creating a better, more just, and democratic world through year-round civic engagement.</p>
    <Header as='h5'>How does NYCET run experiments?</Header>
    <p>NYCET has run a series of experiments in order to investigate the efficacy of GOTV campaigns run by NYCET-member organizations. Each of these experiments is run by an NYCET-member organization who chooses a population group, randomly splits this population group into treatment and control groups, and conducts voter outreach to the treatment group while limiting outreach to the control group. After the election, the efficacy of the GOTV campaign is calculated using the difference in voting rates in the treatment and control groups.</p>
    <Header as='h5'>Why are election experiments important?</Header>
    <p>Experiments help to determine the overall effectiveness of a GOTV campaign and give insight into ways that a particular organization’s GOTV campaign can be improved in the future.</p>
  </Container>
)

export default About
