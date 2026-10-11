import { useMemo } from 'react'
import * as THREE from 'three'

const STONE = '#8a7a68'
const STONE_DARK = '#5e5348'
const STONE_LIGHT = '#b4a494'
const ROOF = '#6b2c2c'
const ROOF_DARK = '#4a1c1c'
const WOOD = '#5c3a22'
const WOOD_DARK = '#3a2416'
const BANNER = '#7a1f2b'
const MOAT = '#1a4a5c'
const GRASS = '#3d5c3a'
const DIRT = '#6b5344'
const GOLD = '#c9a227'

function Battlements({ width, depth, height = 0.42, crenel = 0.38, position = [0, 0, 0] }) {
  const blocks = []
  const countX = Math.max(2, Math.floor(width / crenel))
  const countZ = Math.max(2, Math.floor(depth / crenel))
  const stepX = width / countX
  const stepZ = depth / countZ
  const startX = -width / 2 + stepX / 2
  const startZ = -depth / 2 + stepZ / 2

  for (let i = 0; i < countX; i += 1) {
    if (i % 2 === 0) {
      blocks.push([startX + i * stepX, height / 2, startZ])
      blocks.push([startX + i * stepX, height / 2, -startZ])
    }
  }
  for (let j = 1; j < countZ - 1; j += 1) {
    if (j % 2 === 0) {
      blocks.push([startX, height / 2, startZ + j * stepZ])
      blocks.push([-startX, height / 2, startZ + j * stepZ])
    }
  }

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
        color="#1a1410"
        roughness={0.35}
        metalness={0.15}
        emissive="#3a2208"
        emissiveIntensity={0.35}
      />
    </mesh>
  )
}

function Banner({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.8, 8]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh position={[0.28, 1.35, 0]} castShadow>
        <planeGeometry args={[0.55, 0.7]} />
        <meshStandardMaterial color={BANNER} roughness={0.78} metalness={0.02} side={THREE.DoubleSide} />
      </mesh>
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

function CylindricalTower({ position, radius = 1.35, height = 7.2, roofHeight = 2.4 }) {
  const merlonCount = 10
  const merlons = useMemo(() => {
    return Array.from({ length: merlonCount }, (_, i) => {
      const angle = (i / merlonCount) * Math.PI * 2
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
      <ConicalRoof radius={radius + 0.28} height={roofHeight} position={[0, height + roofHeight / 2 + 0.2, 0]} />
      <mesh position={[0, height + roofHeight + 0.28, 0]} castShadow>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color={GOLD} roughness={0.32} metalness={0.75} />
      </mesh>
      <Window position={[0, height * 0.62, radius - 0.02]} />
      <Window position={[radius - 0.02, height * 0.38, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Window position={[0, height * 0.38, -(radius - 0.02)]} />
    </group>
  )
}

function Keep() {
  const keepW = 6.4
  const keepD = 5.6
  const keepH = 8.4

  return (
    <group position={[0, 0, -2.2]}>
      <mesh position={[0, keepH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[keepW, keepH, keepD]} />
        <meshStandardMaterial color={STONE} roughness={0.9} metalness={0.04} />
      </mesh>
      <mesh position={[0, keepH + 0.12, 0]} receiveShadow>
        <boxGeometry args={[keepW + 0.5, 0.24, keepD + 0.5]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.86} metalness={0.05} />
      </mesh>
      <Battlements width={keepW + 0.5} depth={keepD + 0.5} position={[0, keepH + 0.24, 0]} />
      <mesh position={[0, keepH + 1.9, 0]} castShadow>
        <boxGeometry args={[keepW * 0.55, 2.6, keepD * 0.48]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.88} metalness={0.04} />
      </mesh>
      <mesh position={[0, keepH + 3.55, 0]} castShadow>
        <coneGeometry args={[2.35, 1.8, 4]} />
        <meshStandardMaterial color={ROOF_DARK} roughness={0.6} metalness={0.08} />
      </mesh>
      <Window position={[0, 5.4, keepD / 2 + 0.01]} size={[0.42, 0.85, 0.1]} />
      <Window position={[-1.6, 4.2, keepD / 2 + 0.01]} size={[0.32, 0.62, 0.1]} />
      <Window position={[1.6, 4.2, keepD / 2 + 0.01]} size={[0.32, 0.62, 0.1]} />
      <Window position={[-1.6, 2.4, keepD / 2 + 0.01]} size={[0.32, 0.62, 0.1]} />
      <Window position={[1.6, 2.4, keepD / 2 + 0.01]} size={[0.32, 0.62, 0.1]} />
      <mesh position={[0, 1.15, keepD / 2 + 0.04]} castShadow>
        <boxGeometry args={[1.15, 2.3, 0.16]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.72} metalness={0.05} />
      </mesh>
      <mesh position={[0, 1.55, keepD / 2 + 0.13]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.4} metalness={0.7} />
      </mesh>
      <Banner position={[-1.8, keepH + 0.2, keepD / 2 + 0.12]} />
      <Banner position={[1.8, keepH + 0.2, keepD / 2 + 0.12]} />
    </group>
  )
}

function WallSegment({ start, end, height = 4.4, thickness = 1.15 }) {
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
      <mesh
        position={[mid[0], height + 0.1, mid[2]]}
        rotation={[0, rotationY, 0]}
        receiveShadow
      >
        <boxGeometry args={[thickness + 0.28, 0.2, length]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.86} metalness={0.05} />
      </mesh>
      <group position={[mid[0], height + 0.2, mid[2]]} rotation={[0, rotationY, 0]}>
        <Battlements width={thickness + 0.28} depth={length} height={0.38} crenel={0.42} />
      </group>
    </group>
  )
}

function Gatehouse() {
  return (
    <group position={[0, 0, 9.6]}>
      <mesh position={[0, 3.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 6.2, 3.4]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.88} metalness={0.05} />
      </mesh>
      <mesh position={[0, 6.4, 0]} receiveShadow>
        <boxGeometry args={[5.6, 0.28, 3.8]} />
        <meshStandardMaterial color={STONE} roughness={0.86} metalness={0.04} />
      </mesh>
      <Battlements width={5.6} depth={3.8} position={[0, 6.54, 0]} />
      <mesh position={[0, 3.05, 1.72]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.28, 20, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#120e0b" roughness={0.55} metalness={0.08} />
      </mesh>
      <mesh position={[0, 1.15, 1.72]}>
        <boxGeometry args={[2.3, 2.3, 0.22]} />
        <meshStandardMaterial color="#120e0b" roughness={0.55} metalness={0.08} />
      </mesh>
      <mesh position={[-0.55, 1.35, 1.86]} castShadow>
        <boxGeometry args={[1.05, 2.7, 0.12]} />
        <meshStandardMaterial color={WOOD} roughness={0.7} metalness={0.04} />
      </mesh>
      <mesh position={[0.55, 1.35, 1.86]} castShadow>
        <boxGeometry args={[1.05, 2.7, 0.12]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.7} metalness={0.04} />
      </mesh>
      <mesh position={[0, 4.7, 1.76]}>
        <boxGeometry args={[0.9, 0.9, 0.12]} />
        <meshStandardMaterial color={BANNER} roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh position={[0, 4.7, 1.84]}>
        <torusGeometry args={[0.22, 0.04, 8, 16]} />
        <meshStandardMaterial color={GOLD} roughness={0.35} metalness={0.72} />
      </mesh>
      <Banner position={[-1.7, 6.5, 1.7]} />
      <Banner position={[1.7, 6.5, 1.7]} />
      <CylindricalTower position={[-2.9, 0, 0]} radius={1.05} height={8.2} roofHeight={2.1} />
      <CylindricalTower position={[2.9, 0, 0]} radius={1.05} height={8.2} roofHeight={2.1} />
    </group>
  )
}

function Drawbridge() {
  return (
    <group position={[0, 0.12, 12.6]}>
      <mesh rotation={[-0.12, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.4, 0.16, 4.2]} />
        <meshStandardMaterial color={WOOD} roughness={0.78} metalness={0.04} />
      </mesh>
      {[-0.85, -0.28, 0.28, 0.85].map((x) => (
        <mesh key={x} position={[x, 0.1, 0]} rotation={[-0.12, 0, 0]}>
          <boxGeometry args={[0.08, 0.04, 4.1]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.7} metalness={0.05} />
        </mesh>
      ))}
      <mesh position={[-1.15, 1.4, -1.6]}>
        <cylinderGeometry args={[0.03, 0.03, 3.1, 6]} />
        <meshStandardMaterial color="#8a8a8a" roughness={0.4} metalness={0.65} />
      </mesh>
      <mesh position={[1.15, 1.4, -1.6]}>
        <cylinderGeometry args={[0.03, 0.03, 3.1, 6]} />
        <meshStandardMaterial color="#8a8a8a" roughness={0.4} metalness={0.65} />
      </mesh>
    </group>
  )
}

function Terrain() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]} receiveShadow>
        <circleGeometry args={[34, 64]} />
        <meshStandardMaterial color={GRASS} roughness={0.95} metalness={0.0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <ringGeometry args={[11.4, 14.6, 64]} />
        <meshStandardMaterial color={MOAT} roughness={0.18} metalness={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]} receiveShadow>
        <circleGeometry args={[11.5, 48]} />
        <meshStandardMaterial color={DIRT} roughness={0.92} metalness={0.02} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]} receiveShadow>
        <circleGeometry args={[9.4, 48]} />
        <meshStandardMaterial color="#4a6b3e" roughness={0.94} metalness={0.0} />
      </mesh>
      <mesh position={[0, 0.02, 12.8]} receiveShadow>
        <boxGeometry args={[3.2, 0.08, 6.4]} />
        <meshStandardMaterial color={DIRT} roughness={0.9} metalness={0.02} />
      </mesh>
    </group>
  )
}

function CourtyardDetails() {
  const trees = [
    [-3.6, 0, 3.4],
    [4.1, 0, 2.8],
    [-4.4, 0, -6.2],
    [4.8, 0, -5.6],
  ]

  return (
    <group>
      <mesh position={[0, 0.08, 2.4]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.6, 0.12, 24]} />
        <meshStandardMaterial color="#6d5a48" roughness={0.88} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.7, 2.4]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 1.2, 12]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.8} metalness={0.08} />
      </mesh>
      <mesh position={[0, 1.25, 2.4]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial
          color="#cfe8ff"
          roughness={0.15}
          metalness={0.35}
          emissive="#7aa0c4"
          emissiveIntensity={0.25}
        />
      </mesh>
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
  const wallCorners = [
    [-8.4, 0, 9.6],
    [-8.4, 0, -8.6],
    [8.4, 0, -8.6],
    [8.4, 0, 9.6],
  ]

  return (
    <group>
      <Terrain />
      <Keep />
      <Gatehouse />
      <Drawbridge />
      <CourtyardDetails />
      <WallSegment start={[-5.4, 0, 9.6]} end={[-8.4, 0, 9.6]} />
      <WallSegment start={[5.4, 0, 9.6]} end={[8.4, 0, 9.6]} />
      <WallSegment start={wallCorners[0]} end={wallCorners[1]} />
      <WallSegment start={wallCorners[1]} end={wallCorners[2]} />
      <WallSegment start={wallCorners[2]} end={wallCorners[3]} />
      <CylindricalTower position={wallCorners[0]} radius={1.45} height={7.6} roofHeight={2.3} />
      <CylindricalTower position={wallCorners[1]} radius={1.45} height={7.6} roofHeight={2.3} />
      <CylindricalTower position={wallCorners[2]} radius={1.45} height={7.6} roofHeight={2.3} />
      <CylindricalTower position={wallCorners[3]} radius={1.45} height={7.6} roofHeight={2.3} />
    </group>
  )
}
