import { TestBed } from '@angular/core/testing';

import { FrameService } from './frame.service';
import { HttpClientModule } from '@angular/common/http';

describe('FrameService', () => {
  let service: FrameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Ensure HttpClientModule is imported
      providers: [FrameService] // Ensure FrameService is provided
    });
    service = TestBed.inject(FrameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
