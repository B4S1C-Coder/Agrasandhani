import React from 'react';
import { Link } from 'react-router-dom';
// import {
//   BsGrid1X2Fill, BsFillArchiveFill, BsMenuButtonWideFill, BsFillGearFill
// } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          Student Name
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/home">
            {/*<BsGrid1X2Fill className='icon' /> */} Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/quiz">
            {/*<BsFillArchiveFill className='icon' />*/} Quiz
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/study-plan">
            {/*<BsMenuButtonWideFill className='icon' />*/} Study Plan
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/setting">
            {/*<BsFillGearFill className='icon' />*/} Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
