// npm run dev
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';
// SPACE AMBIENCE MUSIC
const spaceMusic = new Audio('/a_moment.mp3');
spaceMusic.loop = true;
spaceMusic.volume = 0.25;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020609);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 8);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance'
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 3.2;
controls.maxDistance = 14;
controls.target.set(0, 0, 0);
//tau ceti
const planetGroup = new THREE.Group();
scene.add(planetGroup);

const planetGeometry = new THREE.SphereGeometry(1.65, 128, 128);

const planetMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.9,
  metalness: 0.02
});

const planet = new THREE.Mesh(planetGeometry, planetMaterial);
planetGroup.add(planet);
// earth
const earthGroup = new THREE.Group();
earthGroup.position.set(-6.2, -2, -3);
scene.add(earthGroup);
const spaceTextureLoader = new THREE.TextureLoader();

spaceTextureLoader.load(
  'EARTH.jpg',
  (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    earth.material.map = texture;
    earth.material.color.set(0xffffff);
    earth.material.needsUpdate = true;
  }
);

spaceTextureLoader.load(
  'MOON.jpg',
  (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    moon.material.map = texture;
    moon.material.color.set(0xffffff);
    moon.material.needsUpdate = true;
  }
);
const earthGeometry = new THREE.SphereGeometry(0.38, 64, 64);

const earthMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.9
});

const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earthGroup.add(earth);

const earthAtmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.405, 48, 48),
  new THREE.MeshBasicMaterial({
    color: 0x318bff,
    transparent: true,
    opacity: 0.12,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
);

earthGroup.add(earthAtmosphere);

const moonOrbit = new THREE.Group();
earthGroup.add(moonOrbit);

const moonGeometry = new THREE.SphereGeometry(0.105, 32, 32);

const moonMaterial = new THREE.MeshStandardMaterial({
  color: 0xc8c8c8,
  roughness: 1
});

const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(0.65, 0.1, 0);
moonOrbit.add(moon);

const orbitPoints = [];

for (let i = 0; i <= 100; i++) {
  const angle = (i / 100) * Math.PI * 2;

  orbitPoints.push(
    new THREE.Vector3(
      Math.cos(angle) * 0.65,
      Math.sin(angle) * 0.65,
      0
    )
  );
}

const tauCetiFGroup = new THREE.Group();
tauCetiFGroup.position.set(-5, 2.5, -3);
scene.add(tauCetiFGroup);

const tauCetiF = new THREE.Mesh(
  new THREE.SphereGeometry(0.24, 64, 64),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.9
  })
);

tauCetiFGroup.add(tauCetiF);

new THREE.TextureLoader().load('/TauCeti_F.jpg', (texture) => {
  texture.colorSpace = THREE.SRGBColorSpace;
  tauCetiF.material.map = texture;
  tauCetiF.material.needsUpdate = true;
});
const tauCetiGGroup = new THREE.Group();
tauCetiGGroup.position.set(-8, 0, -3);
scene.add(tauCetiGGroup);

const tauCetiG = new THREE.Mesh(
  new THREE.SphereGeometry(0.24, 64, 64),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.9
  })
);

tauCetiGGroup.add(tauCetiG);

new THREE.TextureLoader().load('/TauCeti_G.jpg', (texture) => {
  texture.colorSpace = THREE.SRGBColorSpace;
  tauCetiG.material.map = texture;
  tauCetiG.material.needsUpdate = true;
});

const tauCetiEGroup = new THREE.Group();
tauCetiEGroup.position.set(3, 1.5, -3);
scene.add(tauCetiEGroup);

const tauCetiE = new THREE.Mesh(
  new THREE.SphereGeometry(0.24, 64, 64),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.9
  })
);

tauCetiEGroup.add(tauCetiE);

new THREE.TextureLoader().load('/TauCeti_E.jpg', (texture) => {
  texture.colorSpace = THREE.SRGBColorSpace;
  tauCetiE.material.map = texture;
  tauCetiE.material.needsUpdate = true;
});

const tauCetiHGroup = new THREE.Group();
tauCetiHGroup.position.set(6.2, -1.8, -3);
scene.add(tauCetiHGroup);

const tauCetiH = new THREE.Mesh(
  new THREE.SphereGeometry(0.22, 64, 64),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.9
  })
);

tauCetiHGroup.add(tauCetiH);

new THREE.TextureLoader().load('/TauCeti_H.jpg', (texture) => {
  texture.colorSpace = THREE.SRGBColorSpace;
  tauCetiH.material.map = texture;
  tauCetiH.material.needsUpdate = true;
});

/* petrova */

let petrovaActive = false;
let petrovaProgress = 0;

const petrovaButton = document.getElementById('petrova-button');
const normalBackground = scene.background
  ? scene.background.clone()
  : new THREE.Color(0x000000);

const normalFogColor = scene.fog
  ? scene.fog.color.clone()
  : null;

const petrovaColor = new THREE.Color(0x6b071c);
const normalTint = new THREE.Color(0xffffff);
const petrovaTint = new THREE.Color(0xff7777);

const petrovaGeometry = new THREE.BufferGeometry();
const petrovaPositions = [];

for (let i = 0; i < 10000; i++) {
  petrovaPositions.push(
    (Math.random() - 0.5) * 35,
    (Math.random() - 0.5) * 22,
    (Math.random() - 0.5) * 30
  );
}

petrovaGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(petrovaPositions, 3)
);

const sparkleCanvas = document.createElement('canvas');
sparkleCanvas.width = 64;
sparkleCanvas.height = 64;

const sparkleContext = sparkleCanvas.getContext('2d');
const sparkleGradient = sparkleContext.createRadialGradient(
  32, 32, 0,
  32, 32, 32
);

sparkleGradient.addColorStop(0, 'rgba(255,255,255,1)');
sparkleGradient.addColorStop(0.2, 'rgba(255,170,190,0.9)');
sparkleGradient.addColorStop(0.5, 'rgba(255,65,100,0.35)');
sparkleGradient.addColorStop(1, 'rgba(255,40,80,0)');

sparkleContext.fillStyle = sparkleGradient;
sparkleContext.fillRect(0, 0, 64, 64);

const sparkleTexture = new THREE.CanvasTexture(sparkleCanvas);

const petrovaMaterial = new THREE.PointsMaterial({
  color: 0xff526b,
  size: 0.12,
  map: sparkleTexture,
  transparent: true,
  opacity: 0,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  alphaTest: 0.01,
  sizeAttenuation: true
});

const petrovaParticles = new THREE.Points(
  petrovaGeometry,
  petrovaMaterial
);

scene.add(petrovaParticles);
petrovaButton.addEventListener('click', () => {
  petrovaActive = !petrovaActive;

  petrovaButton.textContent = petrovaActive
    ? 'DEACTIVATE PETROVA'
    : 'ACTIVATE PETROVA';

  console.log('Petrova active:', petrovaActive);
});

function updatePetrovaEffect() {
  const target = petrovaActive ? 1 : 0;

  petrovaProgress += (target - petrovaProgress) * 0.025;

  scene.background = normalBackground.clone().lerp(
    petrovaColor,
    petrovaProgress * 0.7
  );

  if (scene.fog && normalFogColor) {
    scene.fog.color.copy(normalFogColor).lerp(
      petrovaColor,
      petrovaProgress * 0.7
    );
  }
  [planet, earth, erid, tauCetiF, tauCetiH, tauCetiG, tauCetiE].forEach((world) => {
    if (world && world.material && world.material.color) {
      world.material.color.copy(normalTint).lerp(
        petrovaTint,
        petrovaProgress * 0.65
      );
    }
  });

  petrovaMaterial.opacity = petrovaProgress * 0.9;
  petrovaMaterial.size = 0.10 + petrovaProgress * 0.08;

  petrovaParticles.rotation.y += 0.0008 * petrovaProgress;
}
 // erid
const eridGroup = new THREE.Group();
eridGroup.position.set(6.2, 2.5, -3);
scene.add(eridGroup);
const eridGeometry = new THREE.SphereGeometry(0.85, 96, 96);
const eridMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 1,
  metalness: 0
});

const erid = new THREE.Mesh(eridGeometry, eridMaterial);
eridGroup.add(erid);
const eridTextureLoader = new THREE.TextureLoader();
eridTextureLoader.load(
  '/ERID.png',
  (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    erid.material.map = texture;
    erid.material.color.set(0xffffff);
    erid.material.needsUpdate = true;
  },
  undefined,
  (error) => {
    console.error('Could not load erid-texture.jpg:', error);
  }
);
const eridAtmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.89, 64, 64),
  new THREE.MeshBasicMaterial({
    color: 0xeaa16b,
    transparent: true,
    opacity: 0.09,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
);
eridGroup.add(eridAtmosphere);
const eridRings = new THREE.Group();
eridRings.rotation.set(1.5, 1, 0.2);
eridGroup.add(eridRings);
const ringBands = [
  { inner: 1.12, outer: 1.32, color: 0x8ddfff, opacity: 0.55 },
  { inner: 1.34, outer: 1.52, color: 0x8ddfff, opacity: 0.75 },
  { inner: 1.54, outer: 1.72, color: 0x8ddfffc, opacity: 0.45 },
  { inner: 1.74, outer: 1.84, color: 0x8ddfff, opacity: 0.65 }
];
ringBands.forEach((band) => {
  const geometry = new THREE.RingGeometry(
    band.inner,
    band.outer,
    128
  );

  const material = new THREE.MeshStandardMaterial({
    color: band.color,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: band.opacity,
    roughness: 1,
    metalness: 0,
    depthWrite: false
  });

  const ring = new THREE.Mesh(geometry, material);
  ring.renderOrder = 1;
  eridRings.add(ring);
});
const eridLight = new THREE.PointLight(0xffa65a, 1.2, 5);
eridLight.position.set(5.5, 0.4, -1);
scene.add(eridLight);
const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
const orbitLine = new THREE.LineLoop(
  orbitGeometry,
  new THREE.LineBasicMaterial({
    color: 0x668b9b,
    transparent: true,
    opacity: 0.25
  })
);
moonOrbit.add(orbitLine);
const textureLoader = new THREE.TextureLoader();
textureLoader.load(
  '/TAU_CETI.png',
  (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;

    planet.material.map = texture;
    planet.material.color.set(0xffffff);
    planet.material.needsUpdate = true;
  },
  undefined,
  (error) => {
    console.error('Could not load the Tau Ceti texture:', error);
  }
);
const atmosphereGeometry = new THREE.SphereGeometry(1.75, 96, 96);

const atmosphereMaterial = new THREE.ShaderMaterial({
  uniforms: {
    glowColor: { value: new THREE.Color(0x39cc25) },
    intensity: { value: 1.7 }
  },

  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,

  fragmentShader: `
    uniform vec3 glowColor;
    uniform float intensity;

    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec3 viewDirection = normalize(vViewPosition);
      float fresnel = pow(
        1.0 - abs(dot(normalize(vNormal), viewDirection)),
        2.4
      );

      float alpha = fresnel * 0.35 * intensity;

      gl_FragColor = vec4(glowColor, alpha);
    }
  `,

  transparent: true,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide,
  depthWrite: false
});

const atmosphere = new THREE.Mesh(
  atmosphereGeometry,
  atmosphereMaterial
);

planetGroup.add(atmosphere);

const haloMaterial = new THREE.SpriteMaterial({
  map: createGlowTexture(),
  color: 0x39cc25,
  transparent: true,
  opacity: 0.9,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});

const halo = new THREE.Sprite(haloMaterial);
halo.scale.set(6.5, 6.5, 1);
planetGroup.add(halo);
function createGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;

  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(
    128, 128, 10,
    128, 128, 128
  );

  gradient.addColorStop(0, 'rgba(50,255,20,0.32)');
  gradient.addColorStop(0.35, 'rgba(50,255,20,0.18)');
  gradient.addColorStop(0.7, 'rgba(50,255,20,0.05)');
  gradient.addColorStop(1, 'rgba(50,255,20,0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  return new THREE.CanvasTexture(canvas);
}
const ambientLight = new THREE.AmbientLight(0x4b7049, 1.2);
scene.add(ambientLight);

const starLight = new THREE.PointLight(0xffe8ad, 45, 100);
starLight.position.set(4, 2, 5);
scene.add(starLight);

const greenLight = new THREE.PointLight(0x23ff25, 3, 15);
greenLight.position.set(-3, 1, 2);
scene.add(greenLight);

const starCount = 5000;
const starPositions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {
  const i3 = i * 3;

  starPositions[i3] = (Math.random() - 0.5) * 180;
  starPositions[i3 + 1] = (Math.random() - 0.5) * 110;
  starPositions[i3 + 2] = -10 - Math.random() * 100;
}

const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(starPositions, 3)
);

const starMaterial = new THREE.PointsMaterial({
  color: 0xd9e9ff,
  size: 0.075,
  transparent: true,
  opacity: 0.85,
  sizeAttenuation: true
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

const instructions = document.createElement('div');
instructions.id = 'instructions';
instructions.textContent = 'DRAG TO EXPLORE  •  SCROLL TO ZOOM';

document.body.appendChild(instructions);

const zoomControls = document.createElement('div');
zoomControls.id = 'zoom-controls';

zoomControls.innerHTML = `
  <button id="zoom-in" aria-label="Zoom in">+</button>
  <button id="zoom-out" aria-label="Zoom out">−</button>
`;

document.body.appendChild(zoomControls);

document.getElementById('zoom-in').addEventListener('click', () => {
  camera.position.multiplyScalar(0.85);
  controls.update();
});

document.getElementById('zoom-out').addEventListener('click', () => {
  camera.position.multiplyScalar(1.18);
  controls.update();
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

const planetHud = document.createElement('div');
planetHud.id = 'planet-hud';

planetHud.innerHTML = `
  <div class="hud-title" id="hud-name">TAU CETI</div>
  <div class="hud-name-line"></div>
  <button id="hud-more-info">MORE INFO +</button>
  <div id="hud-details">
    <div class="hud-label" id="hud-status">STATUS: STAR</div>
    <div class="hud-size" id="hud-size">PRIMARY STAR</div>
    <div class="hud-line"></div>
    <div class="hud-label">PLANETARY DATABASE</div>
    <div id="hud-description"></div>
    <div id="hud-extra"></div>
  </div>
`;

document.body.appendChild(planetHud);

const moreInfoButton = document.getElementById('hud-more-info');
const hudDetails = document.getElementById('hud-details');

moreInfoButton.addEventListener('click', () => {
  const isOpen = hudDetails.classList.toggle('expanded');

  moreInfoButton.textContent = isOpen
    ? 'LESS INFO −'
    : 'MORE INFO +';
});
const hoverablePlanets = [
  {
    mesh: planet,
    name: 'TAU CETI',
    status: 'STATUS: STAR',
    info: ' CENTER STAR',
    description: 'Tau Ceti later named as Adrian by Ryland Grace and Rocky.',
    extra: 'AFFECTED BY ASTROPHAGE?   NO'
  },
  {
    mesh: earth,
    name: 'EARTH',
    status: 'STATUS: PLANET',
    info: 'SOLAR SYSTEM',
    description: 'Home Planet to Ryland Grace.',
    extra: 'AFFECTED BY ASTROPHAGE?   YES'
  },
  {
    mesh: erid,
    name: 'ERID',
    status: 'STATUS: PLANET',
    info: 'System: 40 Eridani',
    description: 'Home Planet to Rocky',
    extra: 'AFFECTED BY ASTROPHAGE?   YES'
  },
  {
    mesh: tauCetiG,
    name: 'TAU CETI G',
    status: 'STATUS: PLANET',
    info: 'TAU CETI SYSTEM',
    description: 'SECOND PLANET FROM THE STAR | EXISTENCE: Dubious and unlikely but not fully disproven.',
    extra: 'TYPE: HOT & ROCKY PLANET '
  },
  {
    mesh: tauCetiH,
    name: 'TAU CETI C',
    status: 'STATUS: PLANET',
    info: 'TAU CETI SYSTEM',
    description: 'Considered a Candidate | Detection: Unsuccessful',
    extra: 'TYPE: Unknown'
  },
  {
    mesh: tauCetiF,
    name: 'TAU CETI F',
    status: 'STATUS: Planet',
    info: 'TAU CETI SYSTEM',
    description: 'Yet to be detected but could Exist | Unconfirmed Candidate',
    extra: 'TYPE: Unlikely to be Rocky'
  },
  {
    mesh: tauCetiE,
    name: 'TAU CETI E',
    status: 'STATUS: Planet',
    info: 'FIRST PLANET CLOSE TO TAU CETIS HABITABLE ZONE',
    description: 'significantly large & Serious doubt on its existence',
    extra: 'TYPE: Warm mini neptue and unhabiable'
  }
];

const hoverRaycaster = new THREE.Raycaster();
const hoverMouse = new THREE.Vector2(-2, -2);
window.addEventListener('pointermove', (event) => {
  const rect = renderer.domElement.getBoundingClientRect();

  hoverMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  hoverMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
});

let hoveredPlanet = null;
let hoverStartedAt = 0;
let hudVisible = false;
let hudLocked = false;

planetHud.addEventListener('mouseenter', () => {
  hudLocked = true;
});

planetHud.addEventListener('mouseleave', () => {
  hudLocked = false;
});

let hoverLostAt = 0;

function updatePlanetHover() {

  if (planetHud.matches(':hover')) {
    hoverLostAt = 0;
    return;
  }

  hoverRaycaster.setFromCamera(hoverMouse, camera);

  const intersections = hoverRaycaster.intersectObjects(
    hoverablePlanets.map((item) => item.mesh),
    false
  );

  const found = intersections.length
    ? hoverablePlanets.find(
        (item) => item.mesh === intersections[0].object
      )
    : null;

  if (!found) {
    if (hudVisible) {
      if (hoverLostAt === 0) {
        hoverLostAt = performance.now();
      }
      if (performance.now() - hoverLostAt < 800) {
        return;
      }
    }

    hoveredPlanet = null;
    hudVisible = false;
    hoverLostAt = 0;
    planetHud.classList.remove('visible');
    return;
  }

  hoverLostAt = 0;

  if (found !== hoveredPlanet) {
    hoveredPlanet = found;
    hoverStartedAt = performance.now();
    hudVisible = false;
    planetHud.classList.remove('visible');
  }

  if (!hudVisible && performance.now() - hoverStartedAt >= 1000) {
    document.getElementById('hud-name').textContent = hoveredPlanet.name;
    document.getElementById('hud-status').textContent = hoveredPlanet.status;
    document.getElementById('hud-size').textContent = hoveredPlanet.info;
    document.getElementById('hud-description').textContent =
      hoveredPlanet.description;
    document.getElementById('hud-extra').textContent = hoveredPlanet.extra;

    hudDetails.classList.remove('expanded');
    moreInfoButton.textContent = 'MORE INFO +';

    planetHud.classList.add('visible');
    hudVisible = true;
  }

  const screenPosition = hoveredPlanet.mesh.getWorldPosition(
    new THREE.Vector3()
  );

  screenPosition.project(camera);

  const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-screenPosition.y * 0.5 + 0.5) * window.innerHeight;

  planetHud.style.left = `${x + 25}px`;
  planetHud.style.top = `${y - 40}px`;
}

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  // Slowly rotate Earth.
earth.rotation.y = elapsed * 0.12;

// Move the Moon around Earth.
moonOrbit.rotation.z = elapsed * 0.25;

erid.rotation.y = elapsed * 0.05;
eridAtmosphere.rotation.y = elapsed * 0.08;
eridRings.rotation.z = 0.2 + elapsed * 1;

  planet.rotation.y = elapsed * 0.055;
  atmosphere.rotation.y = elapsed * 0.055;

tauCetiF.rotation.y = elapsed * 1;
tauCetiH.rotation.y = elapsed * 0.15;
tauCetiG.rotation.y = elapsed * 2;
tauCetiE.rotation.y = elapsed * 1.1,

updatePetrovaEffect();
  halo.material.opacity = 0.28 + Math.sin(elapsed * 0.6) * 0.04;
  updatePlanetHover();

  controls.update();
  renderer.render(scene, camera);
}
animate();

const musicButton = document.createElement('button');

musicButton.id = 'music-button';
musicButton.textContent = '♫ PLAY MUSIC';

document.body.appendChild(musicButton);

let musicPlaying = false;

musicButton.addEventListener('click', async () => {
  if (!musicPlaying) {
    try {
      spaceMusic.currentTime = 0;
      await spaceMusic.play();

      musicPlaying = true;
      musicButton.textContent = '♫ PAUSE MUSIC';

    } catch (error) {
      console.error('Audio error:', error);
      musicButton.textContent = 'AUDIO ERROR';
    }

  } else {
    spaceMusic.pause();

    musicPlaying = false;
    musicButton.textContent = '♫ PLAY MUSIC';
  }
});
