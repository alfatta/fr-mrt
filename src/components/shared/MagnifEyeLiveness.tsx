import type { MagnifEyeLivenessCallback } from "@innovatrics/dot-magnifeye-liveness";
import MagnifEyeLivenessCamera from "./MagnifEyeLivenessCamera";
import MagnifEyeLivenessUi from "./MagnifEyeLivenessUi";

interface Props {
  onComplete: MagnifEyeLivenessCallback;
  onError: (error: Error) => void;
  onBackClick: () => void;
}

function MagnifEyeLiveness({ onBackClick, onComplete, onError }: Props) {
  return (
    <>
      <h2>MagnifEye Liveness</h2>
      <div>
        <button className="" onClick={onBackClick}>
          Back
        </button>
      </div>
      <div className="">
        <MagnifEyeLivenessCamera onComplete={onComplete} onError={onError} />
        <MagnifEyeLivenessUi showCameraButtons />
      </div>
    </>
  );
}

export default MagnifEyeLiveness;
