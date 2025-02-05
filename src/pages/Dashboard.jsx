import React from 'react'
import '../styles/UserDashboard.css';


const Dashboard = () => {
  return (
    <>
    <div className="user-dash" id="userDash">

        <div className="overlay" 
        />


        <aside className="shadow-mid border-light" 
        >
            <div className="close-btn" 
            // onClick={sideBarToggle}
            >X</div>
            <div className="side-profile">
                <div className="profile-details">
                    <span className="name big-text-font comic-font">Job Tracker</span>
                    <span className="role mid-text-font text-light">User</span>
                </div>
            </div>
            <div className="side-stats">
                <header>
                    <span className="head text-box mid-text-font border-light shadow-light button-padding">Here are your statistics</span>
                    {/* <img src="/assets/dashboard/stat_icon.png" alt="Statistics Icon" className="stat-icon img-shadow-light"/> */}
                </header>
                <div className="stat-box border-light shadow-light">
                    <span className="stat-head dot-border-bottom big-text-font bold-font">Applications</span>
                    <div className="stat-flex">
                        <div className="stat-item">
                            <span className="title">Applied</span>
                            <span className="value mid-text-font comic-font">32</span>
                        </div>
                        <div className="stat-item">
                            <span className="title">Rejected</span>
                            <span className="value mid-text-font comic-font">31</span>
                        </div>
                        <div className="stat-item">
                            <span className="title">On-Going</span>
                            <span className="value mid-text-font comic-font">1</span>
                        </div>
                    </div>
                </div>
                <div className="menu-bar">
                    <span className="menu-head big-text-font fw-bold">Dashboard</span>
                    <ul className="menu-list">
                        <li className="mid-text-font"><i className="fa-solid fa-bolt"/>&nbsp;Active Applications</li>
                        <li className="mid-text-font"><i className="fa-solid fa-bolt"/>&nbsp;All Applications</li>
                        <li className="mid-text-font"><i className="fa-solid fa-bolt"/>&nbsp;Profile Settings</li>
                    </ul>
                    <span className="show-more">Show More&nbsp;<i className="fa-solid fa-chevron-down"/></span>
                </div>
            </div>
        </aside>
        {/*  Sidebar End  */}
        {/*  Main Dashboard  */}
        <main className="container">
            <div className="top-bar">
                <button
                //  onClick={sideBarToggle} 
                className="button click menu-ham rounded-100 border-light shadow-light" title="Menu"><i className="fa-solid fa-bars"/></button>
                <div className="greeting head-font comic-font text-box border-light shadow-light button-padding">
                    <span>Good Morning Joel</span>
                </div>
                <div className="switcher button-padding rounded-50 border-light shadow-light">
                    <span className="tab active click button-padding rounded-50"> Applied</span>
                    <span className="tab click button-padding rounded-50">Pending</span>
                </div>
                <div className="options">
                    <button className="button click rounded-100 border-light shadow-light" title="Settings"><i className="fa-solid fa-gear"/><span className="notif rounded-100">2</span></button>
                    <button className="button click rounded-100 border-light shadow-light" title="Notifications"><i className="fa-solid fa-bell"/><span className="notif rounded-100">5</span></button>
                </div>
            </div>
        </main>
        {/*  Main Dashboard End  */}
    </div>
    {/*  User Dashboard End  */}
</>
  )
}

export default Dashboard