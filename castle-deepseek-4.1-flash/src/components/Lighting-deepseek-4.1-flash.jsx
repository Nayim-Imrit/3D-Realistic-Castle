export default function Lighting() {
  return (
    <>
      <hemisphereLight args={['#a0bce0', '#3a2418', 0.42]} />
      <ambientLight intensity={0.24} color="#c8b39a" />
      <directionalLight
        castShadow
        position={[22, 27, 10]}
        intensity={2.35}
        color="#ffcf94"
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
      <directionalLight position={[-16, 11, -12]} intensity={0.3} color="#7f9ac0" />
      <pointLight position={[0, 3.6, 10.8]} intensity={1.7} distance={16} color="#ff9a3c" />
      <pointLight position={[0, 7.4, -2.4]} intensity={0.6} distance={20} color="#ffb066" />
      <pointLight position={[-7, 2.2, -7]} intensity={0.5} distance={12} color="#ff7a2a" />
    </>
  )
}
