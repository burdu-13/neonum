import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { Footer } from "./shared/components/footer/footer";
import { AlertUi } from "./shared/components/alert/alert";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, AlertUi],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('neonum');
}
