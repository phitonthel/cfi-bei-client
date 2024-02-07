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

export const CustomizedTable = ({
  headers,
  rows,
}) => {
  return (
    <StyledTable className="table table-sm">
      <thead>
        <tr style={{ backgroundColor: '#f8f9fa' }}>
          {
            headers.map(header => <th className={header.className}>{header.text}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          rows.map(row => renderRow(row))
        }
      </tbody>
    </StyledTable>
  );
}