import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Brand {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  fullName: string;

  @Column()
  studies: string;

  @Column()
  specialization: string;

  @Column()
  expertise: string;

  @Column()
  overspecialization: string;

  @Column()
  certifications: string;

  @Column()
  teachingSkills: string;

  @Column()
  tehnologicalSkills: string;

  @Column()
  researchSkills: string;

  @Column()
  publicSpeakingSkills: string;

  @Column()
  mentorSkills: string;

  @Column()
  leadershipSkills: string;

  @Column()
  communityInvolvement: string;

  @Column()
  characterTraits: string;

  @Column()
  patientInteractionStyle: string;

  @Column()
  addedValue: string;

  @Column()
  personalInsights: string;

  @Column()
  personalReasons: string;

  @Column()
  why: string;

  @Column()
  what: string;

  @Column()
  how: string;

  @Column()
  brandStatement: string;

  @Column()
  distinctiveElements: string;

  @Column()
  autobiography: string;

  @Column()
  contentPillars: string;
}
