import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, Sky } from '@react-three/drei'
import { Suspense } from 'react'
import Castle from './Castle-qwen-3.5-plus'
import Lighting from './Lighting-qwen-3.5-plus'
import Controls from './Controls-qwen-3.5-plus'

export default function Scene({ autoRotate, cameraTarget }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [17, 12, 23], fov: 42, near: 0.1, far: 220 }}
      gl={{ antialias: true, toneMappingExposure: 1.06 }}
    >
      <color attach="background" args={['#c8b48c']} />
      <fog attach="fog" args={['#d3c39c', 32, 78]} />
      <Suspense fallback={null}>
        <Sky sunPosition={[24, 26, 16]} turbidity={4} rayleigh={0.5} mieCoefficient={0.005} />
        <Lighting />
        <Castle />
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.36}
          scale={50}
          blur={2.4}
          far={18}
        />
        <Environment preset="sunset" environmentIntensity={0.4} />
      </Suspense>
      <Controls autoRotate={autoRotate} cameraTarget={cameraTarget} />
    </Canvas>
  )
}
