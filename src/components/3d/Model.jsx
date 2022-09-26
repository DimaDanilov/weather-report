import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import { CheckWeatherPrior } from "../staff/WeatherPrior";

const PRIOR_WEATHER_MODELS = [
    `${process.env.PUBLIC_URL}/3d/sun.glb`,
    `${process.env.PUBLIC_URL}/3d/sun_cloud.glb`,
    `${process.env.PUBLIC_URL}/3d/clouds.glb`,
    `${process.env.PUBLIC_URL}/3d/drizzle.glb`,
    `${process.env.PUBLIC_URL}/3d/rain.glb`,
    `${process.env.PUBLIC_URL}/3d/thunder.glb`,
    `${process.env.PUBLIC_URL}/3d/snow.glb`,
    `${process.env.PUBLIC_URL}/3d/default.glb`
]

export const Model = ({ weatherCode }) => {
    const modelRef = useRef();
    const gltf = useGLTF(PRIOR_WEATHER_MODELS[CheckWeatherPrior(weatherCode)]); // Choose model to render

    useFrame(() => {
        modelRef.current.rotation.y += 0.01; // Default rotation every frame
    });

    return <mesh ref={modelRef} rotation-x={Math.PI * 0.05} >
        <primitive object={gltf.scene} />
    </mesh>
}