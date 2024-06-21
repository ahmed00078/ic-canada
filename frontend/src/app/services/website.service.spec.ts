import { TestBed } from '@angular/core/testing';

import { WebsiteService } from './website.service';
import { HttpClientModule } from '@angular/common/http';

describe('WebsiteService', () => {
  let service: WebsiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Ensure HttpClientModule is imported
      providers: [WebsiteService]  // Ensure WebsiteService is provided
    }).compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
