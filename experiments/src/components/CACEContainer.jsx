import React from 'react'
import { Header, Button, Modal } from 'semantic-ui-react'

const CACEContainer = () =>
  <Modal trigger={<Button basic>how is the CACE calculated?</Button>}>
    <Modal.Content image scrolling>
      <Modal.Description>
        <Header>The CACE</Header>
        <p>stuff stuff stuff stuff</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>

export default CACEContainer
