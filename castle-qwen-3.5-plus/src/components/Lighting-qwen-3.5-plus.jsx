export default function Lighting() {
  return (
    <>
      <hemisphereLight args={['#ffe6b8', '#4a3320', 0.5]} />
      <ambientLight intensity={0.3} color="#e8d3a8" />
      <directionalLight
        castShadow
        position={[24, 26, 16]}
        intensity={2.4}
        color="#ffdca0"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={95}
        shadow-camera-left={-32}
        shadow-camera-right={32}
        shadow-camera-top={32}
        shadow-camera-bottom={-32}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-14, 12, -12]} intensity={0.35} color="#9db6e0" />
      <pointLight position={[0, 3.6, 10.8]} intensity={1.6} distance={16} color="#ffb457" />
      <pointLight position={[0, 7.6, -2.4]} intensity={0.55} distance={20} color="#ffd08a" />
    </>
  )
}
