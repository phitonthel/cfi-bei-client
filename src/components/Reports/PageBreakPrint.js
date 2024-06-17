import styled from 'styled-components';

const PageBreak = styled.div`
  page-break-before: always;
`;

const PageBreakPrint = () => {
  return <PageBreak id="pagebreakprint"></PageBreak>
}

export default PageBreakPrint;
