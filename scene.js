function setup() {
  var c = createCanvas(windowWidth, windowHeight);
  c.parent('p5Div');
}
function draw(){
  fill(random(255));
  ellipse(width / 2, height / 2, 80, 80);
}

let tocontrol = new function() {
this.rotationSpeed = 0.01;
}

var gui = new dat.GUI();
gui.add(tocontrol, 'rotationSpeed', 0, 0.5);


  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //to autoresize with viewport change
  window.addEventListener('resize', function() {
    let threejsWidth = window.innerWidth;
    let threejsHeight = window.innerHeight;
    renderer.setSize(threejsWidth, threejsHeight);
    camera.aspect = threejsWidth / threejsHeight;
    camera.updateProjectionMatrix();
  });

  //controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  //create the shape
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let cubeMaterials = [
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('examples/labcanologo.png'),
      side: THREE.DoubleSide//Can use .Frontside or .Backside to see texture only from those angles
    }), //right
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('examples/1.png'),
      side: THREE.DoubleSide
    }),//left
    new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('examples/2.png'),
      side: THREE.DoubleSide
    }),//top
    new THREE.MeshPhongMaterial({
      color: 0xff99cc,
      side: THREE.DoubleSide
    }),//bottom
    new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('examples/4.png'),
      side: THREE.DoubleSide
    }),//fronside
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('examples/5.png'),
      side: THREE.DoubleSide
    }),//backside
  ];
  //crate a material, color or img texture
  let material = new THREE.MeshFaceMaterial(cubeMaterials);
  // let material = new THREE.MeshBasicMaterial({
  //   color: 0xFFFFFF,
  //   wireframe: true
  // });
  let cube = new THREE.Mesh(geometry, material);


  scene.add(cube);
  camera.position.z = 3;

  let ambientLight = new THREE.AmbientLight(0xFFFFFF,1);
  scene.add(ambientLight);
  //
  // let light1 = new THREE.AmbientLight(0xFF0040,1, 10,50);
  // scene.add(light1);
  // let directionalLight = new THREE.DirectionalLight(0xFFFFFF,1);
  // directionalLight.position.set(0,1,0);
  // scene.add(directionalLight);
  //
  // let spotLight = new THREE.SpotLight(0xFFFFFF, 25);
  // spotLight.position.set(0,3,0);
  // scene.add(spotLight);


  //game logic
  let update = function() {
// let time = Date.now() * 0.0005;

 cube.rotation.x += tocontrol.rotationSpeed;
  cube.rotation.y += tocontrol.rotationSpeed;
//
// light1.position.x = Math.sin(time*0.7)*30;
// light1.position.y = Math.cos(time*0.5)*40;
// light1.position.z = Math.cos(time*0.3)*30;

  };
  //draw Scene
  let render = function() {
    renderer.render(scene, camera);
  };
  //run game loop (update, render, repeat)
  let GameLoop = function() {
    requestAnimationFrame(GameLoop);
    update();
    render();
  };
  GameLoop();
