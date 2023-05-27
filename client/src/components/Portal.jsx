import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { setLogin } from "../store/uiReducer";
import { useOnClickOutside } from "../utils/ownHooks";

export const Portal = ({children}) => {
  const mount = document.getElementById("portal");
  const el = document.createElement("div");

  useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);

  const ref = useRef(null);
  useOnClickOutside(ref, setLogin, ["ui", "loginOpen"]);

  return createPortal(<div ref={ref}>{children}</div>, el);
};
