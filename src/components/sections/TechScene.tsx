import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import './TechScene.scss';

const PALETTE = ['#eb5f31', '#7eb8f7', '#c0c0c0'];

interface ShapeProps {
    type: 'octa' | 'ico' | 'torus' | 'box' | 'tetra' | 'sphere';
    baseX: number;
    baseY: number;
    speed: number;
    scale: number;
    phase: number;
    color: string;
    opacity: number;
}

function FloatingShape({ type, baseX, baseY, speed, scale, phase, color, opacity }: ShapeProps) {
    const mesh = useRef<Mesh>(null);

    useFrame(({ clock }) => {
        if (!mesh.current) return;
        const t = clock.getElapsedTime();
        mesh.current.position.y = baseY + Math.sin(t * speed + phase) * 0.4;
        mesh.current.position.x = baseX + Math.sin(t * speed * 0.1 + phase) * 0.9;
        mesh.current.rotation.x += 0.005 * speed;
        mesh.current.rotation.z += 0.003 * speed;
    });

    const geo = {
        octa: <octahedronGeometry args={[scale]} />,
        ico: <icosahedronGeometry args={[scale]} />,
        torus: <torusGeometry args={[scale, scale * 0.35, 6, 12]} />,
        box: <boxGeometry args={[scale, scale, scale]} />,
        tetra: <tetrahedronGeometry args={[scale]} />,
        sphere: <sphereGeometry args={[scale, 8, 6]} />,
    }[type];

    return (
        <mesh ref={mesh} position={[baseX, baseY, 0]}>
            {geo}
            <meshStandardMaterial color={color} wireframe transparent opacity={opacity} />
        </mesh>
    );
}

const SHAPES: ShapeProps[] = [
    { type: 'octa',   baseX: -3.5, baseY:  0.8, speed: 0.7, scale: 0.8,  phase: 0,   color: PALETTE[0], opacity: 0.55 },
    { type: 'ico',    baseX:  3.2, baseY: -0.6, speed: 0.5, scale: 1.0,  phase: 1.2, color: PALETTE[1], opacity: 0.45 },
    { type: 'torus',  baseX:  0.5, baseY:  1.4, speed: 0.9, scale: 0.7,  phase: 2.1, color: PALETTE[2], opacity: 0.35 },
    { type: 'box',    baseX: -1.8, baseY: -1.0, speed: 0.6, scale: 0.9,  phase: 0.8, color: PALETTE[1], opacity: 0.40 },
    { type: 'tetra',  baseX:  2.0, baseY:  0.2, speed: 1.1, scale: 0.6,  phase: 1.7, color: PALETTE[0], opacity: 0.50 },
    { type: 'tetra',  baseX: -2.8, baseY: -1.5, speed: 0.8, scale: 0.75, phase: 3.0, color: PALETTE[2], opacity: 0.30 },
    { type: 'sphere', baseX:  1.0, baseY: -0.3, speed: 0.6, scale: 0.55, phase: 0.4, color: PALETTE[0], opacity: 0.45 },
];

/** Transparent canvas — sits as an absolute background inside a position:relative parent. */
function TechScene() {
    return (
        <div className="tech-scene-bg" aria-hidden="true">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={1.0} />
                {SHAPES.map((s, i) => (
                    <FloatingShape key={i} {...s} />
                ))}
            </Canvas>
        </div>
    );
}

export default TechScene;
