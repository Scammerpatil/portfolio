"use server";
import { cloudinary } from "@/middleware/cloudinary.config";

const uploadOnCloudinary = async (
  fileStream: Buffer,
  folder: string,
  filename: string
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
          public_id: filename,
        },
        (error, result) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(fileStream);
  });
};

export { uploadOnCloudinary };
