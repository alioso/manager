import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import EditRDNS from '~/linodes/linode/networking/components/EditRDNS';

import { changeInput, expectDispatchOrStoreErrors, expectRequest } from '~/test.helpers';
import { testLinode } from '~/data/linodes';


describe('linodes/linode/networking/components/EditRDNS', () => {
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });

  const dispatch = sandbox.stub();
  const ip = Object.values(testLinode._ips).filter(
    ip => ip.type === 'public' && ip.version === 'ipv4')[0];

  it.skip('renders fields correctly', () => {
    const page = mount(
      <EditRDNS
        dispatch={dispatch}
        close={() => { }}
        ip={ip}
      />
    );

    const address = page.find('#address');
    expect(address.props().value).toBe(ip.address);

    const hostname = page.find('#hostname');
    expect(hostname.props().value).toBe(ip.rdns);
  });

  it.skip('submits data onsubmit and closes modal', async () => {
    const page = mount(
      <EditRDNS
        dispatch={dispatch}
        close={dispatch}
        ip={ip}
      />
    );

    changeInput(page, 'hostname', 'test.com');

    await page.find('Form').props().onSubmit({ preventDefault() { } });

    expect(dispatch.callCount).toBe(1);
    await expectDispatchOrStoreErrors(dispatch.firstCall.args[0], [
      ([fn]) => expectRequest(fn, `/linode/instances/${testLinode.id}/ips/${ip.address}`, {
        method: 'PUT',
        body: { rdns: 'test.com' },
      }, { rdns: '' }),
    ]);
  });
});
