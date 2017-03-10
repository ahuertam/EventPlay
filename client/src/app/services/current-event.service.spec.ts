/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CurrentEventService } from './services/current-event.service';

describe('CurrentEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentEventService]
    });
  });

  it('should ...', inject([CurrentEventService], (service: CurrentEventService) => {
    expect(service).toBeTruthy();
  }));
});
