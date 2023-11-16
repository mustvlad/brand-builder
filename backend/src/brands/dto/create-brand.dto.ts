import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  studies: string;

  @IsString()
  specialization: string;

  @IsString()
  expertise: string;

  @IsString()
  overspecialization: string;

  @IsString()
  certifications: string;

  @IsString()
  teachingSkills: string;

  @IsString()
  tehnologicalSkills: string;

  @IsString()
  researchSkills: string;

  @IsString()
  publicSpeakingSkills: string;

  @IsString()
  mentorSkills: string;

  @IsString()
  leadershipSkills: string;

  @IsString()
  communityInvolvement: string;

  @IsString()
  characterTraits: string;

  @IsString()
  patientInteractionStyle: string;

  @IsString()
  addedValue: string;

  @IsString()
  personalInsights: string;

  @IsString()
  personalReasons: string;
}
