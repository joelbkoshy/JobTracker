import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserDashboard.css';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState(null);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [user, setUser] = useState('')
    const [jobDetails, setJobDetails] = useState({
        position: '',
        company: '',
        notes: '',
        dateApplied: '',
        status: ''

    });
    const [statusFilter, setStatusFilter] = useState('')
    const [applications, setApplications] = useState([]);
    const [deleteId, setDeleteId] = useState(null); // ID of the application to delete
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter applications based on search query
    const filteredApplications = applications.filter(application =>
        application.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage);


    const fetchUserDetails = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('http://localhost:3000/api/users/details', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setUserDetails(data.userDetails);
                    setUser(data.userDetails._id)
                } else {
                    console.error('Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
    };


    const fetchUserApplications = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('http://localhost:3000/api/applications', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setApplications(data.applications);
                } else {
                    console.error('Failed to fetch user applications');
                }
            } catch (error) {
                console.error('Error fetching user applications:', error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("name , value", name, value)
        setJobDetails({ ...jobDetails, [name]: value });
    };

    const handleApply = async () => {
        try {
            const applyResponse = await axios.post('http://localhost:3000/api/applications', {
                ...jobDetails,
                user
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

        } catch (error) {

        }
        setJobDetails({
            position: '',
            company: '',
            notes: '',
            dateApplied: '',
            status: ''
        })
        await fetchUserApplications()
        setShowApplyModal(false);
    };



    const handleUpdateJob = async () => {
        try {
            const { id, ...restData } = jobDetails
            console.log(jobDetails)
            const updateResponse = await axios.put(`http://localhost:3000/api/applications/${jobDetails._id}`, restData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
        } catch (error) {

        }
        await fetchUserApplications()
        setShowEditModal(false)
        setJobDetails({
            position: '',
            company: '',
            notes: '',
            dateApplied: '',
            status: ''
        })

    }

    const handleUpdate = (id) => {
        console.log("id  : ", id)
        console.log("applications : ", applications)
        const updatedApp = applications.find((app) => app._id === id);
        const dateApplied = updatedApp.dateApplied.split("T")[0]
        setJobDetails({ ...updatedApp, dateApplied });
        setShowEditModal(true);
    };

    const handleDeleteConfirmation = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            const deleteResponse = await axios.delete(`http://localhost:3000/api/applications/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        } catch (error) {

        }
        await fetchUserApplications()
        setShowDeleteModal(false);
    };

    const handleModalClose = () => {
        setShowApplyModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setJobDetails({
            position: '',
            company: '',
            notes: '',
            dateApplied: '',
            status: ''
        })
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };




    useEffect(() => {

        fetchUserDetails();
    }, []);

    useEffect(() => {

        fetchUserApplications();
    }, []);

    return (
        <>
            <div className="user-dash" id="userDash">
                <div className="overlay" />
                <aside className="shadow-mid border-light">
                    <div className="close-btn">X</div>
                    <div className="side-profile">
                        <div className="profile-details">
                            <span className="name big-text-font comic-font">
                                Job Tracker
                            </span>
                            <span className="role mid-text-font text-light">
                                {userDetails ? userDetails.name : 'User'}
                            </span>
                        </div>
                    </div>
                    <div className="menu-bar">
                        <span className="menu-head big-text-font fw-bold">Dashboard</span>
                        <ul className="menu-list">
                            <li className="mid-text-font">
                                <i className="fa-solid fa-bolt" />&nbsp;Active Applications
                            </li>
                            <li className="mid-text-font">
                                <i className="fa-solid fa-bolt" />&nbsp;All Applications
                            </li>
                            <li className="mid-text-font">
                                <i className="fa-solid fa-bolt" />&nbsp;Profile Settings
                            </li>
                            <li className="mid-text-font">
                                <button
                                    className="shadow-light border-light rounded-20 button-padding click fw-bold login"
                                    onClick={handleLogout}>
                                    <i className="fa-solid fa-sign-out-alt" />&nbsp;Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </aside>
                <main className="container">
                    <div className="top-bar">
                        <button
                            className="button click menu-ham rounded-100 border-light shadow-light"
                            title="Menu"
                        >
                            <i className="fa-solid fa-bars" />
                        </button>
                        <div className="greeting head-font comic-font text-box border-light shadow-light button-padding">
                            <span>Good Morning {userDetails ? userDetails.name : 'Joel'}</span>
                        </div>
                        <button
                            className="button apply-button border-light shadow-light button-padding"
                            onClick={() => setShowApplyModal(true)}
                        >
                            Apply for a Job
                        </button>
                    </div>

                    {/* Job Application Modal */}
                    {showApplyModal && (
                        <div
                            className="apply-job-form-modal"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 999,
                            }}
                        >
                            <div
                                className="modal-content"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    width: '400px',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <h2 className="mid-text-font">
                                    {jobDetails.id ? 'Update Job Application' : 'Apply for a Job'}
                                </h2>
                                <input
                                    className="input shadow-light border-light button-padding fw-bold"
                                    type="text"
                                    name="position"
                                    placeholder="Job Title"
                                    value={jobDetails.position}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                    }}
                                />
                                <input
                                    className="input-field border-light"
                                    type="text"
                                    name="company"
                                    placeholder="Company Name"
                                    value={jobDetails.company}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                    }}
                                />
                                <input
                                    className="input-field border-light"
                                    type="text"
                                    name="notes"
                                    placeholder="Notes"
                                    value={jobDetails.notes}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                    }}
                                />

                                {/* Status Dropdown */}
                                <select
                                    name="status"
                                    value={jobDetails.status}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                    }}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Interviewing">Interviewing</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Accepted">Accepted</option>
                                </select>

                                <input
                                    className="input-field border-light"
                                    type="date"
                                    name="dateApplied"
                                    value={jobDetails.dateApplied}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                    }}
                                />
                                <button
                                    className="button submit-button border-light shadow-light"
                                    onClick={handleApply}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        marginBottom: '10px',
                                    }}
                                >
                                    {jobDetails.id ? 'Update Application' : 'Submit Application'}
                                </button>
                                <button
                                    className="button cancel-button"
                                    onClick={handleModalClose}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}



                    {/* Edit Job Application Modal */}
                    {showEditModal && (
                        <div
                            className="apply-job-form-modal"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 999,
                            }}
                        >
                            <div
                                className="modal-content"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    width: '400px',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <h2 className="mid-text-font">Edit Job Application</h2>
                                <input
                                    className="input shadow-light border-light button-padding fw-bold"
                                    type="text"
                                    name="position"
                                    placeholder="Job Title"
                                    value={jobDetails.position}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                    }}
                                />
                                <input
                                    className="input-field border-light"
                                    type="text"
                                    name="company"
                                    placeholder="Company Name"
                                    value={jobDetails.company}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                    }}
                                />
                                <input
                                    className="input-field border-light"
                                    type="text"
                                    name="notes"
                                    placeholder="Notes"
                                    value={jobDetails.notes}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                    }}
                                />
                                <select
                                    className="input-field border-light"
                                    name="status"
                                    value={jobDetails.status}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                    }}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Interviewing">Interviewing</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Accepted">Accepted</option>
                                </select>
                                <input
                                    className="input-field border-light"
                                    type="date"
                                    name="dateApplied"
                                    placeholder="Date Applied"
                                    value={jobDetails.dateApplied}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                    }}
                                />
                                <button
                                    className="button submit-button border-light shadow-light"
                                    onClick={handleUpdateJob}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        marginBottom: '10px',
                                    }}
                                >
                                    Update Application
                                </button>
                                <button
                                    className="button cancel-button"
                                    onClick={handleModalClose}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && (
                        <div
                            className="apply-job-form-modal"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 999,
                            }}
                        >
                            <div
                                className="modal-content"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    width: '300px',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <h3 style={{ marginBottom: '20px' }}>
                                    Are you sure you want to delete this application?
                                </h3>
                                <button
                                    className="button confirm-delete"
                                    onClick={handleDelete}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        marginBottom: '10px',
                                        width: '100%',
                                    }}
                                >
                                    Yes
                                </button>
                                <button
                                    className="button cancel-delete"
                                    onClick={handleModalClose}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        width: '100%',
                                    }}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )}

                    <div
                        className="applications-table border-light shadow-light"
                        style={{
                            height: "450px",
                            overflowY: "auto",
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <h2 className="mid-text-font">Your Applications</h2>

                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search by Job Title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: "80%",
                                padding: "8px",
                                marginBottom: "10px",
                                border: "1px solid lightgray",
                                borderRadius: "5px",
                            }}
                        />

                        {/* Status Filter Dropdown */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{
                                width: "80%",
                                padding: "8px",
                                marginBottom: "10px",
                                border: "1px solid lightgray",
                                borderRadius: "5px",
                            }}
                        >
                            <option value="">All Statuses</option>
                            <option value="Applied">Applied</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Accepted">Accepted</option>
                        </select>

                        <table className="applications-list" style={{ width: "100%", textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Company</th>
                                    <th>Notes</th>
                                    <th>Status</th>
                                    <th>Date Applied</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedApplications
                                    .filter(application => {
                                        // Filter by job title search query
                                        const matchesSearchQuery = application.position.toLowerCase().includes(searchQuery.toLowerCase());

                                        // Filter by status
                                        const matchesStatusFilter = statusFilter ? application.status === statusFilter : true;

                                        return matchesSearchQuery && matchesStatusFilter;
                                    })
                                    .map((application) => (
                                        <tr key={application.id}>
                                            <td>{application.position}</td>
                                            <td>{application.company}</td>
                                            <td
                                                style={{
                                                    maxWidth: "150px",  // Adjust based on your UI needs
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                                title={application.notes} // Shows full text on hover
                                            >
                                                {application.notes}
                                            </td>

                                            <td>{application.status}</td>
                                            <td>{new Date(application.dateApplied).toLocaleDateString()}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleUpdate(application._id)}
                                                    className="btn edit"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteConfirmation(application._id)}
                                                    className="btn delete"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                style={{ padding: "5px 10px", cursor: "pointer", borderRadius: "5px" }}
                            >
                                Prev
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                style={{ padding: "5px 10px", cursor: "pointer", borderRadius: "5px" }}
                            >
                                Next
                            </button>
                        </div>
                    </div>


                </main>
            </div>
        </>
    );
};

export default Dashboard;
