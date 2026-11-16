import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the website shell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('app-hero')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should render the LinkedIn posts after the founder section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const about = compiled.querySelector('#about');
    const linkedin = compiled.querySelector('#linkedin');
    const contact = compiled.querySelector('#contact');

    expect(about).toBeTruthy();
    expect(linkedin).toBeTruthy();
    expect(contact).toBeTruthy();
    expect(about!.compareDocumentPosition(linkedin!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(linkedin!.compareDocumentPosition(contact!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const postLinks = linkedin!.querySelectorAll('a[target="_blank"][rel="noopener noreferrer"]');
    expect(postLinks.length).toBe(11);
    expect(linkedin!.querySelectorAll('.post-image img').length).toBe(7);
    expect(linkedin!.textContent).not.toContain('Image preview unavailable');
  });
});
