import React from 'react'
import { Container, Header, Message } from 'semantic-ui-react'

const Methodology = () =>(
  <div>
    <div>
      <Container textAlign='left'>
        <Header as='h3'>Complier Adjusted Causal Effect (CACE)</Header>
        <p>We chose the Complier Adjusted Causal Effect (CACE) as our main measure of NYCET’s voter engagement campaigns. In the context of an election experiment, the CACE is the difference between the voting rate of the treatment group (V<sub>t</sub>) and the voting rate of the control group (V<sub>c</sub>), divided by the contact rate of the treatment group (C<sub>r</sub>): CACE = (V<sub>t</sub> - V<sub>c</sub>)/C<sub>r</sub>.</p>
        <p>For example, let’s say an organization called Brooklyn Voter Action (BVA) runs a GOTV election experiment on a 2000-person group, split equally into a 1000-person treatment group and a 1000-person control group. If the treatment group had a 52% voting rate (V<sub>t</sub>), the control group had a 50% voting rate (V<sub>c</sub>), and BVA managed to contact 25% of the treatment group with its GOTV campaign (C<sub>r</sub>), then CACE = (V<sub>t</sub> - V<sub>c</sub>) / C<sub>r</sub> = (52% - 50%) / 25% = 8%.</p>
        <p>This 8% CACE indicates that each person contacted by BVA’s GOTV campaign was 8% more likely to vote in the election. This CACE also implies that the treatment group’s voting rate would have been 58% (the control group’s 50% voting rate plus 8%) if BVA had been able to contact everyone in the treatment group.</p>
        <Header as='h3'>Confidence Interval Through Bootstrapping</Header>
        <p>Although we can measure the CACE for each experiment, these CACE values don’t necessarily reflect the CACE of the population as a whole. We utilize the bootstrapping method in order to calculate the likely CACE for a population, whereby we simulate a new experiment by taking random samples from the experimental population, calculating the CACE for that set, and then repeating the procedure in order to create a distribution of possible CACE scores.</p>
        <p>For example, to bootstrap the CACE for the above BVA example (with a 1000-person treatment group and a 1000-person control group), we would take 1000 random samples from the treatment group, 1000 random samples from the control group, calculated the CACE for those new groups, and repeat the process 1000 times in order to create a distribution of 1000 CACE values (one for each simulated experiment). From here, the middle 95% of these 1000 values represent the 95% confidence interval, or the range of values that we are 95% confident contains the population’s CACE.</p>
      </Container>
    </div>
    <div>
      <Message style={{fontSize: 12, float:'left', marginTop: '2%', marginLeft: '13%', textAlign: 'left'}}>
        <Message.Header textAlign='left'>Sources</Message.Header>
        <Message.List>
          <Message.Item>Green, Donald P., and Alan S. Gerber. Get out the Vote: How to Increase Voter Turnout. Brookings Institution Press, 2015</Message.Item>
          <Message.Item>Gerber, Alan S., and Donald P. Green. Field Experiments: Design, Analysis, and Interpretation. WW Norton & Company, 2012</Message.Item>
          <Message.Item><a href='https://onlinecourses.science.psu.edu/stat509/'>Statistics 509: Design and Analysis of Clinical Trials</a> (a course at Pennsylvania State University)</Message.Item>
        </Message.List>
      </Message>
    </div>
  </div>
)

export default Methodology
