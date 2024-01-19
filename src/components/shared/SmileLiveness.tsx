import { SmileLivenessCallback } from "@innovatrics/dot-smile-liveness";
import SmileLivenessCamera from "./SmileLivenessCamera";
import SmileLivenessUi from "./SmileLivenessUi";

interface Props {
  onComplete: SmileLivenessCallback;
  onError: (error: Error) => void;
  onBackClick: () => void;
}

function SmileLiveness({ onBackClick, onComplete, onError }: Props) {
  return (
    <>
      <h2>Smile Liveness</h2>
      <div>
        <button onClick={onBackClick}>
          Back
        </button>
      </div>
      <div className="flex">
        <SmileLivenessCamera onComplete={onComplete} onError={onError} />
        <SmileLivenessUi showCameraButtons />
      </div>
    </>
  );
}

export default SmileLiveness;
