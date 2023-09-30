import { OrbitControls } from "@react-three/drei";
import React from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import almendra from '../../../assets/styles/fonts/Almendra SC_Regular.json';

extend({ TextGeometry })
extend({ OrbitControls })

function Scene() {
  const font = new FontLoader().parse(almendra);
  return (
    <>
      <mesh position={[-1.6,-0.6,1]} visible>
          <textGeometry args={['WAD2', {font, size:1, height: 1}]}/>
          <meshLambertMaterial attach='material' color={'black'}/>
      </mesh>
    </>
  );
}

export default function Threejs() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Scene />
    </Canvas>
  )
}