import { useState } from 'react'
import Scene from './components/Scene-grok4.6'
import UIOverlay from './components/UIOverlay-grok4.6'
import { GENERATION_MODEL } from './generated-by-grok4.6'

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
