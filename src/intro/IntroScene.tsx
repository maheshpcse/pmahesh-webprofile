import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { Laptop, LaptopHandle, SCREEN_H_UNITS, SCREEN_W_UNITS } from './Laptop';
import { createScreenTexture } from './screenTexture';
import { T, LID_OPEN_ANGLE, seg, smooth, easeOutCubic, easeInOutQuint } from './timeline';

interface DirectorProps {
  /** Called every frame with the 0..1 DOM crossfade amount. */
  onEnter: (amount: number) => void;
  onComplete: () => void;
}

const START_POS = new THREE.Vector3(1.5, 1.75, 5.6);
const START_TARGET = new THREE.Vector3(0, 0.5, 0);
const MID_POS = new THREE.Vector3(0.35, 1.3, 4.7);
const MID_TARGET = new THREE.Vector3(0, 0.65, -0.2);

/**
 * Drives the whole sequence from a single clock: lid, keyboard glow, power-on,
 * boot log, camera dolly into the screen, and the DOM crossfade.
 */
function Director({ onEnter, onComplete }: DirectorProps) {
  const laptop = useRef<LaptopHandle>(null!);
  const { camera, size } = useThree();
  const screen = useMemo(() => createScreenTexture(), []);
  const time = useRef(0);
  const done = useRef(false);

  const tmpPos = useRef(new THREE.Vector3());
  const tmpTarget = useRef(new THREE.Vector3());
  const screenCenter = useRef(new THREE.Vector3());
  const screenNormal = useRef(new THREE.Vector3());
  const finalPos = useRef(new THREE.Vector3());

  useEffect(() => () => screen.dispose(), [screen]);

  useFrame((_, delta) => {
    if (done.current) return;
    // Cap delta so a backgrounded tab doesn't jump the whole sequence.
    time.current += Math.min(delta, 0.1);
    const t = time.current;
    const L = laptop.current;
    if (!L?.lid) return;

    // Lid
    const lid = easeOutCubic(seg(t, T.lidStart, T.lidEnd));
    L.lid.rotation.x = -LID_OPEN_ANGLE * lid;

    // Keyboard illumination
    const keys = smooth(seg(t, T.keysStart, T.keysEnd));
    L.keysMaterial.emissiveIntensity = 0.55 * keys;

    // Screen power + boot
    const power = smooth(seg(t, T.powerStart, T.powerEnd));
    const boot = seg(t, T.bootStart, T.bootEnd);
    L.screenMaterial.emissiveIntensity = power * 1.25;
    L.screenLight.intensity = power * 1.6;
    screen.draw({ power, boot, time: t });

    // Camera
    const drift = smooth(seg(t, 0, T.zoomStart));
    tmpPos.current.lerpVectors(START_POS, MID_POS, drift);
    tmpTarget.current.lerpVectors(START_TARGET, MID_TARGET, drift);

    const zoom = easeInOutQuint(seg(t, T.zoomStart, T.zoomEnd));
    if (zoom > 0) {
      L.screen.getWorldPosition(screenCenter.current);
      L.screen.getWorldDirection(screenNormal.current);
      const persp = camera as THREE.PerspectiveCamera;
      const halfFov = THREE.MathUtils.degToRad(persp.fov) / 2;
      const aspect = size.width / size.height;
      // Distance at which the panel covers the viewport in both axes (slight overfill).
      const dH = (SCREEN_H_UNITS / 2) / Math.tan(halfFov);
      const dW = (SCREEN_W_UNITS / 2) / (Math.tan(halfFov) * aspect);
      const d = Math.min(dH, dW) * 0.96;
      finalPos.current.copy(screenCenter.current).addScaledVector(screenNormal.current, d);
      tmpPos.current.lerp(finalPos.current, zoom);
      tmpTarget.current.lerp(screenCenter.current, zoom);
    }
    camera.position.copy(tmpPos.current);
    camera.lookAt(tmpTarget.current);

    onEnter(seg(t, T.fadeStart, T.fadeEnd));

    if (t >= T.total) {
      done.current = true;
      onComplete();
    }
  });

  return (
    <>
      <color attach="background" args={['#070809']} />
      <fog attach="fog" args={['#070809', 7, 15]} />

      <ambientLight intensity={0.28} />
      <directionalLight
        position={[3.5, 5, 4]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-4, 3, -3]} intensity={0.9} color="#8fb3ff" />
      <spotLight position={[0, 6, 1]} angle={0.55} penumbra={0.9} intensity={1.6} color="#dfe7f2" />

      <Laptop ref={laptop} screenTexture={screen.texture} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0b0d10" roughness={0.95} metalness={0} />
      </mesh>
      <ContactShadows position={[0, 0.002, 0]} opacity={0.55} scale={9} blur={2.2} far={1.6} resolution={512} />
    </>
  );
}

interface IntroSceneProps {
  onEnter: (amount: number) => void;
  onComplete: () => void;
}

export function IntroScene({ onEnter, onComplete }: IntroSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ fov: 32, near: 0.05, far: 40, position: START_POS.toArray() }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    >
      <Director onEnter={onEnter} onComplete={onComplete} />
    </Canvas>
  );
}
