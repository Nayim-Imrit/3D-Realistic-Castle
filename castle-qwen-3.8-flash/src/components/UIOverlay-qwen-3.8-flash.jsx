import { CAMERA_PRESETS } from '../data/cameraPresets-qwen-3.8-flash'

export default function UIOverlay({
  autoRotate,
  onToggleAutoRotate,
  activePreset,
  onSelectPreset,
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6">
      <header className="pointer-events-auto max-w-xl rounded-2xl border border-violet-300/20 bg-[#151228e8] px-5 py-4 text-stone-100 shadow-2xl backdrop-blur-md">
        <p className="font-display text-[11px] tracking-[0.28em] text-emerald-200/90 uppercase">
          Interactive 3D Keep
        </p>
        <h1 className="font-display mt-1 text-2xl font-bold text-stone-50 sm:text-3xl">
          Ironhold Keep
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-300">
          Drag to orbit, scroll to zoom, right-drag to pan. Choose a vantage below or let the
          keep turn on its own.
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
                    ? 'border-emerald-300/80 bg-emerald-300 text-[#10201c] shadow-lg'
                    : 'border-white/15 bg-[#151228e8] text-stone-100 hover:border-emerald-300/50 hover:bg-[#1d1a38]'
                }`}
              >
                <span className="font-display block text-sm font-semibold">{preset.label}</span>
                <span className={`mt-0.5 block text-[11px] ${isActive ? 'text-[#274a40]' : 'text-stone-400'}`}>
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
              ? 'border-emerald-300/80 bg-emerald-300 text-[#10201c]'
              : 'border-white/15 bg-[#151228e8] text-stone-100 hover:border-emerald-300/50'
          }`}
        >
          {autoRotate ? 'Auto-Rotate On' : 'Auto-Rotate Off'}
        </button>
      </div>
    </div>
  )
}
