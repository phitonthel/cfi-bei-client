import React, { useState, useEffect } from 'react';

function Announcement() {

  return (
    <>
      <div className="row mb-4 p-4">
        <div className="col-md-8">
          {/* <h3>Announcement:</h3> */}
          <p className="card p-2">
            (08/08/2023)  : Carinna has completed Behavioural Assessment
          </p>
          <p className="card p-2">
            (07/08/2023)  : Your Technical Assessment has been reviewed by Amalia
          </p>
        </div>
      </div>
    </>
  );
};

export default Announcement