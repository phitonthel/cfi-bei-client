import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import axios from 'axios';
import hero from '../../assets/img/hero-img.png'
import WebFont from 'webfontloader';

import DataTable from 'react-data-table-component';
import { login } from '../../apis/user/auth';

function LandingPage() {
  const history = useHistory()

  const login = (e) => {
    e.preventDefault();
    history.push("/admin/login");
  };

  return (
    <>
      {/* <!-- Section: Design Block --> */}
      <section className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 flex-column justify-content-center">
              <h1 data-aos="fade-up" style={{color: '#B73E3E'}} className="font-weight-bold">
                Welcome to IDX Competency Feedback Page
              </h1>
              <h4 className="font-weight-normal">
                {/* Through this page, you will be required to complete a self-assessment regarding your level of proficiency in technical and behavioral competencies. For managerial position, you will also be required to rate / validate your subordinate level of proficiency. */}
              </h4>
              <h4>
                Please click the login button to begin. Thank you.
              </h4>
              <div data-aos="fade-up" data-aos-delay="800">
                <div className="" onClick={login}>
                  <a href="" style={{color: '#B73E3E'}} className="btn btn-danger btn-lg">
                    <span>Login</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-5 hero-img" data-aos="zoom-out" data-aos-delay="200">
              <img src={hero} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
};

export default LandingPage