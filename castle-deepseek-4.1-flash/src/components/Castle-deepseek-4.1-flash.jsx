import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STONE = '#5a5450'
const STONE_DARK = '#3b3632'
const STONE_LIGHT = '#7d746c'
const ROOF = '#b5502a'
const ROOF_DARK = '#8a3a1c'
const WOOD = '#4f3520'
const WOOD_DARK = '#2f1e12'
const BANNER = '#a33024'
const MOAT = '#2a3a3c'
const GRASS = '#4a4a38'
const DIRT = '#5c4a3a'
const GOLD = '#d4af37'

function Battlements({ width, depth, height = 0.42, crenel = 0.4, position = [0, 0, 0] }) {
  const blocks = useMemo(() => {
    const list = []
    const countX = Math.max(2, Math.floor(width / crenel))
    const countZ = Math.max(2, Math.floor(depth / crenel))
    const stepX = width / countX
    const stepZ = depth / countZ
    const startX = -width / 2 + stepX / 2
    const startZ = -depth / 2 + stepZ / 2

    for (let i = 0; i < countX; i += 1) {
      if (i % 2 === 0) {
        list.push([startX + i * stepX, height / 2, startZ])
        list.push([startX + i * stepX, height / 2, -startZ])
      }
    }
    for (let j = 1; j < countZ - 1; j += 1) {
      if (j % 2 === 0) {
        list.push([startX, height / 2, startZ + j * stepZ])
        list.push([-startX, height / 2, startZ + j * stepZ])
      }
    }
    return list
  }, [width, depth, crenel, height])

  return (
    <group position={position}>
      {blocks.map((pos, index) => (
        <mesh key={index} position={pos} castShadow receiveShadow>
          <boxGeometry args={[crenel * 0.72, height, crenel * 0.72]} />
          <meshStandardMaterial color={STONE_LIGHT} roughness={0.86} metalness={0.06} />
        </mesh>
      ))}
    </group>
  )
}

function Window({ position, rotation = [0, 0, 0], size = [0.28, 0.55, 0.08] }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color="#140f0c"
        roughness={0.35}
        metalness={0.15}
        emissive="#7a3410"
        emissiveIntensity={0.55}
      />
    </mesh>
  )
}

function Banner({ position, rotation = [0, 0, 0], color = BANNER }) {
  const flagRef = useRef()

  useFrame(({ clock }) => {
    if (flagRef.current) {
      flagRef.current.rotation.y = Math.sin(clock.elapsedTime * 2.4) * 0.24
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.8, 8]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.7} metalness={0.05} />
      </mesh>
      <group ref={flagRef} position={[0, 1.35, 0]}>
        <mesh position={[0.28, 0, 0]} castShadow>
          <planeGeometry args={[0.55, 0.7]} />
          <meshStandardMaterial color={color} roughness={0.78} metalness={0.02} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <mesh position={[0, 1.82, 0]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color={GOLD} roughness={0.35} metalness={0.7} />
      </mesh>
    </group>
  )
}

function ConicalRoof({ radius, height, position, color = ROOF }) {
  return (
    <mesh position={position} castShadow>
      <coneGeometry args={[radius, height, 16]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
    </mesh>
  )
}

function CylindricalTower({ position, radius = 1.45, height = 7.6, roofHeight = 2.5, roofColor = ROOF }) {
  const merlons = useMemo(() => {
    const count = 10
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2
      return [Math.cos(angle) * (radius + 0.08), height / 2 + 0.18, Math.sin(angle) * (radius + 0.08)]
    })
  }, [height, radius])

  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius * 1.08, height, 24]} />
        <meshStandardMaterial color={STONE} roughness={0.92} metalness={0.06} />
      </mesh>
      <mesh position={[0, height + 0.12, 0]} receiveShadow>
        <cylinderGeometry args={[radius + 0.18, radius + 0.18, 0.24, 24]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.88} metalness={0.06} />
      </mesh>
      {merlons.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.28, 0.38, 0.22]} />
          <meshStandardMaterial color={STONE_LIGHT} roughness={0.86} metalness={0.06} />
        </mesh>
      ))}
      <ConicalRoof
        radius={radius + 0.3}
        height={roofHeight}
        position={[0, height + roofHeight / 2 + 0.2, 0]}
        color={roofColor}
      />
      <mesh position={[0, height + roofHeight + 0.28, 0]} castShadow>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color={GOLD} roughness={0.32} metalness={0.75} />
      </mesh>
      <Window position={[0, height * 0.6, radius - 0.02]} />
      <Window position={[radius - 0.02, height * 0.38, 0]} rotation={[0, Math.PI / 2, 0]} />
    </group>
  )
}

function Keep() {
  const w = 6.8
  const d = 6
  const h = 9

  return (
    <group position={[0, 0, -2.6]}>
      <mesh position={[0, 0.4, 0]} receiveShadow>
        <boxGeometry args={[w + 1.4, 0.8, d + 1.4]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.94} metalness={0.05} />
      </mesh>
      <mesh position={[0, h / 2 + 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={STONE} roughness={0.92} metalness={0.06} />
      </mesh>
      <mesh position={[0, h + 0.82, 0]} receiveShadow>
        <boxGeometry args={[w + 0.5, 0.24, d + 0.5]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.88} metalness={0.06} />
      </mesh>
      <group position={[0, h + 0.94, 0]}>
        <Battlements width={w + 0.5} depth={d + 0.5} />
      </group>
      <mesh position={[0, h + 2.9, 0]} castShadow>
        <boxGeometry args={[w * 0.52, 3.2, d * 0.46]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.9} metalness={0.05} />
      </mesh>
      <ConicalRoof radius={2.3} height={2.3} position={[0, h + 4.65, 0]} color={ROOF_DARK} />
      <Window position={[0, 5.9, d / 2 + 0.01]} size={[0.42, 0.85, 0.1]} />
      <Window position={[-1.8, 4.6, d / 2 + 0.01]} size={[0.32, 0.62, 0.1]} />
      <Window position={[1.8, 4.6, d / 2 + 0.01]} size={[0.32, 0.62, 0.1]} />
      <Window position={[-1.8, 2.8, d / 2 + 0.01]} size={[0.32, 0.62, 0.1]} />
      <Window position={[1.8, 2.8, d / 2 + 0.01]} size={[0.32, 0.62, 0.1]} />
      <mesh position={[0, 2, d / 2 + 0.04]} castShadow>
        <boxGeometry args={[1.25, 2.5, 0.16]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.72} metalness={0.05} />
      </mesh>
      <mesh position={[0, 2.4, d / 2 + 0.13]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.4} metalness={0.7} />
      </mesh>
      <Banner position={[-2, h + 0.8, d / 2 + 0.12]} />
      <Banner position={[2, h + 0.8, d / 2 + 0.12]} />
    </group>
  )
}

function WallSegment({ start, end, height = 4.8, thickness = 1.25 }) {
  const dx = end[0] - start[0]
  const dz = end[2] - start[2]
  const length = Math.hypot(dx, dz)
  const mid = [(start[0] + end[0]) / 2, height / 2, (start[2] + end[2]) / 2]
  const rotationY = Math.atan2(dx, dz)

  return (
    <group>
      <mesh position={mid} rotation={[0, rotationY, 0]} castShadow receiveShadow>
        <boxGeometry args={[thickness, height, length]} />
        <meshStandardMaterial color={STONE} roughness={0.92} metalness={0.06} />
      </mesh>
      <mesh position={[mid[0], height + 0.1, mid[2]]} rotation={[0, rotationY, 0]} receiveShadow>
        <boxGeometry args={[thickness + 0.28, 0.2, length]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.88} metalness={0.06} />
      </mesh>
      <group position={[mid[0], height + 0.2, mid[2]]} rotation={[0, rotationY, 0]}>
        <Battlements width={thickness + 0.28} depth={length} height={0.38} crenel={0.44} />
      </group>
    </group>
  )
}

function Gatehouse() {
  return (
    <group position={[0, 0, 10]}>
      <mesh position={[0, 3.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.6, 6.6, 3.6]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.9} metalness={0.06} />
      </mesh>
      <mesh position={[0, 6.8, 0]} receiveShadow>
        <boxGeometry args={[6, 0.28, 4]} />
        <meshStandardMaterial color={STONE} roughness={0.88} metalness={0.05} />
      </mesh>
      <group position={[0, 6.94, 0]}>
        <Battlements width={6} depth={4} />
      </group>
      <mesh position={[0, 3.3, 1.82]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.25, 1.25, 0.28, 20, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#0d0a08" roughness={0.55} metalness={0.08} />
      </mesh>
      <mesh position={[0, 1.25, 1.82]}>
        <boxGeometry args={[2.5, 2.5, 0.22]} />
        <meshStandardMaterial color="#0d0a08" roughness={0.55} metalness={0.08} />
      </mesh>
      <mesh position={[-0.6, 1.45, 1.96]} castShadow>
        <boxGeometry args={[1.15, 2.9, 0.12]} />
        <meshStandardMaterial color={WOOD} roughness={0.7} metalness={0.04} />
      </mesh>
      <mesh position={[0.6, 1.45, 1.96]} castShadow>
        <boxGeometry args={[1.15, 2.9, 0.12]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.7} metalness={0.04} />
      </mesh>
      <mesh position={[0, 5, 1.86]}>
        <boxGeometry args={[0.95, 0.95, 0.12]} />
        <meshStandardMaterial color={BANNER} roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh position={[0, 5, 1.94]}>
        <torusGeometry args={[0.23, 0.04, 8, 16]} />
        <meshStandardMaterial color={GOLD} roughness={0.35} metalness={0.72} />
      </mesh>
      <Banner position={[-1.9, 6.9, 1.8]} />
      <Banner position={[1.9, 6.9, 1.8]} />
      <CylindricalTower position={[-3.1, 0, 0]} radius={1.12} height={8.6} roofHeight={2.2} />
      <CylindricalTower position={[3.1, 0, 0]} radius={1.12} height={8.6} roofHeight={2.2} />
    </group>
  )
}

function Drawbridge() {
  return (
    <group position={[0, 0.14, 13]}>
      <mesh rotation={[-0.12, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.6, 0.16, 4.6]} />
        <meshStandardMaterial color={WOOD} roughness={0.78} metalness={0.04} />
      </mesh>
      {[-0.95, -0.32, 0.32, 0.95].map((x) => (
        <mesh key={x} position={[x, 0.1, 0]} rotation={[-0.12, 0, 0]}>
          <boxGeometry args={[0.08, 0.04, 4.5]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.7} metalness={0.05} />
        </mesh>
      ))}
      {[-1.25, 1.25].map((x) => (
        <mesh key={x} position={[x, 1.5, -1.8]}>
          <cylinderGeometry args={[0.03, 0.03, 3.3, 6]} />
          <meshStandardMaterial color="#8a8a8a" roughness={0.4} metalness={0.65} />
        </mesh>
      ))}
    </group>
  )
}

function Terrain() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]} receiveShadow>
        <circleGeometry args={[38, 64]} />
        <meshStandardMaterial color={GRASS} roughness={0.96} metalness={0.0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <ringGeometry args={[11.8, 15, 64]} />
        <meshStandardMaterial color={MOAT} roughness={0.16} metalness={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]} receiveShadow>
        <circleGeometry args={[11.9, 48]} />
        <meshStandardMaterial color={DIRT} roughness={0.93} metalness={0.02} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]} receiveShadow>
        <circleGeometry args={[9.8, 48]} />
        <meshStandardMaterial color="#4b4838" roughness={0.95} metalness={0.0} />
      </mesh>
      <mesh position={[0, 0.02, 13.2]} receiveShadow>
        <boxGeometry args={[3.4, 0.08, 6.8]} />
        <meshStandardMaterial color={DIRT} roughness={0.9} metalness={0.02} />
      </mesh>
    </group>
  )
}

function Courtyard() {
  const trees = [
    [-3.9, 0, 3.2],
    [4.3, 0, 2.6],
    [-4.7, 0, -6.6],
    [5.1, 0, -6],
  ]

  return (
    <group>
      <mesh position={[0, 0.08, 2.7]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.6, 0.12, 24]} />
        <meshStandardMaterial color="#5d4b3a" roughness={0.88} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.72, 2.7]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 1.2, 12]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.8} metalness={0.08} />
      </mesh>
      <mesh position={[0, 1.28, 2.7]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial
          color="#ffd9a0"
          roughness={0.15}
          metalness={0.35}
          emissive="#ff8a3c"
          emissiveIntensity={0.5}
        />
      </mesh>
      <group position={[3.8, 0, -1.2]}>
        <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.7, 2.2, 2.2]} />
          <meshStandardMaterial color={STONE_DARK} roughness={0.9} metalness={0.05} />
        </mesh>
        <mesh position={[0, 2.75, 0]} castShadow>
          <coneGeometry args={[2.15, 1.1, 4]} />
          <meshStandardMaterial color={ROOF_DARK} roughness={0.62} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.9, 1.15]}>
          <boxGeometry args={[0.7, 1.4, 0.1]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.75} metalness={0.04} />
        </mesh>
      </group>
      {trees.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.16, 1.4, 8]} />
            <meshStandardMaterial color={WOOD_DARK} roughness={0.8} metalness={0.02} />
          </mesh>
          <mesh position={[0, 1.7, 0]} castShadow>
            <coneGeometry args={[0.85, 1.6, 10]} />
            <meshStandardMaterial color="#4a5230" roughness={0.9} metalness={0.0} />
          </mesh>
          <mesh position={[0, 2.35, 0]} castShadow>
            <coneGeometry args={[0.62, 1.15, 10]} />
            <meshStandardMaterial color="#5b6338" roughness={0.88} metalness={0.0} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default function Castle() {
  const corners = [
    [-8.8, 0, 10],
    [-8.8, 0, -9],
    [8.8, 0, -9],
    [8.8, 0, 10],
  ]

  return (
    <group>
      <Terrain />
      <Keep />
      <Gatehouse />
      <Drawbridge />
      <Courtyard />
      <WallSegment start={[-5.8, 0, 10]} end={[-8.8, 0, 10]} />
      <WallSegment start={[5.8, 0, 10]} end={[8.8, 0, 10]} />
      <WallSegment start={corners[0]} end={corners[1]} />
      <WallSegment start={corners[1]} end={corners[2]} />
      <WallSegment start={corners[2]} end={corners[3]} />
      {corners.map((pos, i) => (
        <CylindricalTower key={i} position={pos} radius={1.55} height={8} roofHeight={2.4} />
      ))}
    </group>
  )
}
