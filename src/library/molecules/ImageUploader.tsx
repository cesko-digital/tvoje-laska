"use client";

import Button from "library/atoms/Button";
import TextLink from "library/atoms/TextLink";
import { ImagePlaceholderSvg } from "library/icons/symbols";
import Image from "next/image";
import { useState } from "react";

const ImageUploader = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const fileInputKey = uploadedImage ? "existing" : "new"; // Unikátní klíč pro vstupní pole pro soubory (nový vs. existující obrázek)

  const handleUploadImage = () => {
    const uploadFile = document.getElementById("upload-file");
    if (uploadFile) {
      uploadFile.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (file.type === "image/png" || file.type === "image/jpeg") {
        setUploadedImage(URL.createObjectURL(file));
      }

      //TODO: Pořešit chybovou hlášku
    }
  };
  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  return (
    //TODO: Doladit dashed border
    //TODO: Jaká přesně velikost v rámci stránky?
    <div
      className="flex flex-col items-center justify-center p-5 min-w-[200px] max-w-[300px]
    rounded-xl
       bg-white"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%236F6F6F' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      }}
    >
      <div className="flex flex-col items-center w-full gap-6">
        {uploadedImage ? (
          // TODO: Upravit zobrazování obrázků (jaká přesně velikost?)
          <div className="relative w-full aspect-square">
            <Image src={uploadedImage} alt="Uploaded" layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
        ) : (
          <div className=" text-violet-40">
            <ImagePlaceholderSvg width={100} />
          </div>
        )}

        <div className="flex flex-col gap-1 text-gray-50 items-center text-sm">
          <p>PNG nebo JPG formát</p>
          <p>Maximální velikost 150 MB</p>
        </div>
        {uploadedImage && (
          <TextLink as="button" onClick={handleRemoveImage} color="primary" title="Odstranit fotografii" />
        )}
        <Button
          onClick={handleUploadImage}
          color="primary"
          buttonText={uploadedImage ? "Změnit fotografii" : "Vybrat fotografii"}
        />
      </div>
      <input
        key={fileInputKey}
        id="upload-file"
        type="file"
        accept=".png, .jpg, .jpeg"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
export default ImageUploader;
