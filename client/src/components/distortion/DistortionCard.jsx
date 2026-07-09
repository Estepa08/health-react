import { useRef, useState } from 'react'

const SWIPE_THRESHOLD_X = 100
const SWIPE_THRESHOLD_Y = 80
const EXIT_DISTANCE = 500

function DistortionCard({ thought, onSwipe, disabled }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isExiting, setIsExiting] = useState(null)
  const startRef = useRef(null)

  const handlePointerDown = (e) => {
    if (disabled || isExiting) return
    setIsDragging(true)
    startRef.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDragging || !startRef.current) return
    setOffset({ x: e.clientX - startRef.current.x, y: e.clientY - startRef.current.y })
  }

  const finishDrag = () => {
    if (!isDragging) return
    setIsDragging(false)

    const { x, y } = offset
    const absX = Math.abs(x)

    if (y > SWIPE_THRESHOLD_Y && y > absX) {
      triggerSwipe('down')
    } else if (absX > SWIPE_THRESHOLD_X) {
      triggerSwipe(x < 0 ? 'left' : 'right')
    } else {
      setOffset({ x: 0, y: 0 })
    }
  }

  const triggerSwipe = (direction) => {
    if (disabled) return
    setIsExiting(direction)
    const exitOffset =
      direction === 'left'
        ? { x: -EXIT_DISTANCE, y: -40 }
        : direction === 'right'
          ? { x: EXIT_DISTANCE, y: -40 }
          : { x: 0, y: EXIT_DISTANCE }
    setOffset(exitOffset)
    setTimeout(() => onSwipe(direction), 220)
  }

  const rotation = Math.max(-20, Math.min(20, offset.x / 12))
  const disagreeOpacity = Math.min(1, Math.max(0, offset.x) / SWIPE_THRESHOLD_X)
  const agreeOpacity = Math.min(1, Math.max(0, -offset.x) / SWIPE_THRESHOLD_X)
  const unsureOpacity = Math.min(1, Math.max(0, offset.y) / SWIPE_THRESHOLD_Y)

  return (
    <div className="d-flex flex-column align-items-center px-3 px-sm-5">
      <div
        className="card distortion-card"
        style={{
          width: '320px',
          maxWidth: '100%',
          height: '420px',
          touchAction: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg)`,
          transition: isDragging ? 'none' : 'transform 220ms ease',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        <div className="card-body d-flex flex-column justify-content-center align-items-center text-center position-relative">
          <span
            className="distortion-swipe-badge distortion-swipe-badge-agree"
            style={{ opacity: agreeOpacity }}
          >
            Согласен
          </span>
          <span
            className="distortion-swipe-badge distortion-swipe-badge-disagree"
            style={{ opacity: disagreeOpacity }}
          >
            Не согласен
          </span>
          <span
            className="distortion-swipe-badge distortion-swipe-badge-unsure"
            style={{ opacity: unsureOpacity }}
          >
            Не уверен
          </span>
          <p className="card-ink-title distortion-thought mb-0">{thought}</p>
        </div>
      </div>

      <div
        className="d-flex justify-content-between mt-3"
        style={{ width: '320px', maxWidth: '100%' }}
      >
        <button
          type="button"
          className="btn btn-outline-secondary"
          disabled={disabled}
          onClick={() => triggerSwipe('right')}
        >
          Не согласен
        </button>
        <button
          type="button"
          className="btn btn-outline-warning"
          disabled={disabled}
          onClick={() => triggerSwipe('down')}
        >
          Не уверен
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          disabled={disabled}
          onClick={() => triggerSwipe('left')}
        >
          Согласен
        </button>
      </div>
    </div>
  )
}

export default DistortionCard
