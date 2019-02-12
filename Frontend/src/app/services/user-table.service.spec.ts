import { TestBed } from '@angular/core/testing';

import { UserTableService } from './user-table.service';

describe('UserTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserTableService = TestBed.get(UserTableService);
    expect(service).toBeTruthy();
  });
});
