// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import DataTable from 'react-data-table-component';

// import { submitScore } from '../../../apis/assessment/submitScore';
// import { fetchById } from '../../../apis/assessment/fetchById';
// import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
// import { renderScore } from '../../../components/Cfi/AssessmentCard'
// import { renderDropdown } from './renderDropdown'
// import { Criteria } from '../../../components/Cfi/Criteria'
// import { ExpandableInstructions } from '../../../components/ExpandableInstructions'
// import { LoadingSpinner } from '../../../components/LoadingSpinner';
// import { SubmitButton } from '../../../components/SubmitButton';
// import Instructions from 'components/Instructions';

// function PeerAssessment() {
//   const [assessments, setAssessments] = useState([])
//   const [peerName, setPeerName] = useState()
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const authUser = useSelector(state => state.auth.user);

//   const handlers = {
//     submit: async () => {
//       try {
//         setIsSubmitting(true)
//         const promises = assessments.map(e => {
//           return submitScore({
//             assessmentId: e.id,
//             reviewerScore: e.reviewerScore,
//             reviewerId: authUser.id,
//           })
//         })

//         await Promise.all(promises)

//         fireSwalSuccess('Your work has been submitted!')
//       } catch (error) {
//         fireSwalError(error)
//       } finally {
//         setIsSubmitting(false)
//       }
//     }
//   }

//   useEffect(async () => {
//     try {
//       const assignedId = localStorage.getItem('peer_id')
//       const { data } = await fetchById({ assignedId })
//       setPeerName(data[0].assigned.fullname)

//       setAssessments(data.map(assessment => {
//         const type = assessment.CompetencyRole.Competency?.type
//         return {
//           id: assessment.id,
//           assignedScore: renderScore(assessment.assignedScore, type),
//           reviewerScore: assessment.reviewerScore ?? assessment.assignedScore ?? 0,
//           expectedScore: renderScore(assessment.CompetencyRole.expectedScore, type),
//           category: assessment.CompetencyRole.Competency?.category,
//           title: assessment.CompetencyRole.Competency?.title,
//           description: assessment.CompetencyRole.Competency?.description,
//           type,
//           options: assessment.CompetencyRole.Competency?.options,
//         }
//       }));
//     } catch (error) {
//       fireSwalError(error)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [])

//   const columns = [
//     {
//       id: 'category',
//       name: <b style={{ fontSize: 16 }}>Category</b>,
//       selector: row => row.category,
//       cell: row =>
//         <div style={{ fontSize: 14 }}>
//           {row.category}
//         </div>,
//       sortable: true,
//       width: '300px'
//     },
//     {
//       name: <b style={{ fontSize: 16 }}>Title</b>,
//       selector: row => row.title,
//       cell: row =>
//         <div style={{ fontSize: 14 }}>
//           {row.title}
//         </div>,
//       sortable: true,
//       width: '400px'
//     },
//     {
//       name: <b style={{ fontSize: 16 }}>Type</b>,
//       selector: row => row.type,
//       cell: row => <div style={{ fontSize: 14 }}>{row.type}</div>,
//       sortable: true,
//     },
//     {
//       name: <b style={{ fontSize: 16 }}>Expected Score</b>,
//       selector: row => row.expectedScore,
//       cell: row => <div style={{ fontSize: 14 }}>{row.expectedScore}</div>,
//       sortable: true,
//     },
//     {
//       name: <b style={{ fontSize: 16 }}>Self Score</b>,
//       cell: row => <div style={{ fontSize: 14 }}>{row.assignedScore}</div>,
//     },
//     {
//       name: <b style={{ fontSize: 16 }}>Supervisor Score</b>,
//       cell: row => renderDropdown(row, setAssessments)
//     },
//   ];

//   const ExpandedComponent = ({ data }) => {
//     return <>
//       <ul className="list-group m-2">
//         <li className="list-group-item">
//           <div className='text-muted'>Staff Justification:</div>
//           <div>.................................</div>
//         </li>
//       </ul>
//       <div>
//         <ul className="list-group m-2">
//           <li className="list-group-item">
//             <div className='text-muted'>Competency Description: </div>
//             <div>{data.description}</div>
//             </li>
//         </ul>
//         <div className='mb-4'>
//           <Criteria assessment={data} />
//         </div>
//       </div>
//     </>
//   }

//   const texts = [
//     `Anda diminta untuk melakukan Penilaian terhadap kompetensi technical/behaviour bawahan langsung Anda (staf/kepala kantor/kepala unit) melalui supervisor score.`,
//     `Supervisor score: Untuk dapat menilai anggota tim Anda, Pilih salah satu level yang dirasa sesuai dengan kondisi Anggota Tim terkait saat ini.`,
//     `Default dari Supervisor score adalah penilaian yang diisi oleh subordinate. Anda dapat mengubahnya sesuai penilaian Anda. Jika tidak ada yang ingin diubah, click "submit".`,
//     `Expected Score: Level kompetensi yang dipersyaratkan untuk karyawan terkait sesuai profil kompetensinya.`,
//     `Self Score: Penilaian / Self assessment yang dilakukan oleh Anggota Tim Anda. Jika N/A menandakan tim Anda belum mengisi.`,
//     `Klik tanda panah pada setiap arrow untuk melihat definisi kompetensi dan indikator perilakunya. `,
//     `Skor final adalah adalah skor terakhir yang sudah diberikan validasi penilaian oleh atasan (supervisor score)`,
//   ]



//   if (isLoading) {
//     return <LoadingSpinner />
//   }

//   return (
//     <>
//       <div className='col-12'>
//         <div>
//           <h2 style={{ margin: 0 }}>{peerName}</h2>
//         </div>

//         <div className='mb-4 mx-2 my-2'>
//           {/* <ExpandableInstructions instructions={instructions} /> */}
//           <Instructions texts={texts} />
//         </div>

//         <DataTable
//           columns={columns}
//           data={assessments}
//           defaultSortFieldId="category"
//           highlightOnHover
//           expandableRows
//           expandableRowsComponent={ExpandedComponent}
//         />

//         <div className="d-flex flex-row-reverse my-2">
//           <SubmitButton
//             text={'Submit Review'}
//             onClick={handlers.submit}
//             isSubmitting={isSubmitting}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default PeerAssessment