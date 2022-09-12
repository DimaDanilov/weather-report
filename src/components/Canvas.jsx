import * as THREE from 'three'
import { useRef } from 'react'
import CameraControls from 'camera-controls'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { Box } from "./Box"
import { Suspense } from "react"

export const WeatherCanvas = () => {

    CameraControls.install({ THREE })
    extend({ CameraControls })

    function Controls() {
        const ref = useRef()
        const camera = useThree((state) => state.camera)
        const gl = useThree((state) => state.gl)
        useFrame((state, delta) => ref.current.update(delta))
        return <cameraControls ref={ref} args={[camera, gl.domElement]} />
    }

    return <Canvas>
        <Suspense fallback={null}>
            <Box />
        </Suspense>
        <pointLight position={[10, -10, 10]} power={1} />
        <pointLight position={[-10, -10, -10]} power={1} />
        <directionalLight
            intensity={0.8}
            position={[-10, 10, 5]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            castShadow
        />
        <Controls />
    </Canvas>
}