/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { S_CategoryService as CategoryService, S_CategoryService } from './Category.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Category', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Ensure HttpClientModule is imported
      providers: [S_CategoryService] // Ensure S_CategoryService is provided
    });
  });

  it('should ...', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));
});
