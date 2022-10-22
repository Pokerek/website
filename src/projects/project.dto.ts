import { IsArray, IsObject, IsString } from 'class-validator';

class CreateProjectDto {
  @IsString()
  public name: string;

  @IsObject()
  public image: object;

  @IsString()
  public link: string;

  @IsArray()
  public tags: [string];

  @IsArray()
  public technologies: [string];

  constructor(
    name: string,
    image: object,
    link: string,
    tags: [string],
    technologies: [string]
  ) {
    this.name = name;
    this.image = image;
    this.link = link;
    this.tags = tags;
    this.technologies = technologies;
  }
}

export default CreateProjectDto;
