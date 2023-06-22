import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { setInfoOpen, setModal } from "../store/uiReducer";
import { useOnClickOutside } from "../utils/ownHooks";
import { useDispatch, useSelector } from "react-redux";
import { sendNewInfo } from "./actions/users";
import { DarkButton } from "./UI/Buttons";

export const ModalPortal = ({content}) => {
  const mount = document.body;
  const el = document.createElement("div");

  useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);
  
  const ref = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current.parentNode.className == "modal modal_open" && !ref.current.contains(event.target)) {
        console.log("clicked")
        dispatch(setModal(null))
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return createPortal(<div className={content ? "modal modal_open" : "modal"}>
        <div ref={ref}>
            {content ?? ""}
        </div>
  </div>, mount);
};