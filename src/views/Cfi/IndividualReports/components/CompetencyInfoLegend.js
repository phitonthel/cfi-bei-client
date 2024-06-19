import { CustomizedTable } from "./Table";

const rows = [
  ['Expected Score', 'Competency level required for your role'],
  ['Self Score', 'Your self-assessment score'],
  ['Average Validated Score', 'Average score from reviewers'],
  ['Gap', 'Difference between Average Validated Score and Expected Score'],
  ['Competency Status', 'Whether you have met the competency level required for your role'],
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