import React, { useState, useEffect } from 'react';

import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { fireSwalError, fireSwalSuccess } from '../../../apis/fireSwal';
import { fetchStaffForEvaluation } from '../../../apis/user/fetchStaffForEvaluation';
import { DownloadCsvButton } from '../../../components/Buttons/DownloadButtons';
import { ExpandableInstructions } from '../../../components/ExpandableInstructions';
import Instructions from '../../../components/Instructions';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { setUtilities } from '../../../redux/appSlice';
import { convertISODateToDDMMYYYY } from '../../../utils/date'
import { determineDirectSupervisorLevel } from '../../../utils/determineLevels';

const columns = [
  {
    name: <b>Name</b>,
    selector: row => row.fullname,
    width: '300px',
    sortable: true,
  },
  {
    name: <b>Division</b>,
    selector: row => row.division,
    sortable: true,
  },
  {
    name: <b>Position</b>,
    selector: row => row.positionName,
    width: '300px',
    sortable: true,
  },
  {
    name: <b>Staff Last Updated</b>,
    selector: row => row.selfLastUpdated,
    sortable: true,
  },
  {
    name: <b>Reviewer Last Updated</b>,
    selector: row => row.reviewerLastUpdated,
    sortable: true,
  },
  {
    name: <b>Staff Review</b>,
    selector: row => row.selfReviewProgress,
    sortable: true,
  },
  {
    name: <b>Supervisor Review</b>,
    selector: row => row.reviewerReviewProgress,
    sortable: true,
  },
  {
    name: <b>Actions</b>,
    cell: row => row.actions,
  },
];

const UserFullname = ({ subordinate, authUser }) => {
  const subordinateDirectSupervisorLevel = determineDirectSupervisorLevel(subordinate.level);
  const isThisUserDirectSubordinate = authUser.level === subordinateDirectSupervisorLevel;

  const renderTooltip = () => {
    return (
      <Tooltip id="tooltip">
        Required as this user is your direct subordinate
      </Tooltip>
    );
  };

  return (
    <>
      <>{subordinate.fullname}</>
      <>{isThisUserDirectSubordinate ? (
        <OverlayTrigger
          placement="top"
          overlay={renderTooltip()}
        >
          <FontAwesomeIcon icon={faInfoCircle} className="ml-2" style={{ cursor: 'pointer' }} />
        </OverlayTrigger>
      ) : null}</>
    </>
  );
};

function StaffEvaluation() {
  const history = useHistory()
  const dispatch = useDispatch()

  // const [staffs, setStaffs] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  const authUser = useSelector(state => state.auth.user);
  const cfiTypeAssessment = useSelector(state => state.app.utilities.cfiTypeAssessment);

  const { data, error, isLoading } = useQuery(
    ['fetchStaffForEvaluation', cfiTypeAssessment.id],
    () => fetchStaffForEvaluation(cfiTypeAssessment.id),
    {
      onSuccess: (data) => {
        if (data.message) {
          Swal.fire({
            position: 'top',
            text: data.message,
            showConfirmButton: false,
            timer: 1000
          });
        }
      },
      onError: (error) => {
        fireSwalError(error);
      },
    }
  );

  const Actions = (user) => {
    return (
      <div>
        <span className="badge badge-primary p-1 m-1" style={{ width: '120px', cursor: 'pointer' }}
          onClick={() => {
            // localStorage.setItem('peer_id', user.id)
            // history.push('/admin/cfi/peer-assessment-table')
            dispatch(setUtilities({
              cfiAssessment: {
                // userId: user.id,
                // userFullname: user.fullname,
                type: 'TECHNICAL',
                isSelfReview: false,
                revieweeId: user.id,
                reviewerId: authUser.id,
                revieweeFullname: user.fullname,
                reviewerFullname: authUser.fullname,
              }
            }));
            history.push(`/admin/cfi/assessment/technical`);
          }}
        >
          Assess Technical
        </span>
        <span className="badge badge-secondary p-1 m-1" style={{ width: '120px', cursor: 'pointer' }}
          onClick={() => {
            // localStorage.setItem('peer_id', user.id)
            // history.push('/admin/cfi/peer-assessment-table')
            dispatch(setUtilities({
              cfiAssessment: {
                // userId: user.id,
                // userFullname: user.fullname,
                type: 'BEHAVIOURAL',
                isSelfReview: false,
                revieweeId: user.id,
                reviewerId: authUser.id,
                revieweeFullname: user.fullname,
                reviewerFullname: authUser.fullname,
              }
            }));
            history.push(`/admin/cfi/assessment/behavioural`);
          }}
        >
          Assess Behavioural
        </span>
      </div>
    )
  }

  const createCsv = () => {
    let headers = `Name,Division,Position,Self Review,Supervisor Review,Total Assessment\n`

    staffs.forEach(staff => {
      headers += staff.fullname + ','
      headers += staff.division + ','
      headers += `"${staff.positionName}"` + ','
      headers += staff.selfReviewProgress.split(' / ')[0] + ','
      headers += staff.reviewerReviewProgress.split(' / ')[0] + ','
      headers += staff.reviewerReviewProgress.split(' / ')[1].split(' ')[0] + '\n'
    });

    return headers
  }

  const staffs = data ? data.map(user => ({
    id: user.id,
    fullname: <UserFullname subordinate={user} authUser={authUser} />,
    division: user.Division?.name,
    positionName: user.positionName,
    selfLastUpdated: convertISODateToDDMMYYYY(user.selfLastUpdated),
    reviewerLastUpdated: convertISODateToDDMMYYYY(user.reviewerLastUpdated),
    selfReviewProgress: user.selfReviewProgress,
    reviewerReviewProgress: user.reviewerReviewProgress,
    actions: Actions(user)
  })).filter(user => user.id !== authUser.id) : [];

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className='m-4'>
        <Instructions texts={[
          'Anda diminta untuk melakukan Penilaian terhadap kompetensi technical/behaviour bawahan langsung Anda (staf/kepala kantor/kepala unit)',
          'Pilih tombol "assess" pada salah satu Anggota untuk mulai menilai masing-masing Anggota tim Anda'
        ]}
        />
      </div>

      <div className="d-flex justify-content-end m-2">
        <DownloadCsvButton
          data={createCsv()}
          filename={`staffs_evaluation_${new Date().getTime()}.csv`}
        />
      </div>

      <DataTable
        columns={columns}
        data={staffs}
        highlightOnHover
      />

      <div className='mb-4' />
    </>
  );
};

export default StaffEvaluation