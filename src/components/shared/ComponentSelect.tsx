import { Step } from "@/types";
import { Button } from "../ui/button";

interface Props {
  setStep: (step: Step) => void;
}

function ComponentSelect({ setStep }: Props) {
  // const handleDocumentClick = () => {
  //   setStep(Step.DOCUMENT_CAPTURE);
  // };

  const handleFaceClick = () => {
    setStep(Step.FACE_CAPTURE);
  };

  // const handleMagnifEyeLivenessClick = () => {
  //   setStep(Step.MAGNIFEYE_LIVENESS);
  // };

  // const handleSmileLivenessClick = () => {
  //   setStep(Step.SMILE_LIVENESS);
  // };

  return (
    <div>
      {/* <button className="" onClick={handleDocumentClick}>
        Document
      </button> */}
      <Button className="" onClick={handleFaceClick}>
        Face
      </Button>
      {/* <button className="" onClick={handleMagnifEyeLivenessClick}>
        MagnifEye Liveness
      </button> */}
      {/* <button className="" onClick={handleSmileLivenessClick}>
        Smile Liveness
      </button> */}
    </div>
  );
}

export default ComponentSelect;
