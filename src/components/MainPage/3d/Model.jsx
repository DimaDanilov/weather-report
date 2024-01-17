import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

import sun3D from "Public/3d/sun.glb";
import sunCloud3D from "Public/3d/sun_cloud.glb";
import clouds3D from "Public/3d/clouds.glb";
import drizzle3D from "Public/3d/drizzle.glb";
import rain3D from "Public/3d/rain.glb";
import thunder3D from "Public/3d/thunder.glb";
import snow3D from "Public/3d/snow.glb";
import default3D from "Public/3d/default.glb";

import { CheckWeatherPrior } from "../staff/WeatherPrior";

const PRIOR_WEATHER_MODELS = [
  sun3D,
  sunCloud3D,
  clouds3D,
  drizzle3D,
  rain3D,
  thunder3D,
  snow3D,
  default3D,
];

export const Model = ({ weatherCode }) => {
  const modelRef = useRef();
  const gltf = useGLTF(PRIOR_WEATHER_MODELS[CheckWeatherPrior(weatherCode)]); // Choose model to render

  useFrame(() => {
    modelRef.current.rotation.y += 0.01; // Default rotation every frame
  });

  return (
    <mesh ref={modelRef} rotation-x={Math.PI * 0.05}>
      <primitive object={gltf.scene} />
    </mesh>
  );
};
