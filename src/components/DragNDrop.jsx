import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setViewList, toggleView } from "../store/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const DragNDrop = () => {
  const dispatch = useDispatch();

  const viewData = useSelector((state) => state.entities.user.views);

  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  const handletDragStart = (e, params) => {
    //console.log("Starting to drag", params);

    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    //console.log("Entering a drag target", params);

    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      //console.log("TARGET IS NOT THE SAME");

      let newList = JSON.parse(JSON.stringify(viewData));
      newList[params.grpI].items.splice(
        params.itemI,
        0,
        newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
      );
      dragItem.current = params;

      dispatch(setViewList(newList));
    }
  };

  const handleDragEnd = (e) => {
    //console.log("Ending drag...");
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

  const getSelectedStyles = (itemI) => {
    if (viewData[0].items[itemI].shouldShow === false) {
      return "dnd-item unselected";
    }
    return "dnd-item";
  };

  return (
    <div className='drag-n-drop'>
      {viewData.map((grp, grpI) => {
        //console.log("here is the first key:", grp.title);
        return (
          <div
            key={grp.title}
            className='dnd-group d-flex flex-row'
            onDragOver={(e) => allowDrop(e)}
            onDragEnter={
              dragging && !grp.items.length
                ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                : null
            }
          >
            <div className='group-title'>{grp.title}:</div>
            {grp.items.map((item, itemI) => {
              //console.log("here are the second key(s): ", item);
              return (
                <div
                  className={
                    dragging
                      ? getStyles({ grpI, itemI })
                      : getSelectedStyles(itemI)
                  }
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
                  onClick={() => {
                    dispatch(toggleView(itemI));
                  }}
                >
                  {viewData[0].items[itemI].shouldShow && (
                    <FontAwesomeIcon
                      className='align-self-center mr-1'
                      icon={faCheckCircle}
                      size='1x'
                    />
                  )}
                  {item.name}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DragNDrop;
