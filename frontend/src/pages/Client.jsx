import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { is } from '../utils/toolbox';
import ClientHistoryEntry from '../containers/ClientHistoryEntry.jsx';
import SectionTitle from '../containers/SectionTitle.jsx';
import WidgetCard from '../containers/WidgetCard.jsx';
import Button from '../containers/Button.jsx';
import DragToSend from '../containers/DragToSend.jsx';

const Client = (props) => {
  const [validEntry, setVE] = useState(1);
  const [nickname, setNickname] = useState("");
  const [fileList, setFilelist] = useState([]);

  useEffect(() => {
    // redirect them if theu didn't enter through the dashboard.
    // i.e if they don't have a state or if they don't have a
    // mode property in the state.
    const location = props.location;
    
    if (!location.hasOwnProperty('state') || !location.state || !location.state.nickname) {
      setVE(0);
    } else {
      setNickname(location.state.nickname);
    }
  }, [true]);

  const disconnect = () => {
    console.log(props.location.state.ip);
    props.store.client.send(`DELETE ${nickname}`);
    props.store.client.close();
    setVE(0);
  }

  const changeIm = (evt) => {
    const tc = {
      start() {},
      async transform(chunk, controller) {
        chunk = await chunk;
        console.log(chunk);
        const z = { filename, chunk };
        controller.enqueue(Buffer.from(JSON.stringify(z)));
      },
      flush() {}
    }

    // const file = evt.target.files[0];
    const files = evt.target.files;

    Array.from(fileList).forEach((file) => {
      const reader = file.stream().getReader();

      reader.read().then(function rec({ done, value }) {
        const json_to_encode = { nickname, filename: file.name, chunk: value }; 
        const encoded_buffer = Buffer.from(JSON.stringify(json_to_encode));
  
        props.store.client.send(encoded_buffer);
  
        if (done) {
          props.store.client.send(`DONE ${nickname} ${file.name}`);
          return;
        }
  
        return reader.read().then(rec);
      });
    })
  }

  return (
    validEntry === 1
      ?
        <div className="mx-auto text-primaryDark">
          <div style={{ height: 'calc(100vh - 8.5rem)' }} className="flex">
            {/* left */}
            <div className="overflow-scroll relative p-10 pl-20 w-full">
              <SectionTitle title={`hi ${nickname}, here's your history...`} />
              <div className="py-12">
                <ClientHistoryEntry text="received 'fssd.mkv' from the server" />
                <ClientHistoryEntry text="received appointment.mkv" />
              </div>
              <input type="file" multiple
                id="avatar" name="avatar" onChange={(evt) => setFilelist(Array.from(evt.target.files))}/>
              <button onClick={changeIm}> senddd </button>
            </div>

            {/* right */}
            <div
              style={{ height: 'calc(100vh - 8.5rem)' }}
              className="flex flex-col relative
              border-l border-secondary"
            >
              <div className="p-10">
                <DragToSend />

                <div className="flex flex-col py-10">
                  <hr className="w-1/3 mx-auto"/>
                    <div className="text-lg text-center py-8">
                      address: http://{props.location.state.ip}
                    </div>
                  <hr className="w-1/3 mx-auto"/>
                </div>

                <WidgetCard title="connected to" />
                <Button
                  extras="mb-5 py-5 px-8 text-lg"
                  btnClick={disconnect}
                >
                  disconnect!
                </Button>
              </div>
            </div>
          </div>
        </div>
      :
        <Redirect to="/"/>
  );
}

const mapStateToProps = ({ client }) => {
  return { store: { client } };
}

const mapDispatchToProps = (dispatch) => {
  return {
    plsClient: (client) => {
      dispatch(setClient(client));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Client));
