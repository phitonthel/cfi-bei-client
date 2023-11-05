import React, { useState, useEffect } from 'react';

export const Instructions = (props) => {
  const [hasRead, setHasRead] = useState(false)

  return (
    <>
      <div className="card">
        <div className="card-header py-2" style={{ backgroundColor: '#E8E8E8' }}>
          <h3>Instructions</h3>
        </div>
        <div className="card-body">
          <ol className="">
            <li className="m-1">
              Lorem ipsum...
            </li>
            <li className="m-1">
              Dor...
            </li>
          </ol>
        </div>
      </div>

      {/* <div className="card">
        <div className="card-header py-2" style={{ backgroundColor: '#E8E8E8' }}>
          <h3> Proficiency Level / Penggaris Penilaian</h3>
        </div>
        <div className="card-body">
          <div className="m-4">
            <h4>Knowledgeable</h4>
            <ul>
              <li>Mampu menjelaskan komponen dasar dari keahlian teknis tertentu.</li>
              <li>Tidak mengetahui detail</li>
              <li>Tahu siapa yang dihubungi untuk klarifikasi dan petunjuk.</li>
            </ul>
            <h4>Practitioner</h4>
            <ul>
              <li>Mengetahui komponen dasar dan menggunakannya dalam pekerjaan sehari-hari.</li>
              <li>Mengikuti petunjuk dan prosedur.</li>
              <li>Menggunakan keahlian tersebut di dalam pekerjaan yang jelas dan terstruktur.</li>
            </ul>
            <h4>Advanced</h4>
            <ul>
              <li>Memiliki pengetahuan detail tentang pekerjaan.</li>
              <li>Dapat menjelaskan pengetahuan kepada yang lain. </li>
              <li>Pertanyaan dapat dijawab dengan beberapa pengecualian.</li>
            </ul>
            <h4>Expert</h4>
            <ul>
              <li>Memiliki pengetahuan komprehensif dan penuh.</li>
              <li>Dapat berlaku sebagai narasumber untuk nasihat, konsultasi, interpretasi, klarifikasi dan petunjuk.</li>
            </ul>
          </div>
        </div>
      </div> */}

      <div className="row justify-content-center">
        <div>
          <input className="form-check-input" type="checkbox" id="flexCheckDefault"
            onClick={() => {
              setHasRead(!hasRead)
            }}></input>
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Saya telah membaca dan memahami instruksi yang diberikan.
          </label>
        </div>
      </div>
      {
        hasRead && <div className="row justify-content-center m-2">
          <button type="button" className="btn btn-secondary btn-fill btn-sm" onClick={() => {
            props.setHasAgreed(true)
            document.querySelector(".main-panel").scrollTo(0, 0)
          }}>
            Mulai berikan 360 Feedback
          </button>
        </div>
      }

    </>
  )
}