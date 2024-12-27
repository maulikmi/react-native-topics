import { View, Text } from "react-native";
import {
  Viro360Image,
  Viro3DObject,
  ViroAmbientLight,
  ViroAnimations,
  ViroARImageMarker,
  ViroARPlane,
  ViroARScene,
  ViroARSceneNavigator,
  ViroBox,
  ViroImage,
  ViroMaterials,
  ViroNode,
  ViroQuad,
  ViroScene,
  ViroSceneNavigator,
  ViroSkyBox,
  ViroSphere,
  ViroSpotLight,
  ViroText,
  ViroVRSceneNavigator,
} from "@viro-community/react-viro";

const FirstScene = (props) => {
  return (
    <ViroARScene>
      <ViroNode position={[0, 1, -1]} scale={[2, 2, 2]}>
        <ViroText
          onClick={() => props.sceneNavigator.push({ scene: SecondScene })}
          text="Text A"
          position={[0, -0.1, -1]}
          style={{ color: "red", fontSize: 20 }}
        />
        <ViroNode position={[1, 0, -10]} scale={[4, 4, 4]}>
          <ViroText text="Text B" style={{ color: "red", fontSize: 20 }} />
        </ViroNode>
      </ViroNode>

      <Viro360Image source={require("../assets/images/guadalupe_360.jpg")} />

      {/* <ViroSkyBox color={'blue'} source={{
        nx: require('../assets/images/grid_bg.jpg'),
        px: require('../assets/images/grid_bg.jpg'),
        ny: require('../assets/images/grid_bg.jpg'),
        py: require('../assets/images/grid_bg.jpg'),
        nz: require('../assets/images/grid_bg.jpg'),
        pz: require('../assets/images/grid_bg.jpg'),
      }}/> */}
    </ViroARScene>
  );
};

const SecondScene = (props) => {
  return (
    <ViroARScene>
      {/* <ViroText
        onClick={() => props.sceneNavigator.pop()}
        text="Hello World"
        position={[0, -0.1, -1]}
        style={{ color: "red", fontSize: 30 }}
      /> */}

      <ViroAmbientLight color={"#aaaaaa"} influenceBitMask={1} />

      {/* <ViroBox
        dragType="FixedToWorld"
        position={[0, -0.5, -1]}
        animation={{ name: "rotate", run: true, loop: true }}
        scale={[0.3, 0.3, 0.1]}
        materials={["grid"]}
      /> */}

      {/* <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, -1, -0.2]}
        position={[0, 3, 1]}
        color="#aaaaaa"
        castsShadow={true}
      /> */}

      <Viro3DObject
        source={require("../assets/model/emoji_smile/emoji_smile.vrx")}
        position={[0, -0.1, -1]}
        scale={[0.2, 0.2, 0.2]}
        type="VRX"
        lightReceivingBitMask={3}
        shadowCastingBitMask={2}
        transformBehaviors={["billboardY"]}
        resources={[
          require("../assets/model/emoji_smile/emoji_smile_diffuse.png"),
          require("../assets/model/emoji_smile/emoji_smile_specular.png"),
          require("../assets/model/emoji_smile/emoji_smile_normal.png"),
        ]}
      />

      <ViroNode position={[0, 0, -1]} dragType="FixedToWorld" onDrag={() => {}}>
        {/* <ViroSpotLight
          innerAngle={5}
          outerAngle={45}
          direction={[0, -1, -0.2]}
          position={[0, 3, 0]}
          color="#ffffff"
          castsShadow={true}
          influenceBitMask={2}
          shadowMapSize={2048}
          shadowNearZ={2}
          shadowFarZ={5}
          shadowOpacity={0.7}
        /> */}

        <Viro3DObject
          source={require("../assets/model/arrow/Arrow5.obj")}
          resources={[require("../assets/model/arrow/Arrow5.mtl")]}
          type="OBJ"
          position={[0, -0.1, -1]}
          scale={[0.2, 0.2, 0.2]}
          onLoadStart={() => console.log(">>>>>>>>>>", "onLoadStart")}
          onLoadEnd={() => console.log(">>>>>>>>>>", "onLoadEnd")}
          onError={(error) => console.log(">>>>>>>>>>", "onError", error)}
        />
      
      </ViroNode>
    </ViroARScene>
  );
};

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require("../assets/images/grid_bg.jpg"),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90",
    },
    duration: 250, //.25 seconds
  },
});

const ARExploringScreen = () => {
  console.log(">>>>>>>>>>", "ARExploringScreen");

  return <ViroARSceneNavigator initialScene={{ scene: SecondScene }} />;
};

export default ARExploringScreen;
