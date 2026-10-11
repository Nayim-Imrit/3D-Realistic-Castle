export default function Lighting() {
  return (
    <>
      <hemisphereLight args={['#b8a6ff', '#241c30', 0.5]} />
      <ambientLight intensity={0.3} color="#b9b3d6" />
      <directionalLight
        castShadow
        position={[-16, 24, 18]}
        intensity={2.0}
        color="#ffd9b0"
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
      <directionalLight position={[16, 12, -14]} intensity={0.5} color="#7fd8c8" />
      <pointLight position={[0, 3.6, 10.8]} intensity={1.5} distance={16} color="#7ce0c8" />
      <pointLight position={[0, 7.6, -2.4]} intensity={0.5} distance={20} color="#b08cff" />
    </>
  )
}
