import { TestBed } from '@angular/core/testing';

import { CadastrarService } from './cadastrar.service';

describe('CadastrarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastrarService = TestBed.get(CadastrarService);
    expect(service).toBeTruthy();
  });
});
