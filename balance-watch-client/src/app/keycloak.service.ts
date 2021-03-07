import { Injectable } from '@angular/core';
import * as Keycloak from 'keycloak-js';
import {KeycloakInstance} from 'keycloak-js';

const KEYCLOAK_ROLE_GROUP_ADMIN = 'group_admin';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private keycloakAuth: KeycloakInstance;

  constructor()
  {
  }

  init(): Promise<any>
  {
    return new Promise((resolve, reject) =>
    {
      const config = {
        'url': 'http://localhost:8180/auth',
        'realm': 'mds',
        'clientId': 'angular-app'
      };
      // @ts-ignore
      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth.init({onLoad: 'login-required'})
          .success(() =>
          {
            resolve();
          })
          .error(() =>
          {
            reject();
          });
    });
  }

  getToken(): string
  {
    return this.keycloakAuth.token;
  }

  getAuthenticatedUser(): string
  {
    return this.keycloakAuth.idTokenParsed["preferred_username"];
  }

  logout()
  {
    const options = {
      'redirectUri': 'http://localhost:9897/mdsui',
      'realm': 'mds',
      'clientId': 'angular-app'
    };
    this.keycloakAuth.logout(options);
  }

  isGroupAdmin(): boolean {
    console.log('roles: ' + this.keycloakAuth.tokenParsed.realm_access.roles.map( u => `(${u})`).join(' '));
    console.log('token itself', JSON.stringify(this.keycloakAuth.tokenParsed));
    return this.keycloakAuth.tokenParsed.realm_access.roles.includes(KEYCLOAK_ROLE_GROUP_ADMIN);
  }
}
