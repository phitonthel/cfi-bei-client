import React, { useState, useEffect } from 'react';

import { dataFactory } from './dataFactory'
// import { data } from './data'

function Table() {
  // const [data, setData] = useState(null)

  const renderHeaders = () => {
    return (
      <thead>
        <tr>
          <th rowSpan={2}>No</th>
          <th rowSpan={2}>Job Title</th>
          <th rowSpan={2}>Nama</th>
          <th rowSpan={2}>Divisi</th>
          <th rowSpan={2}>Unit</th>
          <th colSpan={3}>Level Kompetensi Yang Diharapkan</th>
          <th colSpan={3}>Level Kompetensi Yang Ditunjukkan (Dinilai oleh Kepala Divisi)</th>
          <th colSpan={3}>GAP</th>
          <th colSpan={3}>COUNT</th>
        </tr>
        <tr>
          {
            [1, 2, 3, 4].map(i => {
              return (
                <>
                  <th>1. Money Market Foreign Exchange Market Instrument</th>
                  <th>2. Money Market Foreign Exchange Law</th>
                  <th>3. Alternative Market Provider Business Operation</th>
                </>
              )
            })
          }
        </tr>
      </thead>
    )
  }

  return (
    <>
      <div className="d-flex flex-row-reverse">
        <button
          className='btn btn-primary btn-sm m-1'
        >
          Download CSV
        </button>
      </div>
      <table id="divisionSingle" className="display nowrap" style={{ width: '200%' }}>
        {
          renderHeaders()
        }
        <tbody>
          {/* <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td> */}
        </tbody>
        {/* { rows } */}
        <tfoot>
        </tfoot>
      </table>
    </>
  );
};

export default Table