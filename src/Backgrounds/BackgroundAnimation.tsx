import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './BackgroundAnimation.scss'


function Box(props: any) {
	// This reference will give us direct access to the mesh
	const mesh = useRef()
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)
	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((_, delta) => {
		if (mesh && mesh.current) (mesh.current as any).rotation.x += delta
	})
	// Return view, these are regular three.js elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={mesh}
			scale={active ? 1.5 : 1}
			onClick={() => setActive(!active)}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? 'blue' : 'orange'} />
		</mesh>
	)

}

function BackgroundAnimation() {

	
	return (
		<div id="background-animation">
			<Canvas>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Box position={[-1.2, 0, 0]} />
				<Box position={[1.2, 0, 0]} />
				<Box position={[4.2, 0, 0]} />
			</Canvas>
		</div>
	);
}

export default BackgroundAnimation