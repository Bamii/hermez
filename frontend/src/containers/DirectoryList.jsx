import React from 'react';
import DirectoryItem from './DirectoryItem.jsx';
import { is, flatten } from '../utils/toolbox';

const DirectoryList = ({ list, onDirSelect, selectedItem, subItem }) => {

  return (
    <div className={`${subItem ? 'py-0 pl-5' : 'py-10'}`}>
      {flatten(list).map((item, i) => {
        return (
          <div key={i}>
            {item.map((el, index, arr) => {
              return is('array', el)
                ? null
                : (
                  <div key={index}>
                    <DirectoryItem
                      onClick={onDirSelect}
                      item={el}
                      index={i}
                      selectedNode={i === selectedItem}
                    />
                    {i === selectedItem && arr[index+1] && is('array', arr[index+1]) &&
                      <DirectoryList
                        list={{ [el]: list[el]}}
                        onDirSelect={onDirSelect}
                        selectedItem={selectedItem}
                        subItem
                      />
                    }
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

export default DirectoryList;