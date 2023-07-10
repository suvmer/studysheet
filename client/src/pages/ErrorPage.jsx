import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";

export default function ErrorPage() {
  return (
    <>
      <Header/>
      <main>
        <SideBar/>
        <div className="wall">
          <div className="midbox center">
            <mark className="big">Страница не найдена</mark>
          </div>
        </div>
      </main>
    </>
  );
}