import { useState } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <Logo />
      <Form
        quantity={quantity}
        setItem={setItem}
        setList={setList}
        list={list}
        item={item}
        setQuantity={setQuantity}
      />
      <PackingList list={list} setList={setList} />
      <Stars list={list} />
    </>
  );
}

function Logo() {
  return <h1> 🌴 Far Away 🧳 </h1>;
}
function Form({ setItem, setList, list, item, setQuantity, quantity }) {
  function handleSetItem(ev) {
    setItem(ev.target.value);
  }
  function handleClick() {
    setList([...list, { name: item, qty: quantity }]);

    setItem("");
    setQuantity(1);
  }

  return (
    <div className="add-form">
      <h3>what do you need for trip? </h3>
      <select value={quantity} onChange={(ev) => setQuantity(ev.target.value)}>
        {Array.from(
          {
            length: 20,
          },
          (_, i) => i + 1
        ).map((el, i) => (
          <option key={i}>{el}</option>
        ))}
      </select>
      <input value={item} type="text" onChange={handleSetItem} />
      <button onClick={handleClick}>add</button>
    </div>
  );
}
function PackingList({ list, setList }) {
  const handleCheckboxChange = (index, isChecked) => {
    const updatedList = [...list];
    updatedList[index].packed = isChecked;
    setList(updatedList);
  };

  function handleDelete(index) {
    const filteredList = list.filter((el, i) => i !== index);
    setList(filteredList);
    console.log(filteredList);
  }

  return (
    <div className="list">
      {list.map((el, i) => (
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          key={i}
        >
          {el.name && (
            <input
              onChange={(ev) => handleCheckboxChange(i, ev.target.checked)}
              type="checkbox"
              checked={el.packed}
            />
          )}
          <span>{el.qty}</span>

          <span
            style={{
              textDecoration: el.packed ? "line-through" : "",
            }}
          >
            {el.name}
          </span>
          {el.name && <button onClick={() => handleDelete(i)}>x</button>}
        </div>
      ))}
    </div>
  );
}
function Stars({ list }) {
  return (
    <footer>
      <em>💼 you have {list.length} item on your list</em>
    </footer>
  );
}

export default App;
