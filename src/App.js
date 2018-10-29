import React, { Component } from "react";
import Navigation from "./components/navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import particles from "./particles.json";
import "./App.css";
import Clarifai from "clarifai";
import { ApiKey } from "./ApiKeys";


// const particlesOptions = particles;
const app = new Clarifai.App({
  apiKey: ApiKey
});


class App extends Component {
  state = {
    input: "",
    imageUrl:''
  };

  onInputChange = event => {
    console.log(event.target.value);
    this.setState({input:event.target.value})
  };
  onSubmit = () => {
    
    this.setState({imageUrl:this.state.input})
    app.models
      .predict(Clarifai. FACE_DETECT_MODEL,        
        this.state.input
      )
      .then(
        function(response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err) {
          // there was an error
        }
      );
  };
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particles} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
