import React, { Component } from 'react';
import styles from'./Globe.module.css';

import * as THREE from 'three'
import  { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ButtonBox, Title, CountryNameBox, CountryModal } from '../index.js';

import earthmap from '../../assets/images/earthmap4k.jpg'
import earthbump from '../../assets/images/earthbump4k.jpg'
import earthspec from '../../assets/images/earthspec4k.jpg'

import space_right from '../../assets/images/space_right.png'
import space_left from '../../assets/images/space_left.png'
import space_top from '../../assets/images/space_top.png'
import space_bot from '../../assets/images/space_bot.png'
import space_front from '../../assets/images/space_front.png'
import space_back from '../../assets/images/space_back.png'

class Globe extends Component {

    constructor(props) {
        super(props)
        this.state = {
            titleActive: true,
            pointsActive: false,
            pointHovered: false,
            pointHoveredName: '',
            countryModalActive: false,
            countryData: [],
        }
        this.addEmbassyPoints = this.addEmbassyPoints.bind(this);
        this.removeChildren = this.removeChildren.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

  componentDidMount() {
    this.createScene();
    this.startAnimation();
    window.addEventListener('resize', this.handleWindowResize);
  }

  createScene = () => {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.controls = new OrbitControls(this.camera, this.mount);
    this.controls.enableZoom = false;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.mount.appendChild( this.renderer.domElement );
    this.camera.position.z = 20;

    this.addEarth();
    this.addSkyBox();
    this.addLight();
  }

  addEarth = () => {
    const earthMap = new THREE.TextureLoader().load( earthmap );
    const earthBumpMap = new THREE.TextureLoader().load( earthbump );
    const earthSpecMap = new THREE.TextureLoader().load( earthspec );

    const earthGeometry = new THREE.SphereGeometry( 10, 32, 32 );
    const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthMap,
        bumpMap: earthBumpMap,
        bumpScale: 0.10,
        specularMap: earthSpecMap,
        specular: new THREE.Color('gray')
    });

    this.earthSphere = new THREE.Mesh( earthGeometry, earthMaterial );
    this.earthSphere.name = "EarthSphere";
    this.scene.add( this.earthSphere );
  }

  addSkyBox = () => {
    const skyBox = new THREE.CubeTextureLoader().load([
        space_right,
        space_left,
        space_top,
        space_bot,
        space_front,
        space_back,
    ]);
    this.scene.background = skyBox;
  }

  addLight = () => {
    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, .3, 0);
    lights[1] = new THREE.PointLight(0xffffff, .4, 0);
    lights[2] = new THREE.PointLight(0xffffff, .7, 0);
    lights[3] = new THREE.AmbientLight( 0x706570 );

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(200, 100, 400);
    lights[2].position.set(-200, -200, -50);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
    this.scene.add(lights[3]);
  }

  addSceneObjects = () => {
    for (let i = 0; i < this.props.pointData.length; i++) {
        if(this.props.pointData[i].Bureau==='EUR') {
            this.addCoord('red', this.props.pointData[i].Status, this.props.pointData[i].Bureau, 
                this.props.pointData[i].Country, this.props.pointData[i].Post, this.props.pointData[i].Latitude,
                this.props.pointData[i].Longitude, this.props.pointData[i].Languages, 
                this.props.pointData[i].Social, this.props.pointData[i].Embassy_Url);
        } else if(this.props.pointData[i].Bureau==='NEA') {
            this.addCoord('yellow', this.props.pointData[i].Status, this.props.pointData[i].Bureau, 
                this.props.pointData[i].Country, this.props.pointData[i].Post, this.props.pointData[i].Latitude,
                this.props.pointData[i].Longitude, this.props.pointData[i].Languages, 
                this.props.pointData[i].Social, this.props.pointData[i].Embassy_Url);
        } else if(this.props.pointData[i].Bureau==='SCA') {
            this.addCoord('orangered', this.props.pointData[i].Status, this.props.pointData[i].Bureau, 
                this.props.pointData[i].Country, this.props.pointData[i].Post, this.props.pointData[i].Latitude,
                this.props.pointData[i].Longitude, this.props.pointData[i].Languages, 
                this.props.pointData[i].Social, this.props.pointData[i].Embassy_Url);
        } else if(this.props.pointData[i].Bureau==='EAP') {
            this.addCoord('pink', this.props.pointData[i].Status, this.props.pointData[i].Bureau, 
                this.props.pointData[i].Country, this.props.pointData[i].Post, this.props.pointData[i].Latitude,
                this.props.pointData[i].Longitude, this.props.pointData[i].Languages, 
                this.props.pointData[i].Social, this.props.pointData[i].Embassy_Url);
        } else if(this.props.pointData[i].Bureau==='AF') {
            this.addCoord('white', this.props.pointData[i].Status, this.props.pointData[i].Bureau, 
                this.props.pointData[i].Country, this.props.pointData[i].Post, this.props.pointData[i].Latitude,
                this.props.pointData[i].Longitude, this.props.pointData[i].Languages, 
                this.props.pointData[i].Social, this.props.pointData[i].Embassy_Url);
        } else if(this.props.pointData[i].Bureau==='WHA') {
            this.addCoord('blue', this.props.pointData[i].Status, this.props.pointData[i].Bureau, 
                this.props.pointData[i].Country, this.props.pointData[i].Post, this.props.pointData[i].Latitude,
                this.props.pointData[i].Longitude, this.props.pointData[i].Languages, 
                this.props.pointData[i].Social, this.props.pointData[i].Embassy_Url);
        }
    }
  }

  addCoord = (color,Status, Bureau, Country,
  Post, Latitude, Longitude, Languages, Social, Embassy_Url) => {
    let lat = Latitude;
    let lon = Longitude;
    const radius = 10;
    const phi = (90-lat)*(Math.PI/180);
    const theta = (lon+180)*(Math.PI/180);
    const vertex = new THREE.Vector3();
    vertex.x = -((radius) * Math.sin(phi)*Math.cos(theta));
    vertex.y = ((radius) * Math.cos(phi));
    vertex.z = ((radius) * Math.sin(phi)*Math.sin(theta));

    let pointGeo = new THREE.SphereGeometry(.1, 32, 32,)
    let pointMat = new THREE.MeshBasicMaterial({
        color: color,
    });
    let pointMesh = new THREE.Mesh(
        pointGeo,
        pointMat
    );
    pointMesh.position.set(
        vertex.x,
        vertex.y,
        vertex.z,
    );
    pointMesh.rotation.set(0.0, -lon, lat-Math.PI*0.5);
    pointMesh.userData.Status = Status;
    pointMesh.userData.Bureau = Bureau;
    pointMesh.userData.Post = Post;
    pointMesh.userData.Latitude = Latitude;
    pointMesh.userData.Longitude = Longitude;
    pointMesh.userData.Languages = Languages;
    pointMesh.userData.Embassy_Url = Embassy_Url;
    pointMesh.userData.Social = Social;
    pointMesh.userData.Country = Country;
    this.earthSphere.add(pointMesh);
  }

  addEmbassyPoints = (event) => {
    event.preventDefault();
    this.setState({
        titleActive: false,
        pointsActive: true,
    })
    this.addSceneObjects();
  }

  closeModal = (event) => {
    event.preventDefault();
    this.setState({
        countryModalActive: false,
        countryData: [],
    })
  }

  removeChildren = () => {
    let destroy = this.earthSphere.children.length;
    while (destroy--) {
        this.earthSphere.remove(this.earthSphere.children[destroy]);
    }
  }

  onMouseClick = (event) => {
    event.preventDefault();
    let mouse = new THREE.Vector2();
    mouse.x = ((event.clientX / window.innerWidth) * 2 - 1);
    mouse.y = (-(event.clientY / window.innerHeight) * 2 + 1);
    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);
    let intersects = raycaster.intersectObjects(this.earthSphere.children);
    for (let i = 0; i < intersects.length; i++) {
        this.setState({
            countryModalActive: true,
        })
    };
  };

  onMouseMove = (event) => {
    event.preventDefault();
    let mouse = new THREE.Vector2();
    mouse.x = ((event.clientX / window.innerWidth) * 2 - 1);
    mouse.y = (-(event.clientY / window.innerHeight) * 2 + 1);
    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);
    let intersects = raycaster.intersectObjects(this.earthSphere.children);
    if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
            this.setState({
                pointHovered: true,
                pointHoveredName: intersects[0].object.userData.Post,
                countryData: intersects[0].object.userData,
            })
        };
    } else {
        this.setState({
            pointHovered: false,
            pointHoveredName: '',
            countryData: [],
        });
    }
  };

  startAnimation = () => {
    this.requestID = window.requestAnimationFrame(this.startAnimation);
    this.controls.update();
    this.renderer.render( this.scene, this.camera);
  }

  handleWindowResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  render() {
    const titleActive = this.state.titleActive;
    const pointsActive = this.state.pointsActive;
    const pointHovered = this.state.pointHovered;
    const pointHoveredName = this.state.pointHoveredName;
    const countryModalActive = this.state.countryModalActive;
    const countryData = this.state.countryData;
    return (
        <>
            <div
            ref={ ref => (this.mount = ref) }
            onMouseMove={this.onMouseMove}
            onClick={this.onMouseClick}
            ></div>
            { titleActive ? <Title /> : <></> }
            { pointsActive ?
                (
                    pointHovered ? <CountryNameBox name={pointHoveredName} /> : <></>
                ) : <></>
            }
            { countryModalActive ? 
                (
                    <CountryModal countryModal={countryModalActive} 
                        data={countryData} 
                        modalActive={(event) => this.closeModal(event)} />
                ) : <></>
            }
            <ButtonBox
            buttonOne = "Points"
            addEmbassyPoints = {(event) => this.addEmbassyPoints(event)}
            />
      </>
    )
  }
}

export default Globe;
