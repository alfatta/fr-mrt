/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from "react";
import "./App.css";
import FaceAutoCapture from "./components/shared/FaceAutoCapture";
import PhotoResult from "./components/shared/PhotoResult";
import { Step } from "./types";
import { CallbackImage } from "@innovatrics/dot-document-auto-capture";
import { FaceCallback } from "@innovatrics/dot-face-auto-capture";
import { Toaster } from "./components/ui/toaster";
import { useRecoilState } from "recoil";
import { photoTakenState, photoUrlState } from "./recoil/atom";

function App() {
  const [_step, _setStep] = useState<Step>(Step.SELECT_COMPONENT);
  const [photoUrl, setPhotoUrl] = useRecoilState<string>(photoUrlState);

  const [photoTaken, setPhotoTaken] = useRecoilState(photoTakenState);

  const handlePhotoTaken = <T,>(
    imageData: CallbackImage<T>,
    _content?: Uint8Array
  ) => {
    const imageUrl = URL.createObjectURL(imageData.image);
    setPhotoUrl(imageUrl);
    setPhotoTaken(true);
  };

  const handleFaceCapturePhotoTaken: FaceCallback = (imageData, content) => {
    handlePhotoTaken(imageData, content);
  };

  const handleError = useCallback((error: Error) => {
    alert(error);
  }, []);

  // const handleBackClick = () => {
  //   setPhotoUrl(undefined);
  //   setStep(Step.SELECT_COMPONENT);
  // };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <h1 className="text-center">Image Validation</h1> */}
      {photoTaken ? (
        // photoUrl && <PhotoResult photoUrl={photoUrl} />
        photoUrl && <PhotoResult />
      ) : (
        <FaceAutoCapture
          onPhotoTaken={handleFaceCapturePhotoTaken}
          onError={handleError}
          // onBackClick={handleBackClick}
        />
      )}

      <Toaster />
    </div>
  );
}

export default App;
