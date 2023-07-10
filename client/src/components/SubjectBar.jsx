import { dateToString } from "../utils/utils"

export const SubjectBar = (props) => <div className='subjectBar'><p>{props.num}. {props.name}{props.cabinet ? ` (${props.cabinet})` : ""}</p><p>{dateToString(props.start, true)[1]} - {dateToString(props.end, true)[1]}</p></div>
