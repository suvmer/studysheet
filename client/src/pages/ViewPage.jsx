import React, { useEffect } from 'react'
import { dateToString } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { InfoBlock } from '../components/InfoBlock';
import { NavLink, useOutlet } from 'react-router-dom';
import { getTable } from '../components/actions/tables';
import { getUser } from '../components/actions/users';

export const ViewPage = () => {
    const dispatch = useDispatch();
    const tables = useSelector(state => state.profile.user.ownTables);

    return <div></div>;
}