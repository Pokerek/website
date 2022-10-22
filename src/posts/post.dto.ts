import { IsString, IsArray } from 'class-validator';

class CreatePostDto {
  @IsString()
  public title: string;

  @IsString()
  public text: string;

  @IsArray()
  public tags: [string];

  constructor(title: string, text: string, tags: [string]) {
    this.title = title;
    this.text = text;
    this.tags = tags;
  }
}

export default CreatePostDto;
