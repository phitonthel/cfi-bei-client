const ScoringLegend = () => (
  <div className="card mb-4 border-secondary"> {/* Custom border color */}
    <div className="card-header text-white bg-secondary"> {/* Custom background color */}
      <h5 className="mb-2">Skala Penilaian:</h5>
    </div>
    <div className="card-body bg-light"> {/* Light background for the body */}
      <p className="card-text p-0 m-0"><strong>5:</strong> Secara konsisten melebihi standar perilaku yang diharapkan.</p>
      <p className="card-text p-0 m-0"><strong>4:</strong> Menampilkan perilaku yang cenderung melebihi standar yang diharapkan.</p>
      <p className="card-text p-0 m-0"><strong>3:</strong> Menampilkan perilaku sesuai dengan standar yang diharapkan.</p>
      <p className="card-text p-0 m-0"><strong>2:</strong> Tidak konsisten dalam menampilkan perilaku yang diharapkan atau hanya menampilkan sebagian dari standar perilaku yang diharapkan.</p>
      <p className="card-text p-0 m-0"><strong>1:</strong> Hampir tidak pernah atau tidak menampilkan perilaku yang diharapkan sama sekali.</p>
    </div>
  </div>
);


export default ScoringLegend