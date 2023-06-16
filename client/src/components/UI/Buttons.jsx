import { useState } from "react"

export const LightButton = ({type, onClick, children}) => {
    return <button type={type} onClick={onClick} className="btn">{children}</button>
}
export const DarkButton = ({type, onClick, children}) => {
    return <button type={type} onClick={onClick} className="btn btn_dark">{children}</button>
}
export const DarkSmallButton = ({type, onClick, children}) => {
    return <button type={type} onClick={onClick} className="btn btn_dark btn_small">{children}</button>
}
export const SmallButton = ({type, onClick, children}) => {
    return <button type={type} onClick={onClick} className="btn btn_small btn_transparent">{children}</button>
}
export const DarkRepeatButton = ({type, onClick, children}) => {
    const [stage, setStage] = useState(0);
    if(stage == 0)
        return <button type={type} onClick={()=>setStage(1)} className="btn btn_dark">{children}</button>
    if(stage == 1)
        return <button type={type} onClick={()=>setStage(2)} className="btn btn_dark">Уверены?</button>
    if(stage == 2)
        return <button type={type} onClick={onClick} className="btn btn_dark">Точно?</button>
}