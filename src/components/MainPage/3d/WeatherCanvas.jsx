import React from "react";
import styled from "styled-components";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import CameraControls from "camera-controls";
import { Model } from "./Model";

export const WeatherCanvas = ({ weatherCode }) => {
  CameraControls.install({ THREE });
  extend({ CameraControls });

  // Controls to rotate scene
  function Controls() {
    const ref = useRef();
    const camera = useThree((state) => state.camera);
    const gl = useThree((state) => state.gl);
    useFrame((state, delta) => ref.current.update(delta));
    return <cameraControls ref={ref} args={[camera, gl.domElement]} />;
  }

  return (
    <CanvasContainer>
      <Canvas width="100%" aspect-ratio="1/1">
        <Suspense fallback={null}>
          <Model weatherCode={weatherCode} />
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
    </CanvasContainer>
  );
};

const CanvasContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
`;
