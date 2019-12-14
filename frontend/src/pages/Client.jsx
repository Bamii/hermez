import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { is } from '../utils/toolbox';
import FileList from '../containers/FileList.jsx';
import SectionTitle from '../containers/SectionTitle.jsx';
import DirectoryList from '../containers/DirectoryList.jsx';
import WidgetCard from '../containers/WidgetCard.jsx';

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
    if (!location.hasOwnProperty('state') || !location.state || !location.state.mode) {
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

  return (
    validEntry === 1
      ?
        <div className="mx-auto text-primaryDark">
          <div className="flex">
            {/* left */}
            <div className="relative p-10 pr-0 w-1/2 max-w-20">
              <SectionTitle title="files" />
              <DirectoryList
                list={fileList}
                selectedItem={selectedDir}
                onDirSelect={(e, index) => {
                  selectDir(index);
                  selectFile([]);
                }}
              />
              <div className="absolute bottom-2 left-0 right-0 text-center">
                hermez v1.0
              </div>
            </div>

            {/* middle */}
            <div className="relative w-full p-10 flex-grow border border-t-0 border-secondary">
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
            <div className="p-10">
              {/* send file widget */}
              <div
                style={{ width: '250px', height: '250px' }}
                className="border-2 border-dashed border-secondary rounded-lg m-auto text-center flex justify-center items-center"
              >
                drag and drop a file <br/> to send
              </div>

              {/* other widgets */}
              <div className="flex flex-col py-10">
                <hr className="w-1/3 mx-auto"/>
                <div className="text-lg text-center py-8">address: http://localhost:3000</div>
                <hr className="w-1/3 mx-auto"/>
              </div>

              <WidgetCard extras="mt-0" title="selected files" />
              <WidgetCard title="activities" />
              <WidgetCard title="active connections" />
            </div>
          </div>
        </div>
      :
        <Redirect to="/"/>
  );
}

export default withRouter(Client);
