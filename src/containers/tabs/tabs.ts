import { Component } from '@angular/core';

import { DiscoverPage } from '../discover/discover';
import { PossessionPage } from '../possessions/possessions';
import { ProfilePage } from '../profile/profile'
import { LoginPage } from "../login/login";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  rootPage = LoginPage

  tab1Root = PossessionPage;
  tab2Root = DiscoverPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
