'use client'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_state/store"
import { decrement, increment, incrementByAmount } from "../_state/counterSlice";

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => dispatch(increment())}>increment</button><br />
        <button onClick={() => dispatch(decrement())}>decrement</button><br />
        <button onClick={() => dispatch(incrementByAmount(count))}>Increment by {count}</button>
      </div>
    </div>
  )
}
