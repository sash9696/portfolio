import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext.jsx'

function NeuralShape() {
  const group = useRef(null)
  const meshRef = useRef(null)
  const { theme } = useTheme()

  const colors = useMemo(() => {
    if (theme === 'light') {
      return { wire: '#0d9488', emissive: '#ccfbf1', ring: '#7c3aed' }
    }
    return { wire: '#2dd4bf', emissive: '#042f2e', ring: '#b9ff66' }
  }, [theme])

  useFrame((_, delta) => {
    const g = group.current
    const m = meshRef.current
    if (!g || !m) return
    g.rotation.y += delta * 0.12
    g.rotation.x += delta * 0.04
    m.rotation.z += delta * 0.02
  })

  return (
    <group ref={group}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshStandardMaterial
          color={colors.wire}
          wireframe
          emissive={colors.emissive}
          emissiveIntensity={theme === 'light' ? 0.15 : 0.45}
          metalness={0.15}
          roughness={0.35}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0.4, 0]}>
        <torusGeometry args={[3.15, 0.018, 12, 160]} />
        <meshBasicMaterial color={colors.ring} transparent opacity={theme === 'light' ? 0.28 : 0.38} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 4, 8]} intensity={1.1} color="#a78bfa" />
      <pointLight position={[-6, -2, 4]} intensity={0.45} color="#5eead4" />
      <NeuralShape />
    </>
  )
}

export default function HeroBackdrop3D() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 min-h-[min(90svh,52rem)]">
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0.2, 7.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
