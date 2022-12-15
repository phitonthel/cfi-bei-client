export const dataFactory = () => {
  return Array(25).fill(1).map(n => {
    return {
      divisionName: `Sumber Daya Manusia ${Math.ceil(Math.random() * 20)}`,
      numberOfStaff: Math.ceil(Math.random() * 100),
      competencies: {
        AAA: {
          meet: {
            numberOfStaff: Math.ceil(Math.random() * 100),
            percentage: Math.ceil(Math.random() * 100)
          },
          notMeet: {
            numberOfStaff: Math.ceil(Math.random() * 100),
            percentage: Math.ceil(Math.random() * 100)
          },
        },
        BBB: {
          meet: {
            numberOfStaff: Math.ceil(Math.random() * 100),
            percentage: Math.ceil(Math.random() * 100)
          },
          notMeet: {
            numberOfStaff: Math.ceil(Math.random() * 100),
            percentage: Math.ceil(Math.random() * 100)
          },
        },
        CCC: {
          meet: {
            numberOfStaff: Math.ceil(Math.random() * 100),
            percentage: Math.ceil(Math.random() * 100)
          },
          notMeet: {
            numberOfStaff: Math.ceil(Math.random() * 100),
            percentage: Math.ceil(Math.random() * 100)
          },
        },
      }
    }
  })
}