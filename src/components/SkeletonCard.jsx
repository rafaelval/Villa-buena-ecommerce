const SkeletonCard = () => {
  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm p-3">
        <div className="placeholder-glow" style={{ height: "200px" }}>
          <span className="placeholder col-12 h-100"></span>
        </div>

        <div className="card-body">
          <p className="card-title placeholder-glow">
            <span className="placeholder col-8"></span>
          </p>

          <p className="placeholder-glow">
            <span className="placeholder col-6"></span>
          </p>

          <div className="d-flex gap-2 mt-3">
            <span className="placeholder col-5 btn btn-secondary disabled"></span>
            <span className="placeholder col-5 btn btn-secondary disabled"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
