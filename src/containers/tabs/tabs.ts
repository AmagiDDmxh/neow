import { Component } from '@angular/core';

import { DiscoverPage } from '../discover/discover';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile'
import { LoginPage } from "../login/login";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  rootPage = LoginPage

  tab1Root = HomePage;
  tab2Root = DiscoverPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
