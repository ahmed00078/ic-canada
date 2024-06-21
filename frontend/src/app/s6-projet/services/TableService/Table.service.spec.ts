/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { S_TableService as TableService } from './Table.service';
import { HttpClientModule } from '@angular/common/http';


describe('Service: Table', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TableService]
    });
  });

  it('should ...', inject([TableService], (service: TableService) => {
    expect(service).toBeTruthy();
  }));
});
