import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { is } from '../utils/toolbox';
import FileList from '../containers/FileList.jsx';
import SectionTitle from '../containers/SectionTitle.jsx';
import DirectoryList from '../containers/DirectoryList.jsx';
import WidgetCard from '../containers/WidgetCard.jsx';
import DragToSend from '../containers/DragToSend.jsx';
import Button from '../containers/Button.jsx';
import Signature from '../containers/Signature.jsx';

const Client = (props) => {
  const [selectedDir, selectDir] = useState(0);
  const [selectedFiles, selectFile] = useState([]);
  const [fileList, setFileList] = useState({});
  const [validEntry, setVE] = useState(1);

  const selectFiles = (file) => {
    const a = selectedFiles.findIndex(el => el === file);

    a > -1
      ? selectFile([...selectedFiles.slice(0,a), ...selectedFiles.slice(a+1)])
      : selectFile([...selectedFiles, file]);
  }

  useEffect(() => {
    // redirect them if theu didn't enter through the dashboard.
    // i.e if they don't have a state or if they don't have a
    // mode property in the state.
    const location = props.location;
    console.log(props.location);
    if (!location.hasOwnProperty('state') || !location.state || !location.state.ip) {
      setVE(0);
    }
  }, [true]);

  useEffect(() => {
    setFileList({
      "Music": ["me.mp3", "you and i.mp3", "ouuuuuuu.mp3"],
      "Movies": ["avengers.mp4", "BLACK MIRROR", {
        'mcu': ["avengers.mp4"]
      }],
      "Docs": ["ds.pdf", 'dfsf.book', 'tsdfs.pdf'],
      "MusThinfsic": ['dfads.js', 'sdfsf.jsx',],
      "Musishic": [],
    })
  }, [true])

  const disconnect = () => {
    axios.delete('/ws')
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
    console.log(selectedFiles);
    // setVE(0);
  }

  const send = () => {
    // receives a list of files to send to the client.
    // sends this list to the server && the server does justice.
    // TODO:: still don't know how to handle this.... 
    // ?? maybe reply with a response that contains successful and
    // the failed transfers.
    // ?? orrrr use an event emmitter?????????
    /* 
      {
        status: 200,
        failedTransfers: [],
        successfulTransfers: []
        message: ''
      }
    */
    axios.post('/ws-send')
      .then(() => {})
      .catch(() => {})
  }

  return (
    validEntry === 1
      ?
        <div className="mx-auto text-primaryDark">
          <div style={{ height: 'calc(100vh - 8.5rem)' }} className="flex">
            {/* left */}
            <div className="overflow-scroll relative p-10 pr-0 w-1/3 min-w-20 max-w-20">
              <SectionTitle title="files" />
              <DirectoryList
                list={fileList}
                selectedItem={selectedDir}
                onDirSelect={(e, index) => {
                  selectDir(index);
                  selectFile([]);
                }}
              />
              <Signature />
            </div>

            {/* middle */}
            <div className="overflow-scroll relative p-10 flex-grow border border-t-0 border-secondary">
              <SectionTitle title="music" />
              {/* <FileList extras="mb-10" /> */}
              <FileList
                list={Object.values(fileList)[selectedDir]}
                extras="mb-10"
                selectedItems={selectedFiles}
                onFileSelect={(e, index) => {
                  selectFiles(index)
                }}
              />
            </div>

            {/* right */}
            <div className="overflow-scroll relative w-1/3 min-w-20 max-w-20 p-10">
              <div className="flex flex-col py-10">
                <hr className="w-1/3 mx-auto"/>
                <div className="text-lg text-center py-8">address: http://localhost:3000</div>
                <hr className="w-1/3 mx-auto"/>
              </div>

              <Button
                extras="mb-5 py-5 px-8"
                btnClick={() => {}}
              >
                disconnect!
              </Button>
              <WidgetCard title="active connections" />


              <div className="py-10"></div>

              <div className="">
                <Button
                  btnClick={redir}
                  extras="mb-5 py-5 px-8"
                >
                  send files!
                </Button>
                <WidgetCard title="activities" />
              </div>
            </div>
          </div>
        </div>
      :
        <Redirect to="/"/>
  );
}

export default withRouter(Client);
