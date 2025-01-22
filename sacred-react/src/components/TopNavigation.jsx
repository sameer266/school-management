import React from 'react';

const TopNavigation = () => {
  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Student Dashboard</h1>
          </div>
          <div className="col-sm-6 text-right">
            <button className="btn btn-danger">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNavigation;
