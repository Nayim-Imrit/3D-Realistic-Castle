import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, Sky } from '@react-three/drei'
import { Suspense } from 'react'
import Castle from './Castle-glm-5.2'
import Lighting from './Lighting-glm-5.2'
import Controls from './Controls-glm-5.2'

export default function Scene({ autoRotate, cameraTarget }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [17, 12, 23], fov: 42, near: 0.1, far: 220 }}
      gl={{ antialias: true, toneMappingExposure: 1.05 }}
    >
      <color attach="background" args={['#8fb0ca']} />
      <fog attach="fog" args={['#9bb6cc', 30, 74]} />
      <Suspense fallback={null}>
        <Sky sunPosition={[20, 28, 14]} turbidity={6} rayleigh={0.6} mieCoefficient={0.005} />
        <Lighting />
        <Castle />
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.36}
          scale={50}
          blur={2.4}
          far={18}
        />
        <Environment preset="sunset" environmentIntensity={0.35} />
      </Suspense>
      <Controls autoRotate={autoRotate} cameraTarget={cameraTarget} />
    </Canvas>
  )
}
