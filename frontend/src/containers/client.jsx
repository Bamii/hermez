import React, { useState, useEffect } from 'react';
import FileList from './FileList.jsx';
import Header from './header.jsx';
import SectionTitle from './SectionTitle.jsx';
import DirectoryList from './DirectoryList.jsx';
import WidgetCard from './WidgetCard.jsx';
// const fs = require('fs-extra/lib/fs')

const Client = () => {
  let list = {
    "Music": ["me.mp3", "you and i.mp3", "ouuuuuuu.mp3"],
    "Movies": ["avengers.mp4", "BLACK MIRROR", {
      'mcu': ["avengers.mp4"]
    }],
    "Docs": ["ds.pdf", 'dfsf.book', 'tsdfs.pdf'],
    "MusThinfsic": ['dfads.js', 'sdfsf.jsx',],
    "Musishic": [],
  };
  const [selectedDir, selectDir] = useState(0);
  const [selectedFiles, selectFile] = useState([]);

  const selectFiles = (file) => {
    const a = selectedFiles.findIndex(el => el === file);

    a > -1
      ? selectFile([...selectedFiles.slice(0,a), ...selectedFiles.slice(a+1)])
      : selectFile([...selectedFiles, file]);
  }

  useEffect(() => {
    // const files = fs.readdirSync('.', { withFileTypes: true });
    list = {
      "Music": ["me.mp3", "you and i.mp3", "ouuuuuuu.mp3"],
      "Movies": ["avengers.mp4", "BLACK MIRROR", {
        'mcu': ["avengers.mp4"]
      }],
      "Docs": ["ds.pdf", 'dfsf.book', 'tsdfs.pdf'],
      "MusThinfsic": ['dfads.js', 'sdfsf.jsx',],
      "Musishic": [],
    }
  })

  return (
    /* still deciding wether to slap 'container' on there or not */
    /* and the borders too... ugh! */
    <div className="mx-auto text-primaryDark">
      <Header />

      <div className="flex">
        {/* left */}
        <div className="relative p-10 pr-0 w-1/2 max-w-20">
          <SectionTitle title="files" />
          <DirectoryList
            list={list}
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
            list={Object.values(list)[selectedDir]}
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
  );
}

export default Client;
