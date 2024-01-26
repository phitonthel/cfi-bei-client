import styled from 'styled-components';

const StyledTable = styled.table`
  font-size: 14px;
  border-collapse: separate;
  border-spacing: 0 0.5em;
`;

const StyledTr = styled.tr`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
`;

const renderRow = (cols) => {
  return (
    <StyledTr>
      {
        cols.map(col =>
          <td style={{ padding: '8px' }}>
            {col}
          </td>
        )
      }
    </StyledTr>
  );
}

const rows = [
  ['Expected Score in Current Position', 'Competency level required by the IDX for your current position'],
  ['Self Score', 'Self-assessment conducted by you'],
  ['Actual Score', 'Actual assessment that has been validated by the direct supervisor'],
  ['Gap', 'Actual Score - Expected Score'],
  ['Meet', 'Competencies that fulfill the current position'],
  ['Need Development', 'Requires competency development'],
]

const rowsTechnical = [
  ['1', 'Knowledgeable'],
  ['2', 'Practitioner'],
  ['3', 'Advanced'],
  ['4', 'Expert'],
]

const rowsBehavioural = [
  ['1', 'Basic'],
  ['2', 'Capable'],
  ['3', 'Influencing'],
  ['4', 'Inspiring'],
]

const CompetencyInfoLegend = () => {
  return (
    <div className="row mb-4 p-4">
      <div className="col-md-12">
        <h3>Competency Assessment Legend</h3>

        <StyledTable className="table table-sm">
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th className="col-4">Category</th>
              <th className="col-8">Description</th>
            </tr>
          </thead>
          <tbody>
            {
              rows.map(row => renderRow(row))
            }
          </tbody>
        </StyledTable>

        <StyledTable className="table table-sm">
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th className="col-4">Score of Technical</th>
              <th className="col-8">Level of Technical</th>
            </tr>
          </thead>
          <tbody>
            {
              rowsTechnical.map(row => renderRow(row))
            }
          </tbody>
        </StyledTable>

        <StyledTable className="table table-sm">
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th className="col-4">Score of Behavioural</th>
              <th className="col-8">Level of Behavioural</th>
            </tr>
          </thead>
          <tbody>
            {
              rowsBehavioural.map(row => renderRow(row))
            }
          </tbody>
        </StyledTable>

      </div>
    </div>
  );
}

export default CompetencyInfoLegend;