import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, Sky } from '@react-three/drei'
import { Suspense } from 'react'
import Castle from './Castle-qwen-3.8-flash'
import Lighting from './Lighting-qwen-3.8-flash'
import Controls from './Controls-qwen-3.8-flash'

export default function Scene({ autoRotate, cameraTarget }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [17, 12, 23], fov: 42, near: 0.1, far: 220 }}
      gl={{ antialias: true, toneMappingExposure: 1.02 }}
    >
      <color attach="background" args={['#6f6a96']} />
      <fog attach="fog" args={['#8a86ad', 32, 78]} />
      <Suspense fallback={null}>
        <Sky sunPosition={[-16, 24, 18]} turbidity={9} rayleigh={1.2} mieCoefficient={0.006} />
        <Lighting />
        <Castle />
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.4}
          scale={50}
          blur={2.6}
          far={18}
        />
        <Environment preset="sunset" environmentIntensity={0.42} />
      </Suspense>
      <Controls autoRotate={autoRotate} cameraTarget={cameraTarget} />
    </Canvas>
  )
}
