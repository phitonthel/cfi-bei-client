import React, { useState, useEffect } from 'react';

export const InstructionsBehav = (props) => {
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
              Anda akan diminta untuk melakukan penilaian terhadap diri sendiri/self-assessment mengenai kompetensi perilaku yang terkait dengan Anda.
            </li>
            <li className="m-1">
              Penilaian kompetensi ini bertujuan untuk mengetahui pengembangan kompetensi yang dibutuhkan oleh setiap Karyawan.
            </li>
            <li className="m-1">
              Dalam pengisian self-assessment dibutuhkan waktu sekitar 30-60 menit untuk memberikan self-assessment terhadap kompetensi yang terkait dengan posisi Anda.
            </li>
            <li className="m-1">
              Anda perlu melakukan self-assessment dengan cara memilih <b>salah satu level</b> (<i>basic/capable/influencing/inspiring</i>) yang Anda rasa sesuai dengan diri Anda / sudah Anda miliki saat ini.
            </li>
            <li className="m-1">
              Anda harus memberikan penilaian terhadap seluruh kompetensi.
            </li>
            <li className="m-1">
              Setelah Anda mengisi Penilaian terhadap seluruh kompetensi, klik tombol submit.
            </li>
            <li className="m-1">
              Anda dapat melihat kembali penilaian self-assessment melalui tab <b>Behavioural Asm. / Technical Asm</b>.
            </li>
            <li className="m-1">
              Setelah anda melakukan self-assessment, atasan  langsung (Kepala Kantor/Kepala Unit/Kepala Divisi) akan mereview/ menilai / memverifikasi nilai Anda. Nilai final adalah nilai yang telah diverifikasi atasan langsung (Kepala Kantor/Kepala Unit/Kepala Divisi).
            </li>
          </ol>
        </div>
      </div>

      <div className="card">
        <div className="card-header py-2" style={{ backgroundColor: '#E8E8E8' }}>
          <h3> Proficiency Level / Penggaris Penilaian</h3>
        </div>
        <div className="card-body">
          <div className="m-4">
            <h4>Basic</h4>
            <ul>
              <li>Mampu menunjukan perilaku berdasarkan prosedur/ kebijakan/norma yang berlaku dibawah supervisi.</li>
            </ul>
            <h4>Capable</h4>
            <ul>
              <li>Mampu menunjukan perilaku secara mandiri (inisiatif sendiri) disertai dengan pemahaman terhadap suatu perilaku, situasi dan atau kondisi yang ada.</li>
            </ul>
            <h4>Influencing</h4>
            <ul>
              <li>Mampu menunjukan perilaku secara konsisten dan mempengaruhi orang lain di unit/ divisi untuk menunjukan perilaku yang sama, serta mampu memberikan alternatif pilihan dan pendekatan untuk situasi dan atau kondisi yang ada.</li>
            </ul>
            <h4>Inspiring</h4>
            <ul>
              <li>Mampu menunjukan perilaku secara konsisten dan mempengaruhi orang lain dalam lingkup organisasi untuk kebutuhan jangka panjang.</li>
            </ul>
          </div>
        </div>
      </div>

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
            document.querySelector(".main-panel").scrollTo(0,0)
          }}>
            Mulai kerjakan self assessment
          </button>
        </div>
      }

    </>
  )
}