import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STONE = '#8d7d6a'
const STONE_DARK = '#5c5145'
const STONE_LIGHT = '#b6a795'
const ROOF = '#3f5d6b'
const ROOF_DARK = '#2c4149'
const WOOD = '#5a3a22'
const WOOD_DARK = '#382315'
const BANNER = '#1f4d6b'
const MOAT = '#17434f'
const GRASS = '#3f5e3b'
const DIRT = '#6a5242'
const GOLD = '#c9a227'

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
          <meshStandardMaterial color={STONE_LIGHT} roughness={0.86} metalness={0.04} />
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
        color="#181310"
        roughness={0.35}
        metalness={0.15}
        emissive="#3a2208"
        emissiveIntensity={0.35}
      />
    </mesh>
  )
}

function Banner({ position, rotation = [0, 0, 0], color = BANNER }) {
  const flagRef = useRef()

  useFrame(({ clock }) => {
    if (flagRef.current) {
      flagRef.current.rotation.y = Math.sin(clock.elapsedTime * 2.2) * 0.22
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
      <meshStandardMaterial color={color} roughness={0.62} metalness={0.08} />
    </mesh>
  )
}

function CylindricalTower({ position, radius = 1.4, height = 7.4, roofHeight = 2.4, roofColor = ROOF }) {
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
        <meshStandardMaterial color={STONE} roughness={0.9} metalness={0.04} />
      </mesh>
      <mesh position={[0, height + 0.12, 0]} receiveShadow>
        <cylinderGeometry args={[radius + 0.18, radius + 0.18, 0.24, 24]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.88} metalness={0.05} />
      </mesh>
      {merlons.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.28, 0.38, 0.22]} />
          <meshStandardMaterial color={STONE_LIGHT} roughness={0.86} metalness={0.04} />
        </mesh>
      ))}
      <ConicalRoof
        radius={radius + 0.28}
        height={roofHeight}
        position={[0, height + roofHeight / 2 + 0.2, 0]}
        color={roofColor}
      />
      <mesh position={[0, height + roofHeight + 0.28, 0]} castShadow>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color={GOLD} roughness={0.32} metalness={0.75} />
      </mesh>
      <Window position={[0, height * 0.62, radius - 0.02]} />
      <Window position={[radius - 0.02, height * 0.38, 0]} rotation={[0, Math.PI / 2, 0]} />
    </group>
  )
}

function Keep() {
  const w = 6.6
  const d = 5.8
  const h = 8.6

  return (
    <group position={[0, 0, -2.4]}>
      <mesh position={[0, 0.35, 0]} receiveShadow>
        <boxGeometry args={[w + 1.2, 0.7, d + 1.2]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.92} metalness={0.03} />
      </mesh>
      <mesh position={[0, h / 2 + 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={STONE} roughness={0.9} metalness={0.04} />
      </mesh>
      <mesh position={[0, h + 0.72, 0]} receiveShadow>
        <boxGeometry args={[w + 0.5, 0.24, d + 0.5]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.86} metalness={0.05} />
      </mesh>
      <group position={[0, h + 0.84, 0]}>
        <Battlements width={w + 0.5} depth={d + 0.5} />
      </group>
      <mesh position={[0, h + 2.6, 0]} castShadow>
        <boxGeometry args={[w * 0.5, 2.8, d * 0.45]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.88} metalness={0.04} />
      </mesh>
      <ConicalRoof radius={2.2} height={2.1} position={[0, h + 4.1, 0]} color={ROOF_DARK} />
      <Window position={[0, 5.6, d / 2 + 0.01]} size={[0.42, 0.85, 0.1]} />
      <Window position={[-1.7, 4.4, d / 2 + 0.01]} size={[0.32, 0.62, 0.1]} />
      <Window position={[1.7, 4.4, d / 2 + 0.01]} size={[0.32, 0.62, 0.1]} />
      <Window position={[-1.7, 2.7, d / 2 + 0.01]} size={[0.32, 0.62, 0.1]} />
      <Window position={[1.7, 2.7, d / 2 + 0.01]} size={[0.32, 0.62, 0.1]} />
      <mesh position={[0, 1.9, d / 2 + 0.04]} castShadow>
        <boxGeometry args={[1.2, 2.4, 0.16]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.72} metalness={0.05} />
      </mesh>
      <mesh position={[0, 2.3, d / 2 + 0.13]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.4} metalness={0.7} />
      </mesh>
      <Banner position={[-1.9, h + 0.7, d / 2 + 0.12]} />
      <Banner position={[1.9, h + 0.7, d / 2 + 0.12]} />
    </group>
  )
}

function WallSegment({ start, end, height = 4.6, thickness = 1.2 }) {
  const dx = end[0] - start[0]
  const dz = end[2] - start[2]
  const length = Math.hypot(dx, dz)
  const mid = [(start[0] + end[0]) / 2, height / 2, (start[2] + end[2]) / 2]
  const rotationY = Math.atan2(dx, dz)

  return (
    <group>
      <mesh position={mid} rotation={[0, rotationY, 0]} castShadow receiveShadow>
        <boxGeometry args={[thickness, height, length]} />
        <meshStandardMaterial color={STONE} roughness={0.9} metalness={0.04} />
      </mesh>
      <mesh position={[mid[0], height + 0.1, mid[2]]} rotation={[0, rotationY, 0]} receiveShadow>
        <boxGeometry args={[thickness + 0.28, 0.2, length]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.86} metalness={0.05} />
      </mesh>
      <group position={[mid[0], height + 0.2, mid[2]]} rotation={[0, rotationY, 0]}>
        <Battlements width={thickness + 0.28} depth={length} height={0.38} crenel={0.44} />
      </group>
      <mesh position={[mid[0], height * 0.55, mid[2]]} rotation={[0, rotationY, 0]}>
        <boxGeometry args={[thickness * 0.5, 0.5, length * 0.14]} />
        <meshStandardMaterial color="#181310" roughness={0.5} metalness={0.05} />
      </mesh>
    </group>
  )
}

function Gatehouse() {
  return (
    <group position={[0, 0, 9.8]}>
      <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.4, 6.4, 3.6]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.88} metalness={0.05} />
      </mesh>
      <mesh position={[0, 6.6, 0]} receiveShadow>
        <boxGeometry args={[5.8, 0.28, 4]} />
        <meshStandardMaterial color={STONE} roughness={0.86} metalness={0.04} />
      </mesh>
      <group position={[0, 6.74, 0]}>
        <Battlements width={5.8} depth={4} />
      </group>
      <mesh position={[0, 3.2, 1.82]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.28, 20, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#0f0c0a" roughness={0.55} metalness={0.08} />
      </mesh>
      <mesh position={[0, 1.2, 1.82]}>
        <boxGeometry args={[2.4, 2.4, 0.22]} />
        <meshStandardMaterial color="#0f0c0a" roughness={0.55} metalness={0.08} />
      </mesh>
      <mesh position={[-0.58, 1.4, 1.96]} castShadow>
        <boxGeometry args={[1.1, 2.8, 0.12]} />
        <meshStandardMaterial color={WOOD} roughness={0.7} metalness={0.04} />
      </mesh>
      <mesh position={[0.58, 1.4, 1.96]} castShadow>
        <boxGeometry args={[1.1, 2.8, 0.12]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.7} metalness={0.04} />
      </mesh>
      <mesh position={[0, 4.9, 1.86]}>
        <boxGeometry args={[0.9, 0.9, 0.12]} />
        <meshStandardMaterial color={BANNER} roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh position={[0, 4.9, 1.94]}>
        <torusGeometry args={[0.22, 0.04, 8, 16]} />
        <meshStandardMaterial color={GOLD} roughness={0.35} metalness={0.72} />
      </mesh>
      <Banner position={[-1.8, 6.7, 1.8]} />
      <Banner position={[1.8, 6.7, 1.8]} />
      <CylindricalTower position={[-3, 0, 0]} radius={1.08} height={8.4} roofHeight={2.1} />
      <CylindricalTower position={[3, 0, 0]} radius={1.08} height={8.4} roofHeight={2.1} />
    </group>
  )
}

function Drawbridge() {
  return (
    <group position={[0, 0.14, 12.8]}>
      <mesh rotation={[-0.12, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.5, 0.16, 4.4]} />
        <meshStandardMaterial color={WOOD} roughness={0.78} metalness={0.04} />
      </mesh>
      {[-0.9, -0.3, 0.3, 0.9].map((x) => (
        <mesh key={x} position={[x, 0.1, 0]} rotation={[-0.12, 0, 0]}>
          <boxGeometry args={[0.08, 0.04, 4.3]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.7} metalness={0.05} />
        </mesh>
      ))}
      {[-1.2, 1.2].map((x) => (
        <mesh key={x} position={[x, 1.45, -1.7]}>
          <cylinderGeometry args={[0.03, 0.03, 3.2, 6]} />
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
        <circleGeometry args={[36, 64]} />
        <meshStandardMaterial color={GRASS} roughness={0.95} metalness={0.0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <ringGeometry args={[11.6, 14.8, 64]} />
        <meshStandardMaterial color={MOAT} roughness={0.18} metalness={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]} receiveShadow>
        <circleGeometry args={[11.7, 48]} />
        <meshStandardMaterial color={DIRT} roughness={0.92} metalness={0.02} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]} receiveShadow>
        <circleGeometry args={[9.6, 48]} />
        <meshStandardMaterial color="#496a3e" roughness={0.94} metalness={0.0} />
      </mesh>
      <mesh position={[0, 0.02, 13]} receiveShadow>
        <boxGeometry args={[3.3, 0.08, 6.6]} />
        <meshStandardMaterial color={DIRT} roughness={0.9} metalness={0.02} />
      </mesh>
    </group>
  )
}

function Courtyard() {
  const trees = [
    [-3.8, 0, 3.2],
    [4.2, 0, 2.6],
    [-4.6, 0, -6.4],
    [5, 0, -5.8],
  ]

  return (
    <group>
      <mesh position={[0, 0.08, 2.6]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.6, 0.12, 24]} />
        <meshStandardMaterial color="#6d5a48" roughness={0.88} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.72, 2.6]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 1.2, 12]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.8} metalness={0.08} />
      </mesh>
      <mesh position={[0, 1.28, 2.6]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial
          color="#cfe8ff"
          roughness={0.15}
          metalness={0.35}
          emissive="#7aa0c4"
          emissiveIntensity={0.25}
        />
      </mesh>
      <group position={[3.6, 0, -1.2]}>
        <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 2.2, 2.2]} />
          <meshStandardMaterial color={STONE_DARK} roughness={0.9} metalness={0.04} />
        </mesh>
        <ConicalRoof radius={2.1} height={1.1} position={[0, 2.75, 0]} color={ROOF_DARK} />
        <mesh position={[0, 0.9, 1.12]}>
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
            <meshStandardMaterial color="#2f5a32" roughness={0.9} metalness={0.0} />
          </mesh>
          <mesh position={[0, 2.35, 0]} castShadow>
            <coneGeometry args={[0.62, 1.15, 10]} />
            <meshStandardMaterial color="#3d6b38" roughness={0.88} metalness={0.0} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default function Castle() {
  const corners = [
    [-8.6, 0, 9.8],
    [-8.6, 0, -8.8],
    [8.6, 0, -8.8],
    [8.6, 0, 9.8],
  ]

  return (
    <group>
      <Terrain />
      <Keep />
      <Gatehouse />
      <Drawbridge />
      <Courtyard />
      <WallSegment start={[-5.6, 0, 9.8]} end={[-8.6, 0, 9.8]} />
      <WallSegment start={[5.6, 0, 9.8]} end={[8.6, 0, 9.8]} />
      <WallSegment start={corners[0]} end={corners[1]} />
      <WallSegment start={corners[1]} end={corners[2]} />
      <WallSegment start={corners[2]} end={corners[3]} />
      {corners.map((pos, i) => (
        <CylindricalTower key={i} position={pos} radius={1.5} height={7.8} roofHeight={2.3} />
      ))}
    </group>
  )
}
