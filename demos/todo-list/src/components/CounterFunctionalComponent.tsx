import { useState, } from 'react';
interface Props {
  props: any;
}
export default function CounterFunctionalComponent(props: Props) {
  const [value, setValue] = useState(0);
  const increment = () => {
    setValue(prev => prev + 1);
  }

  console.log({ props });

  return (
    <div>
      <h1>Demo of Functional Component</h1>
      <div>
        counter:
        <span style={{ marginLeft: "5px" }}>{value}</span>
      </div>
      <button
        onClick={increment}
        style={{ marginTop: "1.2rem" }}
      >
        Increment
      </button>
    </div>
  );
}
