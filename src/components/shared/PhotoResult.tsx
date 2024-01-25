/* eslint-disable @typescript-eslint/no-unused-vars */
import { convertImageToBase64, removeBase64Prefix } from "@/lib/imageConverter";
import { validate } from "@/services";
import { useEffect, useRef, useState } from "react";
import { toast } from "../ui/use-toast";
import {
  ControlEventInstruction,
  dispatchControlEvent,
} from "@innovatrics/dot-document-auto-capture/events";
import { FaceCustomEvent } from "@innovatrics/dot-face-auto-capture/events";
import {
  photoBase64State,
  photoTakenState,
  photoUrlState,
} from "@/recoil/atom";
import { useRecoilState, useSetRecoilState } from "recoil";

const moneyFormat = (number: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);

function PhotoResult() {
  const [photoUrl, setPhotoUrl] = useRecoilState<string>(photoUrlState);
  const [photoBase64, setPhotoBase64] =
    useRecoilState<string>(photoBase64State);

  const setPhotoTaken = useSetRecoilState(photoTakenState);
  const [isApiCallInProgress, setIsApiCallInProgress] = useState(false);

  console.log("🚀 ~ PhotoResult ~ photoUrl:", photoUrl);

  useEffect(() => {
    // Convert image to base64 only when photoUrl changes
    convertImageToBase64(photoUrl)
      .then((base64) => {
        const formatImg = removeBase64Prefix(base64);
        setPhotoBase64(formatImg);
      })
      .catch((error) => console.error(error));
  }, [photoUrl, setPhotoBase64]);

  const timeDiff = useRef(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const payload = {
  //       face: photoBase64,
  //     };

  //     try {
  //       const response = await validate(payload);

  //       if (response.status_code === "1") {
  //         toast({
  //           variant: "success",
  //           title: "Success",
  //           // description: response.status_message,
  //         });
  //       } else {
  //         toast({
  //           variant: "destructive",
  //           title: "Failed",
  //           // description: response.status_message,
  //         });
  //       }
  //     } catch (error) {
  //       // Handle any errors from the validate function
  //       console.error(error);
  //       toast({
  //         variant: "destructive",
  //         title: "Error",
  //         // description: "An error occurred while validating."
  //       });
  //     }

  //     setPhotoBase64("");

  //     setTimeout(() => {
  //       console.log("handleContinueDetection");
  //       setPhotoTaken(false);
  //       setPhotoUrl("");
  //       dispatchControlEvent(
  //         FaceCustomEvent.CONTROL,
  //         ControlEventInstruction.CONTINUE_DETECTION
  //       );
  //     }, 5000); // 10000 = 10 seconds delay
  //   };
  //   if (photoBase64) {
  //     fetchData();
  //   }

  // }, [photoBase64, setPhotoBase64, setPhotoTaken, setPhotoUrl]);

  useEffect(() => {
    // Define the function to fetch data
    const fetchData = async () => {
      // Check if the base64 photo is available and no API call is in progress
      if (!photoBase64 || isApiCallInProgress) {
        return;
      }

      const startTime = new Date().getTime();

      // Indicate that an API call is now in progress
      setIsApiCallInProgress(true);

      try {
        // Construct the payload for the API call
        const payload = { face: photoBase64 };

        // Make the API call
        const response = await validate(payload);

        const endTime = new Date().getTime();
        timeDiff.current = endTime - startTime;

        // Check the response and perform actions based on the status code
        if (response.status_code === "1") {
          toast({
            variant: "success",
            title: "Success",
            // description: response.data.name,
            description:
              response.data.name +
              " - Remaining Balance: " +
              moneyFormat(response.data.currentBalance),
          });
        } else {
          toast({
            variant: "destructive",
            title: "Failed",
            description: response.status_message,
          });
        }
      } catch (error) {
        // Error handling logic
        const endTime = new Date().getTime();
        timeDiff.current = endTime - startTime;
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while validating.",
        });
      } finally {
        // Reset the API call progress indicator and other states as necessary
        setIsApiCallInProgress(false);
        setPhotoBase64(""); // Consider if this reset is appropriate for your flow
        // Additional cleanup logic if needed
        setTimeout(() => {
          console.log("handleContinueDetection");
          setPhotoTaken(false);
          setPhotoUrl("");
          dispatchControlEvent(
            FaceCustomEvent.CONTROL,
            ControlEventInstruction.CONTINUE_DETECTION
          );
        }, 1000); // 10000 = 10 seconds delay
      }
    };

    // Call the fetchData function
    fetchData();
  }, [photoBase64]);

  return (
    <div className="mt-[1rem] w-[40rem] relative overflow-hidden">
      <img alt="Web component result" src={photoUrl} />
      {timeDiff.current > 0 && (
        <p className="mt-2">Analyzed in: {timeDiff.current}ms</p>
      )}
    </div>
  );
}

export default PhotoResult;
