import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { setModal } from "../store/uiReducer";
import { useDispatch } from "react-redux";

export const ModalPortal = ({content}) => {
  const mount = document.body;
  const modal = document.createElement("div");
  const ref = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => { //mount modal on render(and remove after unmount)
    mount.appendChild(modal);
    return () => mount.removeChild(modal);
  }, [modal, mount]);
  useEffect(() => { //close on outside click
    const handleClickOutside = (event) => {
      if (ref.current.parentNode.className === "modal modal_open" && !ref.current.contains(event.target))
        dispatch(setModal(null))
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [dispatch]);

  return createPortal(<div className={content ? "modal modal_open" : "modal"}>
        <div ref={ref}>
            {content ?? ""}
        </div>
  </div>, mount);
};