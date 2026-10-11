import { useEffect, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'

export default function Controls({ autoRotate, cameraTarget }) {
  const controlsRef = useRef(null)
  const { camera } = useThree()
  const tweenRef = useRef(null)

  useEffect(() => {
    if (!cameraTarget || !controlsRef.current) return

    const controls = controlsRef.current
    const lookTarget = controls.target.clone()
    const destPosition = new THREE.Vector3(...cameraTarget.position)
    const destTarget = new THREE.Vector3(...cameraTarget.target)

    tweenRef.current?.kill()
    tweenRef.current = gsap.to(camera.position, {
      x: destPosition.x,
      y: destPosition.y,
      z: destPosition.z,
      duration: 1.45,
      ease: 'power2.inOut',
      onUpdate: () => {
        lookTarget.lerp(destTarget, 0.12)
        controls.target.copy(lookTarget)
        controls.update()
      },
      onComplete: () => {
        controls.target.copy(destTarget)
        controls.update()
      },
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [camera, cameraTarget])

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={6}
      maxDistance={42}
      maxPolarAngle={Math.PI / 2.05}
      autoRotate={autoRotate}
      autoRotateSpeed={0.55}
      target={[0, 2.6, 0]}
    />
  )
}
