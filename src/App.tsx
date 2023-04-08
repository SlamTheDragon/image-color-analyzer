import ImageAnalyzer from "./components/common/ImageAnalyzer";
import Image from "./crimson_nylium_side.png";

export default function App() {
	return (
		<>
			<ImageAnalyzer imageUrl={Image}/>
			<img src={Image} style={{width:"40%", height: "40%"}}/>
		</>
  	);
}