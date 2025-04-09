import Counter from './components/Counter';
import SimpleSSRComponent from './components/SimpleSSRComponent';

export default function Home() {
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <p>
        <b>Hola</b>
      </p>
      <Counter />
      <SimpleSSRComponent />
    </div>
  );
}
