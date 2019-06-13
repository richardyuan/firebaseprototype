import { TestBed } from '@angular/core/testing';

import { FirestoredbService } from './firestoredb.service';

describe('FirestoredbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirestoredbService = TestBed.get(FirestoredbService);
    expect(service).toBeTruthy();
  });
});
