export const columns = [
  {
    name: <h4>Ratee</h4>,
    width: '300px',
    selector: row => row.revieweeFullname,
    sortable: true,
  },
  {
    name: <h4>Ratee Division</h4>,
    width: '300px',
    selector: row => row.revieweeDivision,
    sortable: true,
  },
  {
    name: <h4>Ratee Level</h4>,
    width: '150px',
    selector: row => row.revieweeLevel,
    sortable: true,
  },
  {
    name: <h4>Rater</h4>,
    width: '300px',
    selector: row => row.reviewerFullname,
    sortable: true,
  },
  {
    name: <h4>Rater Division</h4>,
    width: '300px',
    selector: row => row.reviewerDivision,
    sortable: true,
  },
  {
    name: <h4>Rater Level</h4>,
    width: '150px',
    selector: row => row.reviewerLevel,
    sortable: true,
  },
  {
    name: <h4>Nomination</h4>,
    width: '150px',
    selector: 'isNominatedByReviewee',
    cell: row => (
      <span style={{ color: row.isNominatedByReviewee ? 'navy' : 'darkred' }}>
        {row.isNominatedByReviewee ? 'Nominated' : 'Unnominated'}
      </span>
    ),
    sortable: true,
  },
  {
    name: <h4>Approval</h4>,
    width: '150px',
    selector: 'isApproved',
    cell: row => (
      <span style={{ color: row.isApproved ? 'navy' : 'darkred' }}>
        {row.isApproved ? 'Approved' : 'Unnapproved'}
      </span>
    ),
    sortable: true,
  },
  {
    name: <h4>Actions</h4>,
    width: '300px',
    cell: row => row.actions,
  },
];