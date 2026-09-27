const canvas = document.getElementById('three-bg');

if (canvas && window.THREE) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowPower = window.innerWidth < 768 || navigator.hardwareConcurrency <= 4;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x03040a, 16, 42);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowPower, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.25 : 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;

  const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.2, 18);
  const sceneRoot = new THREE.Group();
  scene.add(sceneRoot);

  scene.add(new THREE.AmbientLight(0x9fbfff, 0.8));
  const cyanLight = new THREE.PointLight(0x20d9ff, 30, 28, 2);
  cyanLight.position.set(-8, 5, 8);
  scene.add(cyanLight);
  const violetLight = new THREE.PointLight(0x7c5cff, 24, 30, 2);
  violetLight.position.set(9, -1, 7);
  scene.add(violetLight);

  function addParticles(count) {
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index++) {
      const offset = index * 3;
      positions[offset] = (Math.random() - 0.5) * 30;
      positions[offset + 1] = (Math.random() - 0.5) * 18;
      positions[offset + 2] = (Math.random() - 0.5) * 22;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0x79dfff, size: 0.06, transparent: true, opacity: 0.7, depthWrite: false });
    return new THREE.Points(geometry, material);
  }

  function addWireframeBlock(width, height, depth, position, color) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.32 });
    const block = new THREE.Mesh(geometry, material);
    block.position.set(...position);
    sceneRoot.add(block);
    return block;
  }

  function addSignal(points, color) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points.map(point => new THREE.Vector3(...point)));
    const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.65 }));
    sceneRoot.add(line);
    return line;
  }

  const particles = addParticles(lowPower ? 420 : 1000);
  sceneRoot.add(particles);
  const blocks = [
    addWireframeBlock(5.5, 3.2, 2.2, [-7, 3.5, -5], 0x1ec8ff),
    addWireframeBlock(4, 5.8, 1.8, [7.5, 1.5, -7], 0x745cff),
    addWireframeBlock(3.2, 2.3, 2.3, [1, -4.2, -4], 0x4b9dff),
    addWireframeBlock(2.2, 2.2, 2.2, [-9, -5, -8], 0x20e0c0)
  ];
  const signals = [
    addSignal([[-14, 1, -4], [-5, 1, -4], [-1, 4, -6], [8, 4, -7], [14, 1, -9]], 0x28d9ff),
    addSignal([[-12, -4, -7], [-4, -4, -6], [2, -1, -7], [12, -1, -8]], 0x8b6cff)
  ];
  const pointer = { x: 0, y: 0 };
  window.addEventListener('pointermove', event => {
    pointer.x = event.clientX / window.innerWidth * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight * 2 - 1);
  });

  const clock = new THREE.Clock();
  function render() {
    if (reduceMotion) {
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      return;
    }
    const elapsed = clock.getElapsedTime();
    particles.rotation.y = elapsed * 0.035;
    particles.position.y = Math.sin(elapsed * 0.25) * 0.15;
    blocks.forEach((block, index) => {
      block.rotation.x = elapsed * (0.08 + index * 0.015);
      block.rotation.y = elapsed * (0.11 + index * 0.02);
      block.position.y += Math.sin(elapsed * 0.45 + index) * 0.0015;
    });
    signals.forEach((line, index) => {
      line.material.opacity = 0.35 + Math.sin(elapsed * 1.4 + index) * 0.2;
    });
    sceneRoot.rotation.y += (pointer.x * 0.08 - sceneRoot.rotation.y) * 0.02;
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.025;
    camera.position.y += (1.2 + pointer.y * 0.8 - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
