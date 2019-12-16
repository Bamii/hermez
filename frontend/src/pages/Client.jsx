import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { is } from '../utils/toolbox';
import ClientHistoryEntry from '../containers/ClientHistoryEntry.jsx';
import SectionTitle from '../containers/SectionTitle.jsx';
import WidgetCard from '../containers/WidgetCard.jsx';
import Button from '../containers/Button.jsx';

const Client = (props) => {
  const [validEntry, setVE] = useState(1);

  useEffect(() => {
    // redirect them if theu didn't enter through the dashboard.
    // i.e if they don't have a state or if they don't have a
    // mode property in the state.
    const location = props.location;
    console.log(props.location);
    if (!location.hasOwnProperty('state') || !location.state || !location.state.nickname) {
      // setVE(0);
    }
  }, [true]);

  const disconnect = () => {
    axios.patch('/ws', { host: '' })
      .then(() => {
        // display a toast for the users for some seconds && redirect to the main page.
        // logic for redirecting the page... the page redirects if the 'validEntry' === 1.
        setVE(0);
      })
      .catch(() => {
        // display a toast for the users.
      })
  }

  const redir = () => {
    console.log('sdfaf')
  }

  return (
    validEntry === 1
      ?
        <div className="mx-auto text-primaryDark">
          <div style={{ height: 'calc(100vh - 8.5rem)' }} className="flex">
            {/* left */}
            <div className="overflow-scroll relative p-10 pl-20 w-full">
              <SectionTitle title="history" />
              <div className="py-12">
                <ClientHistoryEntry text="received 'fssd.mkv' from the server" />
                <ClientHistoryEntry text="received appointment.mkv" />
              </div>
            </div>

            {/* right */}
            <div
              style={{ height: 'calc(100vh - 8.5rem)' }}
              className="flex flex-col justify-end relative w-1/3
              border-l border-secondary max-w-20"
            >
              <div className="p-10">
                <div className="flex flex-col py-10">
                  <hr className="w-1/3 mx-auto"/>
                  <div className="text-lg text-center py-8">address: http://localhost:3000</div>
                  <hr className="w-1/3 mx-auto"/>
                </div>

                <Button
                  extras="mb-5 py-5 px-8 text-lg"
                  btnClick={redir}
                >
                  disconnect!
                </Button>
                <WidgetCard title="active connections" />
              </div>
            </div>
          </div>
        </div>
      :
        <Redirect to="/"/>
  );
}

export default withRouter(Client);
