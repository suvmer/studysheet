export const LightButton = ({onClick, children}) => {
    return <div onClick={onClick} className="btn">{children}</div>
}
export const DarkButton = ({onClick, children}) => {
    return <div onClick={onClick} className="btn btn_dark">{children}</div>
}
export const DarkButtonMid = ({onClick, children}) => {
    return <div onClick={onClick} className="btn btn_dark btn_mid">{children}</div>
}
export const DarkSmallButton = ({onClick, children}) => {
    return <div onClick={onClick} className="btn btn_dark btn_small">{children}</div>
}
export const SmallButton = ({onClick, children}) => {
    return <div onClick={onClick} className="btn btn_small btn_transparent">{children}</div>
}