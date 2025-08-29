export class FileUploadService {
  constructor() {}

  // Checar
  private checkFolder(folderPath: string) {
    throw new Error("Method not implemented.");
  }

  uploadSingleFile(
    file: unknown,
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {}
  uploadMultipleFiles() {}
}
