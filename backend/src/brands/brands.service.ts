import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository, ObjectId } from 'typeorm';
import { ChatPromptTemplate } from 'langchain/prompts';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { RunnableMap, RunnableSequence } from 'langchain/schema/runnable';
import { StringOutputParser } from 'langchain/schema/output_parser';

import {
  systemTemplate,
  getDistinctiveElementsTemplate,
  getHowTemplate,
  getBrandStatementTemplate,
  getWhyTemplate,
  getWhatTemplate,
  generateAutobiographyTemplate,
  generateContentPillarsTemplate,
} from '../utils/prompts';

const modelT1 = new ChatOpenAI({
  temperature: 1,
  modelName: 'gpt-4-1106-preview',
  openAIApiKey: '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',
  // callbacks: [new ConsoleCallbackHandler()],
});

const modelT0 = new ChatOpenAI({
  temperature: 1,
  modelName: 'gpt-4-1106-preview',
  openAIApiKey: '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',
  // callbacks: [new ConsoleCallbackHandler()],
});

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      /**
       * Step 1: Generate the brand entry
       */
      const brandEntry = await this.brandRepository.save(createBrandDto);

      /**
       * Step 2: Format the data for prompt template
       */
      for (const [key, value] of Object.entries(createBrandDto)) {
        if (value === '') {
          createBrandDto[key] = 'N/A';
        }
      }

      delete createBrandDto.email;

      /**
       * Step 3: Get the distinctive elements, why and what
       */
      const getDistinctiveElementsPrompt = ChatPromptTemplate.fromMessages([
        ['system', systemTemplate],
        ['human', getDistinctiveElementsTemplate],
      ]);

      const distinctiveElementsChain = RunnableSequence.from([
        getDistinctiveElementsPrompt,
        modelT1,
        new StringOutputParser(),
      ]);

      const getWhyPrompt = ChatPromptTemplate.fromMessages([
        ['system', systemTemplate],
        ['human', getWhyTemplate],
      ]);

      const whyChain = RunnableSequence.from([
        getWhyPrompt,
        modelT1,
        new StringOutputParser(),
      ]);

      const getWhatPrompt = ChatPromptTemplate.fromMessages([
        ['system', systemTemplate],
        ['human', getWhatTemplate],
      ]);

      const whatChain = RunnableSequence.from([
        getWhatPrompt,
        modelT1,
        new StringOutputParser(),
      ]);

      const { distinctiveElements, why, what } = await RunnableMap.from({
        distinctiveElements: distinctiveElementsChain,
        why: whyChain,
        what: whatChain,
      }).invoke({
        ...createBrandDto,
      });

      console.log('\nDistinctive Elements ::', distinctiveElements);
      console.log('\nWhy ::', why);
      console.log('\nWhat ::', what);

      /**
       * Step 4: Get the how and brand statement
       */
      const getHowPrompt = ChatPromptTemplate.fromMessages([
        ['system', systemTemplate],
        ['human', getHowTemplate],
      ]);

      const howChain = RunnableSequence.from([
        getHowPrompt,
        modelT1,
        new StringOutputParser(),
      ]);

      const how = await howChain.invoke({
        fullName: createBrandDto.fullName,
        distinctiveElements,
      });

      const getBrandStatementPrompt = ChatPromptTemplate.fromMessages([
        ['system', systemTemplate],
        ['human', getBrandStatementTemplate],
      ]);

      const brandStatementChain = RunnableSequence.from([
        getBrandStatementPrompt,
        modelT1,
        new StringOutputParser(),
      ]);

      const brandStatement = await brandStatementChain.invoke({
        fullName: createBrandDto.fullName,
        how,
      });

      console.log('\n\nHow ::', how);
      console.log('\n\nBrand statement ::', brandStatement);

      /**
       * Step 5: Generate autobiography & content pillars
       */
      const generateAutobiographyPrompt = ChatPromptTemplate.fromMessages([
        ['system', systemTemplate],
        ['human', generateAutobiographyTemplate],
      ]);

      const autobiographyChain = RunnableSequence.from([
        generateAutobiographyPrompt,
        modelT0,
        new StringOutputParser(),
      ]);

      const generateContentPillarsPrompt = ChatPromptTemplate.fromMessages([
        ['system', systemTemplate],
        ['human', generateContentPillarsTemplate],
      ]);

      const contentPillarsChain = RunnableSequence.from([
        generateContentPillarsPrompt,
        modelT1,
        new StringOutputParser(),
      ]);

      const { autobiography, contentPillars } = await RunnableMap.from({
        autobiography: autobiographyChain,
        contentPillars: contentPillarsChain,
      }).invoke({
        fullName: createBrandDto.fullName,
        why,
        what,
        how,
        brandStatement,
        distinctiveElements,
      });

      console.log('\n\nAutobiography ::', autobiography);
      console.log('\n\nContent pillars ::', contentPillars);

      /**
       * Step 6: Update the brand entry
       */
      brandEntry.distinctiveElements = distinctiveElements;
      brandEntry.why = why;
      brandEntry.what = what;
      brandEntry.how = how;
      brandEntry.brandStatement = brandStatement;
      brandEntry.autobiography = autobiography;
      brandEntry.contentPillars = contentPillars;

      await this.brandRepository.save(brandEntry);

      return brandEntry;
    } catch (error) {
      console.log(error);
    }
  }

  findAll(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  findOne(id: string): Promise<Brand | null> {
    return this.brandRepository.findOne({ where: { _id: new ObjectId(id) } });
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    console.log(updateBrandDto);
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
