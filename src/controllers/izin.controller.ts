import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Izin} from '../models';
import {IzinRepository} from '../repositories';

export class IzinController {
  constructor(
    @repository(IzinRepository)
    public izinRepository : IzinRepository,
  ) {}

  @post('/izins')
  @response(200, {
    description: 'Izin model instance',
    content: {'application/json': {schema: getModelSchemaRef(Izin)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Izin, {
            title: 'NewIzin',
            exclude: ['id'],
          }),
        },
      },
    })
    izin: Omit<Izin, 'id'>,
  ): Promise<Izin> {
    return this.izinRepository.create(izin);
  }

  @get('/izins/count')
  @response(200, {
    description: 'Izin model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Izin) where?: Where<Izin>,
  ): Promise<Count> {
    return this.izinRepository.count(where);
  }

  @get('/izins')
  @response(200, {
    description: 'Array of Izin model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Izin, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Izin) filter?: Filter<Izin>,
  ): Promise<Izin[]> {
    return this.izinRepository.find(filter);
  }

  @patch('/izins')
  @response(200, {
    description: 'Izin PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Izin, {partial: true}),
        },
      },
    })
    izin: Izin,
    @param.where(Izin) where?: Where<Izin>,
  ): Promise<Count> {
    return this.izinRepository.updateAll(izin, where);
  }

  @get('/izins/{id}')
  @response(200, {
    description: 'Izin model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Izin, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Izin, {exclude: 'where'}) filter?: FilterExcludingWhere<Izin>
  ): Promise<Izin> {
    return this.izinRepository.findById(id, filter);
  }

  @patch('/izins/{id}')
  @response(204, {
    description: 'Izin PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Izin, {partial: true}),
        },
      },
    })
    izin: Izin,
  ): Promise<void> {
    await this.izinRepository.updateById(id, izin);
  }

  @put('/izins/{id}')
  @response(204, {
    description: 'Izin PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() izin: Izin,
  ): Promise<void> {
    await this.izinRepository.replaceById(id, izin);
  }

  @del('/izins/{id}')
  @response(204, {
    description: 'Izin DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.izinRepository.deleteById(id);
  }
}
