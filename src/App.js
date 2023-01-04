import './App.css';

import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AsciiEffect } from 'three-stdlib'

function Torusknot(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ref = useRef()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useFrame((state, delta) => (ref.current.rotation.x = ref.current.rotation.y += delta / 2))
  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[4, 4, 4]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}


let header, hr, l;
let vsecoder_big = `
.:::::                           .::                      
.::   .::                        .::                      
.::    .::   .::    .::     .::.:.: .:   .::       .::    
.::    .:: .:   .::  .::   .::   .::   .:   .::  .::  .:: 
.::    .::.::::: .::  .:: .::    .::  .::::: .::.::   .:: 
.::   .:: .:           .:.::     .::  .:        .::   .:: 
.:::::      .::::       .::       .::   .::::     .:: .:::
                                                          
`

let vsecoder_small = '<h1>Devtea</h1>'

function App() {
  if (window.innerWidth >= 450) {
    header = vsecoder_big
    hr = '-'.repeat(60)
    l = ' '.repeat(50)
  } else {
    header = vsecoder_small
    hr = '-'.repeat(window.innerWidth/15)
    l = ''
  }

  return (
    <main>
      <section>
        <page>
          <header>
            <pre><h>{header}</h> {l} <b>card</b></pre>
            <p>[<a href="https://vk.com/devteaskins">VK</a>]   [<a href="https://twitter.com/devtea_pixels">Twitter</a>]</p>
          </header>
          <p className='line'>{hr}</p>
          <main>
            <b>Skinmaker, java and python developer</b>
            <p>Hello!</p>
            <p>I have many skills, I like write bots, draw pictures and skins.</p>
            <p>Lower you can visit my social media and support me on my boosty page! Now, Thanks)</p>
          </main>
          <p className='line'>{hr}</p>
          <footer>
            <p> More links:<br />
              [<a href="mailto:devtea@milida.net">EMAIL</a>]
              [<a href="https://ru.namemc.com/minecraft-skins/profile/devtea.1">NameMC</a>]
              [<a href="https://boosty.to/devilaim">Boosty</a>]
              [<a href="https://www.planetminecraft.com/member/devtea/">MC planet</a>]
            </p>
          </footer>
          <p className='line'>{hr}</p>
          <footer>
            <p>Made with ❤️ by vsecoder</p>
          </footer>
        </page>
      </section>
      <Canvas>
        <color attach="background" args={['black']} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Torusknot />
        <AsciiRenderer invert />
      </Canvas>
    </main>
  );
}

function AsciiRenderer({ renderIndex = 1, characters = ' .:-+*=&@#', ...options }) {
  // Reactive state
  const { size, gl, scene, camera } = useThree()

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, options)
    effect.domElement.style.position = 'fixed'
    effect.domElement.style.top = '0px'
    effect.domElement.style.left = '0px'
    effect.domElement.style.right = '0px'
    effect.domElement.style.bottom = '0px'
    effect.domElement.style.color = '#272822'
    effect.domElement.style.backgroundColor = 'black'
    effect.domElement.style.pointerEvents = 'none'
    return effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters, options.invert])

  // Append on mount, remove on unmount
  useEffect(() => {
    gl.domElement.parentNode.appendChild(effect.domElement)
    return () => gl.domElement.parentNode.removeChild(effect.domElement)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect])

  // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect, size])

  // Take over render-loop (that is what the index is for)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useFrame((state) => {
    effect.render(scene, camera)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, renderIndex)

  // This component returns nothing, it has no view, it is a purely logical
}

export default App;
