import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import { fetchAllUsers } from '../../../apis/user/fetchAllUsers';
import FilteredDataTable from '../../../components/FilteredDataTable';
import { deleteCfiNominationById, fetchCfiNominationsForAdmin } from '../../../apis/cfi/cfiNominations';
import { fireSwalError } from 'apis/fireSwal';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import NominateCfiUserModal from '../../../components/Modal/NominateCfiUserModal';
import { fireSwalSuccess } from 'apis/fireSwal';
import Swal from 'sweetalert2';

const columns = [
  {
    name: <b>Reviewee Name</b>,
    selector: row => row.revieweeFullname,
    sortable: true,
    wrap: true,
  },
  {
    name: <b>Reviewee Position</b>,
    selector: row => row.revieweePosition,
    sortable: true,
    wrap: true,
  },
  {
    name: <b>Reviewee Division</b>,
    selector: row => row.revieweeDivision,
    sortable: true,
    wrap: true,
  },
  {
    name: <b>Reviewee Unit</b>,
    selector: row => row.revieweeUnit,
    sortable: true,
    wrap: true,
  },
  {
    name: <b>Reviewer Name</b>,
    selector: row => row.reviewerFullname,
    sortable: true,
    wrap: true,
  },
  {
    name: <b>Reviewer Position</b>,
    selector: row => row.reviewerPosition,
    sortable: true,
    wrap: true,
  },
  {
    name: <b>Reviewer Division</b>,
    selector: row => row.reviewerDivision,
    sortable: true,
    wrap: true,
  },
  {
    name: <b>Reviewer Unit</b>,
    selector: row => row.reviewerUnit,
    sortable: true,
    wrap: true,
  },
  {
    name: <b>Competency Mapping</b>,
    selector: row => row.cfiRole,
    sortable: true,
    wrap: true,
  },
  {
    name: <b>Actions</b>,
    cell: (row) => Actions(row.id, row.refetch),
  },
];

const Actions = (nominationId, refetch) => {
  return (
    <div>
      <span
        className="badge badge-danger mx-1"
        style={{ cursor: 'pointer ' }}
        onClick={async (e) => {
          e.preventDefault();
          try {
            const result = await Swal.fire({
              title: `This cannot be undone!`,
              text: `Deleting the nomination will also delete the assessments associated with it. Are you sure you want to delete this nomination?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: `Yes`,
              cancelButtonText: `Cancel`,
            })

            if (!result.isConfirmed) {
              return
            }

            await deleteCfiNominationById(nominationId);
            fireSwalSuccess({ text: 'Nomination deleted!' });
          } catch (error) {
            fireSwalError(error);
          } finally {
            refetch()
          }
        }}
      >
        Delete
      </span>
    </div>
  )
}

const AssigneeManagement = () => {
  const appUtilities = useSelector(state => state.app.utilities);

  const { data: cfiNominations, error, isLoading, refetch } = useQuery(
    ['fetchCfiNominationsForAdmin', { cfiTypeAssessmentId: appUtilities.cfiTypeAssessment.id }],
    fetchCfiNominationsForAdmin,
    {
      onError: fireSwalError,
    }
  );

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="d-flex justify-content-end m-2">
        <NominateCfiUserModal
          modalTitle={'Create Nomination'}
          buttonText={'Create Nomination'}
          onSubmitFinish={() => {
            refetch()
          }}
        />
      </div>
      <FilteredDataTable
        columns={columns}
        data={cfiNominations.map(nomination => {
          return {
            ...nomination,
            refetch
          }
        })}
        filterKeys={['revieweeFullname', 'revieweeDivision', 'revieweeLevel', 'reviewerFullname', 'reviewerDivision', 'reviewerLevel', 'cfiRole']}
        otherProps={{ title: appUtilities.cfiTypeAssessment.name }}
      />
    </div>
  );
};

export default AssigneeManagement;
