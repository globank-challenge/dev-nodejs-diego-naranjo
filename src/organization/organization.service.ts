import { Injectable, Logger, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {

  private readonly logger = new Logger('OrganizationService')

  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) { }

  async create(createOrganizationDto: CreateOrganizationDto) {
    try {
      const organization = this.organizationRepository.create({ ...createOrganizationDto });
      await this.organizationRepository.save(organization);
      return organization
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async findAll() {
    try {
      const organizations = await this.organizationRepository.find();
      return organizations
    } catch (error) {

    }
  }

  async findOne(id: number) {
    const organization = await this.organizationRepository.findOneBy({ id });

    if (!organization) throw new NotFoundException(`Organization with id ${id} not found`)

    return organization
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = await this.organizationRepository.preload({ id, ...updateOrganizationDto })
    if (!organization) throw new NotFoundException(`Organization with id ${id} not found`)
    await this.organizationRepository.save(organization)
    return organization
  }

  async remove(id: number) {
    const organization = await this.findOne(id)
    const response = await this.organizationRepository.remove(organization)
    return response
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error)

    if (error.code === '23502') throw new BadRequestException(error.driverError.message)

    if (error.code === '23505') throw new BadRequestException(error.detail)

    throw new InternalServerErrorException('Unexpected error, check server log')
  }
}
