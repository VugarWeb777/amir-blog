import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';

export const storage = {
  storage: diskStorage({
    destination: './upload',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
@Controller('images')
export class ImagesController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('image_param', storage))
  async uploadImage(@UploadedFile() file, @Req() req) {
    return JSON.stringify({
      link: `${'http://localhost:8080/images/'}${file.path}`,
    });
  }

  @Get('upload/:name')
  async findImage(@Param('name') name, @Res() res): Promise<any> {
    res.sendFile(name, { root: 'upload' });
  }
}
