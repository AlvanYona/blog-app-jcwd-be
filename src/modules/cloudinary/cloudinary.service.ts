import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

export class CloudinaryService {
  constructor() {
    cloudinary.config({
      api_key: "",
      api_secret: "",
      cloud_name: "",
    });
  }
}
