import { TestBed } from '@angular/core/testing';

import { IndexeDBService } from './indexe-db.service';

describe('IndexeDBService', () => {
  let service: IndexeDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexeDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
