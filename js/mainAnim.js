var camera, scene, renderer, wfobject, light, geometry;
var hemisphereCol = [];
var colCounter = 1;
var isGoingDown = true;

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .7, 2.5);
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(window.innerWidth + window.innerWidth / 5, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    geometry = new THREE.TorusKnotGeometry(10, 3.6, 183, 40, 4, 14, 1);
    var material = new THREE.MeshLambertMaterial({
        wireframe: false,
        transparent: true,
        opacity: .4,
    });

    onWindowResize();

    wfobject = new THREE.Mesh(geometry, material);
    scene.add(wfobject);

    camera.position.z = 4;
    camera.rotation.y = -.18;

    hemisphereCol.push([new THREE.Color("rgb(24,111,78)"), new THREE.Color("rgb(255,232,0)")]);
    hemisphereCol.push([new THREE.Color("rgb(43, 177, 220)"), new THREE.Color("rgb(255,111,0)")]);
    hemisphereCol.push([new THREE.Color("rgb(39,137,26)"), new THREE.Color("rgb(246,17,17)")]);

    light = new THREE.HemisphereLight(hemisphereCol[0][0], hemisphereCol[0][1], 1.2);
    light.position.set(0, 15, 15);
    scene.add(light);
    window.addEventListener('resize', onWindowResize, false);

    window.setInterval(function () {
        groundColorTo(hemisphereCol[colCounter - 1][0], hemisphereCol[colCounter][0])
    }, 10000);
    window.setInterval(function () {
        skyColorTo(hemisphereCol[colCounter - 1][1], hemisphereCol[colCounter][1])
    }, 10000);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    if (camera.rotation.z >= -2 && isGoingDown) {
        camera.rotation.z -= .001;
    } else {
        isGoingDown = false;
    }

    if (!isGoingDown && camera.rotation.z <= 0) {
        camera.rotation.z += .001;
    } else {
        isGoingDown = true;
    }

    if (camera.position.z <= 6) {
        camera.position.z += .015;
    }

    renderer.render(scene, camera);
}

function skyColorTo(initial, value) {
    TweenLite.to(initial, 10, {
        r: value.r,
        g: value.g,
        b: value.b,
        onUpdate: function () {
            light.groundColor = initial;
        }
    });
    if (colCounter < 2) {
        colCounter++;
    }
}

function groundColorTo(initial, value) {
    TweenLite.to(initial, 10, {
        r: value.r,
        g: value.g,
        b: value.b,
        onUpdate: function () {
            light.color = initial;
        }
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.perspective = 200;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth + window.innerWidth / 5, window.innerHeight);
}