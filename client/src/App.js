import './App.css';
import { Clock as Calendar } from './resources/Calendars';

function App() {
  return (
    <>
      <header>
        <Calendar/>
        <a href="#">Study<mark class='blue bold'>SHEET</mark></a>
      </header>
      <main>
        <aside>
            <a href="#">Главная</a>
            <a href="#">Моё расписание</a>
            <a href="#">Аккаунт</a>
        </aside>
        <span>
          Ваше расписание:
        </span>
      </main>
    </>
  );
}

export default App;
