export default function SimpleSSRComponent() {
  const currentDate = new Date().toUTCString();
  const greeting = 'Hello, SSR Component!';

  return (
    <div>
      <h1>{greeting}</h1>
      <p>This component is server-side rendered (SSR) and displays the current date:</p>
      <p>{currentDate}</p>
    </div>
  );
}
