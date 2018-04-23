import React from 'react'
import { Header, Button, Modal, Image } from 'semantic-ui-react'

const CACEContainer = () =>
  <Modal trigger={<Button basic>how is CACE calculated?</Button>}>
  <Modal.Content scrolling>
    <Modal.Description>
      <Header>Complier Adjusted Causal Effect (CACE)</Header>
      <p>We chose the Complier Adjusted Causal Effect (CACE) as our main measure of NYCET’s voter engagement campaigns. In the context of an election experiment, the CACE is the difference between the voting rate of the treatment group (V<sub>t</sub>) and the voting rate of the control group (V<sub>c</sub>), divided by the contact rate of the treatment group (C<sub>r</sub>): CACE = (V<sub>t</sub> - V<sub>c</sub>)/C<sub>r</sub>.</p>
      <p>For example, let’s say an organization called Brooklyn Voter Action (BVA) runs a GOTV election experiment on a 2000-person group, split equally into a 1000-person treatment group and a 1000-person control group. If the treatment group had a 52% voting rate (V<sub>t</sub>), the control group had a 50% voting rate (V<sub>c</sub>), and BVA managed to contact 25% of the treatment group with its GOTV campaign (C<sub>r</sub>), then CACE = (V<sub>t</sub> - V<sub>c</sub>) / C<sub>r</sub> = (52% - 50%) / 25% = 8%.</p>
      <p>This 8% CACE indicates that each person contacted by BVA’s GOTV campaign was 8% more likely to vote in the election. This CACE also implies that the treatment group’s voting rate would have been 58% (the control group’s 50% voting rate plus 8%) if BVA had been able to contact everyone in the treatment group.</p>
    </Modal.Description>
  </Modal.Content>
  </Modal>

export default CACEContainer
