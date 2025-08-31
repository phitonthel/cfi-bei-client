import React, { useRef, useEffect } from "react";

export default function OtpInput({ length = 6, value, onChange, disabled }) {
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, length);
  }, [length]);

  const handleChange = (idx, e) => {
    const v = e.target.value.replace(/\D/g, ""); // digits only
    if (!v) {
      const next = value.split("");
      next[idx] = "";
      onChange(next.join(""));
      return;
    }
    const next = value.split("");
    next[idx] = v[v.length - 1]; // last typed digit
    const joined = next.join("");
    onChange(joined);
    if (v && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < length - 1) inputsRef.current[idx + 1]?.focus();
  };

  return (
    <div className="d-flex gap-2 justify-content-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => (inputsRef.current[i] = el)}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          className="form-control text-center"
          style={{ maxWidth: 48 }}
          value={value[i] || ""}
          disabled={disabled}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
        />
      ))}
    </div>
  );
}
