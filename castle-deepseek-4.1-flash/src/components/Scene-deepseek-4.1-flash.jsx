import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, Sky } from '@react-three/drei'
import { Suspense } from 'react'
import Castle from './Castle-deepseek-4.1-flash'
import Lighting from './Lighting-deepseek-4.1-flash'
import Controls from './Controls-deepseek-4.1-flash'

export default function Scene({ autoRotate, cameraTarget }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [17, 12, 23], fov: 42, near: 0.1, far: 220 }}
      gl={{ antialias: true, toneMappingExposure: 1.08 }}
    >
      <color attach="background" args={['#8a9bb0']} />
      <fog attach="fog" args={['#94a3b5', 30, 76]} />
      <Suspense fallback={null}>
        <Sky sunPosition={[22, 27, 10]} turbidity={7} rayleigh={0.7} mieCoefficient={0.006} />
        <Lighting />
        <Castle />
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.38}
          scale={50}
          blur={2.4}
          far={18}
        />
        <Environment preset="sunset" environmentIntensity={0.38} />
      </Suspense>
      <Controls autoRotate={autoRotate} cameraTarget={cameraTarget} />
    </Canvas>
  )
}
