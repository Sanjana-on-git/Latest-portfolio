import * as THREE from 'three';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create floating shapes
function addShape() {
    const geometry = new THREE.IcosahedronGeometry(Math.random() * 2);
    const material = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color(
            Math.random() * 0.2 + 0.8, // High red for pink
            Math.random() * 0.2 + 0.6, // Medium green
            Math.random() * 0.2 + 0.8  // High blue for purple
        ),
        transparent: true,
        opacity: 0.6,
        wireframe: true
    });
    const shape = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    shape.position.set(x, y, z);
    shape.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

    scene.add(shape);
    return shape;
}

// Add multiple shapes
const shapes = Array(20).fill().map(addShape);

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Animation
function animate() {
    requestAnimationFrame(animate);

    shapes.forEach(shape => {
        shape.rotation.x += 0.003;
        shape.rotation.y += 0.002;
        shape.rotation.z += 0.001;
    });

    // Parallax effect on mouse move
    const parallaxX = (window.innerWidth / 2 - (window.mouseX || 0)) * 0.001;
    const parallaxY = (window.innerHeight / 2 - (window.mouseY || 0)) * 0.001;

    camera.position.x += (parallaxX - camera.position.x) * 0.05;
    camera.position.y += (-parallaxY - camera.position.y) * 0.05;

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Track mouse position for parallax
window.addEventListener('mousemove', (event) => {
    window.mouseX = event.clientX;
    window.mouseY = event.clientY;
});

animate();