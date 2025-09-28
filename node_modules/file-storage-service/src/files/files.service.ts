import { Injectable, StreamableFile } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class FilesService {
  private minioClient = new Minio.Client({
    endPoint: '172.18.0.2',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
  });

  async getBuckets() {
    let buckets = [];

    try {
      buckets = await this.minioClient.listBuckets();
    } catch (err) {}

    return buckets;
  }

  async getFile(bucket: string, filename: string) {
    const dataStream = await this.minioClient.getObject(bucket, filename);

    return new StreamableFile(dataStream);
  }

  async getObjects(name: string) {
    const data = [];
    const dataStream = await this.minioClient.listObjects(name, '', true);

    const promise = new Promise((resolve, reject) => {
      dataStream.on('data', function (obj) {
        data.push(obj);
      });
      dataStream.on('end', function (obj) {
        resolve(data);
      });
      dataStream.on('error', function (err) {
        reject(err);
      });
    });

    return await promise;
  }

  async putObject(bucketName: string, objectName: string, stream) {
    await this.minioClient.putObject(bucketName, objectName, stream);
  }

  async removeObject(bucketName: string, objectName: string) {
    await this.minioClient.removeObject(bucketName, objectName);
  }
}
