import { useState } from 'react'
import Scene from './components/Scene-qwen-3.8-flash'
import UIOverlay from './components/UIOverlay-qwen-3.8-flash'
import { GENERATION_MODEL } from './generated-by-qwen-3.8-flash'

export default function App() {
  const [autoRotate, setAutoRotate] = useState(true)
  const [cameraTarget, setCameraTarget] = useState(null)
  const [activePreset, setActivePreset] = useState(null)

  const handleSelectPreset = (preset) => {
    setAutoRotate(false)
    setActivePreset(preset.id)
    setCameraTarget({
      id: preset.id,
      position: preset.position,
      target: preset.target,
    })
  }

  return (
    <div className="relative h-full w-full" data-generation-model={GENERATION_MODEL}>
      <Scene autoRotate={autoRotate} cameraTarget={cameraTarget} />
      <UIOverlay
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate((value) => !value)}
        activePreset={activePreset}
        onSelectPreset={handleSelectPreset}
      />
    </div>
  )
}
