// import path from 'path';
// import { createWriteStream } from 'fs';
// import { UserInputError } from 'apollo-server-express';

// import { Injectable } from '@nestjs/common';

// const supportedFileTypes = ['jpg', 'jpeg', 'png', 'pdf'];

// @Injectable()
// export class FileService {
//   async uploadFile(file: any): Promise<string> {
//     const { filename, createReadStream } = await Promise.resolve(file);

//     const extension = path.extname(filename).split('.')[1];
//     if (!supportedFileTypes.includes(extension)) {
//       throw new UserInputError(`Invalid file type: ${extension}`);
//     }

//     const url = `localhost:8000/public/${filename}`;
//     const filepath = path.join(__dirname, '../..', `/public/${filename}`);

//     createReadStream().pipe(createWriteStream(filepath));

//     return url;
//   }

//   async uploadFiles(files: any): Promise<string[]> {
//     const urls: string[] = [];

//     for (let file of files) {
//       const url = await this.uploadFile(file);
//       urls.push(url);
//     }

//     return urls;
//   }
// }
