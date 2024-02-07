import { CustomizedTable } from "./Table";

const rows = [
  ['Expected Score in Current Position', 'Competency level required by the IDX for your current position'],
  ['Self Score', 'Self-assessment conducted by you'],
  ['Validated Score', 'Validated assessment that has been validated by the direct supervisor'],
  ['Gap between validated score and expected score', 'Validated Score - Expected Score'],
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

        <CustomizedTable 
          headers={[
            { text: 'Category', className: 'col-4' },
            { text: 'Description', className: 'col-8' }
          ]}
          rows={rows}
        />

        <CustomizedTable 
          headers={[
            { text: 'Score of Technical', className: 'col-4' },
            { text: 'Level of Technical', className: 'col-8' }
          ]}
          rows={rowsTechnical}
        />

        <CustomizedTable 
          headers={[
            { text: 'Score of Behavioural', className: 'col-4' },
            { text: 'Level of Behavioural', className: 'col-8' }
          ]}
          rows={rowsBehavioural}
        />
      </div>
    </div>
  );
}

export default CompetencyInfoLegend;