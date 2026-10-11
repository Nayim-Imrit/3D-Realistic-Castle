export default function Lighting() {
  return (
    <>
      <hemisphereLight args={['#9ec9ff', '#3a2a1c', 0.42]} />
      <ambientLight intensity={0.28} color="#c9b8a0" />
      <directionalLight
        castShadow
        position={[18, 26, 12]}
        intensity={2.15}
        color="#ffd6a0"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={80}
        shadow-camera-left={-28}
        shadow-camera-right={28}
        shadow-camera-top={28}
        shadow-camera-bottom={-28}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-14, 10, -10]} intensity={0.35} color="#8aa4c8" />
      <pointLight position={[0, 3.4, 10.2]} intensity={1.4} distance={14} color="#e8a84a" />
      <pointLight position={[0, 6.8, -2.2]} intensity={0.55} distance={18} color="#ffcc88" />
    </>
  )
}
