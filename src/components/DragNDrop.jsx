import React, { useState, useRef, useEffect } from "react";
import ResourceList from "./ResourceList";

function DragNDrop({ data }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setList(data);
  }, [setList, data]);

  const dragItem = useRef();
  const dragNode = useRef();

  const handletDragStart = (e, params) => {
    console.log("Starting to drag", params);

    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    console.log("Entering a drag target", params);

    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      console.log("TARGET IS NOT THE SAME");
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpI].items.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
        );
        dragItem.current = params;
        // get from store instead
        localStorage.setItem("List", JSON.stringify(newList));
        return newList;
      });
    }
  };

  const handleDragEnd = (e) => {
    console.log("Ending drag...");
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (
      currentItem.grpI === params.grpI &&
      currentItem.itemI === params.itemI
    ) {
      return "dnd-item current";
    }
    return "dnd-item";
  };

  return (
    <div className='drag-n-drop'>
      {list.map((grp, grpI) => {
        console.log("here is the first key:", grp.title);
        return (
          <div
            key={grp.title}
            className='dnd-group'
            onDragEnter={
              dragging && !grp.items.length
                ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                : null
            }
            onDragOver={(e) => allowDrop(e)}
          >
            <div className='group-title'>{grp.title}</div>
            {grp.items.map((item, itemI) => {
              console.log("here are the second key(s): ", item.name);
              return (
                <div
                  className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
                  draggable
                  key={item.name}
                  onDragStart={(e) => {
                    handletDragStart(e, { grpI, itemI });
                  }}
                  onDragEnter={
                    dragging
                      ? (e) => {
                          handleDragEnter(e, { grpI, itemI });
                        }
                      : null
                  }
                >
                  <ResourceList
                    resources={[
                      {
                        evName: "STAR-Storage-08",
                        evseId: "udv00077",
                        evseName: "STAR-Storage-08",
                        powerFlowPercent: 18,
                        realPower: "2.9",
                        resourceStatus: "GI",
                        soc: 43,
                        tCellAvg: "17.70",
                        tCellMax: "18.90",
                        tCellMin: "16.10",
                        vin: "UDV00077",
                      },
                    ]}
                    view={item}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default DragNDrop;
