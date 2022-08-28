import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-scenario',
  templateUrl: './select-scenario.component.html',
  styleUrls: ['./select-scenario.component.css']
})
export class SelectScenarioComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {

  }

  onRedirectScenario(selectedScenario:number){
   var Scenario= {
      "selectedScenario":selectedScenario
    }
    selectedScenario
    this.router.navigate(['survey/', Scenario], {
      state: { example: Scenario }
    });
  }

}


