// Function to convert image URL to Base64 string
export const convertImageToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      resolve(base64data);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export function removeBase64Prefix(base64Data: string): string {
  // This will remove the 'data:image/jpeg;base64,' part from the string
  return base64Data.replace(/^data:image\/jpeg;base64,/, '');
}


