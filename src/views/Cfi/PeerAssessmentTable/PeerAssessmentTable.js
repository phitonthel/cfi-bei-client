import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';

import { submitScore } from '../../../apis/assessment/submitScore';
import { fetchById } from '../../../apis/assessment/fetchById';
import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { renderScore } from '../../../components/AssessmentCard'
import { renderDropdown } from './renderDropdown'
import { Criteria } from '../../../components/Criteria'
import { ExpandableInstructions } from '../../../components/ExpandableInstructions'
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { SubmitButton } from '../../../components/SubmitButton';
import Instructions from 'components/Instructions';

function PeerAssessment() {
  const [assessments, setAssessments] = useState([])
  const [peerName, setPeerName] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlers = {
    submit: async () => {
      try {
        setIsSubmitting(true)
        const promises = assessments.map(e => {
          return submitScore({
            assessmentId: e.id,
            reviewerScore: e.reviewerScore
          })
        })

        await Promise.all(promises)

        fireSwalSuccess('Your work has been submitted!')
      } catch (error) {
        fireSwalError(error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  useEffect(async () => {
    try {
      const assignedId = localStorage.getItem('peer_id')
      const { data } = await fetchById({ assignedId })
      setPeerName(data[0].assigned.fullname)

      setAssessments(data.map(assessment => {
        const type = assessment.CompetencyRole.Competency?.type
        return {
          id: assessment.id,
          assignedScore: renderScore(assessment.assignedScore, type),
          reviewerScore: assessment.reviewerScore ?? assessment.assignedScore ?? 0,
          expectedScore: renderScore(assessment.CompetencyRole.expectedScore, type),
          category: assessment.CompetencyRole.Competency?.category,
          title: assessment.CompetencyRole.Competency?.title,
          description: assessment.CompetencyRole.Competency?.description,
          type,
          options: assessment.CompetencyRole.Competency?.options,
        }
      }));
    } catch (error) {
      fireSwalError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const columns = [
    {
      id: 'category',
      name: <h4>Category</h4>,
      selector: row => row.category,
      cell: row =>
        <div style={{ fontSize: 16 }}>
          {row.category}
        </div>,
      sortable: true,
      width: '300px'
    },
    {
      name: <h4>Title</h4>,
      selector: row => row.title,
      cell: row =>
        <div style={{ fontSize: 16 }}>
          {row.title}
        </div>,
      sortable: true,
      width: '400px'
    },
    {
      name: <h4>Type</h4>,
      selector: row => row.type,
      cell: row => <div style={{ fontSize: 16 }}>{row.type}</div>,
      sortable: true,
    },
    {
      name: <h4>Expected Score</h4>,
      selector: row => row.expectedScore,
      cell: row => <div style={{ fontSize: 16 }}>{row.expectedScore}</div>,
      sortable: true,
    },
    {
      name: <h4>Subordinates Score</h4>,
      cell: row => <div style={{ fontSize: 16 }}>{row.assignedScore}</div>,
    },
    {
      name: <h4>Supervisor Score</h4>,
      cell: row => renderDropdown(row, setAssessments)
    },
  ];

  const ExpandedComponent = ({ data }) => {
    return <>
      <ul className="list-group m-4 px-4">
        <li className="list-group-item"><b>{data.description}</b></li>
      </ul>
      <div className='mb-4'>
        {Criteria(data)}
      </div>
    </>
  }

  const texts = [
    `Anda diminta untuk melakukan Penilaian terhadap kompetensi technical/behaviour bawahan langsung Anda (staf/kepala kantor/kepala unit) melalui supervisor score.`,
    `Supervisor score: Untuk dapat menilai anggota tim Anda, Pilih salah satu level yang dirasa sesuai dengan kondisi Anggota Tim terkait saat ini.`,
    `Default dari Supervisor score adalah penilaian yang diisi oleh subordinate. Anda dapat mengubahnya sesuai penilaian Anda. Jika tidak ada yang ingin diubah, click "submit".`,
    `Expected Score: Level kompetensi yang dipersyaratkan untuk karyawan terkait sesuai profil kompetensinya.`,
    `Subordinate Score: Penilaian / Self assessment yang dilakukan oleh Anggota Tim Anda. Jika N/A menandakan tim Anda belum mengisi.`,
    `Klik tanda panah pada setiap arrow untuk melihat definisi kompetensi dan indikator perilakunya. `,
    `Skor final adalah adalah skor terakhir yang sudah diberikan validasi penilaian oleh atasan (supervisor score)`,
  ]
  
  

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className='col-12'>
        <div>
          <h2 style={{ margin: 0 }}>{peerName}</h2>
        </div>

        <div className='mb-4 mx-2 my-2'>
          {/* <ExpandableInstructions instructions={instructions} /> */}
          <Instructions texts={texts} />
        </div>

        <DataTable
          columns={columns}
          data={assessments}
          defaultSortFieldId="category"
          highlightOnHover
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />

        <div className="d-flex flex-row-reverse my-2">
          <SubmitButton
            text={'Submit Review'}
            onClick={handlers.submit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </>
  );
};

export default PeerAssessment