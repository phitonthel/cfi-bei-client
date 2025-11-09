import React from 'react';
import { SingleDownloadButton, BulkDownloadButton } from './DownloadReportButtons';

/**
 * Example usage of the Download Report Buttons
 * This file demonstrates how to use both SingleDownloadButton and BulkDownloadButton
 */

// Example 1: Single Download Button in a User Profile
export const UserProfileExample = ({ userId, userFullname }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">My 360 Feedback Report</h5>
        <p className="card-text">
          Download your complete 360-degree feedback report including scores,
          charts, and detailed feedback from peers, supervisors, and subordinates.
        </p>

        {/* Single download button - accessible to everyone */}
        <SingleDownloadButton
          userId={userId}
          userFullname={userFullname}
          buttonText="Download My Report"
          className="btn btn-primary"
        />
      </div>
    </div>
  );
};

// Example 2: Single Download in a Table Row
export const UserTableRowExample = ({ user }) => {
  return (
    <tr>
      <td>{user.nik}</td>
      <td>{user.fullname}</td>
      <td>{user.position}</td>
      <td>
        {/* Small button for table row */}
        <SingleDownloadButton
          userId={user.id}
          userFullname={user.fullname}
          buttonText="PDF"
          className="btn btn-sm btn-outline-primary"
          size="sm"
        />
      </td>
    </tr>
  );
};

// Example 3: Multiple buttons with different styles
export const ActionButtonsExample = ({ userId, userFullname }) => {
  return (
    <div className="btn-group" role="group">
      <button className="btn btn-secondary">View Report</button>

      {/* Download button integrated with other actions */}
      <SingleDownloadButton
        userId={userId}
        userFullname={userFullname}
        buttonText="Download"
        className="btn btn-success"
      />

      <button className="btn btn-info">Share</button>
    </div>
  );
};

// Example 4: Admin Dashboard with Bulk Download
export const AdminDashboardExample = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2>360 Feedback Reports Management</h2>
          <p className="text-muted">
            Manage and download all employee feedback reports.
          </p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Bulk Operations</h5>
            </div>
            <div className="card-body">
              <p>
                Download all employee reports at once. This operation may take
                several minutes depending on the number of employees.
              </p>

              {/* Bulk download button - only visible to SUPERADMIN */}
              <BulkDownloadButton />
            </div>
          </div>
        </div>
      </div>

      {/* Individual downloads section */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Individual Reports</h5>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>NIK</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example rows would be mapped here */}
                  <tr>
                    <td>12345</td>
                    <td>John Doe</td>
                    <td>Manager</td>
                    <td>
                      <SingleDownloadButton
                        userId={123}
                        userFullname="John Doe"
                        buttonText="Download"
                        className="btn btn-sm btn-primary"
                        size="sm"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example 5: Responsive Card Layout
export const ResponsiveCardExample = ({ users }) => {
  return (
    <div className="row">
      {users.map(user => (
        <div key={user.id} className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{user.fullname}</h5>
              <p className="card-text">
                <small className="text-muted">NIK: {user.nik}</small>
              </p>
              <p className="card-text">{user.position}</p>
            </div>
            <div className="card-footer">
              <SingleDownloadButton
                userId={user.id}
                userFullname={user.fullname}
                buttonText="Download Report"
                className="btn btn-block btn-primary"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Example 6: With Loading State Management
export const CustomLoadingExample = ({ userId, userFullname }) => {
  return (
    <div className="text-center p-4">
      <h4 className="mb-4">Your 360 Feedback Report</h4>

      {/* Large centered button */}
      <SingleDownloadButton
        userId={userId}
        userFullname={userFullname}
        buttonText="Download Complete Report"
        className="btn btn-lg btn-primary"
        size="lg"
      />

      <p className="mt-3 text-muted">
        <small>
          The report includes comprehensive feedback from all sources,
          performance charts, and development recommendations.
        </small>
      </p>
    </div>
  );
};

// Example 7: Conditional Rendering Based on User Role
export const ConditionalRenderExample = ({ userId, userFullname, userRole }) => {
  return (
    <div>
      {/* Single download - always shown */}
      <div className="mb-3">
        <h6>Your Report</h6>
        <SingleDownloadButton
          userId={userId}
          userFullname={userFullname}
          className="btn btn-primary"
        />
      </div>

      {/* Bulk download - automatically hidden for non-SUPERADMIN */}
      <div>
        <h6>Admin Actions</h6>
        <BulkDownloadButton />
        {/* No need for conditional rendering - component handles it internally */}
      </div>
    </div>
  );
};

export default {
  UserProfileExample,
  UserTableRowExample,
  ActionButtonsExample,
  AdminDashboardExample,
  ResponsiveCardExample,
  CustomLoadingExample,
  ConditionalRenderExample
};
