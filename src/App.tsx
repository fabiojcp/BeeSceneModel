import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { Environment, Preload } from "@react-three/drei";
import { DDSLoader } from "three-stdlib";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

function Bee() {
  const ref = useRef(null);
  const materials = useLoader(MTLLoader, "./Bee.mtl");
  const obj = useLoader(OBJLoader, "./Bee.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  return <primitive object={obj} ref={ref} />;
}

function Rig() {
  useFrame((state) => {
    // console.log(state.camera.position);
    // _Vector3{x: 0, y: 0, z: 5}
    state.camera.position.lerp(
      { x: -state.pointer.x * 2, y: -state.pointer.y * 2, z: 5 },
      0.1
    );
    state.camera.lookAt(-1, 0, 0);
  });
}

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        margin: 0,
        padding: 0,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <Canvas camera={{ fov: 80 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <Bee />
          {/* <PerspectiveCamera fov={500} /> */}
          {/* <OrbitControls
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.5}
          /> */}
          <Environment preset="sunset" background />
          <Rig from={-Math.PI / 2} to={Math.PI / 2.66} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
