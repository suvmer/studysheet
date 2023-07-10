import { days } from "../utils/utils"
import { SubjectBar } from "./SubjectBar"

export const InfoBar = ({tables}) => <div className="info">
            {tables.map((element, day) => {
                return <div className='sheet' key={`sbjlist${day}`}>
                    <p className="big center">{days[day]}</p>
                    <br/>
                    <hr/>
                    {element.length === 0 ? <p className="mid center">Занятий нет</p> : ""}
                    {element.map((el, num) => {
                        if(num === 0)
                            return <SubjectBar key={`sbj${day} ${num}`} {...{...el, num: num+1}}/>
                        return <>
                            <hr/>
                            <SubjectBar key={`sbj${day} ${num}`} {...{...el, num: num+1}}/>
                        </>
                    })}
                    </div>
            })}
        </div>
