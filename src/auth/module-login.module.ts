import { NgModule } from '@angular/core';
import { LoginRoutingModule, routingComponents } from './module-login.routing';

// expose the routing module and its components,
// to allow the main module to wrap these variables to
// the whole application
export const loginModuleRoute = LoginRoutingModule;
export const loginModuleComponents = routingComponents;