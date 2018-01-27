import { Component } from '@angular/core';

import { DiscoverPage } from '../discover/discover';
import { PossessionsPage } from '../possessions/possessions';
import { ProfilePage } from '../profile/profile'
import { NavController } from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = PossessionsPage;
  tab2Root = DiscoverPage;
  tab3Root = ProfilePage;

  constructor () { }

}
