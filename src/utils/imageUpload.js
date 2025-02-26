import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { envConfig } from '../config/env.config.js';

cloudinary.config({
  cloud_name: envConfig.CLOUDINARY_NAME,
  api_key: envConfig.CLOUDINARY_API_KEY,
  api_secret: envConfig.CLOUDINARY_SECRET,
});

const uploadOnCloudinary = async (
  localFilePath,
  public_id,
  overwrite,
  invalidate
) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const responce = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
      public_id,
      overwrite,
      invalidate,
    });

     fs.unlinkSync(localFilePath);

    return { imageUrl: responce.secure_url, imageId: responce.public_id };
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (cloudinaryFilepath, resourceType) => {
  try {
    if (!cloudinaryFilepath) return null;
    const fileName = cloudinaryFilepath.split('/').slice(-1)[0].split('.')[0];
    const response = await cloudinary.uploader.destroy(fileName, {
      resource_type: resourceType,
    });
    return response;
  } catch (error) {
    console.log('Error while deleting file from cloudinary : ', error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
