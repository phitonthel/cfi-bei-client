import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUpload, faClipboardList, faUserFriends, faUsers, faUser, faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Card, Button, Spinner, Modal, Form, Alert } from 'react-bootstrap';

function Announcement() {
  return (
    <>
      <div className="row justify-content-center mb-4 p-4">
        <div className="col-md-8">
          <div className="card p-3 mb-3">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <h4 className="mb-0">What's New</h4>
            </div>
            <div className="text-left">
              <p className="mb-2 lead">
                <FontAwesomeIcon icon={faUpload} className="mr-2 text-muted" />
                Introducing a new time-saver: <strong>Import Assessment</strong>
              </p>
              <p className="mb-3">
                You've done the hard work once. Now, your past self can lend a hand.
                With Import Assessment, you can pull data from any previous CFI assessment and automatically fill matching scores and justifications into the current one.
              </p>
              <ul>
                <li className="mb-2"><strong>What it copies:</strong> matching scores and justification text for identical items.</li>
                <li className="mb-2"><strong>What it doesn't change:</strong> everything else — you can still review and edit as needed.</li>
                <li className="mb-2"><strong>Who you can import from:</strong> your self assessment or your review for others.</li>
              </ul>
              <p className="mb-3">
                Try it now: go to any assessment page, and then click Import Assessment as shown below.
              </p>

              <Card className="mb-3 shadow-sm">
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faUser} className="mr-4" size="lg" />
                    <Card.Title as="h4" className="mb-0">{"John Doe"}</Card.Title>
                  </div>
                  <div>
                    <span className='mr-3'><FontAwesomeIcon icon={faArrowRight} size='lg' color='blue' /></span>
                    <Button
                      variant="outline-primary"
                      onClick={() => { }}
                      disabled={true}
                    >
                      Import Assessment
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              <p className="mb-1">
                Stop retyping. Start reusing. ✨
              </p>
              <div className="d-flex justify-content-end mt-3">
                <small className="text-muted">October 2025</small>
              </div>
            </div>
          </div>
          <div className="card p-3 mb-3">
            <h5 className="mb-2">Quick Notes</h5>
            <div className="mb-3">
              <small className="text-muted">Discard changes</small>
              <p className="mb-0">Your CFI/360 work is auto-saved when you make changes. Use the <em>Discard</em> button (top-right) to revert the current draft to the previous unsaved version. Remember: changes are not permanently saved until you click <em>Submit</em>.</p>

              {/* <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <strong className="mb-0">{"title"}</strong>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => { }}
                  />
                </div>

                <div className="card-body">
                  <div style={{ fontSize: '0.95rem', lineHeight: 1.35 }}>{"text"}</div>
                  <div style={{ marginTop: 8, fontSize: '0.85rem', color: '#6c757d' }}>
                    {"secondaryText"}
                  </div>
                </div>
              </div> */}

            </div>
            <div>
              <small className="text-muted">OTP / MFA</small>
              <p className="mb-0">Multi-factor authentication (OTP/MFA) is enabled. OTP code or support will come from <code>support@adndigitalsolution.com</code>; be cautious of phishing from other addresses.</p>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Announcement