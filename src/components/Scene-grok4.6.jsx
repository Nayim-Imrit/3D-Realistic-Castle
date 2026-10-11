import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, Sky } from '@react-three/drei'
import { Suspense } from 'react'
import Castle from './Castle-grok4.6'
import Lighting from './Lighting-grok4.6'
import Controls from './Controls-grok4.6'

export default function Scene({ autoRotate, cameraTarget }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [16, 11, 22], fov: 42, near: 0.1, far: 200 }}
      gl={{ antialias: true, toneMappingExposure: 1.05 }}
    >
      <color attach="background" args={['#87a8c4']} />
      <fog attach="fog" args={['#9bb6cc', 28, 70]} />
      <Suspense fallback={null}>
        <Sky sunPosition={[18, 26, 12]} turbidity={6} rayleigh={0.6} mieCoefficient={0.005} />
        <Lighting />
        <Castle />
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.38}
          scale={48}
          blur={2.4}
          far={18}
        />
        <Environment preset="sunset" environmentIntensity={0.35} />
      </Suspense>
      <Controls autoRotate={autoRotate} cameraTarget={cameraTarget} />
    </Canvas>
  )
}
