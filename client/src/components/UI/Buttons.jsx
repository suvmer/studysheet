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