export default function Toast({ message, isError, visible }) {
  return (
    <div className={`toast${visible ? "" : " hidden"}${isError ? " error" : ""}`}>
      <span>{message}</span>
    </div>
  );
}
