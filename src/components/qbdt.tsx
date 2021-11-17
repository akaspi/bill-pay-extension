import * as React from 'react';
import { Button, ButtonGroup, TextField } from '@mui/material';

enum QBDTEndpoints {
  PAY='pay',
  VIEW_PAYMENT='view-payment',
  SYNC='sync'
}

function createLocalQBDTEndpoint(organizationId: string, endPoint: QBDTEndpoints) {
  return `http://localhost:3031/quickbooks-desktop/entry/${organizationId}/${endPoint}`
}

function openEndpoint(organizationId: string, endPoint: QBDTEndpoints) {
  window.open(createLocalQBDTEndpoint(organizationId, endPoint));
}

export default function QBDT() {
  const [organizationId, setOrganizationId] = React.useState('4620816365200440940');

  return (
    <>
      <h3>QBDT - Local Endpoints</h3>
      <TextField
        id="outlined-basic"
        label="Organization ID"
        variant="outlined"
        onChange={e => setOrganizationId(e.target.value)}
        value={organizationId}
        fullWidth
      />
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={() => openEndpoint(organizationId, QBDTEndpoints.PAY)}>Pay</Button>
        <Button onClick={() => openEndpoint(organizationId, QBDTEndpoints.VIEW_PAYMENT)}>View Payment</Button>
        <Button onClick={() => openEndpoint(organizationId, QBDTEndpoints.SYNC)}>Sync</Button>
      </ButtonGroup>
    </>
  );
}
