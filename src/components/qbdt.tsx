import * as React from 'react';
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Environment } from '../chromeServices/environmentHandler';
import { useEnvironment } from '../hooks/useEnvironment';

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

function reloadIframe() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (!tabs[0].id) {
      return;
    }
    chrome.tabs.sendMessage(tabs[0].id, {actionId: "qbo_reload"})
  });
}

function switchEnv(env: Environment) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (!tabs[0].id) {
      return;
    }
    chrome.tabs.sendMessage(tabs[0].id, {actionId: "switch_environment", env })
  });
}

export default function QBDT() {
  const [organizationId, setOrganizationId] = React.useState('4620816365200440940');
  const environment = useEnvironment();

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

      <Button onClick={reloadIframe}>Reload iframe</Button>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={environment}
          label="Age"
          onChange={event => {
            switchEnv(event.target.value as Environment)
          }}
        >
          <MenuItem value={'Alpha'}>Alpha</MenuItem>
          <MenuItem value={'Local'}>Local</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
