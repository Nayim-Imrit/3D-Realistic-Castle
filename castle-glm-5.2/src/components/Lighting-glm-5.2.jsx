export default function Lighting() {
  return (
    <>
      <hemisphereLight args={['#a6ccff', '#3a2a1c', 0.45]} />
      <ambientLight intensity={0.26} color="#cbbba3" />
      <directionalLight
        castShadow
        position={[20, 28, 14]}
        intensity={2.2}
        color="#ffd9a6"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={90}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-16, 11, -12]} intensity={0.32} color="#8aa4c8" />
      <pointLight position={[0, 3.4, 10.6]} intensity={1.5} distance={15} color="#e8a84a" />
      <pointLight position={[0, 7.2, -2.4]} intensity={0.55} distance={18} color="#ffcc88" />
    </>
  )
}
