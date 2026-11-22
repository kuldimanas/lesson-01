import Task01 from "./tasks/Task01";

export default function App() {
  return (
    <>
      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#48ff00",
          marginBottom: "20px",
        }}>
        01. Render и commit на счётчике
      </p>
      <Task01 />
    </>
  );
}