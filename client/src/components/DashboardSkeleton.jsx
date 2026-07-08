function DashboardSkeleton() {
  return (
    <>
      <div className="row row-cols-2 row-cols-md-4 g-3 mb-4 align-items-stretch mx-0">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="col" key={index}>
            <div className="card card-material h-100">
              <div className="card-body d-flex flex-column gap-2">
                <span className="skeleton skeleton-badge" />
                <span
                  className="skeleton skeleton-line"
                  style={{ width: '60%', height: '1.5rem' }}
                />
                <span className="skeleton skeleton-line" style={{ width: '80%' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-3 mb-4 align-items-stretch mx-0">
        {Array.from({ length: 2 }).map((_, index) => (
          <div className="col" key={index}>
            <div className="card card-material h-100">
              <div className="card-body d-flex flex-column">
                <span
                  className="skeleton skeleton-line mb-3"
                  style={{ width: '40%', height: '1rem' }}
                />
                <span className="skeleton theme-chart-area" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card card-material mb-4">
        <div className="card-body d-flex flex-column gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} className="skeleton skeleton-line" style={{ height: '1.25rem' }} />
          ))}
        </div>
      </div>
    </>
  )
}

export default DashboardSkeleton
