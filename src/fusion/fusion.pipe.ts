import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FusionPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(metadata, value);
    if(metadata.type == 'body')
      return value.tab.join('-')
    else
      return value;
    
  }
}
