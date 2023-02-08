// import "./styles.css";
import { Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import axios from "axios";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";
// Import the main component
import { LoadError, Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

// Your render function

import PreviewLocalFile from "./Test";
function getBase64(url) {
  return axios
    .get(url, {
      responseType: "arraybuffer",
    })
    .then((response) =>
      Buffer.from(response.data, "binary").toString("base64")
    );
}

const base64toBlob = async (url) => {
  const data = await getBase64(url);
  // Cut the prefix `data:application/pdf;base64` from the raw base 64
  const base64WithoutPrefix = data.substr(
    "data:application/pdf;base64,".length
  );

  const bytes = atob(base64WithoutPrefix);
  let length = bytes.length;
  let out = new Uint8Array(length);

  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }

  return URL.createObjectURL(new Blob([out], { type: "application/pdf" }));
};

const renderError = (error) => {
  let message = "";
  switch (error.name) {
    case "InvalidPDFException":
      message = "The document is invalid or corrupted";
      break;
    case "MissingPDFException":
      message = "The document is missing";
      break;
    case "UnexpectedResponseException":
      message = "Unexpected server response";
      break;
    default:
      message = "Cannot load the document";
      break;
  }

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#e53e3e",
          borderRadius: "0.25rem",
          color: "#fff",
          padding: "0.5rem",
        }}
      >
        {message}
      </div>
    </div>
  );
};

export default function App() { 

  const thumbnailPluginInstance = thumbnailPlugin();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { Thumbnails } = thumbnailPluginInstance;
  
  // const baseStr = getBase64(
  //   "https://cnaps.s3.ap-south-1.amazonaws.com/model_paper/ISMO/ISMO_Model_Paper_10.pdf"
  // );
  // const blob = base64toBlob(
  //   "https://cnaps.s3.ap-south-1.amazonaws.com/model_paper/ISMO/ISMO_Model_Paper_10.pdf"
  // );
  // const url = URL.createObjectURL(blob);
  return (
    <div className="App">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* <Thumbnails /> */}
      </div>

      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "750px",
          }}
        >
          <PreviewLocalFile
            plugins={[defaultLayoutPluginInstance, thumbnailPluginInstance]}
          />
          {/* <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.3)",
              height: "750px",
            }}
          >
            <Viewer fileUrl="./contract.pdf" />
          </div> */}
          ;
        </div>
      </Worker>
    </div>
  );
}
