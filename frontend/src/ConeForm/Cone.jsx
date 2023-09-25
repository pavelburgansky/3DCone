import React from 'react';
import { Canvas } from '@react-three/fiber';
import {OrbitControls,Stars} from'@react-three/drei'
import * as THREE from 'three';
const Triangle = (props) => {
  const geometry = new THREE.BufferGeometry();
  const positions = props.data.flat();
  const positionAttribute = new THREE.BufferAttribute(new Float32Array(positions), 3);
  geometry.setAttribute('position', positionAttribute);
  const indices = Array.from({ length: positions.length / 3 }, (_, i) => i);
  geometry.setIndex(indices);
  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={0xFF0000} />
    </mesh>
  );
};
const Cone = (props) => {
  let data = []
  let baseData = []
  let baseData1 = []
  let baseData2 = []
  for (let i = 0;i<props.data.length;i++){
    data.push([].concat(...props.data[i]))
  }
  for(let i =0;i<props.data.length;i++){
    let data1 = props.data[i]
    baseData.push([0,0,0].concat(baseData1))
    baseData1 = []
    for(let j = data1.length-1;j>0;j--){
      baseData1.push([].concat(data1[j]))
      baseData2.push([].concat(data1[j]))
    }
  }
  baseData.shift()
  data.push(baseData.flat().flat())
  data.push([0,0,0].concat(baseData2[baseData2.length-2]).concat(baseData2[baseData2.length-1]))
  return (
    <Canvas>
      <OrbitControls/>
      <Stars/>
      <Triangle data={data} />
    </Canvas>
  );
};
export default Cone;
