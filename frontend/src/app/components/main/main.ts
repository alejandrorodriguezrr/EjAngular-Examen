import { Component } from '@angular/core';
import { Head } from "../head/head";
import { Latizq } from "../latizq/latizq";
import { Medio } from "../medio/medio";
import { Latder } from "../latder/latder";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-main',
  imports: [Head, Latizq, Medio, Latder, Footer],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
