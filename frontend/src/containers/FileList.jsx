import React from 'react';
import File from '../../public/assets/file2x.png'
import SingleFile from './SingleFile.jsx';
import { is } from '../utils/toolbox';

const FileList = ({ extras, list = [], selectedItems=[], onFileSelect }) => {
  return (
    <div className={`pt-3 pb-10 flex flex-wrap  ${extras}`}>
      {list.length > 0
        ?
          list.map((item, index) => (
            is('object', item)
            ?
              <div key={index} />
            :
              <SingleFile
                key={index}
                imgsrc={File}
                fileName={item}
                fileSize="3kb"
                index={index+1}
                selected={!!selectedItems.find(el => el === index+1)}
                onClick={onFileSelect}
              />
          ))
        : <div className="text-center w-full py-24">There is nothing in this directory</div>
      }
    </div>
  )
}

export default FileList;