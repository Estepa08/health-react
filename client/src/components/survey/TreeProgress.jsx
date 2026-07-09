import { useCallback, useEffect, useRef } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

function TreeProgress({ progress = 0 }) {
  const dotLottieRef = useRef(null)
  const progressRef = useRef(progress)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  const applyProgress = useCallback(() => {
    const dotLottie = dotLottieRef.current
    if (!dotLottie || !dotLottie.totalFrames) return
    const clamped = Math.max(0, Math.min(100, progressRef.current))
    dotLottie.setFrame((clamped / 100) * (dotLottie.totalFrames - 1))
  }, [])

  const dotLottieRefCallback = useCallback(
    (dotLottie) => {
      dotLottieRef.current = dotLottie
      if (!dotLottie) return
      dotLottie.addEventListener('load', applyProgress)
    },
    [applyProgress]
  )

  useEffect(() => {
    applyProgress()
  }, [progress, applyProgress])

  return (
    <div className="tree-progress" aria-hidden="true">
      <DotLottieReact
        src="https://lottie.host/e4122c05-67ec-4103-83d1-af8f76ae6519/IuAMP20Smo.lottie"
        autoplay={false}
        loop={false}
        dotLottieRefCallback={dotLottieRefCallback}
      />
    </div>
  )
}

export default TreeProgress
