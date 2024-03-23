import { Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { Environment, OrbitControls } from '@react-three/drei'
import { DDSLoader } from 'three-stdlib'

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader())

function Bee() {
  const materials = useLoader(MTLLoader, './Bee.mtl')
  const obj = useLoader(OBJLoader, './Bee.obj', (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  return <primitive object={obj} />
}
function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'black',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <Bee />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
