import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
// import { ModelURL } from "../assets/3d/sun.glb";

export const Box = () => {
    const boxRef = useRef();
    const gltf = useGLTF("../3d/clouds.glb");

    useFrame(() => {
        boxRef.current.rotation.y += 0.01;
    });

    return <mesh ref={boxRef} rotation-x={Math.PI * 0.05} >
        <primitive object={gltf.scene} />
    </mesh>
}