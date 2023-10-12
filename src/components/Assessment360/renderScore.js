export const renderScore = (score, type) => {
  if (type === '360') {
    if (score === 1) return 'Tidak Pernah'
    if (score === 2) return 'Jarang'
    if (score === 3) return 'Kadang-kadang'
    if (score === 4) return 'Sering'
    if (score === 5) return 'Konsisten'
  }
  return 'N/A'
}