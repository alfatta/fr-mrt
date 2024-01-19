/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FaceCallback } from "@innovatrics/dot-face-auto-capture";
import { useState } from "react";
import FaceCamera from "./FaceCamera";
import FaceUi from "./FaceUi";

interface Props {
  onPhotoTaken: FaceCallback;
  onError: (error: Error) => void;
  onBackClick?: () => void;
}

function FaceAutoCapture({ onPhotoTaken, onError }: Props) {
  const [_isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handlePhotoTaken: FaceCallback = async (imageData, content) => {
    setIsButtonDisabled(false);
    onPhotoTaken(imageData, content);
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <h2 className="">Face auto capture 0.5</h2>
      <div className="mt-4 w-[40rem] relative overflow-hidden">
        <FaceCamera
          cameraFacing="user"
          onPhotoTaken={handlePhotoTaken}
          onError={onError}
        />
        <FaceUi showCameraButtons />
      </div>
    </div>
  );
}

export default FaceAutoCapture;
