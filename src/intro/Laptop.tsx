import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

export const BASE_W = 3.0;
export const BASE_D = 2.05;
export const BASE_H = 0.11;
export const LID_T = 0.07;
export const SCREEN_W_UNITS = 2.78;
export const SCREEN_H_UNITS = 1.74;

export interface LaptopHandle {
  lid: THREE.Group;
  screen: THREE.Mesh;
  screenMaterial: THREE.MeshStandardMaterial;
  keysMaterial: THREE.MeshStandardMaterial;
  screenLight: THREE.PointLight;
}

interface LaptopProps {
  screenTexture: THREE.Texture;
}

const KEY_ROWS = 6;
const KEY_COLS = 15;

/**
 * Procedural laptop built from primitives. Roughly the same silhouette as a
 * compressed GLB but with zero download cost and simple PBR materials.
 */
export const Laptop = forwardRef<LaptopHandle, LaptopProps>(function Laptop({ screenTexture }, ref) {
  const lidRef = useRef<THREE.Group>(null!);
  const screenRef = useRef<THREE.Mesh>(null!);
  const screenMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const keysMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const screenLightRef = useRef<THREE.PointLight>(null!);

  useImperativeHandle(ref, () => ({
    get lid() {
      return lidRef.current;
    },
    get screen() {
      return screenRef.current;
    },
    get screenMaterial() {
      return screenMatRef.current;
    },
    get keysMaterial() {
      return keysMatRef.current;
    },
    get screenLight() {
      return screenLightRef.current;
    },
  }));

  // Key grid laid out once; instanced so it's a single draw call.
  const keyMatrices = useMemo(() => {
    const m: THREE.Matrix4[] = [];
    const areaW = BASE_W * 0.82;
    const areaD = BASE_D * 0.44;
    const keyW = areaW / KEY_COLS;
    const keyD = areaD / KEY_ROWS;
    const x0 = -areaW / 2 + keyW / 2;
    const z0 = -BASE_D / 2 + 0.22 + keyD / 2;
    for (let r = 0; r < KEY_ROWS; r++) {
      for (let c = 0; c < KEY_COLS; c++) {
        // Space bar: merge the middle keys of the last row
        if (r === KEY_ROWS - 1 && c > 4 && c < 10) {
          if (c !== 5) continue;
          const mat = new THREE.Matrix4();
          mat.compose(
            new THREE.Vector3(x0 + (c + 2) * keyW, BASE_H / 2 + 0.012, z0 + r * keyD),
            new THREE.Quaternion(),
            new THREE.Vector3(keyW * 5 - 0.02, 0.024, keyD - 0.02),
          );
          m.push(mat);
          continue;
        }
        const mat = new THREE.Matrix4();
        mat.compose(
          new THREE.Vector3(x0 + c * keyW, BASE_H / 2 + 0.012, z0 + r * keyD),
          new THREE.Quaternion(),
          new THREE.Vector3(keyW - 0.02, 0.024, keyD - 0.02),
        );
        m.push(mat);
      }
    }
    return m;
  }, []);

  const keysInit = useRef(false);

  return (
    <group position={[0, BASE_H / 2, 0]}>
      {/* Base */}
      <RoundedBox args={[BASE_W, BASE_H, BASE_D]} radius={0.035} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#2b2f36" metalness={0.75} roughness={0.38} />
      </RoundedBox>

      {/* Keyboard well */}
      <mesh position={[0, BASE_H / 2 + 0.001, -BASE_D / 2 + 0.22 + (BASE_D * 0.44) / 2]}>
        <boxGeometry args={[BASE_W * 0.84, 0.004, BASE_D * 0.46]} />
        <meshStandardMaterial color="#1a1d22" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Keys (instanced) */}
      <instancedMesh
        ref={(el) => {
          if (!el) return;
          if (!keysInit.current) {
            keyMatrices.forEach((mat, i) => el.setMatrixAt(i, mat));
            el.instanceMatrix.needsUpdate = true;
            keysInit.current = true;
          }
        }}
        args={[undefined, undefined, keyMatrices.length]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          ref={keysMatRef}
          color="#15181d"
          emissive="#9cc9ff"
          emissiveIntensity={0}
          metalness={0.3}
          roughness={0.7}
        />
      </instancedMesh>

      {/* Trackpad */}
      <mesh position={[0, BASE_H / 2 + 0.002, BASE_D / 2 - 0.42]}>
        <boxGeometry args={[1.05, 0.004, 0.62]} />
        <meshStandardMaterial color="#24282e" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Lid - hinged at the back edge */}
      <group ref={lidRef} position={[0, BASE_H / 2, -BASE_D / 2]}>
        <group position={[0, LID_T / 2 + 0.004, BASE_D / 2]}>
          <RoundedBox args={[BASE_W, LID_T, BASE_D]} radius={0.03} smoothness={4} castShadow>
            <meshStandardMaterial color="#2b2f36" metalness={0.75} roughness={0.38} />
          </RoundedBox>
          {/* Bezel (inner face) */}
          <mesh position={[0, -LID_T / 2 - 0.0015, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[BASE_W - 0.08, BASE_D - 0.08]} />
            <meshStandardMaterial color="#0a0b0d" metalness={0.2} roughness={0.5} />
          </mesh>
          {/* Display panel */}
          <mesh ref={screenRef} position={[0, -LID_T / 2 - 0.003, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[SCREEN_W_UNITS, SCREEN_H_UNITS]} />
            <meshStandardMaterial
              ref={screenMatRef}
              color="#000000"
              emissive="#ffffff"
              emissiveMap={screenTexture}
              emissiveIntensity={0}
              roughness={0.35}
              metalness={0}
              toneMapped={false}
            />
          </mesh>
          {/* Screen glow onto the keyboard */}
          <pointLight
            ref={screenLightRef}
            position={[0, -0.6, 0.1]}
            color="#bcd6ff"
            intensity={0}
            distance={3.2}
            decay={2}
          />
        </group>
      </group>
    </group>
  );
});
