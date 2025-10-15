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

const Row = ({cols}) => {
  return (
    <StyledTr>
      {
        cols.map((col, index) =>
          <td style={{ padding: '8px' }} key={index}>
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
            headers.map((header, index) => <th className={header.className} key={index}>{header.text}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          rows.map((row, index) => <Row cols={row} key={index} />)
        }
      </tbody>
    </StyledTable>
  );
}