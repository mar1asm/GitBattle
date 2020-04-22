import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutGithubComponent } from './about-github.component';

describe('AboutGithubComponent', () => {
  let component: AboutGithubComponent;
  let fixture: ComponentFixture<AboutGithubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutGithubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutGithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
