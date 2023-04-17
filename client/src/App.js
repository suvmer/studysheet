import './App.css';
import { Clock as Calendar } from './resources/Calendars';

function App() {
  return (
    <main>
      <header>
        <Calendar/>
        <a href="#">Study<mark class='blue bold'>SHEET</mark></a>
        <aside>
          <a href="#">Главная</a>
          <a href="#">Моё расписание</a>
          <a href="#">Study<mark class='blue bold'>SHEET</mark></a>
        </aside>
      </header>
    </main>
  );
}

export default App;
