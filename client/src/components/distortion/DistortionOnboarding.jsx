function DistortionOnboarding({ onStart }) {
  return (
    <div className="d-flex flex-column align-items-center px-3 px-sm-5">
      <h5 className="card-ink-title mb-3 text-center">Как играть</h5>

      <div
        className="card distortion-card survey-card-width distortion-onboarding-card"
        style={{ height: '260px' }}
      >
        <div className="card-body d-flex flex-column justify-content-center align-items-center text-center position-relative">
          <span className="distortion-swipe-badge distortion-swipe-badge-agree distortion-onboarding-badge-agree">
            ✓ Согласен
          </span>
          <span className="distortion-swipe-badge distortion-swipe-badge-disagree distortion-onboarding-badge-disagree">
            ✕ Не согласен
          </span>
          <span className="distortion-swipe-badge distortion-swipe-badge-unsure distortion-onboarding-badge-unsure">
            ? Не уверен
          </span>
          <p className="card-ink-title distortion-thought mb-0">Пример: «Я всегда всё порчу»</p>
        </div>
      </div>

      <ul className="distortion-onboarding-legend list-unstyled mt-4 mb-4 w-100">
        <li>
          <span
            className="distortion-onboarding-legend-icon"
            style={{ backgroundColor: '#3a6d5a' }}
            aria-hidden="true"
          >
            ✓
          </span>
          Смахни карточку влево — если согласен с мыслью
        </li>
        <li>
          <span
            className="distortion-onboarding-legend-icon"
            style={{ backgroundColor: '#b3402f' }}
            aria-hidden="true"
          >
            ✕
          </span>
          Смахни вправо — если не согласен
        </li>
        <li>
          <span
            className="distortion-onboarding-legend-icon"
            style={{ backgroundColor: '#c9930f' }}
            aria-hidden="true"
          >
            ?
          </span>
          Смахни вниз — если не уверен
        </li>
      </ul>

      <button type="button" className="btn btn-primary survey-card-width" onClick={onStart}>
        Понятно, начать
      </button>
    </div>
  )
}

export default DistortionOnboarding
