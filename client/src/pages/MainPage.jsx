import React from 'react'
import { dateToString } from '../utils/utils';
import { useSelector } from 'react-redux';
import { Event } from '../components/Event';

export const MainPage = () => {
    const curdate = useSelector(state => state.ui.time);
    return <div className="wall">
    <span className="midbox" style={{ marginRight: "auto" }}>
      <mark className="mid">{dateToString(curdate)[0]}</mark>
    </span>
    <Event/>
  </div>;
}