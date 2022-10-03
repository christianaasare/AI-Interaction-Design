import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Data from '../../app/data.json';
import Data2 from '../../app/datasc2.json';
import { ExcelService } from '../../service/excel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userquestion',
  templateUrl: './userquestion.component.html',
  styleUrls: ['./userquestion.component.css'],
})
export class UserquestionComponent implements OnInit {
  editmode: any ={};
  editInput: any;
  selectedScenario!: any;
  data: any = {};
  inputs = ['text', 'button',	'subtext',	'edit',	'placeholder'];
  firstFormGroup: FormGroup;
  isEditable = true;
  vard:any={};
  isReadonly: any = {};
  userData: IUser2[] = Data;
  userDataScTwo: IData2[] = Data2;
  resArray: any[] = [];
  inputsdata = this.getOrSetInputSequance();
  dummyInput: string = 'hello';
  @ViewChild('container') 'container': ElementRef;
  @ViewChild('img') 'img': ElementRef;

  isZoomed = false;
  modelOption={standalone: true}
  pos = { top: 0, left: 0, x: 0, y: 0 };
  constructor(
    private fb: FormBuilder,
    private excelService: ExcelService,
    private activatedRoute: ActivatedRoute
  ) {
    this.firstFormGroup = this.fb.group({
      firstCtrl0: ['', Validators.nullValidator],
      firstCtrl1: ['', Validators.nullValidator],
      firstCtrl2: ['', Validators.nullValidator],

    });
  }

  ngOnInit() {
    this.selectedScenario = this.activatedRoute.snapshot.params;

    this.shuffleInputs();
  }

  chnageButtonInput(newValue:any,item:any){

  }
  ngAfterContentInit() {
    var data = this.getData();

    if (this.selectedScenario['selectedScenario'] == '1') {
      data.forEach((element) => {
        this.bindData(element['id']);
      });
    } else {
      data.forEach((element) => {
        this.bindData(element['id']);
      });
    }

    this.dummyInput = 'hello';
  }
  shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  shuffleInputs() {
    if (this.selectedScenario['selectedScenario'] == '1') {
      let sc1Data: IUser2[] = this.userData;
      var tempList: any[] = [];
      sc1Data.forEach((element: IUser2) => {
        element.questions.forEach((data: IUser) => {

          tempList.push(data);
        });
      });

      console.log('sce1Data :');

      var splicedArray: IUser2[] = this.splitToChunks(
        this.shuffle(tempList),
        5
      );
      this.userData = splicedArray;

      console.dir(this.userData);
    }
    else{
      let sc2Data: IData2[] = this.userDataScTwo;
      var tempList: any[] = [];
      sc2Data.forEach((element: IData2) => {
        element.questions.forEach((data: IDataSc2) => {
          tempList.push(data);
        });
      });

      console.log('sc1Data :');

      var splicedArray1: IData2[] = this.splitToChunks(
        this.shuffle(tempList),
        5
      );
      this.userDataScTwo = splicedArray1;

      console.dir(this.userDataScTwo);
    }
  }

  splitToChunks(array: any, parts: any) {
    let result = [];
    for (let i = parts; i > 0; i--) {

      result.push({questions:array.splice(0, Math.ceil(array.length / i))});
    }
    return result;
  }

  onItemChange($event: any, id: string,items:any) {
    this.data[id] = $event.target.value;
    if($event.target.value==false)
    {
    }
  }

  edit(id: string,item:any,i:number) {

    this.isReadonly[id] = false;
    if(this.data[id]==''||this.data[id]==undefined)
    {
      this.data[id]=item.answers
    }

    const resa = this.editmode[item.id]== false || typeof this.editmode[item.id] == "undefined" ? true :false;
    this.editmode={...this.editmode, [item.id]:resa}    

  }
  onFocusPlaceholder(item:any){
    if(this.data[item.id]==''||this.data[item.id]==undefined)
    {
      this.data[item.id]=item.answers
    }
  }

  balancedLatinSquare(array: any[], participantId: number) {
    var result = [];

    // Based on "Bradley, J. V. Complete counterbalancing of immediate sequential effects in a Latin square design. J. Amer. Statist. Ass.,.1958, 53, 525-528. "

    if (this.selectedScenario['selectedScenario'] == '1') {
      for (var i = 0, j = 0, h = 0; i < this.userData.length; ++i) {
        var val = 0;
        if (i < 2 || i % 2 != 0) {
          val = j++;
        } else {
          val = array.length - h - 1;
          ++h;
        }
        var idx = (val + participantId) % array.length;
        result.push(array[idx]);
      }
    } else {
      for (var i = 0, j = 0, h = 0; i < this.userDataScTwo.length; ++i) {
        var val = 0;
        if (i < 2 || i % 2 != 0) {
          val = j++;
        } else {
          val = array.length - h - 1;
          ++h;
        }

        var idx = (val + participantId) % array.length;
        result.push(array[idx]);
      }
    }

    if (array.length % 2 != 0 && participantId % 2 != 0) {
      result = result.reverse();
    }

    return result;
  }
  // ==== first=====

  next(item: any, index: number, inputtype: string) {

    try {
      item.questions.forEach((element: any, ind: number) => {
        this.nextSubmit(element, index, this.data[element['id']], inputtype);
      });
    } catch (e) {
      console.log('error :');
      console.dir(e);
    }
  }

  nextSubmit(item: any, index: number, data: any, inputtype: string) {
    try {

      item['userAnswer'] = data;
      if(inputtype=='button')
      {
        item["answers"]=this.vard[item.id]==''?item["answers"]:this.vard[item.id]==undefined?item["answers"]:this.vard[item.id]
      }

      if (inputtype == 'button' && data == '') {
        item['userAnswer'] = 'true';
        data = 'true';
      }

      var databaseData = this.getData();
      var recFound = databaseData.find((x) => x['id'] == item['id']);
      if (recFound != undefined) {
        databaseData.forEach((element) => {
          if (element['id'] == item['id']) {
            element['userAnswer'] = data;
          }
        });
      } else {
        databaseData.push(item);
      }

      if (this.selectedScenario['selectedScenario'] == '1') {
        localStorage.setItem('databaseForScOne', JSON.stringify(databaseData)!);
      } else {
        localStorage.setItem('databaseForScTwo', JSON.stringify(databaseData)!);
      }
      this.saveGenerateParticipantId();
      if (this.selectedScenario['selectedScenario'] == '1') {
        if (index != this.userData.length - 1) {
          this.userData[index + 1].questions.forEach((element) => {
            this.bindData(element.id);
          });
        }
      } else {
        if (index != this.userDataScTwo.length - 1) {
          this.userDataScTwo[index + 1].questions.forEach((element) => {
            this.bindData(element.id);
          });
        }
      }
    } catch (e) {
      console.log('error nextSu bmit :');
      console.dir(e);
    }

  }

  submit(item: any, index: number) {
    this.next(item, index, '');
  }

  bindData(id: any) {

    var databaseData = this.getData();
    if (databaseData.length != 0) {
      var databaseRec = databaseData.find((el) => el['id'] == id);
      if (databaseRec == undefined || databaseRec == '') {
        this.data[id] = '';
      } else {
        this.data[id] = databaseRec['userAnswer']==undefined?'':databaseRec['userAnswer'];
      }
    }
    if(this.data[id] ==undefined){
      this.data[id]=''
    }
  }

  getData(): any[] {
    var res = '';
    if (this.selectedScenario['selectedScenario'] == '1') {
      res = localStorage.getItem('databaseForScOne')!;
    } else {
      res = localStorage.getItem('databaseForScTwo')!;
    }

    if (res != undefined) {
      return JSON.parse(res);
    } else {
      return [];
    }
  }

  saveGenerateParticipantId() {
    var partId = this.getParticipantId();
    if (partId == '') {
      var rendomParticipantId = Math.floor(Math.random() * (99999 - 1)) + 1;
      localStorage.setItem('participantId', rendomParticipantId.toString());
    }
  }
  getParticipantId() {
    var partId = localStorage.getItem('participantId');

    if (partId == undefined) {
      return '';
    } else {
      return parseInt(partId);
    }
  }

  getOrSetInputSequance() {
    this.selectedScenario = this.activatedRoute.snapshot.params;
    var seq = localStorage.getItem('inputSeq');
    if (seq == undefined) {
      var partId = this.getParticipantId();
      if (partId == '') {
        this.saveGenerateParticipantId();
        partId = this.getParticipantId();
      }

      var inputSeq = this.inputs;
      // var inputSeq = this.balancedLatinSquare(
      //   this.inputs,
      //   parseInt(partId.toString())
      // );
      localStorage.setItem('inputSeq', JSON.stringify(inputSeq));
      return inputSeq;
    } else {
      return JSON.parse(seq);
    }
  }
  submitableDataForScOne(item: any, index: number, inputtype: string) {
    this.next(item, index, inputtype);
    var data = '';
    if (this.selectedScenario['selectedScenario'] == '1') {
      data = localStorage.getItem('databaseForScOne')!;
    } else {
      data = localStorage.getItem('databaseForScTwo')!;
    }

    var partId = localStorage.getItem('participantId');
    var seq = localStorage.getItem('inputSeq');
    var decodedData = JSON.parse(data!);

    var inputtypeIndex = 0;
    console.dir('decoded data :' + decodedData.length);
    decodedData.forEach((element: any, index: number) => {
      element['partId'] = partId;

      // element['input'] = JSON.parse(seq!)[index]?.toString();
      if (index % 3 == 0) {
        if (index != 0) {
          inputtypeIndex = inputtypeIndex + 1;
        }

        console.log(
          'index changed : ' +
            JSON.parse(seq!)[inputtypeIndex]?.toString() +
            'index : ' +
            inputtypeIndex
        );
      }
      element['input'] = JSON.parse(seq!)[inputtypeIndex]?.toString();
      console.dir('seq : ' + JSON.parse(seq!));
    });
    console.dir(decodedData);
    this.exportAsXLSX(decodedData);
  }

  isSubtextVisible: any = {};

  onValueChange(event: any, id: string) {
    this.isSubtextVisible[id] = event.target.value;
  }

  exportAsXLSX(data: any): void {
    this.excelService.exportAsExcelFile(data, 'sample');
  }


}

interface IUser {
  id: string;
  question: string;
  answers: string;
}

interface IUser2 {
  questions: IUser[];
}

interface IDataSc2 {
  id: string;
  question: string;
  answers: string;
  img: string;
}

interface IData2 {
  questions: IDataSc2[];
}
