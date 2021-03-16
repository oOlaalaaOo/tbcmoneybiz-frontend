import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LandingComponent } from './landing.component';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, LandingRoutingModule, CoreModule, SharedModule],
})
export class LandingModule {}
