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

  // const instructions = [
  //   'Expected score adalah level kompetensi yang dipersyaratkan BEI untuk posisi tim Anda.',
  //   'Assigned score adalah penilaian mandiri/self assessment yang sudah dilakukan oleh karyawan terkait/ tim Anda.',
  //   'Reviewer score adalah penilaian/score/level yang akan anda berikan terhadap tim Anda.',
  //   'Anda perlu melakukan penilaian dengan cara memilih salah satu level yang Anda rasa sesuai dengan diri tim Anda / sudah tim Anda miliki saat ini.',
  //   'Isilah dengan jujur. Nilai yang Anda berikan bisa sama/lebih rendah/lebih tinggi dari assigned score/ self assessment tim Anda terhadap dirinya.',
  //   'Anda harus memberikan penilaian terhadap seluruh kompetensi. Nilai final adalah nilai yang telah diverifikasi atasan langsung (Kepala Kantor/Kepala Unit/Kepala Divisi) atau yang Anda berikan.',
  //   ' Setelah Anda memberikan penilaian terhadap seluruh kompetensi, klik tombol save.',
  //   'Anda dapat melihat kembali penilaian anda terhadap tim anda melalui menu subordinates, lalu click assess.'
  // ]

  const texts = [
    `Click each column's arrow for criteria details.`,
    `Default 'Supervisor Score' is the 'Subordinate Score'. No changes? Click 'submit' right away.`,
    'Pro tip: Sort columns easily by clicking their headers.',
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