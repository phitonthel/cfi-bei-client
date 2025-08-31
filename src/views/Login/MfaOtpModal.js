import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import OtpInput from "./OtpInput";
import { verifyMfa, resendMfa } from "../../apis/user/mfa";
import { fireSwalError } from "../../apis/fireSwal";

const RESEND_COOLDOWN_SEC = 30;

export default function MfaOtpModal({
  show,
  onHide,
  challengeId,
  delivery,      // { channel: 'email', to: 'j***@g***.com' }
  expiresAt,     // ISO string
  onVerified,    // (authPayload) => void
}) {
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SEC);
  const [expireLeft, setExpireLeft] = useState(0);
  const [currentExpiry, setCurrentExpiry] = useState(expiresAt);

  const expiresTs = useMemo(() => (currentExpiry ? new Date(currentExpiry).getTime() : 0), [currentExpiry]);

  useEffect(() => {
    setCode("");
    setCurrentExpiry(expiresAt);
    setResendCooldown(RESEND_COOLDOWN_SEC);
  }, [show, challengeId, expiresAt]);

  // countdowns
  useEffect(() => {
    if (!show) return;
    const t = setInterval(() => {
      const now = Date.now();
      setExpireLeft(Math.max(0, Math.floor((expiresTs - now) / 1000)));
      setResendCooldown((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [show, expiresTs]);

  const handleVerify = async () => {
    try {
      setSubmitting(true);
      const auth = await verifyMfa({ challengeId, code });
      onVerified(auth);
    } catch (err) {
      fireSwalError(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      setSubmitting(true);
      const res = await resendMfa({ challengeId });
      setCurrentExpiry(res.expiresAt);
      setResendCooldown(RESEND_COOLDOWN_SEC);
      setCode("");
    } catch (err) {
      fireSwalError(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Enter verification code</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="mb-2">
          We sent a 6-digit code to <b>{delivery?.to}</b>.
        </p>

        <div className="mb-3">
          <OtpInput length={6} value={code} onChange={setCode} disabled={submitting} />
        </div>

        <div className="d-flex justify-content-between align-items-center small text-muted">
          <span>
            Expires in:{" "}
            <b>
              {Math.floor(expireLeft / 60)}:
              {String(expireLeft % 60).padStart(2, "0")}
            </b>
          </span>
          <button
            type="button"
            className="btn btn-link px-2 py-1"
            disabled={resendCooldown > 0 || submitting}
            onClick={handleResend}
          >
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Resend code"}
          </button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleVerify}
          style={{
            opacity: submitting || code.length !== 6 ? 0.6 : 1,
            pointerEvents: submitting || code.length !== 6 ? "none" : "auto",
          }}
        >
          {submitting ? "Verifying…" : "Verify"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
