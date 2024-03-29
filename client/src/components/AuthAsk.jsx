import React from 'react'
import { AuthForm } from '../components/AuthForm';

export const AuthAsk = ({text = ""}) =>
    <>
        {text ? <div className="box_nobg box_nobg_header box_nobg_big">
            <p>{text}</p>
        </div> : ""}
        <AuthForm/>
    </>