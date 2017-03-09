/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OwnedeventsService } from './ownedevents.service';

describe('OwnedeventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnedeventsService]
    });
  });

  it('should ...', inject([OwnedeventsService], (service: OwnedeventsService) => {
    expect(service).toBeTruthy();
  }));
});
