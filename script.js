let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const luz = new THREE.AmbientLight(0xffffff, 1);
scene.add(luz);

camera.position.z = 100;
camera.position.y = 80;

let textureLoader = new THREE.TextureLoader();
let gltfLoader = new THREE.GLTFLoader();

let musica = new Audio("SchoolHouseMusic.mp3");

let cieloTextura = textureLoader.load("https://imgs.search.brave.com/_HmzYxkuBFNTIsj5UQGDMycJ5a-RnugFqWlJQb47paQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2lraWEubm9j/b29raWUubmV0L2Jh/bGRpcy1iYXNpY3Mt/aW4tZWR1Y2F0aW9u/LWFuZC1sZWFybmlu/Zy9pbWFnZXMvNi82/ZS9Ta3lfMC5wbmcv/cmV2aXNpb24vbGF0/ZXN0P2NiPTIwMTgw/NjIyMTYzNjA0");
let cieloGeometry = new THREE.SphereGeometry(1000, 25, 25);
let cieloMaterial = new THREE.MeshBasicMaterial( {map: cieloTextura, side: THREE.BackSide} );
let cielo = new THREE.Mesh(cieloGeometry, cieloMaterial);
scene.add(cielo);

// let sueloTextura = textureLoader.load("https://imgs.search.brave.com/FGvXeBYMmjfG3GI-i-j2IMR-D1CQe4gHBTnAuC2bsuk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjIz/OTM2NTg2NC9lcy9m/b3RvL3RvcC12aWV3/LW9mLWdyZWVuLWdy/YXNzLWFydGlmaWNp/YWwtc29jY2VyLWZp/ZWxkLWZvb3RiYWxs/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz05aVF1M2ZOdHBW/a19wNU5NalRxS1Bh/eFNHOFAwTk1pczFv/VklqUlp3cXpNPQ");
// let sueloGeometry = new THREE.BoxGeometry(2048, 3, 2048);
// let sueloMaterial = new THREE.MeshBasicMaterial( {map: sueloTextura} );
// let suelo = new THREE.Mesh(sueloGeometry, sueloMaterial);
// scene.add(suelo);

gltfLoader.load("SchoolHouse2.glb", (glb) => {
    scene.add(glb.scene);
    glb.scene.scale.set(1300, 1300, 1300);
});

const velocidad = 2;

let tecla = {};

window.addEventListener('keydown', function(event) {
    tecla[event.key] = true;
});

window.addEventListener('keyup', function(event) {
    tecla[event.key] = null;
});

window.addEventListener('click', function() {
    musica.play();
    musica.loop = true;
});

function animate() {

    if (tecla != null) {
        if (tecla["a"]) {
            camera.translateX(-velocidad);
        }
        if (tecla["d"]) {
            camera.translateX(velocidad);
        }
        if (tecla["w"]) {
            camera.translateZ(-velocidad);
        }
        if (tecla["s"]) {
            camera.translateZ(velocidad);
        }
        if (tecla["ArrowRight"]) {
            camera.rotation.y -= 0.02;
        }
        if (tecla["ArrowLeft"]) {
            camera.rotation.y += 0.02;
        }
    }

    cielo.position.copy(camera.position);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
