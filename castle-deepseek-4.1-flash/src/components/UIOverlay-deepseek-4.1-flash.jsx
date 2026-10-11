import { CAMERA_PRESETS } from '../data/cameraPresets-deepseek-4.1-flash'

export default function UIOverlay({
  autoRotate,
  onToggleAutoRotate,
  activePreset,
  onSelectPreset,
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6">
      <header className="pointer-events-auto max-w-xl rounded-2xl border border-orange-300/20 bg-[#1a1210e8] px-5 py-4 text-stone-100 shadow-2xl backdrop-blur-md">
        <p className="font-display text-[11px] tracking-[0.28em] text-orange-200/90 uppercase">
          Interactive 3D Bastion
        </p>
        <h1 className="font-display mt-1 text-2xl font-bold text-stone-50 sm:text-3xl">
          Dragonstone Bastion
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-300">
          Drag to orbit, scroll to zoom, right-drag to pan. Choose a vantage below or let the
          fortress turn on its own.
        </p>
      </header>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="pointer-events-auto grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {CAMERA_PRESETS.map((preset) => {
            const isActive = activePreset === preset.id
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset)}
                className={`rounded-xl border px-3 py-2 text-left transition ${
                  isActive
                    ? 'border-orange-300/80 bg-orange-400 text-[#20100a] shadow-lg'
                    : 'border-white/15 bg-[#1a1210e8] text-stone-100 hover:border-orange-300/50 hover:bg-[#241816]'
                }`}
              >
                <span className="font-display block text-sm font-semibold">{preset.label}</span>
                <span className={`mt-0.5 block text-[11px] ${isActive ? 'text-[#57341c]' : 'text-stone-400'}`}>
                  {preset.description}
                </span>
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={onToggleAutoRotate}
          className={`pointer-events-auto rounded-xl border px-4 py-3 font-display text-sm font-semibold tracking-wide transition ${
            autoRotate
              ? 'border-orange-300/80 bg-orange-400 text-[#20100a]'
              : 'border-white/15 bg-[#1a1210e8] text-stone-100 hover:border-orange-300/50'
          }`}
        >
          {autoRotate ? 'Auto-Rotate On' : 'Auto-Rotate Off'}
        </button>
      </div>
    </div>
  )
}
