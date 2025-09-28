import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 } from 'uuid';

export class StorageObjectDto {
  @ApiProperty({ required: false })
  filename?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}

@ApiTags('File')
@Controller('bucket')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  @ApiProperty({
    description: 'Endpoint for get bucket list',
  })
  getBuckets() {
    return this.filesService.getBuckets();
  }

  @Get(':bucket')
  @ApiProperty({
    description: 'Endpoint for get file list in bucket',
  })
  getObjets(@Param('bucket') bucket: string) {
    return this.filesService.getObjects(bucket);
  }

  @Get(':bucket/file/:filename')
  @ApiProperty({
    description: 'Endpoint for download file from bucket',
  })
  getFile(
    @Param('bucket') bucket: string,
    @Param('filename') filename: string,
  ) {
    return this.filesService.getFile(bucket, filename);
  }

  @Post(':bucket/file')
  @ApiProperty({
    description: 'Endpoint for upload file to bucket',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Param('bucket') bucket: string,
    @Body() data: StorageObjectDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    const fileName =
      v4() + '.' + (data.filename || file.originalname).split('.').pop();

    return this.filesService
      .putObject(bucket, fileName, file.buffer)
      .then(() => fileName);
  }

  @Delete(':bucket/file/:filename')
  @ApiProperty({
    description: 'Endpoint for download file from bucket',
  })
  deleteFile(
    @Param('bucket') bucket: string,
    @Param('filename') filename: string,
  ) {
    return this.filesService.removeObject(bucket, filename);
  }
}
