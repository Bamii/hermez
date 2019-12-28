import React from 'react';
import DirectoryItem from './DirectoryItem.jsx';

const getType = o => Object.prototype.toString.call(o).split(' ')[1].slice(0, -1).toLowerCase();

const is = (type, value) => getType(value).toLowerCase() === type.toLowerCase();

const flatten = (obj, type = '') => {
  let top = [];
  for (let z in obj) {
    const val = obj[z];

    let root = [z];
    for (let value of val) {
      if (is('object', value)) {
        root.push(flatten(value));
      } else if (type === "all") {
        root.push(value);
      }
    }
    top.push(root);
    root = [];
  }
  return top;
}


const DirectoryList = ({ list, onDirSelect, selectedItem, subItem }) => {
  // console.log(flatten(list));
  // console.log((list));

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